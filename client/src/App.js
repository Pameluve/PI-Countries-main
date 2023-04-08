import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/home.jsx';
import LandingPage from './components/landingPage.jsx';
import CreateActivity from './components/createActivity';
import Activities from './components/activities';
import Detail from './components/detail';
import UpdateActivity from './components/updateActivity';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path ="/" component = {LandingPage}/>
        <Route exact path = "/home" component = {Home}/>
        <Route exact path = "/createActivity" component = {CreateActivity}/>
        <Route exact path = "/activities" component = {Activities}/>
        <Route exact path = "/countries/:id" component={Detail}/>
        <Route exact path = "/activities/:id" component = {UpdateActivity}/>
      </Switch>
    </div>
  );
}

export default App;
