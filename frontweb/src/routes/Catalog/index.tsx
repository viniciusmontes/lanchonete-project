import "./styles.css";

import { useEffect, useState } from "react";

import Card from "../../components/Card";
import Carrousel from "../../components/Carrousel";
import { ProductDTO } from "../../models/product";
import * as productService from "../../services/product-service";

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
