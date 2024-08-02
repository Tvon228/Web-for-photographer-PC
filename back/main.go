package main

import (
	"net/http"
	"log"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/try_2_backend/database"
	"github.com/try_2_backend/routes"
	"github.com/try_2_backend/utils"
)

func main() {
	dbInstance, err := database.New()
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}

	utils.Db = dbInstance.DB

	routes.CreateUserIfNotExists(utils.Db, "patsyuk.04@mail.ru", "$2a$10$UVY4m/.elYd5OpR.PgbmZ.jn/UQDiaqOkFOSV77wCRR7PhqUElooO")

	app := gin.Default()

	app.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
	}))

	routes.RegisterAuthRoutes(app, utils.Db)

	app.GET("/galleries", func(ctx *gin.Context) {
		items, err := dbInstance.GetAllGalleries()
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
				"result": false,
				"error":  "database error",
			})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{
			"result": true,
			"data":   items,
		})
	})

	app.Run("0.0.0.0:8000")
}
