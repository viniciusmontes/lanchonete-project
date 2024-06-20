import { formatPrice } from "../../../../utils/formatters";
import { OrderList } from "../List";
import "./styles.css";

type Props = {
  order: OrderList;
  onDialogAnswer: (answer: boolean, order: OrderList) => void;
};

export default function ModalOrder({ order, onDialogAnswer }: Props) {
  return (
    <div
      className="dsc-dialog-background"
      onClick={() => onDialogAnswer(false, order)}
    >
      <div
        className="dsc-dialog-box"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-order-details">
          {order.items.map((x) => (
            <div key={x.productId} className="modal-order-items-container">
              <p>{x.quantity}x</p>
              <p>{x.name}</p>
              <p>R$ {formatPrice(x.price)}</p>

              <p>R$ {formatPrice(x.subTotal)}</p>
            </div>
          ))}
        </div>
        <h1>R$ {formatPrice(order.total)}</h1>
      </div>
    </div>
  );
}
