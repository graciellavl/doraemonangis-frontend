import React, { useState } from "react";

import axios from "axios";
import { API_URL } from "../../constant/constant";
import swal from "sweetalert";

const FormToko = ({ currentToko, eventhandler }) => {
  const [toko, setToko] = useState(
    currentToko
      ? currentToko
      : {
          storename: "",
          street: "",
          kecamatan: "",
          provinsi: "",
          storeimage: "",
        }
  );

  const handleInput = (e, input) => {
    const { value } = e.target;
    if (input === "storename") {
      setToko({ ...toko, storename: value });
    } else if (input === "street") {
      setToko({ ...toko, street: value });
    } else if (input === "kecamatan") {
      setToko({ ...toko, kecamatan: value });
    } else if (input === "provinsi") {
      setToko({ ...toko, provinsi: value });
    }
  };

  const handleAttachment = (e) => {
    let attachment = e.target.files[0];
    setToko({ ...toko, storeimage: attachment });
  };

  const submitAction = () => {
    if (
      toko.storename.length < 3 ||
      toko.street.length < 3 ||
      toko.kecamatan.length < 3 ||
      toko.provinsi.length < 3 ||
      toko.storeimage === ""
    ) {
      swal(
        "Informasi tidak valid!",
        "Mohon cek kembali informasi yang diinput",
        "error"
      );
    } else {
      var data = new FormData();
      data.append("storename", toko.storename);
      data.append("street", toko.street);
      data.append("kecamatan", toko.kecamatan);
      data.append("provinsi", toko.provinsi);
      data.append("storeimage", toko.storeimage);

      var config = {
        method: "post",
        url: `${API_URL}/store/add`,
        headers: {
          Authorization: "0f526bf84bfcf6bcf7e27dd64d923396679731d2",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          eventhandler();
          swal("Success", "Toko berhasil ditambahkan!", "success");
        })
        .catch(function (error) {
          console.log(error);
          swal("Terjadi kesalahan", "Mohon kirim ulang data toko", "error");
        });
    }
  };

  return (
    <div>
      <label htmlFor="storename">Nama Toko</label>
      <input
        type="text"
        id="storename"
        name="storename"
        value={toko.storename}
        placeholder={"Toko Baru"}
        onChange={(e) => handleInput(e, "storename")}
      />

      <br />
      <br />
      <label htmlFor="street">Jalan</label>
      <input
        type="text"
        id="street"
        name="street"
        placeholder={"Jalan Baru"}
        value={toko.street}
        onChange={(e) => handleInput(e, "street")}
      />

      <br />
      <br />
      <label htmlFor="kecamatan">Kecamatan</label>
      <input
        type="text"
        id="kecamatan"
        name="kecamatan"
        placeholder={"Kecamatan Baru"}
        value={toko.kecamatan}
        onChange={(e) => handleInput(e, "kecamatan")}
      />

      <br />
      <br />
      <label htmlFor="provinsi">Provinsi</label>
      <input
        type="text"
        id="provinsi"
        name="provinsi"
        value={toko.provinsi}
        placeholder={"Provinsi Baru"}
        onChange={(e) => handleInput(e, "provinsi")}
      />

      <br />
      <br />
      <label htmlFor="image">Image</label>
      <input
        type="file"
        name="image"
        accept=".png, .jpg, .jpeg"
        onChange={(e) => handleAttachment(e)}
      />
      <br />
      <br />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={() => submitAction()}
          style={{ height: "30px", margin: "auto" }}
        >
          Tambah Toko
        </button>
      </div>
    </div>
  );
};

export default FormToko;
