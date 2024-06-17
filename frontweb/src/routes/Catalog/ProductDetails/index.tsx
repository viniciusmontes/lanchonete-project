import './styles.css';

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { ProductDTO } from '../../../models/product';
import * as cartService from '../../../services/cart-service';
import * as productService from '../../../services/product-service';
import { formatPrice } from '../../../utils/formatters';
import ButtonIcon from '../../../components/ButtonIcon';
import { ContextCartCount } from '../../../utils/context-card';

export default function ProductDetails() {
  const params = useParams();

  const [product, setProduct] = useState<ProductDTO>();

  const { setContextCartCount } = useContext(ContextCartCount);

  const navigate = useNavigate();

  useEffect(() => {
    productService
      .findById(Number(params.productId))
      .then((response) => {
        setProduct(response.data);
      })
      .catch(() => {
        navigate("/");
      });
  }, [params.productId, navigate]);

  function handleBuyClick() {
    if (product) {
      cartService.addProduct(product);
      setContextCartCount(cartService.getCart().items.length);
      navigate("/cart");
    }
  }

  function backToCatalog() {
    navigate('/')
  }

  return (
    <div className="product-details-container">
      <div className="product-details-card-container">
        <div className="product-details-img-container">
          <img src={product?.imgUrl} alt={product?.name} />
        </div>
        <h1>{product?.name}</h1>
        <p className='product-details-card-price'>R$ {formatPrice(product?.price as number)}</p>
        <span>{product?.description}</span>
      </div>
      <div className="product-details-button-container">
        <ButtonIcon nameClass="btn-success" text='comprar' onCLick={handleBuyClick}/>
        <ButtonIcon nameClass="btn-primary" text='voltar' onCLick={backToCatalog}/>
      </div>
    </div>
  );
}
