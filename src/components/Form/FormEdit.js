import React, { useState } from "react";

import axios from "axios";
import { API_URL } from "../../constant/constant";
import swal from "sweetalert";

const FormEdit = ({
  currentVarian,
  eventhandler,
  varianName,
  varianId,
  varianStock,
  storeId,
}) => {
  const [stock, setStock] = useState(
    currentVarian
      ? { storeId: currentVarian.storeId, stock: currentVarian.stock }
      : { storeId: storeId, stock: [] }
  );

  const [newStock, setNewStock] = useState({
    varianId: varianId,
    count: varianStock,
  });

  const addStock = (newStock) => {
    let temp = stock.stock;
    setStock({ ...stock, stock: [] });
    const exist = alreadyExist(newStock);

    if (exist) {
      for (var i = 0; i < temp.length; i++) {
        if (alreadyExist(newStock)) {
          temp[i].count = parseInt(newStock.count);
        }
      }
      setStock({ ...stock, stock: temp });
    } else {
      temp = temp.push(newStock);
      setStock({ ...stock, stock: temp });
    }
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
          swal("Success", "Stock berhasil diubah!", "success");
        })
        .catch(function (error) {
          console.log(error);
          swal("Terjadi kesalahan", "Mohon kirim ulang data stock", "error");
        });
    }
  };

  return (
    <div>
      <h2>{varianName}</h2>
      <label htmlFor="count">Jumlah</label>
      <input
        type="number"
        id="count"
        name="count"
        placeholder={varianStock}
        value={stock.count}
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

export default FormEdit;
