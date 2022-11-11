import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
//Route
// import PrivateRoute from './components/routing/PrivateRoute';
//screen
import PrivateScreen from './components/screens/PrivateScreen'
import LoginScreen from './components/screens/LoginScreen'
import RegisterScreen from './components/screens/RegisterScreen'
import ForgotpasswordScreen from './components/screens/forgotPasswordScreen'
import ResetpasswordScreen from './components/screens/resetpasswordScreen'

const App=()=>{
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route exact path='/' element={<PrivateScreen />}/>
        <Route path='/login'  element={<LoginScreen />}/>
        <Route path='/register' element={<RegisterScreen />}/>
        <Route path='/forgotpassword' element={<ForgotpasswordScreen />}/>
        <Route path='passwordresset/:resetToken' element={<ResetpasswordScreen />}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
