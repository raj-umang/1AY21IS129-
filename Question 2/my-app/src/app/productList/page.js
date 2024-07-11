"use client";
import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNjk3NzAyLCJpYXQiOjE3MjA2OTc0MDIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjJiNjk5NzhkLTcyYTAtNDZiZi1hNmI4LTU0YmJjODM1OTgzMyIsInN1YiI6InVtYW5nLjIxLmJlaXNAYWNoYXJ5YS5hYy5pbiJ9LCJjb21wYW55TmFtZSI6ImdvTWFydCIsImNsaWVudElEIjoiMmI2OTk3OGQtNzJhMC00NmJmLWE2YjgtNTRiYmM4MzU5ODMzIiwiY2xpZW50U2VjcmV0IjoidVV4blNPZXNrUUpreWJqWCIsIm93bmVyTmFtZSI6IlVtYW5nIFJhaiIsIm93bmVyRW1haWwiOiJ1bWFuZy4yMS5iZWlzQGFjaGFyeWEuYWMuaW4iLCJyb2xsTm8iOiIxQVkyMUlTMTI5In0.Cof5qvG6tqsVgzB9CIsKON1SjnwhiaAESmsgxZowfFI",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.rating}>
            <h2>{product.productName}</h2>
            <p>Price: ${product.price}</p>
            <p>Rating: ${product.rating}</p>
            <p>Discount: ${product.discount}</p>
            <p>Availibility: ${product.availability}</p> <br /> <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
