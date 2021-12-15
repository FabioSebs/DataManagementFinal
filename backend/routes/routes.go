package routes

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func Routes(app *fiber.App) {
	//GET ALL PRODUCTS
	app.Get("/api/products", func(c *fiber.Ctx) error {
		return c.SendString("lol")
	})

	//GET SINGLE PRODUCT
	app.Get("/api/products/:id", func(c *fiber.Ctx) error {
		msg := fmt.Sprintf("Id - %s", c.Params("id"))
		return c.SendString(msg)
	})

	//CREATE A PRODUCT
	app.Post("/api/create", func(c *fiber.Ctx) error {
		return c.SendString("lol")
	})
}
