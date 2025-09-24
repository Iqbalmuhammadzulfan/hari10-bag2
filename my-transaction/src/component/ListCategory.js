// ListCategory.js
import React from "react";
import { Col, ListGroup } from "react-bootstrap";
import { FaList } from "react-icons/fa";


const ListCategory = ({ changeCategory, kategoriYangDipilih }) => {
  // ✅ tambahkan kategori "Semua"
  const categories = ["Semua", "Makanan", "Minuman", "Cemilan"];

  return (
    <Col md={2} className="mb-3">
      <h5 className="fw-bold">
        <FaList style={{ marginRight: "8px" }} /> Kategori
      </h5>
      <hr />
      <ListGroup>
        {categories.map((category) => (
          <ListGroup.Item
            key={category}
            action
            onClick={() => changeCategory(category)}
            active={kategoriYangDipilih === category}
            className="text-capitalize"
          >
            {category}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Col>
  );
};

export default ListCategory;
