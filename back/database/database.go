package database

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"github.com/try_2_backend/models"
	"github.com/try_2_backend/config"
)

type DB struct {
	*gorm.DB
}

func New() (*DB, error) {
	dns := config.GetDatabaseDSN()
	db, err := gorm.Open(postgres.Open(dns), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	// Автоматическое создание таблиц
	db.AutoMigrate(&models.Photographer{}, &models.Gallery{}, &models.Photo{})

	return &DB{DB: db}, nil
}



