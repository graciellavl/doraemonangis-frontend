import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { API_URL } from "../../constant/constant";

const CardToko = ({ toko }) => {
  const deleteConfirmation = (id) => {
    swal({
      title: "Apakah kamu yakin?",
      text: "Kamu tidak dapat mengembalikan toko yang sudah dihapus!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteStore(id);
      } else {
        swal("Toko tidak jadi dihapus");
      }
    });
  };

  const deleteStore = (id) => {
    axios
      .delete(`${API_URL}/store/${id}`)
      .then(function (response) {
        swal("Sukses", "Toko berhasil dihapus!", "success");
      })
      .catch(function (error) {
        console.log(error);
      });
    window.location.reload();
  };

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
        src={`${API_URL}/${toko.storeimage}`}
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

      <div
        style={{
          position: "absolute",
          bottom: "15px",
          right: "15px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          onClick={() => deleteConfirmation(toko._id)}
          style={{ marginRight: "20px" }}
          className={"onHover"}
        >
          Hapus
        </div>
        <div>
          <Link
            to={`toko/${toko._id}`}
            style={{ color: "#333333", textDecoration: "none" }}
          >
            Lihat Toko
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardToko;
