import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

// Optional: kalau nanti kamu mau tambah halaman lain,
// tinggal import dan tambahkan di <Routes> di bawah.
import NotFound from "./components/NotFound"; // contoh halaman 404 custom (opsional)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
