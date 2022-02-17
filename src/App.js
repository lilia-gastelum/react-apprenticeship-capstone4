import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import SearchResults from "./pages/SearchResults";
import { TermContextProvider } from "./utils/contexts/TermContext";
function App() {
  return (
    <BrowserRouter>
      <TermContextProvider>
        <Layout>
          <Switch>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route path="/products">
              <ProductList />
            </Route>
            <Route path="/product">
              <ProductDetail />
            </Route>
            <Route path="/search">
              <SearchResults />
            </Route>
            <Redirect from="**" to={"/home"} />
          </Switch>
        </Layout>
      </TermContextProvider>
    </BrowserRouter>
  );
}

export default App;
