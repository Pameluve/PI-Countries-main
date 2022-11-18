import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/home.jsx';
import LandingPage from './components/landingPage.jsx';
import CreateActivity from './components/createActivity';
import Activities from './components/activities';
import Detail from './components/detail';


function App() {
  return (
    <div className="App">
      <h1>Henry Countries</h1>
      <Switch>
        <Route exact path ="/" component = {LandingPage}/>
        <Route exact path = "/home" component = {Home}/>
        <Route exact path = "/createActivity" component = {CreateActivity}/>
        <Route exact path = "/activities" component = {Activities}/>
        <Route exact path = "/countries/:id" component={Detail}/>
      </Switch>
    </div>
  );
}

export default App;
