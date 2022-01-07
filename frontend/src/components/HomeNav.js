import React, { useState, useRef } from 'react'
import '../styles/homeNav.css'
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';


function Navbar() {
    let navElements = useRef()
    let navBar = useRef()

    const handleClick = () => {
        navElements.current.classList.toggle('active')
        navBar.current.classList.toggle('active')
    }

    return (
        <nav className='homeNav'>
            {/* Logo */}
            {/* <img src={Logo} alt="Amazon Logo" className="logo" /> */}
            {/* Hamburger */}
            <button className="homeHamburger" onClick={handleClick}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            {/* Elements */}
            <div className="home-nav-elements" ref={navElements}>
                <a href="/" ><span></span> <HomeIcon /> Home</a>
                <a href="/reviews" ><span></span> <RateReviewIcon /> Reviews</a>
                <a href="/purchases" ><span></span> <PaidIcon />Purchases</a>
                <a href="/create" ><span></span>  <AddCircleOutlineIcon /> Create </a>
                <a href="/search" ><span></span>  <SearchIcon /> Search </a>
                <a href="/login" id="logButton"><span></span> Login </a>
            </div>
        </nav>
    )
}

export default Navbar
