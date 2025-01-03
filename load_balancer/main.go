package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/zehan12/blinkit/load_balancer/models"
	"github.com/zehan12/blinkit/load_balancer/routes"
)

func main() {
	fmt.Println("Starting Load Balancer...")

	// Initialize Gin router.
	router := gin.New()
	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	// For Least Connections strategy:
	balancer := models.NewLeastConnectionLoadBalancer()

	// Optionally, add initial backend servers.
	balancer.AddServer(0, "http://localhost:3001")
	balancer.AddServer(0, "http://localhost:3002")
	balancer.AddServer(0, "http://localhost:3003")

	// Set up routes.
	routes.SetRoutes(router, balancer)

	// Start the load balancer server.
	log.Fatal(router.Run(":8080"))
}
