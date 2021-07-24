import React, { useState } from "react";
import CardToko from "./Card/CardToko";
import BaseModal from "./Modal/BaseModal";

const Toko = () => {
  const [openToko, setOpenToko] = useState(false);
  const [openTransfer, setOpenTransfer] = useState(false);
  const closeModal = () => {
    setOpenToko(false);
    setOpenTransfer(false);
  };
  return (
    <div style={{ margin: "60px 80px 0 80px", height: "100%" }}>
      <div style={{ position: "relative" }}>
        <h1>Daftar Toko</h1>
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "20%",
            height: "100%",
            display: "flex",
          }}
        >
          <button
            style={{
              height: "80%",
              marginRight: "20px",
            }}
            className={"onHover"}
            onClick={() => setOpenTransfer(true)}
          >
            Transfer Stok
          </button>
          <button
            style={{
              height: "80%",
            }}
            className={"onHover"}
            onClick={() => setOpenToko(true)}
          >
            + Tambah Toko
          </button>
        </div>
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
        <CardToko />
        <CardToko />
        <CardToko />
        <CardToko />
      </div>

      {openToko && (
        <BaseModal closeModal={closeModal}>
          toko
          {/* <FormVarian currentVarian={varian} /> */}
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
