import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Home from "./components/Home";
import Dorayaki from "./components/Dorayaki";
import Toko from "./components/Toko";
import DetailToko from "./components/DetailToko";

function App() {
  const [current, setCurrent] = useState("Home");

  const changeNavbar = (current) => {
    setCurrent(current);
  };

  return (
    <Router>
      <Navbar nav={current} eventhandler={changeNavbar} />
      <div
        style={{
          marginLeft: "300px",
          height: "100%",
          width: "calc(100% - 300px)",
        }}
      >
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dorayaki" exact component={Dorayaki} />
          <Route path="/toko" exact component={Toko} />
          <Route path="/toko/:id" exact component={DetailToko} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
