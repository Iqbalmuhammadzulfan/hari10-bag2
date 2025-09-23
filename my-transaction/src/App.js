// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import NavbarComp from "./component/NavbarComp";
import { Hasil, ListCategory, Menus } from "./component";
import { API_URL } from "./utils/constants";
import { Container, Row } from "react-bootstrap";

function App() {
  const [products, setProducts] = useState([]);   // state untuk simpan produk
  const [loading, setLoading] = useState(true);   // state loading
  const [error, setError] = useState(null);       // state error

  useEffect(() => {
    fetch(`${API_URL}/products`)   // endpoint sesuai db.json
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal fetch data dari server");
        }
        return res.json();
      })
      .then((data) => {
        console.log("DATA BACKEND:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading data...</h2>;
  }

  if (error) {
    return <h2 style={{ color: "red" }}>Error: {error}</h2>;
  }

  return (
    <div className="App">
      {/* Navbar */}
      <NavbarComp />

      <Container fluid>
        <Row>
          {/* Kategori (kiri) */}
          <ListCategory />

          {/* Daftar Produk (tengah) */}
          <div className="col-md-6 mt-2">
            <h4><strong>Daftar Produk</strong></h4>
            <hr />
            <Row>
              {products.map((menu) => (
                <Menus key={menu.id} menu={menu} />
              ))}
            </Row>
          </div>

          {/* Hasil (kanan) */}
          <Hasil />
        </Row>
      </Container>
    </div>
  );
}

export default App;
