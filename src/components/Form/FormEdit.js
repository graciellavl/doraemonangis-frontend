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

    for (var i = 0; i < temp.length; i++) {
      if (temp[i].varianId === newStock.varianId) {
        temp[i].count = parseInt(newStock.count);
      }
    }
    setStock({ ...stock, stock: temp });
  };

  const submitAction = () => {
    if (newStock.varianId.length < 3 || newStock.count < 0) {
      swal("Informasi tidak valid!", "Mohon cek kembali input stock", "error");
    } else {
      addStock(newStock);

      var config = {
        method: "post",
        url: `${API_URL}/stock/update/${currentVarian._id}`,
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
      <br />
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
        Ubah Stock
      </button>
    </div>
  );
};

export default FormEdit;
