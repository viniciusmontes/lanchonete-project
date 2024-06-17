import "./styles.css";

import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";

import { ContextCartCount } from "../../utils/context-card";

export default function CardIcon() {
  const { contextCartCount } = useContext(ContextCartCount);

  return (
    <>
      <div className="cart-icon-container">
        <FaShoppingCart />
        {contextCartCount > 0 && (
          <div className="dsc-cart-count">{contextCartCount}</div>
        )}
      </div>
    </>
  );
}
