import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
//Route
// import PrivateRoute from './components/routing/PrivateRoute';
//screen
import PrivateRoute from "./components/routing/PrivateRoute";
//Route admin

import AdminScreen from './components/screens/admin/adminScreen/AdminScreen'

import PrivateScreen from './components/screens/PrivateScreen'
import LoginScreen from './components/screens/LoginScreen'
import RegisterScreen from './components/screens/RegisterScreen'
import ForgotpasswordScreen from './components/screens/forgotPasswordScreen'
import ResetpasswordScreen from './components/screens/resetpasswordScreen'
import NotFoundScreen from './components/screens/NotFoundScreen'




const App=()=>{
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route exact path='/' element={
        <PrivateRoute>
          <PrivateScreen />
          {/* <h1>Hello</h1> */}
        </PrivateRoute>
       }/>
       <Route path='/addlivreur'  element={<AdminScreen />}/>
        <Route path='/login'  element={<LoginScreen />}/>
        <Route path='/register' element={<RegisterScreen />}/>
        <Route path='/forgotpassword' element={<ForgotpasswordScreen />}/>
        <Route path='passwordreset/:resetToken' element={<ResetpasswordScreen />}/>
        <Route path='*'  element={<NotFoundScreen />}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
