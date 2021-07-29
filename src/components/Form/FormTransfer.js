import React, { useState, useEffect } from "react";

import axios from "axios";
import { API_URL } from "../../constant/constant";
import swal from "sweetalert";

const FormTransfer = ({ eventhandler, varian }) => {
  const [toko, setToko] = useState([]);

  const [asal, setAsal] = useState();
  const [tujuan, setTujuan] = useState();
  const [stockAsal, setStockAsal] = useState();
  const [stockTujuan, setStockTujuan] = useState();

  const [transferedStock, setTransferedStock] = useState({
    varianId: "",
    count: 0,
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/store/`)
      .then((res) => setToko(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getStockData = (id, isAsal) => {
    axios
      .get(`${API_URL}/stock/details/${id}`)
      .then((res) =>
        isAsal ? setStockAsal(res.data[0]) : setStockTujuan(res.data[0])
      )
      .catch((err) => console.log(err));
  };

  const changeStock = (stock, newStock, isAdd) => {
    let temp = stock.stock;
    isAdd
      ? setStockAsal({ ...stock, stock: [] })
      : setStockTujuan({ ...stock, stock: [] });

    const exist = alreadyExist(newStock, temp);

    if (exist) {
      for (var i = 0; i < temp.length; i++) {
        if (exist) {
          const pengali = isAdd ? 1 : -1;
          temp[i].count =
            parseInt(temp[i].count) + parseInt(newStock.count) * pengali;
          if (temp[i].count < 0) {
            return false;
          }
        }
      }
    } else {
      temp = temp.push(newStock);
    }
    isAdd
      ? setStockAsal({ ...stock, stock: temp })
      : setStockTujuan({ ...stock, stock: temp });

    return true;
  };

  const alreadyExist = (x, stock) => {
    for (var i = 0; i < stock.length; i++) {
      if (x.varianId === stock[i].varianId) {
        return true;
      }
    }
    return false;
  };

  const submitAction = () => {
    if (
      asal === tujuan ||
      transferedStock.count < 0 ||
      transferedStock.varianId === ""
    ) {
      swal("Informasi tidak valid!", "Mohon cek kembali input stock", "error");
      // } else {
      //   getStockData(asal, true);
      //   getStockData(tujuan, false);

      //   console.log("raw stockAsal", stockAsal);
      //   console.log("raw stockTujuan", stockTujuan);

      //   if (
      //     changeStock(stockAsal, transferedStock, true) &&
      //     changeStock(stockTujuan, transferedStock, false)
      //   ) {
      //     console.log("transferedStock", transferedStock);
      //     console.log("stockAsal", stockAsal);
      //     console.log("stockTujuan", stockTujuan);
      //     // if (postData(tokoAsal)) {
      //     //   if (postData(tokoTujuan)) {
      //     //     swal("Success", "Stock berhasil ditambahkan!", "success");
      //     //   }
      //     // }
      //     eventhandler();
      //   } else {
      //     swal("Transfer Gagal", "Stock toko asal tidak cukup!", "error");
      //   }
    }
  };

  const postData = (data, idStock) => {
    var config = {
      method: "post",
      url: idStock
        ? `${API_URL}/stock/update/${idStock._id}`
        : `${API_URL}/stock/add`,
      headers: {
        Authorization: "0f526bf84bfcf6bcf7e27dd64d923396679731d2",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        eventhandler();
        return true;
      })
      .catch(function (error) {
        console.log(error);
        swal("Terjadi kesalahan", "Mohon kirim ulang data stock", "error");
        return false;
      });
  };

  return (
    <div>
      <label htmlFor="varianId">Pilih Toko Asal</label>
      <select id="selectedVarian" onChange={(e) => setAsal(e.target.value)}>
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
      <select id="selectedVarian" onChange={(e) => setTujuan(e.target.value)}>
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
        onChange={(e) =>
          setTransferedStock({ ...transferedStock, varianId: e.target.value })
        }
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
        onChange={(e) =>
          setTransferedStock({ ...transferedStock, count: e.target.value })
        }
      />
      <br />
      <br />
      <button
        onClick={() => submitAction()}
        style={{ height: "30px", margin: "auto" }}
      >
        Transfer Stock
      </button>
    </div>
  );
};

export default FormTransfer;
