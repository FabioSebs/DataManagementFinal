package dataset

import (
	"context"
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/go-gota/gota/dataframe"
	df "github.com/rocketlaunchr/dataframe-go"
	"github.com/rocketlaunchr/dataframe-go/exports"
	"github.com/rocketlaunchr/dataframe-go/imports"
)

// TABLE STRUCTS

type Products struct {
	product_id int
	asin       interface{}
	name       interface{}
}

type Reviews struct {
	review_id  int
	product_id int
	rating     int
	review     string
}

type Purchase struct {
	purchase_id int
	product_id  int
	date        string
}

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

	for i, v := range nullCheck {
		if v {
			idxs = append(idxs, i)
		}
	}

	//FILL NULL IDXS WITH "No Review"
	for _, v := range idxs {
		df.UpdateRow(v, nil, map[string]interface{}{
			"review": "No Review",
		})
	}

	//GETTING NORMALIZED DATAFRAMES
	normalizeProducts(df)
	normalizeReviews(df)
	normalizePurchase(df)

	//WRITING TO A CSV FILE
	myFile, err := os.Create("./dataset/cleaned.csv")
	if err != nil {
		log.Fatal(err)
	}
	err2 := exports.ExportToCSV(ctx, myFile, df)
	if err2 != nil {
		log.Fatal(err)
	}
}

func getNullIndexes(col string) []bool {
	f, err := os.Open("./dataset/products.csv")
	if err != nil {
		log.Fatal(err)
	}
	df := dataframe.ReadCSV(f)
	ds := df.Col(col)

	arrBool := ds.IsNaN()

	return arrBool
}

// This function splits the dataframe into three seperate dataframes that normalizes the main dataframe
func normalizeProducts(dframe *df.DataFrame) {
	ctx := context.TODO()

	//ITERATING THROUGH MAIN DF
	iterator := dframe.ValuesIterator(df.ValuesOptions{0, 1, true}) // Don't apply read lock because we are write locking from outside.

	//INCREMENTING VARIABLE AND UNIQUE VALUES
	inc := 1
	id := []int{}
	uniqueASINS := []string{}
	uniqueNames := []string{}

	//ITERATING THORUGH MAIN DF
	dframe.Lock()
	for {
		unique := true
		//GETTING ROW AND VALUES
		row, vals, _ := iterator()
		if row == nil {
			break
		}

		//ADDING UNIQUE VALUES TO ARRAY/SLICE IF UNIQUE
		for _, val := range uniqueASINS {
			if vals[0] == val {
				unique = false
			}
		}

		asin := vals[0]
		asinStr := fmt.Sprintf("%v", asin)

		names := vals[1]
		namesStr := fmt.Sprintf("%v", names)

		if unique {
			uniqueASINS = append(uniqueASINS, asinStr)
			uniqueNames = append(uniqueNames, namesStr)
			id = append(id, inc)
			inc++
		}
	}
	dframe.Unlock()
	//SUCESS! WE HAVE UNIQUE ASINS & NAMES ! AKA UNIQUE NUMBER OF PRODUCTS

	//PRODUCT ID COLUMN!
	col1 := df.NewSeriesInt64("product_id", nil, 0)
	for _, val := range id {
		col1.Append(val)
	}
	col1.Remove(0)

	//ASIN COLUMN!
	col2 := df.NewSeriesString("asin", nil, "null")
	for _, val := range uniqueASINS {
		col2.Append(val)
	}
	col2.Remove(0)

	//NAMES COLUMN!
	col3 := df.NewSeriesString("names", nil, "null")
	for _, val := range uniqueNames {
		col3.Append(val)
	}
	col3.Remove(0)

	// PUTTING ALL COLUMNS TOGETHER INTO DATAFRAME
	df := df.NewDataFrame(col1, col2, col3)

	//WRITING TO A CSV FILE
	myFile, err := os.Create("./dataset/products_normalized.csv")
	if err != nil {
		log.Fatal(err)
	}
	err2 := exports.ExportToCSV(ctx, myFile, df)
	if err2 != nil {
		log.Fatal(err)
	}

}

