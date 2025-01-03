package controller

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/zehan12/blinkit/load_balancer/models"
)

func AddNewServer(loadBalancer *models.LoadBalancer) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		_, cancel := context.WithTimeout(context.Background(), time.Second*3)
		defer cancel()
		var body map[string]string
		err := json.NewDecoder(ctx.Request.Body).Decode(&body)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Body missing the address field"})
			return
		}
		addr := body["address"]
		if addr == "" {
			ctx.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Body missing the address field"})
			return

		}
		err = loadBalancer.AddServer(0, addr)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"success": false, "message": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"success": true, "message": "Server added successfully"})
	}
}

func DeleteServer(loadBalancer *models.LoadBalancer) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		_, cancel := context.WithTimeout(context.Background(), time.Second*3)
		defer cancel()
		var body map[string]string
		err := json.NewDecoder(ctx.Request.Body).Decode(&body)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Body missing the address field"})
			return
		}
		addr := body["address"]
		if addr == "" {
			ctx.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Body missing the address field"})
			return

		}
		err = loadBalancer.DeleteServer(addr)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"success": false, "message": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"success": true, "message": "Server deleted successfully"})
	}
}

func ForwardRequest(loadBalancer *models.LoadBalancer) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		request := ctx.Request

		// if the Add Server request is called
		if request.Method == http.MethodPost && request.URL.Path == "/addServer" {
			// Call the Add New Server handler
			AddNewServer(loadBalancer)(ctx)
			return
		}

		// if the Delete Server request is called
		if request.Method == http.MethodDelete && request.URL.Path == "/delete" {
			// Call the Delete Server handler
			DeleteServer(loadBalancer)(ctx)
			return
		}

		resp, err := loadBalancer.ForwardRequest(request)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
			return
		}
		body, err := io.ReadAll(resp.Body)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
			return
		}
		defer resp.Body.Close()

		for k, v := range resp.Header {
			for _, h := range v {
				ctx.Writer.Header().Add(k, h)
			}
		}
		ctx.Writer.WriteHeader(resp.StatusCode)
		ctx.Writer.Write(body)
	}
}
