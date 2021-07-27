import React, { useState, useEffect } from "react";
import CardToko from "./Card/CardToko";
import BaseModal from "./Modal/BaseModal";

import axios from "axios";
import FormToko from "./Form/FormToko";

const Toko = () => {
  const [listToko, setListToko] = useState([]);
  const [openToko, setOpenToko] = useState(false);
  const [openTransfer, setOpenTransfer] = useState(false);
  const closeModal = () => {
    setOpenToko(false);
    setOpenTransfer(false);
  };
  const [search, setSearch] = useState("");
  const [submit, setSubmit] = useState(0);

  const getData = () => {
    axios
      .get("http://localhost:5000/store")
      .then((res) => setListToko(res.data))
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

  if (!listToko) return <div>Loading . . .</div>;

  return (
    <div style={{ margin: "60px 80px 0 80px", height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: mobile ? "column" : "row",
        }}
      >
        <h1>Daftar Toko</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: mobile ? "column" : "row",
          }}
        >
          <div style={{ margin: "10px" }}>
            <button
              style={{ height: "50px" }}
              className={"onHover"}
              onClick={() => setOpenTransfer(true)}
            >
              Transfer Stok
            </button>
          </div>
          <div style={{ margin: "10px" }}>
            <button
              style={{ height: "50px" }}
              className={"onHover"}
              onClick={() => setOpenToko(true)}
            >
              + Tambah Toko
            </button>
          </div>
        </div>
      </div>
      <input
        type="text"
        placeholder={"Cari toko (Nama/ Kecamatan/ Jalan/ Provinsi)"}
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
        {listToko
          .filter(
            (toko) =>
              toko.storename.toLowerCase().includes(search.toLowerCase()) ||
              toko.kecamatan.toLowerCase().includes(search.toLowerCase()) ||
              toko.street.toLowerCase().includes(search.toLowerCase()) ||
              toko.provinsi.toLowerCase().includes(search.toLowerCase())
          )
          .map((toko) => {
            return <CardToko toko={toko} key={toko._id} />;
          })}
      </div>

      {openToko && (
        <BaseModal closeModal={closeModal}>
          <FormToko eventhandler={submitForm} />
        </BaseModal>
      )}

      {openTransfer && (
        <BaseModal closeModal={closeModal}>
          transfer
          {/* <FormVarian currentVarian={varian} /> */}
        </BaseModal>
      )}
    </div>
  );
};

export default Toko;
