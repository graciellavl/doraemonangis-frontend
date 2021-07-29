import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import BaseModal from "./Modal/BaseModal";
import FormStock from "./Form/FormStock";
import FormTransfer from "./Form/FormTransfer";

const DetailToko = () => {
  let { id } = useParams();
  const [detail, setDetail] = useState();
  const [stock, setStock] = useState();
  const [varian, setVarian] = useState();
  const [submit, setSubmit] = useState(0);

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

  const submitForm = (data) => {
    setSubmit(submit + 1);
    closeModal();
  };

  useEffect(() => {
    setDetail(null);
    setStock(null);
    getData(id);
  }, [submit, id]);

  const getData = (id) => {
    axios
      .get(`http://localhost:5000/store/${id}`)
      .then((res) => setDetail(res.data))
      .catch((err) => console.log(err));
    axios
      .get(`http://localhost:5000/stock/details/${id}`)
      .then((res) => setStock(res.data[0]))
      .catch((err) => console.log(err));
    axios
      .get(`http://localhost:5000/varian`)
      .then((res) => setVarian(res.data))
      .catch((err) => console.log(err));
  };

  const getName = (id) => {
    for (var i = 0; i < varian.length; i++) {
      if (id === varian[i]._id) return varian[i].varianname;
    }
  };

  const getDesc = (id) => {
    for (var i = 0; i < varian.length; i++) {
      if (id === varian[i]._id) return varian[i].variandescription;
    }
  };

  const [mobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!detail || !varian) return <div>Loading . . .</div>;
  return (
    <div style={{ margin: "60px 80px 0px", height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: mobile ? "column" : "row",
          alignItems: "center",
        }}
      >
        <div>
          <h1>{detail.storename}</h1>
          <div>
            <h2>
              Jalan:{" "}
              <span style={{ fontWeight: "normal" }}>{detail.street}</span>
            </h2>
            <h2>
              Kecamatan:{" "}
              <span style={{ fontWeight: "normal" }}>{detail.kecamatan}</span>
            </h2>
            <h2>
              Provinsi:{" "}
              <span style={{ fontWeight: "normal" }}>{detail.provinsi}</span>
            </h2>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <button
              style={{
                height: "50px",
                margin: "10px",
              }}
              className={"onHover"}
              onClick={() => setOpenTransfer(true)}
            >
              Transfer Stok
            </button>
          </div>
          <div>
            <button
              style={{
                height: "50px",
                margin: "10px",
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
      {!stock && <div style={{ textAlign: "center" }}>Belum ada Stock</div>}
      {stock && (
        <table
          style={{
            height: "60%",
            overflowY: "scroll",
            width: "100%",
          }}
        >
          <thead style={{ background: "#1AAAFF", color: "white" }}>
            <th style={{ width: "20%" }}>Varian</th>
            <th style={{ width: "60%" }}>Deskripsi</th>
            <th style={{ width: "20%" }}>Stok</th>
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
      )}
      {openTransfer && (
        <BaseModal closeModal={closeModal}>
          <FormTransfer
            eventhandler={submitForm}
            varian={varian}
            currentToko={detail}
            currentVarian={stock}
          />
        </BaseModal>
      )}
      {openTambahStok && (
        <BaseModal closeModal={closeModal}>
          <FormStock
            eventhandler={submitForm}
            varian={varian}
            storeId={detail._id}
            currentVarian={stock}
          />
        </BaseModal>
      )}
    </div>
  );
};

export default DetailToko;
