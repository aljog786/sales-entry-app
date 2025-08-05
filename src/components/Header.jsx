"use client";
import { useEffect } from "react";
import { Button,Row, Col, Form, Card } from "react-bootstrap";

export default function Header({ headerData, setHeaderData, totalAmount }) {
  useEffect(() => {
    setHeaderData((prev) => ({ ...prev, ac_amt: totalAmount }));
  }, [totalAmount, setHeaderData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHeaderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSave = () => {
    const payload = {
      ...headerData,
      details: rows,
    };
    console.log("Saving Data:", payload);
    alert("Data saved! Check console.");
  };

  const handleNew = () => {
    setHeaderData({
      vr_no: "",
      vr_date: new Date().toISOString().split("T")[0],
      status: "A",
      ac_amt: 0,
      ac_name: "",
    });
    setRows([{ product_name: "", qty: 0, rate: 0, amount: 0 }]); // from parent
  };

  const handlePrint = () => {
    window.print();
};


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
