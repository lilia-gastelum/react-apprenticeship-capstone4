import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import SearchResults from "./pages/SearchResults";
import { TermContextProvider } from "./utils/contexts/TermContext";
import { CartContextProvider } from "./utils/contexts/CartContext";
import ShoppingCart from "./pages/ShoppingCart";
import Checkout from "./pages/Checkout";
function App() {
  return (
    <BrowserRouter>
      <CartContextProvider>
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
              <Route exact path="/cart">
                <ShoppingCart />
              </Route>
              <Route exact path="/checkout">
                <Checkout />
              </Route>
              <Redirect from="**" to={"/home"} />
            </Switch>
          </Layout>
        </TermContextProvider>
      </CartContextProvider>
    </BrowserRouter>
  );
}

export default App;
