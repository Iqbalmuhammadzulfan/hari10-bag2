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
        // Grouping berdasarkan transaksiId
        const grouped = res.data.reduce((acc, item) => {
          const id = item.transaksiId || "tanpa-id";
          if (!acc[id]) {
            acc[id] = {
              transaksiId: id,
              tanggal: item.tanggal,
              total: 0,
            };
          }
          acc[id].total += item.total_harga;
          return acc;
        }, {});

        setRekap(Object.values(grouped));
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
                <th>Tanggal</th>
                <th>Total Pembelian</th>
              </tr>
            </thead>
            <tbody>
              {rekap.map((trx, index) => (
                <tr key={trx.transaksiId}>
                  <td>{index + 1}</td>
                  <td>{new Date(trx.tanggal).toLocaleString()}</td>
                  <td>Rp {trx.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </div>
  );
}
