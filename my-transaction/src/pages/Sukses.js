import React, { Component } from "react";
import { Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default class Sukses extends Component {
  componentDidMount() {
    axios
      .get(API_URL + "keranjang")
      .then((res) => {
        const keranjangs = res.data;

        // buat id unik untuk 1 transaksi
        const transaksiId = Date.now().toString();

        keranjangs.forEach((item) => {
          const newPesanan = {
            transaksiId, // semua produk dalam 1 checkout punya transaksiId sama
            jumlah: item.jumlah,
            total_harga: item.total_harga,
            produk: item.produk,
            tanggal: new Date().toISOString(), // timestamp realtime
          };

          // simpan ke pesanan
          axios
            .post(API_URL + "pesanan", newPesanan)
            .then((res) => {
              console.log("✅ Pesanan tersimpan:", res.data);

              // hapus item dari keranjang
              return axios.delete(API_URL + "keranjang/" + item.id);
            })
            .then(() => console.log("🗑️ Keranjang terhapus:", item.id))
            .catch((error) =>
              console.error("❌ Error proses checkout:", error)
            );
        });
      })
      .catch((error) => {
        console.error("❌ Error ambil keranjang:", error);
      });
  }

  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="images/success.png" width={200} />
        <h2>Sukses</h2>
        <p>
          Terimakasih sudah membeli produk kami, silahkan tunggu pesanan anda
        </p>
        <Button variant="primary" as={Link} to="/">
          Kembali
        </Button>
      </div>
    );
  }
}
