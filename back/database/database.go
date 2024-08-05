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
	db.AutoMigrate(&models.Photographer{}, &models.Gallery{})

	return &DB{DB: db}, nil
}

func (db *DB) CreateGallery(gallery *models.Gallery) error {
	result := db.Create(gallery)
	return result.Error
}

func (db *DB) DeleteGallery(id string) error {
	result := db.Delete(&models.Gallery{}, id)
	return result.Error
}
