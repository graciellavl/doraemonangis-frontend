import React from "react";
import { Link } from "react-router-dom";

const CardToko = ({toko}) => {
  return (
    <div
      style={{
        position: "relative",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "20px",
        border: "1px solid rgba(0, 0, 0, 0.25)",
        padding: "20px",
        width: "320px",
        height: "200px",
        margin: "20px 0",
        display: "flex",
      }}
    >
      <img
        src={`http://localhost:5000/${toko.storeimage}`}
        alt={""}
        width={"150px"}
        height={"100%"}
      />
      <div style={{ marginLeft: "15px" }}>
        <h2 style={{ marginBottom: "10px" }}>{toko.storename}</h2>
        <p>{toko.street}</p>
        <p>{toko.kecamatan}</p>
        <p>{toko.provinsi}</p>
      </div>
      <Link
        to={`toko/${"dorayaki"}`}
        style={{ color: "#333333", textDecoration: "none" }}
      >
        <div style={{ position: "absolute", bottom: "15px", right: "15px" }}>
          Lihat Toko
        </div>
      </Link>
    </div>
  );
};

export default CardToko;
