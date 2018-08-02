import React from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import "../css/breadcrumb.css";
import List from "./list";

export const Breadcrumb = ({ filters }) => (
  <div className="breadcrumb-container">
    <span>{filters}</span>
  </div>
);
