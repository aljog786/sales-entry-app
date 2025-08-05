"use client";
import { useState, useEffect } from "react";
import { Card, Form, Button, Table, Container } from "react-bootstrap";

export default function Detail({ setTotalAmount }) {
  const [rows, setRows] = useState([
    { product_name: "", qty: 0, rate: 0, amount: 0 },
  ]);

  // Calculate amount for each row and total
  useEffect(() => {
    const updatedRows = rows.map((row) => ({
      ...row,
      amount: parseFloat(row.qty) * parseFloat(row.rate),
    }));
    setRows(updatedRows);

    const total = updatedRows.reduce((sum, row) => sum + row.amount, 0);
    setTotalAmount(total);
  }, [rows.map((r) => `${r.qty}-${r.rate}`).join(",")]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...rows];
    updated[index][name] = value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([...rows, { product_name: "", qty: 0, rate: 0, amount: 0 }]);
  };

  const removeRow = (index) => {
    if (rows.length === 1) return;
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };

  return (
    <Card className="p-3 border border-dark">
      <Card.Title className="bg-info p-2 text-center rounded-2 fw-bold text-white">
        Detail
      </Card.Title>

      <Table bordered responsive className="text-center">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <Form.Control
                  type="text"
                  name="product_name"
                  value={row.product_name}
                  onChange={(e) => handleChange(index, e)}
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  name="qty"
                  value={row.qty}
                  onChange={(e) => handleChange(index, e)}
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  name="rate"
                  value={row.rate}
                  onChange={(e) => handleChange(index, e)}
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  value={row.amount.toFixed(2)}
                  readOnly
                />
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => removeRow(index)}
                  disabled={rows.length === 1}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between mt-3">
        <Button variant="dark" onClick={addRow}>
          Add Row
        </Button>
        <h5>
          Total Amount:{" "}
          <span className="text-success fw-bold">
            ₹{rows.reduce((sum, row) => sum + row.amount, 0).toFixed(2)}
          </span>
        </h5>
      </div>
    </Card>
  );
}
