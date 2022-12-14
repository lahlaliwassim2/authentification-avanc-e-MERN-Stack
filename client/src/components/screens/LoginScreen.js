import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import "./LoginScreen.css"

const LoginScreen = () => {
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState("");

    useEffect(()=>{
        if(localStorage.getItem("authToken")) {
            navigate('/addlivreur')
         }})


    const loginHandler =async (e) =>{
        e.preventDefault();

        const config = {
            header : {
                "Content-Type": "application/json"
            }
        }
try {
    const { data } = await axios.post("http://localhost:3700/api/auth/login",{email,password},config);
    localStorage.setItem("authToken", data.token)
    localStorage.setItem("user", data.role)

    navigate('/addlivreur')
} catch (error) {
    setError(error.response?.data?.error)
    setTimeout(()=>{
        setError("")
    },5000)
}
    }



    return (
 <div className='login-screen'>
    <form onSubmit={loginHandler} className='login-screen__form'>
        <h3 className='login-screen-title'>login</h3>
        { error && <span className='error-message'>{error}</span>}
       
        <div className='form-group'>

        <label htmlFor='name'>Email:</label>
        <input type="email" required id="email" placeholder='Enter email' value={email} 
         onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div className='form-group'>
        <label htmlFor='password'>password:</label>
        <Link to="/forgotpassword" className="login-screen__forgotpassword">
        Forgot Password?
            </Link>
        <input type="password" required id="password" placeholder='Enter password' value={password} 
         onChange={(e) => setPassword(e.target.value)}/>
        </div>

      
        <button type='submit' className='btn btn-primary'>
            login
        </button>
        <span className='login-screen__subtext'>
             don't have an accuont ? <Link to="/register">Register</Link>
        </span>
    </form>
</div>
      )

}

export default LoginScreen