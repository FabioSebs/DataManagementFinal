import React, { useState } from 'react'
import HomeNav from './HomeNav'
import heroFood from '../images/heroFoodBG.PNG'
import '../styles/homeNew.css'
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
    const [showSearch, setShowSearch] = useState(true)

    const placeholder = () => {
        return (
            <div className='heroPlaceholder'>
                <SearchIcon />
                <p>search products</p>
            </div>
        )
    }

    const togglePlaceholder = () => {
        setShowSearch(!showSearch)
    }

    return (
        <>
            <HomeNav />
            <div className='heroGradient'>
                <div className='heroText'>
                    <p id='welcome'> WELCOME TO</p>
                    <p id='brand'> Radiant Reselling </p>
                    <p id='description'> Expanding your networking and product across the world. </p>


                    {showSearch && placeholder()}

                    <input type="text" className='heroSearch' onClick={togglePlaceholder} />

                    <div className='categories'>
                        <button className='groceryButton'> Groceries </button>
                        <button className='techButton'> Technology </button>
                        <button className='cosmeticButton'> Cosmetics </button>
                    </div>
                </div>
                <div className='heroImgContainer'>
                    <img src={heroFood} alt="hero" className='heroLogo' />
                </div>
            </div>
            <div className='aboutus'>
                <p>About Us</p>
            </div>
        </>
    )
}

export default Home
