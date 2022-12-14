import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import "./RegisterScreen.css"

const RegisterScreen = ({history}) => {
    const navigate = useNavigate()
    const [username,setUsername]=useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword]=useState("")
    const [confirmpassword,setConfirmpassword]=useState("")
    const [error,setError]=useState("");
 
    useEffect(()=>{
        if(localStorage.getItem("authToken")) {
            navigate('/')
         }})

    const registerHandler =async (e) =>{
        e.preventDefault();

        const config = {
            header : {
                "Content-Type": "application/json"
            }
        }
        if(password !== confirmpassword){
            setPassword("");
            setConfirmpassword("");
            setTimeout(()=>{
                setError("")
            },5000 );
        return setError("Passwords de not match")
        }
try {
    const { data } = await axios.post("http://localhost:3700/api/auth/register",{username,email,password},config);
    localStorage.setItem("authToken",data.token)
    navigate('/login')
} catch (error) {
    setError(error.response.data.error)
    setTimeout(()=>{
        setError("")
    },5000)
}
    }



    return (
 <div className='register-screen'>
    <form onSubmit={registerHandler} className='register-screen__form'>
        <h3 className='register-screen-title'>Register</h3>
        {error && <span className='error-message'>{error}</span>}
        <div className='form-group'>
        <label htmlFor='name'>Username:</label>
        <input type="text" required id="name" placeholder='Enter username' value={username} 
         onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className='form-group'>
        <label htmlFor='name'>Email:</label>
        <input type="email" required id="email" placeholder='Enter email' value={email} 
         onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div className='form-group'>
        <label htmlFor='password'>password:</label>
        <input type="password" required id="password" placeholder='Enter password' value={password} 
         onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <div className='form-group'>
        <label htmlFor='confirmpassword'>Confirm password:</label>
        <input type="password" required id="consirmpassword" placeholder='Confirm password' value={confirmpassword} 
         onChange={(e) => setConfirmpassword(e.target.value)}/>
        </div>
        <button type='submit' className='btn btn-primary'>
            Register
        </button>
        <span className='register-screen__subtext'>
            Already have an accuont ? <Link to="/login">Login</Link>
        </span>
    </form>
</div>
      )

}

export default RegisterScreen