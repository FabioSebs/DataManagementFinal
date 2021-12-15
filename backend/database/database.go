package database

import (
	"fmt"
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

func Connect() *gorm.DB {
	password := goDotEnvVariable("DB_PASSWORD")
	connectString := fmt.Sprintf("fabrzy@%s/amazon_products", password)
	connection, err := gorm.Open(mysql.Open(connectString), &gorm.Config{})

	if err != nil {
		panic("could not connect to database")
	}

	DB = connection

	// connection.AutoMigrate(&models.Table{})
	return DB
}
