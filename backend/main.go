package main

import (
	"datamanagement/database"
	"datamanagement/dataset"
	"datamanagement/models"
	"fmt"
)

// func dummy() {
// 	fmt.Println("test")
// }

func main() {
	// Cleaning Data
	dataset.CleanData()
	db := database.Connect()
	fmt.Println(db.First(&models.Table{}))
	// //API
	// app := fiber.New()

	// //MIDDLEWARE
	// app.Use(cors.New(cors.Config{
	// 	AllowCredentials: true,
	// }))

	// //ROUTES
	// routes.Routes(app)

	// // Setup(app)
	// app.Listen(":5000")
}
