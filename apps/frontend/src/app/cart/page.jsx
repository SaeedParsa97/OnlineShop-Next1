"use client";

import { enTofa } from "@/utils/Utilities";
import Image from "next/image";
import TrashIcon from "@/components/icons/Trash";
import { useContext, useState } from "react";
import { CartContext } from "@/contexts/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useContext(CartContext);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
  });

  function handleChange(event) {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const orderData = {
      user: userInfo,
      cart,
      totalPrice: getTotalPrice(),
    };

    try {
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (res.ok) {
        alert("سفارش شما با موفقیت ثبت شد");
        clearCart();
        setUserInfo({
          name: "",
          email: "",
          country: "",
          city: "",
          address: "",
          postalCode: "",
        });
      } else {
        alert("خطا در ثبت سفارش");
      }
    } catch (error) {
      alert("مشکلی پیش آمده است");
    }
  }

  return (
    <div className="cart-grid">
      <div className="cart-box">
        <h2>سبد خرید</h2>

        {cart.length == 0 && <div>سبد خرید خالی است</div>}

        {cart.length > 0 && (
          <table className="cart-table">
            <thead>
              <tr>
                <th>کالا</th>
                <th>قیمت (تومان)</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((product) => (
                <tr key={product._id}>
                  <td className="cart-product">
                    <Image
                      src={product.image}
                      width={80}
                      height={80}
                      className="cart-product-image"
                      alt={product.title}
                    />
                    {product.title}
                    <input
                      type="number"
                      value={product.quantity}
                      min="1"
                      onChange={(event) =>
                        updateQuantity(product._id, Number(event.target.value))
                      }
                    />
                    <button onClick={() => removeFromCart(product._id)}>
                      <TrashIcon />
                    </button>
                  </td>

                  <td>{enTofa(product.price)}</td>
                </tr>
              ))}

              <tr>
                <td>
                  {" "}
                  <strong>مجموع</strong>
                </td>
                <td>
                  <strong>{enTofa(getTotalPrice())}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      {cart.length > 0 && (
        <div className="cart-box">
          <h2 className="cart-title">اطلاعات شما</h2>
          <form className="cart-form" onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              className="cart-input"
              placeholder="نام"
              value={userInfo.name}
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              className="cart-input"
              placeholder="ایمیل"
              value={userInfo.email}
              onChange={handleChange}
            />
            <input
              name="country"
              type="text"
              className="cart-input"
              placeholder="کشور"
              value={userInfo.country}
              onChange={handleChange}
            />
            <input
              name="city"
              type="text"
              className="cart-input"
              placeholder="شهر"
              value={userInfo.city}
              onChange={handleChange}
            />
            <input
              name="address"
              type="text"
              className="cart-input"
              placeholder="آدرس"
              value={userInfo.address}
              onChange={handleChange}
            />
            <input
              name="postalCode"
              type="number"
              className="cart-input"
              placeholder="کدپستی"
              value={userInfo.postalCode}
              onChange={handleChange}
            />
            <button className="cart-button">پرداخت آنلاین</button>
          </form>
        </div>
      )}
    </div>
  );
}
