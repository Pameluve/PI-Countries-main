import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/home.jsx';
import LandingPage from './components/landingPage.jsx';


function App() {
  return (
    <div className="App">
      <h1>Henry Countries</h1>
      <Switch>
        <Route exact path ="/" component = {LandingPage}/>
        <Route exact path = "/home" component = {Home}/>
      </Switch>
    </div>
  );
}

export default App;
