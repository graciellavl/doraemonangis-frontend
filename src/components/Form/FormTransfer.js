import React, { useState, useEffect } from "react";

import axios from "axios";
import { API_URL } from "../../constant/constant";
import swal from "sweetalert";

const FormTransfer = ({ eventhandler, varian }) => {
  const [toko, setToko] = useState([]);

  const [asal, setAsal] = useState();
  const [tujuan, setTujuan] = useState();
  const [stockAsal, setStockAsal] = useState(null);
  const [stockTujuan, setStockTujuan] = useState(null);

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
      .then((res) => {
        isAsal ? setStockAsal(res.data[0]) : setStockTujuan(res.data[0]);
      })
      .catch((err) => console.log(err));
  };

  const changeStockAsal = (stock, newStock) => {
    let temp = stock.stock;
    setStockAsal({ ...stock, stock: [] });

    const exist = alreadyExist(newStock, temp);

    if (exist) {
      for (var i = 0; i < temp.length; i++) {
        if (exist) {
          temp[i].count = parseInt(temp[i].count) - parseInt(newStock.count);
        }
      }
    } else {
      temp = temp.push(newStock);
    }
    setStockAsal({ ...stock, stock: temp });
    postData(stockAsal, false);
  };

  const changeStockTujuan = (idTujuan, newStock) => {
    axios
      .get(`${API_URL}/stock/details/${idTujuan}`)
      .then((res) => {
        changeStock(newStock, res.data[0]);
      })
      .catch((err) => console.log(err));
  };

  const changeStock = (newStock, temp) => {
    let stock = temp ? temp : [];
    const exist = alreadyExist(newStock, temp);
    console.log(stock[0]);
    console.log("exist", exist);
    if (exist) {
      for (var i = 0; i < temp.length; i++) {
        if (exist) {
          stock[i].count = parseInt(stock[i].count) + parseInt(newStock.count);
        }
      }
    } else {
      console.log("transferedStock", transferedStock);
      stock.push(newStock);
    }

    console.log("tujuan", tujuan);
    console.log("temp", temp);
    console.log("stock", stock);
    setStockTujuan({ storeId: tujuan, stock: stock, _id: temp._id });
    postData({ storeId: tujuan, stock: stock }, true);
  };

  const alreadyExist = (x, stock) => {
    if (stock) {
      for (var i = 0; i < stock.length; i++) {
        if (x.varianId === stock[i].varianId) {
          return true;
        }
      }
      return false;
    }
    return false;
  };

  const submitAction = async () => {
    if (
      asal === tujuan ||
      !asal ||
      !tujuan ||
      transferedStock.count < 0 ||
      transferedStock.varianId === "" ||
      getCount(transferedStock.varianId) < transferedStock.count
    ) {
      swal("Informasi tidak valid!", "Mohon cek kembali input stock", "error");
    } else {
      changeStockAsal(stockAsal, transferedStock);
      changeStockTujuan(stockTujuan, transferedStock);
      eventhandler();
    }
  };

  const postData = (data, tujuan) => {
    console.log(data);
    var config = {
      method: "post",
      url: data._id
        ? `${API_URL}/stock/update/${data._id}`
        : `${API_URL}/stock/add`,
      headers: {
        Authorization: "0f526bf84bfcf6bcf7e27dd64d923396679731d2",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        tujuan && swal("Success", "Stock berhasil ditambahkan!", "success");
        // window.location.reload();
        eventhandler();
        return true;
      })
      .catch(function (error) {
        console.log(error);
        swal("Terjadi kesalahan", "Mohon kirim ulang data stock", "error");
        return false;
      });
  };

  const getName = (id) => {
    for (var i = 0; i < varian.length; i++) {
      if (id === varian[i]._id) return varian[i].varianname;
    }
  };

  const getCount = (id) => {
    for (var i = 0; i < stockAsal.stock.length; i++) {
      if (id === stockAsal.stock[i].varianId) return stockAsal.stock[i].count;
    }
  };

  return (
    <div>
      <label htmlFor="varianId">Pilih Toko Asal</label>
      <select
        id="selectedVarian"
        onChange={(e) => {
          setAsal(e.target.value);
          getStockData(e.target.value, true);
        }}
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
        {stockAsal &&
          stockAsal.stock.map((item) => {
            return (
              <option value={item.varianId} key={item.varianId}>
                {getName(item.varianId)}
              </option>
            );
          })}
      </select>
      <br />
      <br />
      <label htmlFor="count">
        Jumlah (Max: {stockAsal ? getCount(transferedStock.varianId) : "~"})
      </label>
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
