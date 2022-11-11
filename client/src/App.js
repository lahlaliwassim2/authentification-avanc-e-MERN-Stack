import {BroserRouter as Router,Switch,Route} from 'react-router-dom'

const App=()=>{
  return (
    <Router>
    <div className="App">
      <Switch>

    <Route  exact path='/login' component={LoginScreen}/>
    <Route  exact path='/register' component={registerScreen}/>
    <Route  exact path='/forgotpassword' component={forgotpasswordScreen}/>
    <Route  exact path='passwordresset/:resetToken' component={resetpasswordScreen}/>

      </Switch>
     React app 
    </div>
    </Router>
  );
}

export default App;
