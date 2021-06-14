import './App.css';
import { BrowserRouter, Switch, Link, Redirect, Route } from 'react-router-dom'
import Home from './pages/Home';
import ErorPage from './pages/ErorPage';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/404' exact component={ErorPage} />
          <Redirect to='/404' />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
