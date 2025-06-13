import React from "react";
import Navbar from "./Components/Navbar/navbar";
import Products from "./Components/Products/Products";
import { Routes, Route } from "react-router-dom";
import BookDetail from "./Components/BookDetail/BookDetail";
import Dashboard from "./Components/Dashboard/Dashboard";
import NotFound from "./Components/NotFound/NotFound";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/books" element={<Products />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/notfound" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
