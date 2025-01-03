package models

import (
	"container/heap"
	"fmt"
	"net/http"
	"net/url"
	"sync"
)

// Enum for the strategy/type
type LoadBalancingStrategy int

const (
	RoundRobin LoadBalancingStrategy = iota
	LeastConnections
)

type LoadBalancer struct {
	ServerAddr  []string       // list of server address in the load balalncer
	Servers     map[string]int // map of server address to the index for easy retreival
	RRNext      int            // will tell which is the next server to return in a round robin fashion
	Connections PriorityQueue  // to return the server wiht the least connections in a dynamic load balancer
	Type        LoadBalancingStrategy
	Mutex       sync.Mutex
}

func NewLoadBalancer() *LoadBalancer {
	lb := &LoadBalancer{
		ServerAddr:  make([]string, 0),
		Servers:     make(map[string]int),
		RRNext:      -1,
		Connections: make(PriorityQueue, 0),
		Type:        RoundRobin,
	}
	heap.Init(&lb.Connections)
	return lb
}

func NewRoundRobinLoadBalancer() *LoadBalancer {
	lb := NewLoadBalancer()
	lb.Type = RoundRobin
	return lb
}

func NewLeastConnectionLoadBalancer() *LoadBalancer {
	lb := NewLoadBalancer()
	lb.Type = LeastConnections
	return lb
}

var client = &http.Client{}

func (lb *LoadBalancer) AddServer(connections int, serverAdd string) error {
	lb.Mutex.Lock()
	defer lb.Mutex.Unlock()

	_, contains := lb.Servers[serverAdd]
	if !contains {
		item := NewQueueItem(connections, serverAdd)
		lb.ServerAddr = append(lb.ServerAddr, serverAdd)
		lb.Servers[serverAdd] = len(lb.ServerAddr) - 1
		heap.Push(&lb.Connections, item)
		return nil
	}
	return fmt.Errorf("error: This server already exists")
}

func (lb *LoadBalancer) DeleteServer(address string) error {
	lb.Mutex.Lock()
	defer lb.Mutex.Unlock()

	_, contains := lb.Servers[address]
	if contains {
		_ = lb.Connections.RemoveByServerAddr(address)
		index := lb.Servers[address]
		if len(lb.ServerAddr) > 1 {
			lb.ServerAddr = append(lb.ServerAddr[:index], lb.ServerAddr[index+1:]...)
		} else {
			lb.ServerAddr = lb.ServerAddr[:0]
		}
		delete(lb.Servers, address)
		for i := 0; i < len(lb.ServerAddr); i++ {
			lb.Servers[lb.ServerAddr[i]] = i
		}
		return nil
	}
	return fmt.Errorf("error: The server does not exists")
}

func (lb *LoadBalancer) GetServerWithMinimumServerAddr() string {
	item := lb.Connections.GetItemMinConnections()
	fmt.Printf("Response from address %s.\n", item.ServerAddr)
	item.Connections++
	lb.Connections.Update(item, item.Connections)
	return item.ServerAddr
}

func (lb *LoadBalancer) GetRoundRobinNextServerAddr() string {
	lb.RRNext = (lb.RRNext + 1) % len(lb.ServerAddr)
	return lb.ServerAddr[lb.RRNext]
}

func (lb *LoadBalancer) ForwardRequest(request *http.Request) (*http.Response, error) {
	lb.Mutex.Lock()
	defer lb.Mutex.Unlock()

	if len(lb.ServerAddr) == 0 {
		return nil, fmt.Errorf("error: No servers available. Register a server")
	}

	var serverAddr string
	switch lb.Type {
	case RoundRobin:
		serverAddr = lb.GetRoundRobinNextServerAddr() // Round Robin implementation
	case LeastConnections:
		serverAddr = lb.GetServerWithMinimumServerAddr() // Minimum Connections implementation
	default:
		return nil, fmt.Errorf("error: Unknown load balancing strategy")
	}

	serverURL, err := url.Parse(serverAddr)
	if err != nil {
		return nil, err
	}

	// Create a new request to forward to the target server
	proxyURL := serverURL.String() + request.URL.Path
	proxyReq, err := http.NewRequest(request.Method, proxyURL, request.Body)
	if err != nil {
		return nil, err
	}

	// Copy headers from the original request to the new request
	for key, values := range request.Header {
		for _, value := range values {
			proxyReq.Header.Add(key, value)
		}
	}

	resp, err := client.Do(proxyReq)
	if err != nil {
		return nil, err
	}

	// Decrement the connections count => the server is free again
	if lb.Type == LeastConnections {
		go func() {
			lb.Mutex.Lock()
			defer lb.Mutex.Unlock()
			item := lb.Connections.GetItemByServerAddr(serverAddr)
			item.Connections--
			lb.Connections.Update(item, item.Connections)
		}()
	}

	return resp, nil
}
