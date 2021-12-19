import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import "../styles/search.css"

const Search = () => {
    let [product, setProduct] = useState([])
    let [review, setReview] = useState([])
    let [purchase, setPurchase] = useState([])
    let [id, setID] = useState(undefined)

    const fetchProduct = async () => {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`)
        setReview([])
        setPurchase([])
        setProduct(res.data)
        console.log(product)
    }
    const fetchReview = async () => {
        const res = await axios.get(`http://localhost:5000/api/reviews/${id}`)
        setPurchase([])
        setProduct([])
        setReview(res.data)
    }
    const fetchPurchase = async () => {
        const res = await axios.get(`http://localhost:5000/api/purchases/${id}`)
        setReview([])
        setProduct([])
        setPurchase(res.data)
    }

    return (
        <>
            <Navbar />
            <div className='searchContainer'>
                <form className='searchForm'>
                    <label> Search By Product ID</label>
                    <input type="text" onChange={(e) => { setID(e.currentTarget.value) }} />
                    <button type='button' onClick={fetchProduct}> Search</button>
                    <label> Search By Review ID </label>
                    <input type="text" onChange={(e) => { setID(e.currentTarget.value) }} />
                    <button type='button' onClick={fetchReview}> Search</button>
                    <label> Search By Purchase ID </label>
                    <input type="text" onChange={(e) => { setID(e.currentTarget.value) }} />
                    <button type='button' onClick={fetchPurchase}> Search</button>
                </form>
            </div>
            <div className='searchResults'>
                {product ? product.map(product => {
                    return (
                        <div className='cell'>
                            <h3> Product Name: {product.name} </h3>
                            <h6> Product ASIN: {product.asin} </h6>
                        </div>
                    )
                })
                    : undefined}
                {review ? review.map(review => {
                    return (
                        <div className='cell'>
                            <h6> Product ID: {review.product_id} </h6>
                            <h5> Rating: {review.rating} </h5>
                            <h4> Review: {review.review} </h4>
                        </div>
                    )
                })
                    : undefined}
                {purchase ? purchase.map(purchase => {
                    return (
                        <div className='cell'>
                            <h3> Product ID : {purchase.product_id} </h3>
                            <h6> Purchase Date : {purchase.date} </h6>
                        </div>
                    )
                })
                    : undefined}
            </div>
        </>
    )
}

export default Search
