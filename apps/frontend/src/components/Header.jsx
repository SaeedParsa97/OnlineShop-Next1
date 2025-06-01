"use client";

import Link from "next/link";
import { useState } from "react";
import BarsIcon from "./icons/Bars";

export default function Header() {
  const [isActiveMobile, setIsActiveMobile] = useState(false);

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
