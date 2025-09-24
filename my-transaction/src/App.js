import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavbarComp } from "./component";
import Home from "./pages/Home";
import Sukses from "./pages/Sukses";
import RekapData from "./pages/RekapData";

function App() {
  return (
    <BrowserRouter>
      <NavbarComp />
      <main>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/sukses" component={Sukses} exact />
          <Route path="/rekap" component={RekapData} exact /> {/* 🔑 route baru */}
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
