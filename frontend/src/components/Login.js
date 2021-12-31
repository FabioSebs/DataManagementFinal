import React from 'react'
import Navbar from './Navbar'
import '../styles/login.css'
import Blob from '../images/BlobDesign.PNG'


const Login = () => {
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
                            <input className="formInput" id='emailInput'></input>
                        </div>
                        <div>
                            <label> Password </label>
                            <input className="formInput" id="passwordInput"></input>
                        </div>
                        <div>
                            <input type="checkbox"></input>
                            <label className='smallLabel'>Remember me?</label>
                            <label className='forgotPassword'> <a href="#" className='links' >Forgot Password?</a> </label>
                        </div>

                        <button>Login</button>

                        <h4>Not registered yet? <a className="links" href="/register">  Create an Account? </a></h4>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
