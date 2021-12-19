# Data Management Final Project

![Demo](https://media0.giphy.com/media/ckf5DOHu8j39oMD6FV/giphy.gif)

- Mock Amazon DB Management FullStack Website that follows MVC Model and extracts information from Relational Database.

- Frontend is done with popular ReactJS UI Library.

- Backend/API is done with GO's blazing fast web framework GoFiber

- RDMS is MySQL and is accessed by Go's ORM Library, GORM.

- Dataset can be found here: [Dataset](https://www.kaggle.com/nehaprabhavalkar/indian-products-on-amazon)

---

## Technologies Used

<div style="display:flex">
<img src="https://cdn0.iconfinder.com/data/icons/logos-brands-in-colors/128/react-256.png" width="50" height="50" style="display:inline">
<img src="https://img.icons8.com/color/2x/golang.png" width="50" height="50" style="display:inline"/> 
<img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/badge-html-5-256.png" width="50" height="50" style="display:inline"/>
<img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/badge-css-3-128.png" width="50" height="50" style="display:inline" />
<img src="https://cdn4.iconfinder.com/data/icons/logos-3/181/MySQL-256.png" width="50" height="50" style="display:inline"/>
</div>

## Database

The dataset first has to be cleaned so we implemented a cleaning function in dataset.go of the backend directory

```go
func CleanData() {
	ctx := context.TODO()
	// OPENING FILE TO CLEAN
	f, _ := os.Open("./dataset/products.csv")

	// GETTING CSV INTO DATAFRAME
	df, err := imports.LoadFromCSV(ctx, f)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(df.Names())

	//GETTING NULL INDEXES
	nullCheck := getNullIndexes("review")

	idxs := []int{}
    ...
    ...
    ...
```

Next once the data is clean we have to normalize this big dataset so we reduce redundancy in our tables and get faster reading and writing times for our database. For our implementation we manually made 3 functions to normalize our csv file into 3 seperate csv files.

1. cleaned.csv &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; _2783 Records_
2. products*normalized.csv &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \_145 Records*
3. reviews*normalized.csv &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \_2783 Records*
4. purchases*normalized.csv &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \_2783 Records*

```go
//GETTING NORMALIZED DATAFRAMES
	normalizeProducts(df)
	normalizeReviews(df)
	normalizePurchase(df)
```

The best part is that we reduced the number of records of products from 2783 to 145! Since we removed the dependency column of rating,review, and date we find that our database really only has 145 products to play with. Reading our database for a product just got incredibly faster :D!

### Putting Data into MYSQL

```sql
LOAD DATA INFILE "./cleaned.csv"
INTO TABLE main
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(ASIN, Name, Date, Rating, Review);

LOAD DATA INFILE "./products_normalized.csv.csv"
INTO TABLE products
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(ProductID, ASIN, Name);

LOAD DATA INFILE "./reviews_normalized.csv.csv"
INTO TABLE reviews
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(ReviewID, ProductID, Rating, Reviews);

LOAD DATA INFILE "./purchases_normalized.csv.csv"
INTO TABLE purchases
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(PurchaseID, ProductID, Date);
```

Now that we have a database with 4 tables (Main, Products, Reviews, Purchases) we can now start making our backend that will be able to interact with our database. By interact we mean we can retrieve data , we can also create data, and we can delete data. The next section will demonstrate the backend code and how it's used to interact with our tables. Additionaly here is our schema to further clarify.

![Schema](https://64.media.tumblr.com/5403b9d4ef4dc4845ee154e2171fba84/f683a1e8422dbcfe-d3/s1280x1920/fecbe661c8870e16cf1e952abd15e943a52b5149.png)

---

## Backend

Using Go as our backend language will boost the performance of our Application compared to JavaScript or Python because it is statically typed and compiled so it will naturally out perform an interpreted langauge like the the ones mentioned previously.

We use two curicial packages from the Go ecosystem to have our backend working and that is _GoFiber_ and _GORM_. GoFiber will allow us to have endpoints that our front end can make HTTP requests to and recieve a response! Also to have our controller logic to be exexcuted so the backend can read/write to the Database. That is when GORM comes in. GORM is an Object Relational Model that maps functions of the package to SQL Queries so it abstracts all of the SQL code away from the backend. To explain more lets show off the structure of our backend.

### Connecting to Database

Connecting to our Database is done using GORM as they have a driver for mysql and connects us to our database using a DSN.

```go
// CONNECTION
func Connect() *gorm.DB {
	dsn := "root:@tcp(localhost:3306)/amazon_products"

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("could not connect to database")
	}
	DB = db
	// connection.AutoMigrate(&models.Table{})
	return DB
}

```

### Models

We make models with the same exact column names as our tables in MySQL. We also give them struct tags so GoFiber can send responses and parse them to be sent as valid JSON. This is needed for our frontend so we can access the data and display it to the website.

```go
package models

type Main struct {
	ASIN   string `json:"asin"`
	Name   string `json:"name"`
	Date   string `json:"date"`
	Rating int    `json:"rating"`
	Review string `json:"review"`
}
type Product struct {
	Product_id int    `json:"product_id"`
	ASIN       string `json:"asin"`
	Name       string `json:"name"`
}

type Review struct {
	Review_id  int    `json:"review_id"`
	Product_id int    `json:"product_id"`
	Rating     int    `json:"rating"`
	Reviews    string `json:"review"`
}

type Purchase struct {
	Purchase_id int    `json:"purchase_id"`
	Product_id  int    `json:"product_id"`
	Date        string `json:"date"`
}

```

### Routes

These are our Routes otherwise known as endpoints. Every single Route has its own unique purpose and is known as controller logic to be ran when the View (Website) makes a request to the Backend. We have commented at the top of every Route it's purpose to help digest the code.

```go
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

	//CREATE A PRODUCT
	app.Post("/api/create/product", func(c *fiber.Ctx) error {
		db := database.Connect()
		payload := models.Product{}

		if err := c.BodyParser(&payload); err != nil {
			fmt.Println(err)
			return c.SendStatus(400)
		}

		db.Create(&payload)

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
```

### Main Function

```go
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
```

---

## Frontend

The Frontend has all been done in ReactJS and is making requests to our backend using AXIOS as it's HTTP client.

---
