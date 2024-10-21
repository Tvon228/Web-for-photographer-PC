package database

import (
	"github.com/try_2_backend/models"
)

func (db *DB) CreateGallery(gallery *models.Gallery) error {
	result := db.Create(gallery)
	return result.Error
}

func (db *DB) DeleteGallery(id string) error {
	result := db.Delete(&models.Gallery{}, id)
	return result.Error
}

func (db *DB) GetAllGalleries() ([]models.Gallery, error) {
	galleries := make([]models.Gallery, 0)
	result := db.Find(&galleries)
	return galleries, result.Error
}
