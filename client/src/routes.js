import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import AddImage from "./components/AddImage";
import Gallery from "./components/Gallery";
import NotFoundPage from "./components/NotFoundPage";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <div className="main-content">
        <Switch>
          <Route component={AddImage} path="/add" exact={true} />
          <Route component={Gallery} path="/" />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default AppRouter;
