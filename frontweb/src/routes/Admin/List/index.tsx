import "./styles.css";

import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { toast } from "react-toastify";

import { ProductDTO } from "../../../models/product";
import { formatPrice } from "../../../utils/formatters";
import { requestBackend } from "../../../utils/requests";
import { useNavigate } from "react-router";
import Pagination from "../../../components/Pagination";
import { SpringPage } from "../../../utils/vendor/spring";
import ButtonIcon from "../../../components/ButtonIcon";
import { Link } from "react-router-dom";

export default function List() {
  const [page, setPage] = useState<SpringPage<ProductDTO>>();

  const navigate = useNavigate();

  const getProducts = useCallback((pageNumber: number) => {
    requestBackend({
      url: "/products",
      params: {
        page: pageNumber,
        size: 5,
      },
    }).then((response) => {
      setPage(response.data);
    });
  }, []);

  useEffect(() => {
    getProducts(0);
  }, [getProducts]);

  function limitText(text: string) {
    const cut = text.substring(0, 14).concat("...");
    return cut;
  }

  function handleDelete(productId: number) {
    if (!window.confirm("Tem certeza que deseja deletar ?")) {
      return;
    }

    const config: AxiosRequestConfig = {
      method: "DELETE",
      url: `/products/${productId}`,
      withCredentials: true,
    };

    requestBackend(config).then(() => {
      toast.info("Produto excluido com sucesso!");
      getProducts(0); // Refresh the product list after deletion
    });
  }

  function handleUpdateClick(productId: number) {
    navigate(`/admin/products/${productId}`);
  }

  return (
    <div className="list-container form-control">
      <h1>Lista</h1>

      <div className="list-container-button">
        <Link to="/admin/products/create">
          <ButtonIcon text="CRIAR NOVO" nameClass="btn-success" />
        </Link>
      </div>

      {page?.content.map((products) => (
        <div className="list-container-table" key={products?.id}>
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th></th>
                <th>Nome</th>
                <th>Preço</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{products.id}</td>
                <td>
                  <img src={products.imgUrl} alt="" />
                </td>
                <td>{limitText(products.name)}</td>
                <td>R$ {formatPrice(products.price)}</td>
                <td>
                  <button
                    className="btn-primary"
                    onClick={() => handleUpdateClick(Number(products.id))}
                  >
                    <FaEdit />
                  </button>
                </td>
                <td>
                  <button
                    className="table-btn-danger"
                    onClick={() => handleDelete(Number(products.id))}
                  >
                    <IoTrashBin />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      <Pagination
        pageCount={page ? page.totalPages : 0}
        range={3}
        onChange={getProducts}
      />
    </div>
  );
}
