import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constant/constant";

const Navbar = ({ nav, eventhandler }) => {
  let { pathname } = useLocation();
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

  const [listToko, setListToko] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/store`)
      .then((res) => setListToko(res.data))
      .catch((err) => console.log(err));
  }, []);

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
            onClick={() => eventhandler("dorayaki")}
            style={
              pathname.includes("dorayaki") ? NavbarActiveStyle : NavbarStyle
            }
            className={"onHover"}
          >
            Daftar Dorayaki
          </div>
        </Link>
        <Link to="/toko" style={{ textDecoration: "none", color: "white" }}>
          <div
            onClick={() => eventhandler("toko")}
            style={pathname === "/toko" ? NavbarActiveStyle : NavbarStyle}
            className={"onHover"}
          >
            Daftar Toko
          </div>
        </Link>
        <hr style={{ width: "80%", border: "1px solid white" }} />
        <div style={{ overflowY: "auto", height: "calc(100vh - 300px)" }}>
          {listToko &&
            listToko.map((toko) => {
              return (
                <Link
                  to={`/toko/${toko._id}`}
                  style={{ textDecoration: "none", color: "white" }}
                  key={toko._id}
                >
                  <div
                    onClick={() => eventhandler(`/toko/${toko._id}`)}
                    style={
                      pathname.includes(`/toko/${toko._id}`)
                        ? NavbarActiveStyle
                        : NavbarStyle
                    }
                    className={"onHover"}
                  >
                    {toko.storename}
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
