import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import '../styles/purchases.css'


const Purchases = () => {
    let [purchases, setPurchases] = useState([])

    const fetchPurchases = async () => {
        const res = await axios.get("http://localhost:5000/api/purchases")
        const purchaseList = []

        for (let x = 0; x <= 49; x++) {
            purchaseList.push(res.data[x])
        }
        setPurchases(purchaseList)
    }

    useEffect(() => {
        fetchPurchases()
    }, [])

    return (
        <>
            <Navbar />
            <div className='purchases'>
                {purchases ?
                    purchases.map(purchase => {
                        return (
                            <div className='purchase'>
                                <h5>Purchase ID: {purchase.purchase_id}</h5>
                                <h4>Product ID: {purchase.product_id}</h4>
                                <h3>Purchase Date: {purchase.date}</h3>
                            </div>
                        )
                    })
                    : undefined}
            </div>
        </>
    )
}

export default Purchases
