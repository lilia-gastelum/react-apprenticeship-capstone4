import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
function App() {


  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/product-list">
            <ProductList />
          </Route>
          <Redirect from='**' to={"/home"}/>
        </Switch>
      </Layout>
  </BrowserRouter>
  );
}

export default App;
