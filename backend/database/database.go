package database

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	DB *gorm.DB
)

// ENV VARIABLE
func goDotEnvVariable(key string) string {

	// load .env file
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	return os.Getenv(key)
}

// CONNECTION
func Connect() *gorm.DB {
	// sqlDB, err := sql.Open("mysql", "amazon_products")

	// password := goDotEnvVariable("DB_PASSWORD")
	// connectString := fmt.Sprintf("root@/amazon_products", password)
	dsn := "fabrzy:Alodia2001!@tcp(localhost:3306)/test"
	// connection, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("could not connect to database")
	}

	DB = db

	// connection.AutoMigrate(&models.Table{})
	return DB
}
