"use client";
import Header from "@/components/Header";
import Detail from "@/components/Detail";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const { header, detail } = useSelector((state) => state.sales);

  return (
    <>
      <Header headerData={header} dispatch={dispatch} detailRows={detail} />
      <Detail rows={detail} dispatch={dispatch} />
    </>
  );
}
