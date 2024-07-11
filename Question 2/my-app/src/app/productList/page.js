"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState([]); // Initialize state for products

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        setProducts(data); // Update state with fetched data
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-4xl">Top 10 Product List</h1>
      {products.map((item) =>
          <h3>
            Name: {item.title} - Email: {item.price}
          </h3>
      )}
    </>
  );
}
