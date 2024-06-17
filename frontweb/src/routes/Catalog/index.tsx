import "./styles.css";

import { useEffect, useState } from "react";

import Card from "../../components/Card";
import { ProductDTO } from "../../models/product";
import * as productService from "../../services/product-service";
import Carrousel from "../../components/Carrousel";

export default function Catalog() {
  const [products, setProducts] = useState<ProductDTO[]>([]);

  useEffect(() => {
    productService.findPageRequest(0, "").then((response) => {
      const nextPage = response.data.content;
      setProducts(products.concat(nextPage));
    });
  }, []);

  return (
    <>
      <div className="test-container">
        <div className="test-banner-container">
          <Carrousel />
        </div>
        <h1 className="test-container-title">FAÇA JÁ O SEU PEDIDO!</h1>
        <div className="test-container-catalog">
          {products.map((product) => (
            <div key={product.id} className="test-card">
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
