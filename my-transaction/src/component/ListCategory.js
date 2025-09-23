import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

export default class ListCategory extends Component {
  render() {
    return (
      <Col md={3} className="mt-2">
        <h5><strong>Kategori</strong></h5>
        <ul>
          <li>Semua</li>
          <li>Makanan</li>
          <li>Minuman</li>
          <li>Cemilan</li>
        </ul>
      </Col>
    );
  }
}