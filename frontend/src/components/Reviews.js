import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "../styles/reviews.css"
import reviewBG from '../images/ReviewsBG.PNG'
import Navbar from './HomeNav'
import Footer from './Footer'

function Reviews() {
    let [reviews, setReviews] = useState([])
    let [prodID, setProdID] = useState('')
    let [rating, setRating] = useState('')
    let [review, setReview] = useState('')

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

    const fetchRating = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`http://localhost:5000/api/reviews/${prodID}`)
            setRating(res.data[0].rating)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchReview = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`http://localhost:5000/api/reviews/${prodID}`)
            setReview(res.data[0].review)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchReviews()
    }, [])

    return (
        <>
            <Navbar />

            <div className='reviewsBG' >
                <h1 className='topProducts'>Top Products</h1>
                <img src={reviewBG} />
            </div>

            <form className='ratingForm'>
                <label>Product ID:
                    <input className="prodInput" id='ratingTest' type="text" placeholder='Product ID' onChange={e => setProdID(e.currentTarget.value)} />
                </label>
                <label>Rating:
                    <input className='ratingInput' type="text" placeholder={rating ? rating : 'Rating'} />
                </label>
                <button className='searchButton' id="ratingTestButton" onClick={e => fetchRating(e)}> Search </button>
            </form>

            <div className='titleReviews'>
                <h1>Product Reviews</h1>
            </div>

            <div className='reviewFormContainer'>
                <form className='reviewForm'>
                    <label>Product ID:
                        <input className="prodInput" id='reviewTest' type="text" placeholder='Product ID' onChange={e => setProdID(e.currentTarget.value)} />
                    </label>

                    <label>Review:
                        <textarea className='ratingInput' type="text" placeholder={review ? review : ''}></textarea>
                    </label>
                    <div>
                        <button className='searchButton' id="reviewTestButton" onClick={e => fetchReview(e)}> Search </button>
                    </div>

                </form>
            </div>

            <div className='listReviews'>
                <h1>Product List</h1>
            </div>

            <div className='Reviews'>
                <table className='reviewTable'>
                    <tr className='reviewColumns'>
                        <th>Product</th>
                        <th>Review</th>
                        <th>Rating</th>
                    </tr>

                    {reviews ? reviews.map(review => {
                        return (
                            <tr className='reviewRecord'>
                                <td> {review.name} </td>
                                <td>{review.review} </td>
                                <td>{review.rating} </td>
                            </tr>
                        )
                    }) : undefined
                    }
                </table>
            </div>
            <Footer />
        </>
    )
}

export default Reviews
