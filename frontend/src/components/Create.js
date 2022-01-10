import React, { useState } from 'react'
import '../styles/create.css'
import axios from 'axios'
import Navbar from './HomeNav'
import Footer from './Footer'


const Create = () => {
    let [productID, setProductID] = useState(undefined)
    let [reviewID, setReviewID] = useState()
    let [asin, setAsin] = useState([])
    let [name, setName] = useState([])
    let [ratings, setRating] = useState(0)
    let [review, setReview] = useState("")
    let [created, setCreated] = useState(false)
    let [table, setTable] = useState("")

    const getLastRecord = async () => {
        try {
            if (table === "reviews") {
                const res = await axios.get(`http://localhost:5000/api/lastrecord/reviews`)
                return res.data.review_id
            } else {
                const res = await axios.get(`http://localhost:5000/api/lastrecord/products`)
                return res.data.product_id
            }
        }
        catch (e) {
            console.log(e)
        }

    }

    const createProduct = async () => {
        try {
            setTable("products")
            const prodId = await getLastRecord() + 1
            const res = await axios.post("http://localhost:5000/api/create/product", {
                product_id: prodId,
                asin: asin,
                name: name,
            })
            console.log(res)
            setCreated(true)
        } catch (e) {
            console.log(e)
        }

    }

    const createReview = async () => {

        try {
            setTable("reviews")
            const revId = await getLastRecord() + 1
            const res = await axios.post("http://localhost:5000/api/create/review", {
                review_id: revId,
                product_id: parseInt(productID),
                rating: ratings,
                review: review,
            })
            setCreated(true)

        } catch (e) {
            console.log(e)
        }

    }

    const updateProduct = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/api/update/product/${productID}`, {
                name: name
            })
            setCreated(true)
        } catch (error) {
            console.log(error)
        }
    }

    const updateReview = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/api/update/review/${reviewID}`, {
                rating: ratings,
                review: review
            })
            setCreated(true)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteProduct = async () => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/delete/review/${productID}`)
            console.log(res.status)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteReview = async () => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/delete/review/${reviewID}`)
            console.log(res.status)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Navbar />

            <div className='purchasesHero'>
                <h1>Radiant Reseller</h1>
                <h2>( Create Product )</h2>
            </div>

            <div className='createProductContainer'>
                <h1> Create a Product</h1>
                <form>
                    <div className='asin'>
                        <label> ASIN </label>
                        <input type="text" onChange={(e) => { setAsin(e.currentTarget.value) }} />
                    </div>
                    <div className='pname'>
                        <label> Product Name </label>
                        <input type="text" onChange={(e) => { setName(e.currentTarget.value) }} />
                    </div>
                </form>
                <button className='createButton' type="button" onClick={createProduct}>Create</button>
            </div>

            <div className='createReviewContainer'>
                <h1> Create a Review</h1>
                <form >
                    <div className='productID'>
                        <label> Product ID </label>
                        <input type="text" onChange={(e) => { setProductID(e.currentTarget.value) }} />
                    </div>

                    <div className='rating'>
                        <label> Rating </label>
                        <input type="number" min="0" max="5" onChange={(e) => { setRating(parseInt(e.currentTarget.value)) }} />
                    </div>

                    <div className='review'>
                        <label> Review </label>
                        <input type="text" onChange={(e) => { setReview(e.currentTarget.value) }} />
                    </div>
                </form>
                <button className='createButton' type="button" onClick={createReview}>Create</button>
                <h3 className='success'> {created ? "Successfully Created!" : undefined} </h3>
            </div>

            <div className='updateDeleteProductContainer'>
                <div className='updateProductContainer'>
                    <h1 className='updateProd'> Update a Product</h1>
                    <form className='createForm'>
                        <label> Product ID </label>
                        <input type="text" onChange={(e) => { setProductID(parseInt(e.currentTarget.value)) }} />
                        <label> Product Name </label>
                        <input type="text" onChange={(e) => { setName(e.currentTarget.value) }} />
                        <button className='createButton' type="button" onClick={updateProduct}>Update</button>
                    </form>
                </div>

                <div className='deleteProductContainer'>
                    <h1 className='updateReview'> Update a Review</h1>
                    <form className='createForm'>
                        <label> Review ID </label>
                        <input type="text" onChange={(e) => { setReviewID(parseInt(e.currentTarget.value)) }} />
                        <label> Rating </label>
                        <input type="text" onChange={(e) => { setRating(parseInt(e.currentTarget.value)) }} />
                        <label> Review </label>
                        <input type="text" onChange={(e) => { setReview(e.currentTarget.value) }} />
                        <button className='createButton' type="button" onClick={updateReview}>Update</button>
                    </form>
                </div>
            </div>
            <div className='updateDeleteReviewContainer'>
                <div className='updateReviewContainer'>
                    <h1 className='deleteProduct'> Delete a Product</h1>
                    <form className='createForm'>
                        <label> Product ID </label>
                        <input type="text" onChange={(e) => { setProductID(parseInt(e.currentTarget.value)) }} />
                        <button className='createButton' type="button" onClick={deleteProduct}>Delete</button>
                    </form>
                </div>

                <div className='deleteReviewContainer'>
                    <h1 className='deleteReview'> Delete a Review</h1>
                    <form className='createForm'>
                        <label> Review ID </label>
                        <input type="text" onChange={(e) => { setReviewID(parseInt(e.currentTarget.value)) }} />
                        <button className='createButton' type="button" onClick={deleteReview}>Delete</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Create
