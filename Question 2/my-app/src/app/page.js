"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl flex justify-center">
        Fetch Data with API in Client Component
      </h1>
      <Link href="/productList">Go to Product List</Link>
    </main>
  );
}
