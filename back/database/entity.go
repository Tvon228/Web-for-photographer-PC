package database

type Gallery struct {
	ID int `gorm:"autoIncrement;primary" json:"id"`
	Name string `json:"name"`
}