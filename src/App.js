import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
function App() {


  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Redirect from='**' to={"/home"}/>
        </Switch>
      </Layout>
  </BrowserRouter>
  );
}

export default App;
