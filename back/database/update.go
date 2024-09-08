package database

import (
  "github.com/try_2_backend/models"
)

func (db *DB) UpdateGallery(gallery *models.Gallery) error {
    result := db.Model(&models.Gallery{}).Where("id = ?", gallery.ID).Updates(gallery)
    return result.Error
}