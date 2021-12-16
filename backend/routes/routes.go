package routes

import (
	"datamanagement/database"
	"datamanagement/models"
	"fmt"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func Routes(app *fiber.App) {
	//GET ALL PRODUCTS
	app.Get("/api/products", func(c *fiber.Ctx) error {
		db := database.Connect()
		var products []models.Product
		fmt.Println("searching")
		db.Find(&products)
		return c.JSON(products)
	})

	//GET ALL REVIEWS
	app.Get("/api/reviews", func(c *fiber.Ctx) error {
		db := database.Connect()
		var reviews []models.Review
		fmt.Println("searching")
		db.Find(&reviews)
		return c.JSON(reviews)
	})

	//GET ALL PURCHASE DATE
	app.Get("/api/purchases", func(c *fiber.Ctx) error {
		db := database.Connect()
		var purchase_date []models.Purchase
		fmt.Println("searching")
		db.Find(&purchase_date)
		return c.JSON(purchase_date)
	})

	//GET SINGLE PRODUCT
	app.Get("/api/products/:id", func(c *fiber.Ctx) error {
		db := database.Connect()
		var products []models.Product
		fmt.Println("searching")
		id := strings.Trim(c.Params("id"), ":")

		fmt.Println(id)
		db.Find(&products, "product_id = ?", id)
		return c.JSON(products)
	})

	//GET SINGLE PURCHASE
	app.Get("/api/purchases/:id", func(c *fiber.Ctx) error {
		db := database.Connect()
		var purchases []models.Purchase
		fmt.Println("searching")
		id := strings.Trim(c.Params("id"), ":")

		fmt.Println(id)
		db.Find(&purchases, "purchase_id = ?", id)
		return c.JSON(purchases)
	})

	//GET SINGLE REVIEW
	app.Get("/api/reviews/:id", func(c *fiber.Ctx) error {
		db := database.Connect()
		var reviews []models.Review
		fmt.Println("searching")
		id := strings.Trim(c.Params("id"), ":")

		fmt.Println(id)
		db.Find(&reviews, "review_id = ?", id)
		return c.JSON(reviews)
	})

	//CREATE A PRODUCT
	app.Post("/api/create", func(c *fiber.Ctx) error {
		return c.SendString("lol")
	})
}
