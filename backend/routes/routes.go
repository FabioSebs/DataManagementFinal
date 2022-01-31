package routes

import (
	"datamanagement/database"
	"datamanagement/models"
	"fmt"
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func Routes(app *fiber.App) {
	//GET ALL EVERYTHING
	app.Get("/api/everything", func(c *fiber.Ctx) error {
		db := database.Connect()
		var products []models.Main
		fmt.Println("searching")
		db.Find(&products)
		return c.JSON(products)
	})

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

	//GET USER BY EMAIL
	app.Get("/api/user/:email", func(c *fiber.Ctx) error {
		db := database.Connect()

		var users []models.User

		email := strings.Trim(c.Params("email"), ":")

		db.Find(&users, "email = ?", email)

		return c.JSON(users)
	})

	//CREATE A PRODUCT
	app.Post("/api/create/product", func(c *fiber.Ctx) error {
		db := database.Connect()
		payload := models.Product{}

		if err := c.BodyParser(&payload); err != nil {
			fmt.Println(err)
			return c.SendStatus(400)
		}

		db.Create(&payload)

		productFact := models.ProductFact{
			Product_id: payload.Product_id,
			Method:     "Creating Product",
		}

		db.Create(&productFact)

		return c.SendStatus(200)
	})

	//CREATE A REVIEW
	app.Post("/api/create/review", func(c *fiber.Ctx) error {
		db := database.Connect()
		payload := models.Review{}

		if err := c.BodyParser(&payload); err != nil {
			fmt.Println(err)
			return c.SendStatus(400)
		}

		db.Create(&payload)

		productFact := models.ProductFact{
			Product_id: payload.Product_id,
			Review_id:  payload.Review_id,
			Method:     "Creating Review",
		}

		db.Create(&productFact)

		return c.SendStatus(200)
	})

	//CREATE A USER
	app.Post("/api/create/user", func(c *fiber.Ctx) error {
		db := database.Connect()
		payload := models.User{}

		if err := c.BodyParser(&payload); err != nil {
			fmt.Println(err)
			return c.SendStatus(400)
		}

		db.Create(&payload)

		productFact := models.ProductFact{
			Method: "Creating User",
		}

		db.Create(&productFact)

		return c.SendStatus(200)
	})

	// LOGIN USER
	app.Post("/api/login/", func(c *fiber.Ctx) error {
		db := database.Connect()

		var users []models.User

		payload := struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}{}

		if err := c.BodyParser(&payload); err != nil {
			return err
		}

		fmt.Println(payload.Email)

		db.Find(&users, "password = ?", payload.Password)

		return c.JSON(users)
	})

	//DELETE A PRODUCT
	app.Delete("/api/delete/product/:id", func(c *fiber.Ctx) error {
		db := database.Connect()
		payload := models.Product{}
		db.Where("product_id = ?", c.Params("id")).Delete(&payload)

		prod_id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return err
		}

		productFact := models.ProductFact{
			Product_id: prod_id,
			Method:     "Deleting Product",
		}

		db.Create(&productFact)
		return c.SendStatus(200)
	})

	//DELETE A REVIEW
	app.Delete("/api/delete/review/:id", func(c *fiber.Ctx) error {
		db := database.Connect()
		payload := models.Review{}
		db.Where("review_id = ?", c.Params("id")).Delete(&payload)

		review_id, err := strconv.Atoi(c.Params("id"))

		if err != nil {
			return err
		}

		productFact := models.ProductFact{
			Product_id: review_id,
			Method:     "Deleting Review",
		}

		db.Create(&productFact)

		return c.SendStatus(200)
	})

	//UPDATE A PRODUCT
	app.Put("/api/update/product/:id", func(c *fiber.Ctx) error {
		db := database.Connect()

		payload := models.Product{}

		if err := c.BodyParser(&payload); err != nil {
			return err
		}

		product_id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return err
		}

		productFact := models.ProductFact{
			Product_id: product_id,
			Method:     "Updating Product",
		}

		db.Create(&productFact)

		db.Model(models.Product{}).Where("product_id = ?", c.Params("id")).Update("name", payload.Name)
		return c.SendStatus(200)
	})

	//UPDATE A REVIEW
	app.Put("/api/update/review/:id", func(c *fiber.Ctx) error {
		db := database.Connect()

		payload := models.Review{}

		if err := c.BodyParser(&payload); err != nil {
			return err
		}

		review_id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return err
		}

		productFact := models.ProductFact{
			Product_id: review_id,
			Method:     "Updating Review",
		}

		db.Create(&productFact)

		db.Model(models.Review{}).Where("review_id = ?", c.Params("id")).Update("reviews", payload.Reviews).Update("rating", payload.Rating)
		return c.SendStatus(200)
	})

	//UTILITY ROUTES
	app.Get("/api/lastrecord/:table", func(c *fiber.Ctx) error {
		db := database.Connect()

		switch c.Params("table") {
		case "products":
			var prodId struct {
				Product_id int `json:"product_id"`
			}
			db.Table("products").Last(&prodId)
			return c.JSON(prodId)

		case "purchases":
			var purchaseId struct {
				Purchase_id int `json:"purchase_id"`
			}
			db.Table("purchases").Last(&purchaseId)
			return c.JSON(purchaseId)

		case "reviews":
			var reviewId struct {
				Review_id int `json:"review_id"`
			}
			db.Table("reviews").Last(&reviewId)
			return c.JSON(reviewId)

		default:
			return c.SendStatus(200)
		}
	})
}
