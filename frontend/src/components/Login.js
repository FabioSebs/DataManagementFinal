import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import Navbar from './Navbar'
import '../styles/login.css'
import axios from 'axios'
import Blob from '../images/BlobDesign.PNG'
import { comparePassword } from "./PasswordHash"

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)
    const [check, setCheck] = useState(false)
    const [cookies, setCookie] = useCookies(['user']);

    let navigate = useNavigate()

    const getUser = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/user/${email}`)
            console.log(email)
            console.log(res)
            return res.data[0]

        } catch (error) {
            console.log(error)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const hash = await getUser()
        console.log(hash.password, password)
        const checking = comparePassword(password, hash.password)
        console.log(checking)
        if (checking) {
            try {
                const res = await axios.post('http://localhost:5000/api/login', {
                    email: email,
                    password: hash.password
                })
                console.log(res)
                if (res.data[0].password === password) {
                    setLoggedIn(true)
                    console.log(loggedIn)
                }

                //SET COOKIE
                setCookie('Name', await hash.first_name, { path: '/' })

                navigate('/')
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <Navbar />
            <div className='loginContainer'>

                <img src={Blob} alt='Blob BG' />
                <div className='loginFormContainer'>
                    <form>

                        <h2 className='loginTitle'> Login </h2>
                        <div>
                            <label> Email </label>
                            <input className="formInput" id='emailInput' onChange={e => setEmail(e.currentTarget.value)}></input>
                        </div>
                        <div>
                            <label> Password </label>
                            <input type="password" className="formInput" id="passwordInput" onChange={e => setPassword(e.currentTarget.value)}></input>
                        </div>
                        <div>
                            <input type="checkbox"></input>
                            <label className='smallLabel'>Remember me?</label>
                            <label className='forgotPassword'> <a href="#" className='links' >Forgot Password?</a> </label>
                        </div>

                        <button onClick={e => handleLogin(e)}>Login</button>

                        <h4>Not registered yet? <a className="links" href="/register">  Create an Account? </a></h4>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
