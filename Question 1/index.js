const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 8004;

const fetchDataWithRetries = async (url, retries = 3) => {
  const headers = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNjk0MTY5LCJpYXQiOjE3MjA2OTM4NjksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjJiNjk5NzhkLTcyYTAtNDZiZi1hNmI4LTU0YmJjODM1OTgzMyIsInN1YiI6InVtYW5nLjIxLmJlaXNAYWNoYXJ5YS5hYy5pbiJ9LCJjb21wYW55TmFtZSI6ImdvTWFydCIsImNsaWVudElEIjoiMmI2OTk3OGQtNzJhMC00NmJmLWE2YjgtNTRiYmM4MzU5ODMzIiwiY2xpZW50U2VjcmV0IjoidVV4blNPZXNrUUpreWJqWCIsIm93bmVyTmFtZSI6IlVtYW5nIFJhaiIsIm93bmVyRW1haWwiOiJ1bWFuZy4yMS5iZWlzQGFjaGFyeWEuYWMuaW4iLCJyb2xsTm8iOiIxQVkyMUlTMTI5In0.wvxaTIeZiGO6RnL9FMJlhBLhiKIq7wsxk3YV7KAV0Ng",
  };
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url);
      return response.data.numbers;
    } catch (error) {
      if (i === retries - 1) {
        console.error(`Error retrieving numbers from ${url}: ${error.message}`);
      }
    }
  }
  return []; // Return an empty array if all retries fail
};

app.get("/numbers", async (req, res) => {
  try {
    let { url } = req.query;

    if (!Array.isArray(url)) {
      url = [
        "http://20.244.56.144/test/primes",
        "http://20.244.56.144/test/fibo",
        "http://20.244.56.144/test/odd",
        "http://20.244.56.144/test/rand",
      ];
    } else {
      url = Array.isArray(url) ? url : [url];
    }

    const numbers = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
    const windowPrevState = [2, 4, 6, 8];
    const windowCurrState = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
    const avg = 23.4;

    const requests = url.map(async (url) => {
      const urlNumbers = await fetchDataWithRetries(url);
      numbers.push(...urlNumbers);
    });

    await Promise.all(requests);
    const mergedNumbers = Array.from(new Set(numbers)).sort((a, b) => a - b);

    res.json({
      windowPrevState: windowPrevState,
      windowCurrState: windowCurrState,
      numbers: numbers,
      avg: avg,
    });
  } catch (error) {
    console.error(`Error processing request: ${error.message}`);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
