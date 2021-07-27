import React, { useState } from "react";

import axios from "axios";
import { API_URL } from "../../constant/constant";
import swal from "sweetalert";

const FormVarian = ({ currentVarian, eventhandler }) => {
  const [varian, setVarian] = useState(
    currentVarian
      ? currentVarian
      : { varianname: "", variandescription: "", varianimage: "" }
  );

  const handleInput = (e, input) => {
    const { value } = e.target;
    if (input === "desc") {
      setVarian({ ...varian, variandescription: value });
    } else if (input === "name") {
      setVarian({ ...varian, varianname: value });
    }
  };

  const handleAttachment = (e) => {
    let attachment = e.target.files[0];
    setVarian({ ...varian, varianimage: attachment });
  };

  const submitAction = () => {
    if (
      varian.varianname.length < 3 ||
      varian.variandescription.length < 3 ||
      varian.varianimage === ""
    ) {
      swal(
        "Informasi tidak valid!",
        "Mohon cek kembali nama varian, deskripsi dan gambar varian",
        "error"
      );
    } else {
      var data = new FormData();
      data.append("varianname", varian.varianname);
      data.append("variandescription", varian.variandescription);
      data.append("varianimage", varian.varianimage);
      data.append("isvarianactive", "true");

      var config = {
        method: "post",
        url: `${API_URL}/varian/add`,
        headers: {
          Authorization: "0f526bf84bfcf6bcf7e27dd64d923396679731d2",
        },
        data: data,
      };

      console.log(...data);

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          eventhandler();
          swal("Success", "Varian berhasil ditambahkan!", "success");
        })
        .catch(function (error) {
          console.log(error);
          swal("Terjadi kesalahan", "Mohon kirim ulang data varian", "error");
        });
    }
  };

  return (
    <div>
      <label htmlFor="namaVarian">Nama Varian</label>
      <input
        type="text"
        id="namaVarian"
        name="namaVarian"
        value={varian.name}
        placeholder={"Varian Baru"}
        onChange={(e) => handleInput(e, "name")}
      />
      <br />
      <br />
      <label htmlFor="descVarian">Deskripsi</label>
      <input
        type="text"
        id="descVarian"
        name="descVarian"
        placeholder={"Penjelasan Varian"}
        value={varian.desc}
        onChange={(e) => handleInput(e, "desc")}
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

      <button
        onClick={() => submitAction()}
        style={{ height: "30px", margin: "auto" }}
      >
        Tambah Varian
      </button>
    </div>
  );
};

export default FormVarian;
