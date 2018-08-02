import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import "../js/fontawesome-all.js";
import "../css/list.css";
import "../css/product.css";
import Header from "./search";
import shipping from "../img/ic_shipping.png";
import { Breadcrumb } from "./breadcrumb";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      filters: [],
      ready: false
    };
  }

  async getItems(props) {
    const listId = props.match.params.id;
    const api = await fetch("http://localhost:3001/api/items?q=" + listId);
    const json = await api.json();

    this.setState({
      results: json.items,
      filters: json.filters.length > 0 ? json.filters[0].values[0].name : [],
      ready: true
    });
  }

  async componentDidMount() {
    this.getItems(this.props);
  }

  async componentWillReceiveProps(props) {
    this.setState({
      ready: false
    });
    this.getItems(props);
  }

  render() {
    return (
      <div>
        <Header />
        <Breadcrumb filters={this.state.filters} />
        <ReactPlaceholder
          className="placeholder producto-container parpadea text"
          type="media"
          rows={10}
          ready={this.state.ready}
        >
          <div className="list-container">
            {this.state.results.map((result, i) => {
              const url = `/list/product/${result.id}`;
              return (
                <Link className="link-product" key={i} to={url}>
                  <div className="list-product-container">
                    <div className="list-image-data-container">
                      <div className="list-image-container">
                        <img className="list-product" src={result.picture} />
                      </div>
                      <div className="list-data-container">
                        <div className="price-shipping-container">
                          <div className="list-price">
                            <span>{result.price.currency}</span>
                            <span>{result.price.amount}</span>
                            <span className="list-price-decimals">
                              {result.price.decimals}
                            </span>
                          </div>
                          {result.free_shipping == true && (
                            <img className="shipping" src={shipping} />
                          )}
                        </div>
                        <p className="list-name">{result.title}</p>
                      </div>
                    </div>
                    <div className="list-city-container">
                      <p>{result.address}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </ReactPlaceholder>
      </div>
    );
  }
}

export default List;
