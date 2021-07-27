import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import BaseModal from "./Modal/BaseModal";

const DetailToko = () => {
  const [detail, setDetail] = useState();
  const [stock, setStock] = useState();
  const [varian, setVarian] = useState();
  let { id } = useParams();

  const [openTambahStok, setOpenTambahStok] = useState(false);
  const [openTransfer, setOpenTransfer] = useState(false);
  const closeModal = () => {
    setOpenTambahStok(false);
    setOpenTransfer(false);
  };
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/store/${id}`)
      .then((res) => setDetail(res.data))
      .catch((err) => console.log(err));
    axios
      .get(`http://localhost:5000/stock?storeId=${id}`)
      .then((res) => setStock(res.data[0]))
      .catch((err) => console.log(err));
    axios
      .get(`http://localhost:5000/varian`)
      .then((res) => setVarian(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const getName = (id) => {
    for (var i = 0; i < varian.length; i++) {
      console.log(varian[i]);
      if (id === varian[i]._id) return varian[i].varianname;
      else return "";
    }
  };

  const getDesc = (id) => {
    for (var i = 0; i < varian.length; i++) {
      if (id === varian[i]._id) return varian[i].variandescription;
      else return "";
    }
  };

  if (!detail || !stock || !varian) return <div>Loading . . .</div>;
  return (
    <div style={{ margin: "60px 80px 0px", height: "100%" }}>
      <div>
        <h1>{detail.storename}</h1>
        <div style={{ position: "relative" }}>
          <h2>
            Jalan: <span style={{ fontWeight: "normal" }}>{detail.street}</span>
          </h2>
          <h2>
            Kecamatan:{" "}
            <span style={{ fontWeight: "normal" }}>{detail.kecamatan}</span>
          </h2>
          <h2>
            Provinsi:{" "}
            <span style={{ fontWeight: "normal" }}>{detail.provinsi}</span>
          </h2>
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
                height: "60%",
                marginRight: "20px",
              }}
              className={"onHover"}
              onClick={() => setOpenTransfer(true)}
            >
              Transfer Stok
            </button>
            <button
              style={{
                height: "60%",
              }}
              className={"onHover"}
              onClick={() => setOpenTambahStok(true)}
            >
              + Tambah Stok
            </button>
          </div>
        </div>
      </div>
      <input
        type="text"
        placeholder={"Cari Stock"}
        style={{ margin: "30px auto" }}
        onChange={(e) => handleChange(e)}
      />
      <table
        style={{
          height: "60%",
          overflowY: "scroll",
          width: "100%",
        }}
      >
        <thead style={{ background: "#1AAAFF", color: "white" }}>
          <th>Varian</th>
          <th>Deskripsi</th>
          <th>Stok</th>
        </thead>
        <tbody>
          {stock.stock
            .filter((stock) =>
              getName(stock.varianId)
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((stock, index) => {
              return (
                <tr
                  style={{
                    background: index % 2 === 0 ? "#B9E5FF" : "",
                    textAlign: "center",
                  }}
                  key={stock._id}
                >
                  <td>{getName(stock.varianId)}</td>
                  <td>{getDesc(stock.varianId)}</td>
                  <td>{stock.count}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {openTransfer && (
        <BaseModal closeModal={closeModal}>
          transfer
          {/* <FormVarian currentVarian={varian} /> */}
        </BaseModal>
      )}
      {openTambahStok && (
        <BaseModal closeModal={closeModal}>
          transfer
          {/* <FormVarian currentVarian={varian} /> */}
        </BaseModal>
      )}
    </div>
  );
};

export default DetailToko;
