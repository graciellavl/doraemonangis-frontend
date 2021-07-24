import React, { useState } from "react";

const FormVarian = ({ currentVarian }) => {
  const [varian, setVarian] = useState(
    currentVarian ? currentVarian : { name: "", desc: "" }
  );

  const handleInput = (e, input) => {
    const { value } = e.target;
    if (input === "desc") {
      setVarian({ ...varian, desc: value });
    } else if (input === "name") {
      setVarian({ ...varian, name: value });
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
        onChange={(e) => handleInput(e, "name")}
      />

      <label htmlFor="namaVarian">Deskripsi</label>
      <input
        type="text"
        id="descVarian"
        name="descVarian"
        value={varian.desc}
        onChange={(e) => handleInput(e, "desc")}
      />
    </div>
  );
};

export default FormVarian;
