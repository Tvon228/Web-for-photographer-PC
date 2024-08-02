package routes

import (
	"net/http"
	"time"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"github.com/try_2_backend/models"
	"github.com/try_2_backend/utils"
	"gorm.io/gorm"
)

func CreateUserIfNotExists(db *gorm.DB, email, hashedPassword string) {
	var photographer models.Photographer
	if db.Where("email = ?", email).First(&photographer).Error != nil {
		photographer = models.Photographer{
			Email:    email,
			Password: hashedPassword,
		}
		db.Create(&photographer)
	}
}

func RegisterAuthRoutes(router *gin.Engine, db *gorm.DB) {
	router.POST("/login", func(ctx *gin.Context) {
		login(ctx, db)
	})
}

func login(ctx *gin.Context, db *gorm.DB) {
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
