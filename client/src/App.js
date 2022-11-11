import {BroserRouter as Router,Switch,Route} from 'react-router-dom'
//Route
import PrivateRoute from './components/routing/PrivateRoute';
//screen
import PrivateScreen from './components/screens/PrivateScreen'
import LoginScreen from './components/screens/LoginScreen'
import RegisterScreen from './components/screens/RegisterScreen'
import ForgotpasswordScreen from './components/screens/forgotpasswordScreen'
import ResetpasswordScreen from './components/screens/resetpasswordScreen'

const App=()=>{
  return (
    <Router>
    <div className="App">
      <Switch>
    < exact path='/' component={PrivateScreen}/>
    <Route  exact path='/login' component={LoginScreen}/>
    <Route  exact path='/register' component={RegisterScreen}/>
    <Route  exact path='/forgotpassword' component={ForgotpasswordScreen}/>
    <Route  exact path='passwordresset/:resetToken' component={ResetpasswordScreen}/>

      </Switch>
     React app 
    </div>
    </Router>
  );
}

export default App;
