import {useState,useEffect} from 'react'
import axios from 'axios'
// import {Link } from 'react-router-dom'
import './AdminScreen.css'
import { useNavigate } from 'react-router-dom'
const AdminScreen = () =>{
    const [username,setUsername]=useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState("");
    const [privateData,setPrivateData]=useState("")

    const navigate = useNavigate()
    useEffect(()=>{
      if(!localStorage.getItem("authToken")) {
          navigate('/login')
       }
      else if(localStorage.getItem("user")!=="ADMIN") {
        navigate('/')
     }else if(localStorage.getItem("user")==="ADMIN"){
      navigate('/addlivreur')
     }}, [])
const AddLivreurHandler = async (e)=>{

    e.preventDefault()

    const config = {
      headers : {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
        
    }

  }
  try {
    const {data} = await axios.post("http://localhost:3700/api/addlivreur",{username,email,password},config)
    setPrivateData(data.data)
    console.log(data);
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
            Add Livreur 
        </button>
       
    </form>
</div>
      )

}


export default AdminScreen