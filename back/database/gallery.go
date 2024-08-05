package database

import (
	"github.com/try_2_backend/models"
)

func (db *DB) GetAllGalleries() ([]models.Gallery, error) {
	galleries := make([]models.Gallery, 0)
	result := db.Find(&galleries)
	return galleries, result.Error
}
