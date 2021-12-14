package database

import (
	"datamanagement/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	connection, err := gorm.Open(mysql.Open("root@/amazon_products"), &gorm.Config{})

	if err != nil {
		panic("could not connect to database")
	}

	DB = connection

	connection.AutoMigrate(&models.Table{})
}
