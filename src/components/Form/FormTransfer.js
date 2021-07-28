import React, { useState, useEffect } from "react";

import axios from "axios";
import { API_URL } from "../../constant/constant";
import swal from "sweetalert";

const FormTransfer = ({ eventhandler, varian, currentToko, currentVarian }) => {
  const [toko, setToko] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/store/`)
      .then((res) => setToko(res.data))
      .catch((err) => console.log(err));
  }, []);
  const handleInput = (e, input) => {
    const { value } = e.target;
    if (input === "desc") {
      // setVarian({ ...varian, variandescription: value });
    } else if (input === "name") {
      // setVarian({ ...varian, varianname: value });
    }
  };

  return (
    <div>
      <label htmlFor="varianId">Pilih Toko Asal</label>
      <select
        id="selectedVarian"
        // onChange={(e) => setNewStock({ ...newStock, varianId: e.target.value })}
      >
        <option value="" disabled selected>
          Pilih Toko Asal
        </option>
        {toko &&
          toko.map((item) => {
            return (
              <option value={item._id} key={item.storename}>
                {item.storename}
              </option>
            );
          })}
      </select>
      <br />
      <br />
      <label htmlFor="varianId">Pilih Toko Tujuan</label>
      <select
        id="selectedVarian"
        // onChange={(e) => setNewStock({ ...newStock, varianId: e.target.value })}
      >
        <option value="" disabled selected>
          Pilih Toko Tujuan
        </option>
        {toko &&
          toko.map((item) => {
            return (
              <option value={item._id} key={item.storename}>
                {item.storename}
              </option>
            );
          })}
      </select>
      <br />
      <br />
      <label htmlFor="varianId">Pilih Varian</label>
      <select
        id="selectedVarian"
        // onChange={(e) => setNewStock({ ...newStock, varianId: e.target.value })}
      >
        <option value="" disabled selected>
          Pilih varian
        </option>
        {varian &&
          varian.map((item) => {
            return (
              <option value={item._id} key={item.varianname}>
                {item.varianname}
              </option>
            );
          })}
      </select>
      <br />
      <br />
      <label htmlFor="count">Jumlah</label>
      <input
        type="number"
        id="count"
        name="count"
        placeholder={"0"}
        // value={stock.desc}
        // onChange={(e) => setNewStock({ ...newStock, count: e.target.value })}
      />
      <br />
      <br />
      <button
        // onClick={() => submitAction()}
        style={{ height: "30px", margin: "auto" }}
      >
        Transfer Stock
      </button>
    </div>
  );
};

export default FormTransfer;
