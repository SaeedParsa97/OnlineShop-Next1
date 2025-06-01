"use client";

import { enTofa } from "@/utils/Utilities";
import Image from "next/image";
import TrashIcon from "@/components/icons/Trash";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } =
    useContext(CartContext);

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
          <form className="cart-form">
            <input
              name="name"
              type="text"
              className="cart-input"
              placeholder="نام"
            />
            <input
              name="email"
              type="email"
              className="cart-input"
              placeholder="ایمیل"
            />
            <input
              name="country"
              type="text"
              className="cart-input"
              placeholder="کشور"
            />
            <input
              name="city"
              type="text"
              className="cart-input"
              placeholder="شهر"
            />
            <input
              name="address"
              type="text"
              className="cart-input"
              placeholder="آدرس"
            />
            <input
              name="postalCode"
              type="number"
              className="cart-input"
              placeholder="کدپستی"
            />
            <button className="cart-button">پرداخت آنلاین</button>
          </form>
        </div>
      )}
    </div>
  );
}
