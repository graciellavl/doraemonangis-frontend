import React, { useState, useEffect } from "react";
import VarianDorayaki from "./Card/VarianDorayaki";
import FormVarian from "./Form/FormVarian";
import BaseModal from "./Modal/BaseModal";

import axios from "axios";

const Dorayaki = () => {
  const [varianList, setVarianList] = useState([]);
  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/varian")
      .then((res) => setVarianList(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ margin: "60px 80px 0 80px", height: "100%" }}>
      <div style={{ position: "relative" }}>
        <h1>Daftar Dorayaki</h1>
        <button
          style={{ position: "absolute", right: "0", top: "0", height: "50px" }}
          onClick={() => setOpen(true)}
        >
          + Tambah varian
        </button>
      </div>
      <input type="text" placeholder={"Cari dorayaki"} />
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          overflowY: "auto",
          height: "60vh",
        }}
      >
        {varianList.map((varian) => {
          return <VarianDorayaki varian={varian} key={varian._id} />;
        })}
      </div>
      {open && (
        <BaseModal closeModal={closeModal}>
          <FormVarian />
        </BaseModal>
      )}
    </div>
  );
};

export default Dorayaki;
