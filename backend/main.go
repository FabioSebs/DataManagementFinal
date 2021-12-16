package main

import (
	"datamanagement/dataset"
	"datamanagement/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

// func dummy() {
// 	fmt.Println("test")
// }

func main() {
	// Cleaning Data
	dataset.CleanData()
	// db := database.Connect()

	//API
	app := fiber.New()

	//MIDDLEWARE
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	//ROUTES
	routes.Routes(app)

	// Setup(app)
	app.Listen(":5000")
}
