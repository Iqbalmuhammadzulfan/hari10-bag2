import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Card } from "react-bootstrap";
import { API_URL } from "../utils/constants";

export default function RekapData() {
  const [rekap, setRekap] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL + "pesanan")
      .then((res) => {
        // langsung pakai data tanpa di-group
        setRekap(res.data);
      })
      .catch((err) => console.error("❌ Error fetching rekap:", err));
  }, []);

  return (
    <div className="container mt-4">
      <Card className="p-4 shadow-sm">
        <h3 className="fw-bold mb-3 text-primary">📊 Rekap Transaksi</h3>

        {rekap.length === 0 ? (
          <p>Belum ada transaksi.</p>
        ) : (
          <Table bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>ID Transaksi</th>
                <th>Tanggal</th>
                <th>Total Pembelian</th>
              </tr>
            </thead>
            <tbody>
              {rekap.map((trx, index) => (
                <tr key={trx.id}>
                  <td>{index + 1}</td>
                  <td>{trx.transaksiId || "-"}</td>
                  <td>{new Date(trx.tanggal).toLocaleString()}</td>
                  <td>Rp {trx.total_harga.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </div>
  );
}
