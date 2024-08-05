import { useEffect, useState } from "react";
import "./styles.css";
import { OrderDTO } from "../../../models/order";
import { requestBackend } from "../../../utils/requests";
import { formatPrice } from "../../../utils/formatters";


export default function HomeAdmin() {
  const [orders, setOrders] = useState<OrderDTO[]>([]);

  useEffect(() => {
    requestBackend({ url: "/orders" }).then((response) => {
      setOrders(response.data.content);
    });
  }, []);

  const totalOrdersValue = orders.reduce(
    (total, order) => total + order.total,
    0
  );

  return (
    <div className="home-admin-container">
      <h1>Bem-Vindo</h1>
      <div className="home-admin-card">
        <div className="base-card">
          <h1>{orders.length}</h1>
          <p>Total de pedidos</p>
        </div>
        <div className="base-card">
          <h1>R$ {formatPrice(totalOrdersValue)}</h1>
          <p>Valor total dos pedidos</p>
        </div>
      </div>
    </div>
  );
}
