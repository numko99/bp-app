import "./App.css";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import Home from "./pages/Home";
import CustomHome from "./pages/CustomHome";
import Services from "./pages/Services";
import ErorPage from "./pages/ErorPage";
import EditService from "./component/DataTable/Forms/EditService/EditService";
import Layout from "./layouts/Layout";
import { ServiceProvider } from "./store/Services/ServicesContext2";
import { ServiceCategoryProvider } from "./store/Services/ServiceCategoryContext";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <div className="App">
          <ServiceProvider>
            <ServiceCategoryProvider>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/Custom" exact component={CustomHome} />
                <Route path="/services" exact component={Services} />
                <Route path={"/EditService/:id"} exact  component={EditService}/>
                <Route path="/404" exact component={ErorPage} />
                <Redirect to="/404" />
              </Switch>
            </ServiceCategoryProvider>
          </ServiceProvider>
        </div>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
