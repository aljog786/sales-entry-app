// sales-entry-app/src/app/page.js
"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Detail from "@/components/Detail";

export default function Home() {
  const [headerData, setHeaderData] = useState({
    vr_no: "",
    vr_date: new Date().toISOString().split("T")[0],
    status: "A",
    ac_amt: 0,
    ac_name: "",
  });

  const [rows, setRows] = useState([
    { product_name: "", qty: 0, rate: 0, amount: 0 },
  ]);

  const [totalAmount, setTotalAmount] = useState(0);

  return (
    <>
      <Header
        headerData={headerData}
        setHeaderData={setHeaderData}
        totalAmount={totalAmount}
        rows={rows}
        setRows={setRows}
      />
      <Detail setTotalAmount={setTotalAmount} rows={rows} setRows={setRows} />
    </>
  );
}