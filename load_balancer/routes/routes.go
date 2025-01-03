package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/zehan12/blinkit/load_balancer/controller" // Replace with your module path
	"github.com/zehan12/blinkit/load_balancer/models"     // Replace with your module path
)

func SetRoutes(router *gin.Engine, loadBalancer *models.LoadBalancer) {
	router.Any("/*path", controller.ForwardRequest(loadBalancer)) // Single route for all the requests
}
