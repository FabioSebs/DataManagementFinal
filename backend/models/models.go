package models

type Table struct {
	ASIN   string `json:"asin"`
	Name   string `json:"name"`
	Date   string `json:"date"`
	Rating uint   `json:"rating"`
	Review string `json:"review"`
}
