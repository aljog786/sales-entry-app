import { useEffect, useState } from "react";
import { Card, Form, Button, Table } from "react-bootstrap";
import axios from "axios";
import { updateDetailField,updateDetailItemName, addRow, removeRow } from "@/store/slices/salesSlice";

export default function Detail({ rows, dispatch }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://5.189.180.8:8010/item")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Failed to fetch items", err));
  }, []);

const handleChange = (index, e) => {
  const { name, value } = e.target;

  // 1) dispatch the basic field update
  dispatch(updateDetailField({ index, field: name, value }));

  // 2) if they picked an item_code, also dispatch item_name
  if (name === "item_code") {
    const selected = items.find((i) => i.item_code === value);
    dispatch(
      updateDetailItemName({
        index,
        itemName: selected?.item_name || "",
      })
    );
  }
};


  return (
    <Card className="p-3 border border-dark">
      <Card.Title className="bg-info text-white text-center p-2 rounded-2 fw-bold">
        Detail
      </Card.Title>
      <Table bordered responsive className="text-center">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Description</th>
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
                <Form.Select
                  name="item_code"
                  value={row.item_code}
                  onChange={(e) => handleChange(index, e)}
                >
                  <option value="">Select</option>
                  {items.map((item) => (
                    <option key={item.item_code} value={item.item_code}>
                      {item.item_code}
                    </option>
                  ))}
                </Form.Select>
              </td>
              <td>
                <Form.Control type="text" value={row.item_name} readOnly />
              </td>
              <td>
                <Form.Control
                  type="text"
                  name="description"
                  value={row.description}
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
                  onClick={() => dispatch(removeRow(index))}
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
        <Button variant="dark" onClick={() => dispatch(addRow())}>
          Add Row
        </Button>
        <h5>
          Total:{" "}
          <span className="text-success fw-bold">
            ₹{rows.reduce((sum, row) => sum + row.amount, 0).toFixed(2)}
          </span>
        </h5>
      </div>
    </Card>
  );
}
