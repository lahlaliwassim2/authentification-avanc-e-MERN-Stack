import {useState} from 'react'
import axios from 'axios'
import {Link } from 'react-router-dom'
import './AdminScreen.css'

const AdminScreen = () =>{
  const [username,setUsername]=useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState("");
const AddLivreurHandler = async (e)=>{

  e.preventDefault()

  const config = {
    header : {
      "Content-Type": "application/json"
  }

  }
  try {
    const {data} = await axios.post("http://localhost:3700/api/addlivreur",{username,email,password},config)
    console.log(data)
  } catch (error) {
    setError(error.response.data.error)
    setTimeout(()=>{
        setError("")
    },5000)
}

}




  return (
    
<div className='register-screen'>
    <form onSubmit={AddLivreurHandler} className='register-screen__form'>
        <h3 className='register-screen-title'>add livreur</h3>
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


export default AdminScreen