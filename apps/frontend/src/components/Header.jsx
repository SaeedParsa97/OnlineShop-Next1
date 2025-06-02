"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import BarsIcon from "./icons/Bars";
import { CartContext } from "@/contexts/CartContext";
import { enTofa } from "@/utils/Utilities";

export default function Header() {
  const [isActiveMobile, setIsActiveMobile] = useState(false);

  const {cart} = useContext(CartContext)

  return (
    <header className="header">
      <div className="header-wrapper">
        <Link className="logo" href={"/"}>
          <img src="/images/logo.jpg" alt="logo" />
        </Link>

        <nav className={`nav ${isActiveMobile ? "active" : ""}`}>
          <Link className="nav-link" href={"/"}>
            صفحه اصلی
          </Link>
          <Link className="nav-link" href={"/products"}>
            محصولات
          </Link>
          <Link className="nav-link" href={"/cart"}>
            سبد خرید
          </Link>
          {
            cart.length > 0 
              ? <span className="nav-cart-num">{enTofa(cart.length)}</span>
              :""
          }
        </nav>
        <button
          onClick={() => setIsActiveMobile((prev) => !prev)}
          className="nav-button"
        >
          <BarsIcon />
        </button>
      </div>
    </header>
  );
}
