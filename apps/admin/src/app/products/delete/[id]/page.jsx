"use client";
import { useParams, useRouter } from "next/navigation";

export default function DeleteProduct() {
  const router = useRouter();
  const { id } = useParams();

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:3001/api/products/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/products");
    }
  };

  return (
    <div>
      <h1>Are you sure you want to ....</h1>
      <button onClick={handleDelete}>Yes, delete</button>
      <button onClick={() => router.push("/products")}>Cancel</button>
    </div>
  );
}
