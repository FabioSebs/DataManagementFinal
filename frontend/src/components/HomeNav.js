import React, { useState, useRef, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import '../styles/homeNav.css'
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';


function Navbar() {
    const [cookies, setCookie] = useCookies(['user']);
    const [username, setUsername] = useState('')
    let navElements = useRef()
    let navBar = useRef()

    const handleClick = () => {
        navElements.current.classList.toggle('active')
        navBar.current.classList.toggle('active')
    }

    useEffect(() => {
        setUsername(cookies.Name)
    }, [])

    return (
        <>
            {username && <div className='navUser'><AccountCircleIcon className='navUserIcon' /> <h4 className='navUserText'>{username}</h4></div>}
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
                    {/* <a href="/search" ><span></span>  <SearchIcon /> Search </a> */}
                    <a href="/login" id="logButton"><span></span> Login </a>
                </div>
            </nav>
        </>
    )
}

export default Navbar
