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
            <div key={x.productId} className="modal-order-item">
              <div className="form-group">
                <label>Quantidade:</label>
                <p>{x.quantity}x</p>
              </div>
              <div className="form-group">
                <label>Produto:</label>
                <p>{x.name}</p>
              </div>
              <div className="form-group">
                <label>Preço unitário:</label>
                <p>R$ {formatPrice(x.price)}</p>
              </div>
              <div className="form-group">
                <label>Subtotal:</label>
                <p>R$ {formatPrice(x.subTotal)}</p>
              </div>
            </div>
          ))}
        </div>
        <h1>Total: R$ {formatPrice(order.total)}</h1>
      </div>
    </div>
  );
}
