// Menus.js
import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow h-100">
        {/* Gambar produk */}
        <Card.Img
          variant="top"
          src={
            "images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar
          }
          alt={menu.nama}
          style={{ height: "180px", objectFit: "cover" }}
        />

        {/* Info produk */}
        <Card.Body className="d-flex flex-column">
          <Card.Title className="fw-bold">{menu.nama}</Card.Title>
          <Card.Subtitle className="text-muted mb-2">
            Kode: {menu.kode}
          </Card.Subtitle>
          <Card.Text className="text-success fw-semibold">
            Rp. {numberWithCommas(menu.harga)}
          </Card.Text>

          {/* Tombol Tambah ke Keranjang */}
          {menu.is_ready && menu.stok > 0 ? (
            <Button
              variant="primary"
              className="mt-auto"
              onClick={() => masukKeranjang(menu)}
            >
              Tambah ke Keranjang
            </Button>
          ) : (
            <Button variant="secondary" className="mt-auto" disabled>
              ❌ Habis
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
