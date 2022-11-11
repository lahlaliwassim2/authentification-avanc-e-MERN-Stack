import {redirect , Route} from 'react-router-dom'
//Routing
const PrivateRoute = ({component: Component, ...rest}) => {
  return (
        <Route 
        {...rest}
        Render ={(props)=>
            localStorage.getItem("authToken") ? 
           ( <Component {...props} /> ) : (
            <redirect to="/login" />
            )
        }
        />
  )
}

export default PrivateRoute