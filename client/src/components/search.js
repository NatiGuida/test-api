import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import "../js/fontawesome-all.js";
import "../css/search.css";
import logo from "../img/logo.png";

class Header extends Component {
  constructor(props) {
    // El constructor es una funcion que se ejecuta inmediatamente despues de instanciar una clase
    super(props);
    this.state = {
      inputValue: "",
      redirectToReferrer: false //para que no entre en el if desde el principio, el if es quien redirecciona
    };
  }

  componentDidUpdate() {
    // Al actualizarse el componente ejecuta esta funcion
    if (this.state.redirectToReferrer) {
      // Si el estado redirectToReferrer esta en true
      this.setState({
        redirectToReferrer: false // Lo pongo en false
      });
    }
  }

  handleChange(e) {
    const value = e.target.value; //me devuelve el valor del input
    this.setState({
      //actualiza el estado
      inputValue: value
    });
  }

  handleKeyPress(e) {
    if (e.key == "Enter") {
      this.setState({
        redirectToReferrer: true
      });
    }
  }

  render() {
    const match = this.props.match;
    const redirect = "/list/" + this.state.inputValue;
    if (this.state.redirectToReferrer) {
      return <Redirect push to={redirect} />;
    }
    return (
      <header>
        <div className="search-container">
          <Link to={"/"} className="logo-name">
            <img className="logo" src={logo} />
            <span>Buscalandolo</span>
          </Link>
          <div className="search-input-container">
            <input
              onChange={this.handleChange.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
              className="search-input"
              type="text"
              placeholder="Busca siempre"
              value={this.state.inputValue}
            />
            <Link to={redirect}>
              <button className="search-button">
                <i className="fas fa-search" />
              </button>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
