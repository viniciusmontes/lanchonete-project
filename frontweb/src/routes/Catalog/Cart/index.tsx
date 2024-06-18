import "./styles.css";

import { useContext, useState } from "react";
import { IoAddCircle, IoRemove, IoTrash } from "react-icons/io5";
import { useNavigate } from "react-router";

import ButtonIcon from "../../../components/ButtonIcon";
import { OrderDTO } from "../../../models/order";
import * as cartService from "../../../services/cart-service";
import * as orderService from "../../../services/order-service";
import { ContextCartCount } from "../../../utils/context-card";

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState<OrderDTO>(cartService.getCart());

  const { setContextCartCount } = useContext(ContextCartCount);

  function handleIncreaseItem(productId: number) {
    cartService.increaseItem(productId);
    setCart(cartService.getCart());
  }

  function handleDecreaseItem(productId: number) {
    cartService.decreaseItem(productId);
    updateCart();
  }

  function updateCart() {
    const newCart = cartService.getCart();
    setCart(newCart);
    setContextCartCount(newCart.items.length);
  }

  function handlePlaceOrderClick() {
    orderService.placeOrderRequest(cart).then(() => {
      cartService.clearCart();
      setContextCartCount(0);
      updateCart();
    });
  }

  function handleBackToCatalog() {
    navigate("/");
  }

  return (
    <main>
      <section className="cart-container-section">
        <h1>Carrinho de compras</h1>
        {cart.items.length === 0 ? (
          <div>
            <h2 className="dsc-section-title dsc-mb20">
              Seu carrinho está vazio
            </h2>
          </div>
        ) : (
          <div className="dsc-card dsc-mb20">
            {cart.items.map((item) => (
              <div
                key={item.productId}
                className="dsc-cart-item-container dsc-line-bottom"
              >
                <div className="dsc-cart-item-left">
                  <img src={item.imgUrl} alt={item.name} />
                  <div className="dsc-cart-item-description">
                    <h3>{item.name}</h3>
                    <div className="dsc-cart-item-quantity-container">
                      <div
                        onClick={() => handleDecreaseItem(item.productId)}
                        className="dsc-cart-item-quantity-btn"
                      >
                        {item.quantity === 1 ? <IoTrash /> : <IoRemove />}
                      </div>
                      <p>{item.quantity}</p>
                      <div
                        onClick={() => handleIncreaseItem(item.productId)}
                        className="dsc-cart-item-quantity-btn"
                      >
                        <IoAddCircle />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dsc-cart-item-right">
                  R$ {item.subTotal.toFixed(2)}
                </div>
              </div>
            ))}

            <div className="dsc-cart-total-container">
              <h3>R$ {cart.total.toFixed(2)}</h3>
            </div>
            <div className="dsc-cart-button-container">
              <ButtonIcon
                nameClass="btn-success"
                text="finalizar pedido"
                onCLick={handlePlaceOrderClick}
              />
              <ButtonIcon
                nameClass="btn-primary"
                text="Continuar comprando"
                onCLick={handleBackToCatalog}
              />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
