import axios from "axios";

const BASE = "http://5.189.180.8:8010";

export const getHeaders = () =>
  axios.get(`${BASE}/header`).then((res) => res.data);

export const getDetails = (vr_no) =>
  axios.get(`${BASE}/detail?vr_no=${vr_no}`).then((res) => res.data);

export const getItems = () => axios.get(`${BASE}/item`).then((res) => res.data);

export const postVoucher = (payload) =>
  axios.post(`${BASE}/header`, payload).then((res) => res.data);
