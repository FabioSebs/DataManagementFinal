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

type User struct {
	User_id    int    `json:"user_id"`
	First_Name string `json:"first_name"`
	Last_Name  string `json:"last_name"`
	Email      string `json:"email"`
	Password   string `json:"password"`
}

type ProductFact struct {
	Product_id  int    `json:"product_id"`
	Purchase_id int    `json:"purchase_id"`
	Review_id   int    `json:"review_id"`
	Method      string `json:"method"`
}
