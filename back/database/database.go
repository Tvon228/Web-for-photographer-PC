package database

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DB struct {
	db *gorm.DB
}

func New() DB {
	dns := "postgres://postgres:dflbvgf04@localhost:5432/cheese"
	
	db, err := gorm.Open(postgres.Open(dns), &gorm.Config{})

	if err != nil {
		panic(err.Error())
	}

	db.AutoMigrate(&Gallery{})

	return DB{db: db}
}

func (db *DB) GetAllGalleries() ([]Gallery, error) {
	galleries := make([]Gallery, 0)

	result := db.db.Find(&galleries)

	return galleries, result.Error
}