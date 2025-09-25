import React, { useEffect, useState } from "react";
import { Table, Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default function Stok() {
  const [produk, setProduk] = useState([]);

  useEffect(() => {
    fetchProduk();
  }, []);

  const fetchProduk = async () => {
    try {
      const res = await axios.get(API_URL + "products");
      setProduk(res.data);
    } catch (error) {
      console.error("❌ Error ambil produk:", error);
    }
  };

  const updateStok = async (id, stokBaru) => {
    if (stokBaru < 0) return; // stok tidak boleh negatif

    const isReady = stokBaru > 0; // otomatis set is_ready

    try {
      await axios.patch(API_URL + "products/" + id, {
        stok: stokBaru,
        is_ready: isReady,
      });
      fetchProduk();
    } catch (error) {
      console.error("❌ Error update stok:", error);
    }
  };

  const hapusProduk = async (id) => {
    if (!window.confirm("Yakin ingin hapus produk ini?")) return;
    try {
      await axios.delete(API_URL + "products/" + id);
      fetchProduk();
    } catch (error) {
      console.error("❌ Error hapus produk:", error);
    }
  };

  return (
    <div className="container mt-4">
      <Card className="p-4 shadow-sm">
        <h3 className="fw-bold mb-3 text-primary">📦 Manajemen Stok Menu</h3>

        {produk.length === 0 ? (
          <p>Belum ada produk.</p>
        ) : (
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Produk</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {produk.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>Rp {item.harga.toLocaleString()}</td>
                  <td>
                    <Form.Control
                      type="number"
                      value={item.stok ?? 0}
                      onChange={(e) =>
                        updateStok(item.id, parseInt(e.target.value) || 0)
                      }
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td>
                    {item.is_ready ? (
                      <span className="text-success">✅ Tersedia</span>
                    ) : (
                      <span className="text-danger">❌ Habis</span>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => hapusProduk(item.id)}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </div>
  );
}
