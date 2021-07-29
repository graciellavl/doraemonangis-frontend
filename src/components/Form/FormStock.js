import React, { useState } from "react";

import axios from "axios";
import { API_URL } from "../../constant/constant";
import swal from "sweetalert";

const FormStock = ({ currentVarian, eventhandler, varian, storeId }) => {
  const [stock, setStock] = useState(
    currentVarian
      ? { storeId: currentVarian.storeId, stock: currentVarian.stock }
      : { storeId: storeId, stock: [] }
  );

  const [newStock, setNewStock] = useState({ varianId: "", count: 0 });

  const addStock = (newStock) => {
    let temp = stock.stock;
    setStock({ ...stock, stock: [] });
    const exist = alreadyExist(newStock);

    console.log("exist", exist);
    if (exist) {
      for (var i = 0; i < temp.length; i++) {
        if (alreadyExist(newStock)) {
          temp[i].count = parseInt(temp[i].count) + parseInt(newStock.count);
        }
      }
      setStock({ ...stock, stock: temp });
    } else {
      temp = temp.push(newStock);
      console.log("temp", temp);
      setStock({ ...stock, stock: temp });
      console.log("newww", stock.stock);
    }
    console.log("new", stock);
  };

  const alreadyExist = (x) => {
    for (var i = 0; i < stock.stock.length; i++) {
      if (x.varianId === stock.stock[i].varianId) {
        return true;
      }
    }
    return false;
  };

  const submitAction = () => {
    if (newStock.varianId.length < 3 || newStock.count < 0) {
      swal("Informasi tidak valid!", "Mohon cek kembali input stock", "error");
    } else {
      addStock(newStock);

      var config = {
        method: "post",
        url: currentVarian
          ? `${API_URL}/stock/update/${currentVarian._id}`
          : `${API_URL}/stock/add`,
        headers: {
          Authorization: "0f526bf84bfcf6bcf7e27dd64d923396679731d2",
        },
        data: stock,
      };

      axios(config)
        .then(function (response) {
          eventhandler();
          swal("Success", "Stock berhasil ditambahkan!", "success");
        })
        .catch(function (error) {
          console.log(error);
          swal("Terjadi kesalahan", "Mohon kirim ulang data stock", "error");
        });
    }
  };

  return (
    <div>
      <label htmlFor="varianId">Pilih Varian</label>
      <select
        id="selectedVarian"
        onChange={(e) => setNewStock({ ...newStock, varianId: e.target.value })}
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
        value={stock.desc}
        onChange={(e) => setNewStock({ ...newStock, count: e.target.value })}
      />

      <br />
      <br />

      <button
        onClick={() => submitAction()}
        style={{ height: "30px", margin: "auto" }}
      >
        Tambah Stock
      </button>
    </div>
  );
};

export default FormStock;
