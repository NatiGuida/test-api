import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/search";
import Breadcrumb from "./components/breadcrumb";
import List from "./components/list";
import Product from "./components/product";
import NoMatch from "./components/nomatch";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Header} />
            <Route exact path="/list/:id" component={List} />
            <Route path="/list/product/:id" component={Product} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
