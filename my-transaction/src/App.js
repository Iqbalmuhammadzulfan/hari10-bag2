// App.js
import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Hasil, ListCategory, Menus, NavbarComp } from "./component";
import { API_URL } from "./utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      kategoriYangDipilih: "Semua",
      keranjang: [],
    };
  }

  componentDidMount() {
    this.getProductsByCategory(this.state.kategoriYangDipilih);
    this.getKeranjang();
  }

  // Ambil produk
  getProductsByCategory = (categoryName) => {
    axios
      .get(API_URL + "products")
      .then((res) => {
        let menus = res.data;
        if (categoryName !== "Semua") {
          menus = menus.filter(
            (item) =>
              item.category &&
              item.category.nama.toLowerCase() === categoryName.toLowerCase()
          );
        }
        this.setState({ menus });
      })
      .catch((error) => {
        console.error("❌ Error ambil produk:", error);
      });
  };

  // Ambil keranjang
  getKeranjang = () => {
    axios
      .get(API_URL + "keranjang")
      .then((res) => {
        this.setState({ keranjang: res.data });
      })
      .catch((error) => {
        console.error("❌ Error ambil keranjang:", error);
      });
  };

  changeCategory = (value) => {
    this.setState({ kategoriYangDipilih: value, menus: [] });
    this.getProductsByCategory(value);
  };

  masukKeranjang = (value) => {
    axios
      .get(`${API_URL}keranjang?produk.id=${value.id}`)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjangBaru = {
            jumlah: 1,
            total_harga: value.harga,
            produk: value,
          };
          axios.post(`${API_URL}keranjang`, keranjangBaru).then(() => {
            swal({
              title: "Sukses!",
              text: "Berhasil masuk keranjang! " + value.nama,
              icon: "success",
              button: false,
              timer: 1200,
            });
            this.getKeranjang();
          });
        } else {
          const keranjangUpdate = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            produk: value,
          };
          axios
            .put(`${API_URL}keranjang/${res.data[0].id}`, keranjangUpdate)
            .then(() => {
              swal({
                title: "Sukses!",
                text: "Berhasil update keranjang! " + value.nama,
                icon: "success",
                button: false,
                timer: 1200,
              });
              this.getKeranjang();
            });
        }
      })
      .catch((error) => {
        console.error("❌ Error masuk keranjang:", error);
      });
  };

  // Checkout: pindahkan keranjang ke pesanan
  checkout = () => {
    const { keranjang } = this.state;

    if (keranjang.length === 0) {
      swal("Info", "Keranjang masih kosong!", "info");
      return;
    }

    const promises = keranjang.map((item) =>
      axios.post(`${API_URL}pesanan`, item)
    );

    Promise.all(promises)
      .then(() => {
        const deletePromises = keranjang.map((item) =>
          axios.delete(`${API_URL}keranjang/${item.id}`)
        );
        return Promise.all(deletePromises);
      })
      .then(() => {
        swal("Sukses!", "Pesanan berhasil dibuat!", "success");
        this.setState({ keranjang: [] });
      })
      .catch((error) => {
        console.error("❌ Error checkout:", error);
        swal("Error", "Checkout gagal!", "error");
      });
  };

  // Hapus item keranjang
  hapusKeranjang = (id) => {
  axios.delete(`${API_URL}keranjang/${id}`)
    .then(() => {
      swal({
        title: "Sukses!",
        text: "Item berhasil dihapus dari keranjang",
        icon: "success",
        button: false,
        timer: 1200,
      });
      this.setState({
        keranjang: this.state.keranjang.filter(item => item.id !== id)
      });
    })
    .catch(error => {
      console.error("❌ Error hapus keranjang:", error);
    });
};


  render() {
    const { menus, kategoriYangDipilih, keranjang } = this.state;

    return (
      <div className="App">
        <NavbarComp />
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategory
                changeCategory={this.changeCategory}
                kategoriYangDipilih={kategoriYangDipilih}
              />

              <Col>
                <h5>
                  <strong>Daftar Produk - {kategoriYangDipilih}</strong>
                </h5>
                <hr />
                <Row>
                  {menus.length > 0 ? (
                    menus.map((menu) => (
                      <Menus
                        key={menu.id}
                        menu={menu}
                        masukKeranjang={this.masukKeranjang}
                      />
                    ))
                  ) : (
                    <Col>
                      <div className="text-center p-4 border rounded bg-light">
                        <p className="mb-0 text-muted">
                          Belum ada produk pada kategori{" "}
                          <strong>{kategoriYangDipilih}</strong>
                        </p>
                      </div>
                    </Col>
                  )}
                </Row>
              </Col>

              <Hasil
                keranjangs={keranjang}
                checkout={this.checkout}
                hapusKeranjang={this.hapusKeranjang}
              />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
