package dataset

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/go-gota/gota/dataframe"
	"github.com/rocketlaunchr/dataframe-go/exports"
	"github.com/rocketlaunchr/dataframe-go/imports"
)

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

	//FILL NULL IDXS WITH 0
	for _, v := range idxs {
		df.UpdateRow(v, nil, map[string]interface{}{
			"review": "No Review",
		})
	}

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
