import React from "react";
import Navbar from "./Components/Navbar/navbar";
import Products from "./Components/Products/Products";
import { Routes, Route } from "react-router-dom";
import BookDetail from "./Components/BookDetail/Bookdetail";

function App() {
  return (
    <div>
      <>
        <Navbar />

        {/* <Products></Products> */}
        <Routes>
          <Route path="/" element={<Products />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/books/:id" element={<BookDetail />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
