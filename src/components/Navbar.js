import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ nav, eventhandler }) => {
  const NavbarStyle = {
    margin: "0px 30px",
    padding: "10px 20px",
    fontWeight: 600,
  };
  const NavbarActiveStyle = {
    margin: "0px 30px",
    padding: "10px 20px",
    fontWeight: 600,
    backgroundColor: "#0097F0",
  };

  return (
    <div
      style={{
        width: "300px",
        backgroundColor: "#1AAAFF",
        height: "100%",
        position: "fixed",
        top: "0px",
        bottom: "0px",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
        }}
      >
        <h1
          style={{
            textDecoration: "none",
            color: "white",
            textAlign: "center",
            margin: "20px",
            fontSize: "48px",
            marginTop: "60px",
          }}
          className={"onHover"}
          onClick={() => eventhandler("Home")}
        >
          Stand With Dorayaki
        </h1>
      </Link>
      <div style={{ color: "white", margin: "10px", overflowY: "auto" }}>
        <Link to="/dorayaki" style={{ textDecoration: "none", color: "white" }}>
          <div
            onClick={() => eventhandler("Dorayaki")}
            style={nav.includes("Dorayaki") ? NavbarActiveStyle : NavbarStyle}
            className={"onHover"}
          >
            Daftar Dorayaki
          </div>
        </Link>
        <Link to="/toko" style={{ textDecoration: "none", color: "white" }}>
          <div
            onClick={() => eventhandler("Toko")}
            style={nav.includes("Toko") ? NavbarActiveStyle : NavbarStyle}
            className={"onHover"}
          >
            Daftar Toko
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;