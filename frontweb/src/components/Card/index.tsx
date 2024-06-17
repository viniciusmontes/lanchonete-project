import { Link } from "react-router-dom";
import { ProductDTO } from "../../models/product";
import { formatPrice, limitText } from "../../utils/formatters";

import "./styles.css";

type Props = {
  product: ProductDTO;
};

export default function Card({ product }: Props) {
  return (
    <Link to={`/product-details/${product.id}`}>
      <div className="card-container">
        <div key={product.id} className="card-content">
          <img src={product.imgUrl} alt="" />
          <h1 className="card-content-title">{limitText(product.name, 25)}</h1>
          <p className="card-content-price">R$ {formatPrice(product.price)}</p>
          <span>{limitText(product.description, 100)}</span>
        </div>
      </div>
    </Link>
  );
}
