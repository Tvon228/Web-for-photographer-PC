package database

import (
	"net/http"
	"time"
	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
	"github.com/gin-gonic/gin"
	"github.com/try_2_backend/models"
	"github.com/try_2_backend/utils"
)

// CreateUserIfNotExists создает пользователя, если его нет в базе данных
func (db *DB) CreateUserIfNotExists(email, hashedPassword string) {
	var photographer models.Photographer
	if db.Where("email = ?", email).First(&photographer).Error != nil {
		photographer = models.Photographer{
			Email:    email,
			Password: hashedPassword,
		}
		db.Create(&photographer)
	}
}

// RegisterAuthRoutes регистрирует маршруты для авторизации
func RegisterAuthRoutes(router *gin.Engine, db *DB) {
	router.POST("/login", func(ctx *gin.Context) {
		login(ctx, db)
	})
}

func login(ctx *gin.Context, db *DB) {
	var creds models.Credentials
	if err := ctx.BindJSON(&creds); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	var photographer models.Photographer
	if db.Where("email = ?", creds.Email).First(&photographer).Error != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(photographer.Password), []byte(creds.Password)); err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid password"})
		return
	}

	expirationTime := time.Now().Add(5 * time.Minute)
	claims := &utils.Claims{
		Email: creds.Email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(utils.JwtKey)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Error generating token"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"token": tokenString})
}
