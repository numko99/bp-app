import './App.css';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import Home from './pages/Home';
import ErorPage from './pages/ErorPage';
import EditService from './component/DataTable/Forms/EditService/EditService';
function App(props) {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path={'/EditService/:id'} exact component={EditService} />
          <Route path='/404' exact component={ErorPage} />
          <Redirect to='/404' />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
