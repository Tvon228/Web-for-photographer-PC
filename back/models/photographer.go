package models

type Photographer struct {
    ID       uint   `gorm:"primaryKey"`
    Email    string `gorm:"uniqueIndex;not null"`
    Password string `gorm:"not null"`
}

type Credentials struct {
    Email    string `json:"email"`
    Password string `json:"password"`
}
