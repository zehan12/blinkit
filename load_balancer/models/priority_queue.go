package models

import (
	"container/heap"
)

type QueueItem struct {
	id          int
	Connections int
	ServerAddr  string
}

func NewQueueItem(connections int, address string) *QueueItem {
	return &QueueItem{
		Connections: connections,
		ServerAddr:  address,
	}
}

type PriorityQueue []*QueueItem

func (pq *PriorityQueue) Push(x interface{}) {
	item := x.(*QueueItem)
	item.id = len(*pq)
	*pq = append(*pq, item)
}

func (pq *PriorityQueue) Len() int {
	return len(*pq)
}

func (pq *PriorityQueue) Pop() interface{} {
	old := *pq
	n := len(old)
	item := old[n-1]
	item.id = -1
	*pq = old[0 : n-1]
	return item
}

func (pq *PriorityQueue) Less(i, j int) bool {
	return (*pq)[i].Connections < (*pq)[j].Connections
}

func (pq *PriorityQueue) Swap(i, j int) {
	(*pq)[i], (*pq)[j] = (*pq)[j], (*pq)[i]
	(*pq)[i].id = i
	(*pq)[j].id = j
}

// Update modifies the number of connections of a specific QueueItem.
func (pq *PriorityQueue) Update(item *QueueItem, connections int) {
	item.Connections = connections
	heap.Fix(pq, item.id)
}

// Will implement a Min Heap so must return the item with the least connections
func (pq *PriorityQueue) GetItemMinConnections() *QueueItem {
	if pq.Len() == 0 {
		return nil
	}
	return (*pq)[0] // return the element with the least connections
}

// Remove item from queue with a certain address
func (pq *PriorityQueue) RemoveByServerAddr(serverAddr string) *QueueItem {
	for i, item := range *pq {
		if item.ServerAddr == serverAddr {
			return heap.Remove(pq, i).(*QueueItem)
		}
	}
	return nil
}

func (pq *PriorityQueue) GetItemByServerAddr(serverAddr string) *QueueItem {
	for _, item := range *pq {
		if item.ServerAddr == serverAddr {
			return item
		}
	}
	return nil
}
