import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Reviews from './components/Reviews'

ReactDOM.render(
  <React.StrictMode>
    <h1>TEST</h1>
  </React.StrictMode>,
  document.getElementById("root")
);

{/* <Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/reviews" element={<Reviews />} />
    <Route path="/create" />
    <Route />
  </Routes>
</Router> */}