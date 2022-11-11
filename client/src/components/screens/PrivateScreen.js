import {useState,useEffect} from 'react'
import axios from 'axios'
const PrivateScreen = ({history}) => {
    const [error,setError]=useState("")
    const [privateData,setPrivateData]=useState("")

    useEffect(()=>{
        if(!localStorage.getItem("authToken")) {
            history.push('/login')
        }
        const fetchPrivateData = async () =>{
            const config = {
                Headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }
            try {
                const {data}=await axios.get("/api/private",config);
                setPrivateData(data.data)
            } catch (error) {
                localStorage.removeItem("authToken")
                setError("you are not athorized please login")
            }
        }
        fetchPrivateData()
    },[history])

    const logoutHandler = ()=>{
        localStorage.removeItem("authToken")
        history.push('/login')
    }
    
  return (
   error ? <spane className="error-message" >{error}</spane> : <>
    <div style={{background: "green", color: "white "}}>{privateData}</div>*
    <button onClick={logoutHandler}>Logout</button>
   </>
  )
}

export default PrivateScreen