import React, { Component } from "react";
import "../js/fontawesome-all.js";
import "../css/product.css";
import product3 from "../img/product-3.jpg";
import Header from "./search";
import { Breadcrumb } from "./breadcrumb";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      desc: {},
      filters: [],
      ready: false
    };
  }

  async componentDidMount() {
    const listId = `${this.props.match.params.id}`;
    let url = `http://localhost:3001/api/items/${listId}`;

    const responseJson = await fetch(url);
    const json = await responseJson.json();

    const responseDescr = await fetch(`${url}/description`);
    const descjson = await responseDescr.json();

    console.log(json);
    this.setState({
      item: json,
      filters: json.category_id,
      desc: descjson,
      ready: true
    });
  }

  render() {
    return (
      <div>
        <Header />
        <ReactPlaceholder
          className="placeholder producto-container parpadea text"
          type="media"
          rows={10}
          ready={this.state.ready}
        >
          <Breadcrumb filters={this.state.filters} />
          <div className="producto-container">
            <div className="product-image-container">
              {this.state.item.item && (
                <React.Fragment>
                  <img
                    className="list-product"
                    src={this.state.item.item.pictures[0].url}
                  />
                  <div className="product-data-container">
                    {this.state.item.item.condition == "new" && (
                      <p className="product-state">
                        Nuevo - {this.state.item.item.sold_quantity} vendidos
                      </p>
                    )}
                    {this.state.item.item.condition == "used" && (
                      <p className="product-state">
                        Usado - {this.state.item.item.sold_quantity} vendidos
                      </p>
                    )}
                    <p className="name">{this.state.item.title}</p>
                    <div className="price">
                      <span>{this.state.item.item.price.currency}</span>
                      <span>{this.state.item.item.price.amount}</span>
                      <span className="price-decimals">
                        {this.state.item.item.price.decimals}
                      </span>
                    </div>
                    <div className="product-buy-container">
                      <span className="product-buy">Comprar</span>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>

            <div className="description-container">
              <h2>Descripción del producto</h2>
              <span className="description">{this.state.desc.plain_text}</span>
            </div>
          </div>
        </ReactPlaceholder>
      </div>
    );
  }
}

export default Product;
