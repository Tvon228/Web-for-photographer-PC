package database

type Gallery struct {
	ID 				int 	`gorm:"autoIncrement;primary" json:"id"`
	Name 			string 	`json:"name"`
	Password 		string 	`json:"password"`
	Client_message 	string	`json:"client_message"`
	Comment 		string	`json:"comment"`
}

