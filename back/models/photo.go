package models

import (
	"time"
)

type Photo struct {
	ID             int       `gorm:"autoIncrement;primaryKey" json:"id"`
	GalleryID      int       `gorm:"index" json:"gallery_id"`               
	UUID           string    `json:"uuid"`                    
	OriginalName   string    `json:"original_name"`           
	UploadedAt     time.Time `json:"uploaded_at"`   
	Extension      string 	 `json:"extension"`    
}
