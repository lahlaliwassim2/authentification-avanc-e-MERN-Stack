import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const PrivateScreen = () => {
    const navigate = useNavigate()
    const [error,setError]=useState("")
    const [privateData,setPrivateData]=useState("")
    const [role,setRole]=useState("")

    useEffect(()=>{
        if(localStorage.getItem("user")==="ADMIN") {
            setRole("ADMIN")
            
        }else if(localStorage.getItem("user")==="LIVREUR"){
            setRole("LIVREUR")
        }else{
            setRole("CLIENT")
        }
        const fetchPrivateData = async () =>{
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }
            try {
                const {data}=await axios.get("http://localhost:3700/api/private",config);
                setPrivateData(data.data)
                console.log(data);
            } catch (error) {
                localStorage.removeItem("authToken")
                setError("you are not athorized please login")
            }
        }
        fetchPrivateData()
    })

    const logoutHandler = ()=>{
        localStorage.removeItem("authToken")
       navigate('/login')
    }
    
  return (
    <>
  { error ? <spane className="error-message" >{error}</spane> : <>
    
    <div style={{background: "green", color: "white"}}>{privateData} and  {role} pages</div>
    <button onClick={logoutHandler}>Logout</button>
    
    </>
    }
   </>
  )
}

export default PrivateScreen