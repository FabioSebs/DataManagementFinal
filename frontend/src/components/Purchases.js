import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './HomeNav'
import '../styles/purchases.css'
import Footer from './Footer'
import SearchIcon from '@mui/icons-material/Search';

const Purchases = () => {
    let [purchases, setPurchases] = useState([])
    let [purchaseID, setPurchaseID] = useState('')
    let [singlePurchase, setSinglePurchase] = useState([])

    const fetchPurchases = async () => {
        const res = await axios.get("http://localhost:5000/api/purchases")
        const purchaseList = []


        for (let x = 0; x <= 49; x++) {
            purchaseList.push(res.data[x])
        }
        setPurchases(purchaseList)
    }

    const fetchPurchase = async () => {
        const res = await axios.get(`http://localhost:5000/api/purchases/${purchaseID}`)
        const single = []
        console.log(res)
        single.push(res.data[0])
        console.log(single)
        setSinglePurchase(single)
        console.log(singlePurchase.length)
    }

    useEffect(() => {
        fetchPurchases()
    }, [])

    return (
        <>
            <Navbar />

            <div className='purchasesHero'>
                <h1>Radiant Reseller</h1>
                <h2>( Purchase List )</h2>
            </div>

            <div className='tableSearch'>
                <label className='tableSearchLabel'>
                    Purchase ID
                    <input type="text" onChange={e => setPurchaseID(e.currentTarget.value)} />
                </label>
                <button onClick={e => fetchPurchase()}>
                    SHOW <SearchIcon />
                </button>
            </div>

            <hr></hr>

            <div className='oneResult'>
                <table>
                    <thead>
                        <tr>
                            <th>Purchase Date</th>
                            <th>Product ID</th>
                            <th>Purchase ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> {singlePurchase.length === 1 && singlePurchase[0].date} </td>
                            <td> {singlePurchase.length === 1 && singlePurchase[0].product_id}</td>
                            <td>{singlePurchase.length === 1 && singlePurchase[0].purchase_id}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='listReviews' id='customize'>
                <h1>Purchase List</h1>
            </div>

            <div className='purchases'>
                <table className='purchaseTable'>
                    <tr className='purchaseColumn'>
                        <th>Purchase Date</th>
                        <th>Product ID</th>
                        <th>Purchase ID</th>
                    </tr>

                    {purchases ?
                        purchases.map(purchase => {
                            return (
                                <tr className='purchaseRecord'>
                                    <td> {purchase.date} </td>
                                    <td> {purchase.product_id} </td>
                                    <td>{purchase.purchase_id}</td>
                                </tr>
                            )
                        }) : undefined}
                </table>
            </div>
            <Footer />
        </>
    )
}

export default Purchases
