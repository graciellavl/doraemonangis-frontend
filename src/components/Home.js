import React from "react";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <img
        src={"/image/doraemon.jpg"}
        alt={""}
        width={"70%"}
      />
      <h1 style={{margin: '20px 0 10px 0'}}>Selamat datang</h1>
      <div>Graciella Valeska Liander | 18219076</div>
    </div>
  );
};

export default Home;
