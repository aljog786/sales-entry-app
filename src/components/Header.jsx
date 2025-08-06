"use client";
import { useEffect } from "react";
import { Button, Row, Col, Form, Card } from "react-bootstrap";
import { setHeader, resetAll } from "@/store/slices/salesSlice";

export default function Header({ headerData, dispatch, detailRows }) {
  useEffect(() => {
    const ac_amt = detailRows.reduce((sum, row) => sum + row.qty * row.rate, 0);
    dispatch(setHeader({ ac_amt }));
  }, [detailRows, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setHeader({ [name]: value }));
  };

  const handleSave = async () => {
    if (
      !headerData.vr_no ||
      !headerData.ac_name ||
      detailRows.some((r) => !r.item_code || !r.qty || !r.rate)
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const payload = {
      header_table: { ...headerData },
      detail_table: detailRows.map((row, i) => ({
        vr_no: parseInt(headerData.vr_no, 10),
        sr_no: i + 1,
        item_code: row.item_code,
        item_name: row.item_name,
        description: row.description || "",
        qty: parseFloat(row.qty),
        rate: parseFloat(row.rate),
      })),
    };

    try {
      const res = await fetch("http://5.189.180.8:8010/header/multiple", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // log the exact status and body
      const text = await res.text();
      console.log("Save response status:", res.status, text);

      if (!res.ok) {
        alert(`Save failed: ${res.status}`);
        return;
      }

      alert("Saved successfully!");
      // you can also resetAll() here if you like
    } catch (err) {
      console.error("Network or JSON error:", err);
      alert("Save failed. See console.");
    }
  };


  const handleNew = () => dispatch(resetAll());

  const handlePrint = () => window.print();

  return (
    <Card className="p-3 mb-4 border border-dark">
      <Card.Title className="bg-info text-white p-2 text-center rounded-2 fw-bold">
        Header
      </Card.Title>
      <Form>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Group controlId="vrNo">
              <Form.Label>Vr No</Form.Label>
              <Form.Control
                type="number"
                name="vr_no"
                value={headerData.vr_no}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="vrDate">
              <Form.Label>Vr Date</Form.Label>
              <Form.Control
                type="date"
                name="vr_date"
                value={headerData.vr_date}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={headerData.status}
                onChange={handleChange}
              >
                <option value="A">Active</option>
                <option value="I">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="acAmt">
              <Form.Label>Ac Amt</Form.Label>
              <Form.Control
                type="number"
                name="ac_amt"
                value={headerData.ac_amt}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="acName">
              <Form.Label>Ac Name</Form.Label>
              <Form.Control
                type="text"
                name="ac_name"
                value={headerData.ac_name}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-4">
            <Button variant="primary m-2" onClick={handleNew}>
              New
            </Button>
            <Button variant="success m-2" onClick={handleSave}>
              Save
            </Button>
            <Button variant="secondary m-2" onClick={handlePrint}>
              Print
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}
