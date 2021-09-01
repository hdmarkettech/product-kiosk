import React from 'react';
import './App.scss';
import DefaultBody from "./components/defaultBody";
import Paths from "./components/paths/paths"
import { BrowserRouter as Router, Route } from "react-router-dom";
import Benefits from "./components/benefits"
import Photos from "./components/photos/photos";
import ProductCategory from "./components/product-category/product-category";
import Product from "./components/products/products"
function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={DefaultBody}/>
        <Route path={["/benefits", '/photos', '/products']} exact render={(props) => <Paths {...props} />}/>
        <Route path={["/benefits/:benefit"]} render={(props) => <Benefits key={props.location.key} {...props} />}/>
        <Route exact path={["/products/:category"]} render={(props) => <ProductCategory {...props} />}/>
        <Route path={["/products/:category/:product"]} render={(props) => <Product {...props} />}/>
        <Route path={["/photos/:id"]} component={Photos}/>
      </Router>
    </div>
  );
}
export default App;
