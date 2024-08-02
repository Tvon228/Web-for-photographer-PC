package config

const (
	DB_DSN = "postgres://postgres:dflbvgf04@localhost:5432/cheese"
)

func GetDatabaseDSN() string {
	return DB_DSN
}
