import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Menus = ({ menu }) => {
  // Cek apakah menu.category ada
  const categoryName = menu.category ? menu.category.nama.toLowerCase() : "default";

  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow" style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={`/images/${categoryName}/${menu.gambar}`}
          alt={menu.nama}
        />
        <Card.Body>
          <Card.Title>
            {menu.nama} ({menu.kode})
          </Card.Title>
          <Card.Text>Rp. {numberWithCommas(menu.harga)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
