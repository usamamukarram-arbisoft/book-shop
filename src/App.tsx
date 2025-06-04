import React from "react";
import Navbar from "./Components/Navbar/navbar";
import Products from "./Components/Products/Products";
import { Routes, Route } from "react-router-dom";
import BookDetail from "./Components/BookDetail/BookDetail";
import Dashboard from "./Components/Dashboard/Dashboard";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/books" element={<Products />} />
        <Route path="/books/:id" element={<BookDetail />} />
      </Routes>
    </div>
  );
};

export default App;
