import  {Route} from 'react-router-dom'
import { Navigate } from 'react-router-dom'
//Routing
const PrivateRoute = ({component: Component, ...rest}) => {
  return (
        <Route 
        {...rest}
        Render ={(props)=>
            localStorage.getItem("authToken") ? 
           ( <Component {...props} /> ) : ( 
            <Navigate to="/login" />
            )
        }
        />
  )
}

export default PrivateRoute