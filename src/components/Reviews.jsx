import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "../styles/reviews.css"
import Navbar from './Navbar'

function Reviews() {
    let [reviews, setReviews] = useState([])

    const fetchReviews = async () => {
        try {
            const reviewsList = []
            const res = await axios.get("http://localhost:5000/api/everything")
            for (let x = 0; x <= 50; x++) {
                reviewsList.push(res.data[x])
            }
            setReviews(reviewsList)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchReviews()
    }, [])

    return (
        <>
            <Navbar />
            <div className='Reviews'>
                {reviews ? reviews.map(review => {
                    return (
                        <div className='review'>
                            <h3 className='title'> Product: {review.name} </h3>
                            <h5 className='reviewText'> Review: {review.review}</h5>
                            <h5 className='rating'>Rating: {review.rating}</h5>
                        </div>
                    )
                }) : undefined
                }
            </div>
        </>
    )
}

export default Reviews
