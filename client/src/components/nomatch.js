import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import "../js/fontawesome-all.js";
import "../css/nomatch.css";
import "../css/product.css";
import Header from "./search";
import errorimg from "../img/errorimg.png";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

class NoMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    };
  }

  async componentDidMount() {
    this.setState({
      ready: true
    });
  }

  render() {
    const url = `/`;
    return (
      <div>
        <Header />
        <ReactPlaceholder
          className="placeholder producto-container parpadea text"
          type="media"
          rows={10}
          ready={this.state.ready}
        >
          <div className="nomatch-container">
            <img alt="errorimg" src={errorimg} />
            <h4>Parece que esta página no existe</h4>
            <Link className="home-link" to={url}>
              Ir a la página principal
            </Link>
          </div>
        </ReactPlaceholder>
      </div>
    );
  }
}

export default NoMatch;
