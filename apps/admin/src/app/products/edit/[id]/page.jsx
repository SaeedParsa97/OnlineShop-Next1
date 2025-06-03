"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProduct() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    category: "لپتاپ",
  });

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`http://localhost:3001/api/products/${id}`);
      const data = await res.json();
      setFormData(data.product);
    }

    fetchProduct();
  }, []);

  const { id } = useParams();
  const router = useRouter();

  const onChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("product is successfully edited");
        router.push("/products");
      }
    } catch (error) {
      alert(`Error---> ${error}`);
    }
  };

  return (
    <div>
      <h1>Edit The Slelected Product</h1>
      <form onSubmit={onSubmitHandler}>
        <input
          value={formData.title}
          onChange={onChangeHandler}
          type="text"
          name="title"
          placeholder="title"
        />
        <input
          value={formData.price}
          onChange={onChangeHandler}
          type="number"
          name="price"
          placeholder="price"
        />
        <input
          value={formData.image}
          onChange={onChangeHandler}
          type="text"
          name="image"
          placeholder="image url"
        />
        <textarea
          value={formData.description}
          onChange={onChangeHandler}
          name="description"
          placeholder="description"
        ></textarea>
        <select
          value={formData.category}
          onChange={onChangeHandler}
          name="category"
        >
          <option value="لپتاپ">لپتاپ</option>
          <option value="موبایل">موبایل</option>
          <option value="تبلت">تبلت</option>
        </select>

        <button type="sumbit">save new information</button>
      </form>
    </div>
  );
}
