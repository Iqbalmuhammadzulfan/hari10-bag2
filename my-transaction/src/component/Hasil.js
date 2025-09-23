// Hasil.js
import React from "react";
import { Col, ListGroup, Badge, Card, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Hasil = ({ keranjangs, checkout, hapusKeranjang }) => {
  return (
    <Col md={3} className="mt-3">
      <h5 className="fw-bold">Keranjang</h5>
      <hr />

      {keranjangs.length > 0 ? (
        <Card className="shadow-sm">
          <ListGroup variant="flush">
            {keranjangs.map((item) => (
              <ListGroup.Item
                key={item.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.produk.nama}</strong> <br />
                  Rp. {numberWithCommas(item.produk.harga)} x {item.jumlah}
                </div>

                <div className="d-flex align-items-center gap-2">
                  <Badge bg="success" pill>
                    Rp. {numberWithCommas(item.total_harga)}
                  </Badge>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => hapusKeranjang(item.id)}
                  >
                    Hapus
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Card.Footer className="text-end">
            <Button variant="primary" onClick={checkout}>
              Checkout
            </Button>
          </Card.Footer>
        </Card>
      ) : (
        <p className="text-muted fst-italic">Keranjang kosong</p>
      )}
    </Col>
  );
};

export default Hasil;
