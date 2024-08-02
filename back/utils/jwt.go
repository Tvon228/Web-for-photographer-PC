package utils

import (
    "github.com/dgrijalva/jwt-go"
    "gorm.io/gorm"
)

var (
    Db     *gorm.DB
    JwtKey = []byte("my_secret_key")
)

type Claims struct {
    Email string `json:"email"`
    jwt.StandardClaims
}
