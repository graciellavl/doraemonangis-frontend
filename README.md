# Doraemonangis | Seleksi Tim Laboratorium Programming 2019 Tahap II

Nama    : Graciella Valeska Liander

NIM     : 18219075

## Background
Doremonangis, robot dari masa depan sedang mencoba untuk membuka suatu bisnis pada bidang F&B, yaitu membuat dorayaki kekinian (rasa pempek, rasa KFC, rasa nasi padang, dan lain-lain) di tahun 2021 ini. Mobita, teman baiknya membantunya untuk mendirikan usaha dorayakinya dengan menjadi Co-Founder sekaligus CTO dari usaha Doremonangis yang bernama “Stand with Dorayaki”.


Selaku CTO, Mobita tentu dipekerjakan oleh Doremonangis untuk membuat sebuah sistem untuk memanajemen tokonya. Akan tetapi, karena Mobita adalah anak yang pemalas, toko Doremonangis sudah memiliki banyak franchise di berbagai tempat. Sehingga, sistem yang dibuat harus menyesuaikan kebutuhan bisnis dari tokonya, apalagi sekarang banyak toko yang mulai kehabisan stok Dorayaki rasa pempek!


Oleh karena itu, sebagai teman Mobita yang berkuliah di バンドン工科大学 (ITB) cabang Shinjuku, kalian akan dipekerjakan oleh Mobita untuk membuat sistem ini.

Spesifikasi lengkap: [Spesifikasi Seleksi Tim Laboratorium Programming 2019 Tahap II](https://docs.google.com/document/u/1/d/e/2PACX-1vQ-TtktsZN6Iusb1Rog-l_kAstH062NIk0ltA83RXsUXgSoZk8QhjZb4WfRUpzct2-k9U0HfgNnuZaK/pub)


## Tech Stack
- **Front-End**: React.js
- **Back-End**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose

## How to run?

### `yarn install`

Pertama, install seluruh depedency yang digunakan terlebih dahulu menggunakan `yarn install`

### `yarn start`

Setelah dependency berhasil diinstall, gunakan command `yarn start` untuk menampilkan program. Program akan berjalan di `localhost:3000` dengan mode development

## File Structure

```
doraemonangis-frontend
│   README.md
│   index.js
|   index.css
|   App.js
|   App.css
│
└───public
│   │   index.html
│   │   manifest.json
│   │
│   └───image
│       │   doraemonangis.jpg
│   
└───src
    │
    └───components
    │   │   file.js
    |   |
    |   └───Card
    |   │   |   file.js
    |   │   
    |   └───Form
    |   │   |   file.js
    |   │   
    |   └───Modal
    |       |   file.js
    │
    └───constant
        │   constant.js
```

### Components
Seluruh component disimpan di folder components. Components terbagi menjadi 3 kelompok component yaitu **card**, **form** dan **modal**. Components yang tidak termasuk kedalam kategori kelompok disimpan langsung didalam folder components

### Constant
Constant merupakan kumpulan konstanta yang digunakan dalam aplikasi seperti `API_URL`

## Related Information
Repo Frontend: [doraemonangis-frontend](https://github.com/graciellavl/doraemonangis-frontend)

Repo Backend: [doraemonangis-backend](https://github.com/graciellavl/doraemonangis-backend)

Endpoint: [End Point](https://localhost:5000)

--- 
Thank You