func normalizeReviews(dframe *df.DataFrame) {
	ctx := context.TODO()

	//ITERATING THROUGH MAIN DF
	iterator := dframe.ValuesIterator(df.ValuesOptions{0, 1, true})

	//INCREMENTING VARIABLE AND UNIQUE VALUES
	inc := 1
	inc2 := 1
	id := []int{}
	asinList := []string{}
	prodIdList := []int{}
	ratingList := []int{}
	reviewsList := []string{}

	//ITERATING THROUGH MAIN DF
	dframe.Lock()
	for {
		//GETTING ROW AND VALUES
		row, vals, _ := iterator()
		if row == nil {
			break
		}

		//ASIN VALUE
		asin := vals[0]
		asinStr := fmt.Sprintf("%v", asin)

		//RATING VALUE
		rating := vals[3]
		ratingStr := fmt.Sprintf("%v", rating)
		ratingInt, _ := strconv.Atoi(ratingStr)

		//REVIEW VALUE
		reviews := vals[4]
		reviewsStr := fmt.Sprintf("%v", reviews)

		//ADDING TO SLICE
		ratingList = append(ratingList, ratingInt)
		reviewsList = append(reviewsList, reviewsStr)
		id = append(id, inc)

		//DUPLICATE CHECK
		if len(asinList) == 0 {
			asinList = append(asinList, asinStr)
			prodIdList = append(prodIdList, inc2)
		} else {
			if asinList[len(asinList)-1] == asinStr {
				prodIdList = append(prodIdList, inc2)
			} else {
				inc2++
				asinList = append(asinList, asinStr)
				prodIdList = append(prodIdList, inc2)
			}
		}
		inc++
	}
	dframe.Unlock()

	//REVIEW ID COLUMN!
	col1 := df.NewSeriesInt64("review_id", nil, 0)
	for _, val := range id {
		col1.Append(val)
	}
	col1.Remove(0)

	//PRODUCT ID COLUMN!
	col2 := df.NewSeriesInt64("product_id", nil, 0)
	for _, val := range prodIdList {
		col2.Append(val)
	}
	col2.Remove(0)

	//RATING COLUMN!
	col3 := df.NewSeriesString("rating", nil, "null")
	for _, val := range ratingList {
		col3.Append(val)
	}
	col3.Remove(0)

	//REVIEWS COLUMN!
	col4 := df.NewSeriesString("reviews", nil, "null")
	for _, val := range reviewsList {
		col4.Append(val)
	}
	col4.Remove(0)

	// PUTTING ALL COLUMNS TOGETHER INTO DATAFRAME
	df := df.NewDataFrame(col1, col2, col3, col4)

	//WRITING TO A CSV FILE
	myFile, err := os.Create("./dataset/reviews_normalized.csv")
	if err != nil {
		log.Fatal(err)
	}
	err2 := exports.ExportToCSV(ctx, myFile, df)
	if err2 != nil {
		log.Fatal(err)
	}
}

func normalizePurchase(dframe *df.DataFrame) {
	ctx := context.TODO()

	//ITERATING THROUGH MAIN DF
	iterator := dframe.ValuesIterator(df.ValuesOptions{0, 1, true})

	//INCREMENTING VARIABLE AND UNIQUE VALUES
	inc := 1
	inc2 := 1
	id := []int{}
	asinList := []string{}
	prodIdList := []int{}
	dateList := []string{}

	//ITERATING THROUGH MAIN DF
	dframe.Lock()
	for {
		//GETTING ROW AND VALUES
		row, vals, _ := iterator()
		if row == nil {
			break
		}

		//ASIN VALUE
		asin := vals[0]
		asinStr := fmt.Sprintf("%v", asin)

		//DATE VALUE
		date := vals[2]
		dateStr := fmt.Sprintf("%v", date)

		if len(asinList) == 0 {
			asinList = append(asinList, asinStr)
			prodIdList = append(prodIdList, inc2)
		} else {
			if asinList[len(asinList)-1] == asinStr {
				prodIdList = append(prodIdList, inc2)
			} else {
				inc2++
				asinList = append(asinList, asinStr)
				prodIdList = append(prodIdList, inc2)
			}
		}

		//ADDING TO SLICE
		dateList = append(dateList, dateStr)
		id = append(id, inc)

		//INCREMENTING ID
		inc++
	}
	dframe.Unlock()

	//PURCHASE ID COLUMN!
	col1 := df.NewSeriesInt64("purchase_id", nil, 0)
	for _, val := range id {
		col1.Append(val)
	}
	col1.Remove(0)

	//PRODUCT ID COLUMN!
	col2 := df.NewSeriesInt64("product_id", nil, 0)
	for _, val := range prodIdList {
		col2.Append(val)
	}
	col2.Remove(0)

	//DATE COLUMN!
	col3 := df.NewSeriesString("date", nil, "null")
	for _, val := range dateList {
		col3.Append(val)
	}
	col3.Remove(0)

	// PUTTING ALL COLUMNS TOGETHER INTO DATAFRAME
	df := df.NewDataFrame(col1, col2, col3)

	//WRITING TO A CSV FILE
	myFile, err := os.Create("./dataset/purchases_normalized.csv")
	if err != nil {
		log.Fatal(err)
	}
	err2 := exports.ExportToCSV(ctx, myFile, df)
	if err2 != nil {
		log.Fatal(err)
	}
}
