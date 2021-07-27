import React, { useState, useEffect } from "react";
import VarianDorayaki from "./Card/VarianDorayaki";
import FormVarian from "./Form/FormVarian";
import BaseModal from "./Modal/BaseModal";

import axios from "axios";

const Dorayaki = () => {
  const [varianList, setVarianList] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [submit, setSubmit] = useState(0);
  const closeModal = () => {
    setOpen(false);
  };

  const getData = () => {
    axios
      .get("http://localhost:5000/varian")
      .then((res) => setVarianList(res.data))
      .catch((err) => console.log(err));
  };
  const submitForm = (data) => {
    setSubmit(submit + 1);
    closeModal();
  };

  useEffect(() => {
    getData();
  }, [submit]);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const [mobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!varianList) return <div>Loading . . .</div>;

  return (
    <div style={{ margin: "60px 80px 0 80px", height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: mobile ? "column" : "row",
          alignItems: "center",
        }}
      >
        <h1>Daftar Dorayaki</h1>
        <button
          style={{ height: "50px", margin: "10px" }}
          onClick={() => setOpen(true)}
        >
          + Tambah varian
        </button>
      </div>
      <input
        type="text"
        placeholder={"Cari dorayaki"}
        onChange={(e) => handleChange(e)}
      />
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
        {varianList
          .filter((varian) =>
            varian.varianname.toLowerCase().includes(search.toLowerCase())
          )
          .map((varian) => {
            return <VarianDorayaki varian={varian} key={varian._id} />;
          })}
      </div>
      {open && (
        <BaseModal closeModal={closeModal}>
          <FormVarian eventhandler={submitForm} />
        </BaseModal>
      )}
    </div>
  );
};

export default Dorayaki;
