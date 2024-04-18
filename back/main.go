package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/try_2_backend/database"
)

func main() {
	db := database.New()

	_ = db

	app := gin.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
	}))

	app.GET("/galleries", func(ctx *gin.Context) {
		items, err := db.GetAllGalleries()

		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
				"result": false,
				"error":  "database error",
			})
			return
		}

		ctx.JSON(200, gin.H{
			"result": true,
			"data":   items,
		})
	})

	app.Run("0.0.0.0:8000")
}
