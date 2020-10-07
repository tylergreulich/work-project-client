import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import { Navigation } from "./components/Navigation";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </BrowserRouter>
  );
};