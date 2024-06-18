import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "./styles.css";

import ButtonIcon from "../../../../components/ButtonIcon";
import { requestBackend } from "../../../../utils/requests";
import { SpringPage } from "../../../../utils/vendor/spring";
import Pagination from "../../../../components/Pagination";
import { convertToBrazilianDateFormat } from "../../../../utils/formatters";
import { OrderStatus, formatStatus } from "../../../../models/order";

type OrderList = {
  id: number;
  moment: string;
  status: string;
};

export default function List() {
  const [page, setPage] = useState<SpringPage<OrderList>>();

  const navigate = useNavigate();

  const getProducts = useCallback((pageNumber: number) => {
    requestBackend({
      url: "/orders",
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

  function handleDelete(productId: number) {
    if (!window.confirm("Tem certeza que deseja deletar ?")) {
      return;
    }

    const config: AxiosRequestConfig = {
      method: "DELETE",
      url: `/orders/${productId}`,
      withCredentials: true,
    };

    requestBackend(config).then(() => {
      toast.info("Pedido excluido com sucesso!");
      getProducts(0); // Refresh the product list after deletion
    });
  }

  function handleUpdateClick(productId: number) {
    navigate(`/admin/products/${productId}`);
  }

  return (
    <div className="orders-list-container form-control">
      <h1>Pedidos</h1>

      <div className="list-container-button">
        <Link to="/admin/products/create">
          <ButtonIcon text="CRIAR NOVO" nameClass="btn-success" />
        </Link>
      </div>

      {page?.content.map((orders) => (
        <div className="list-container-table" key={orders?.id}>
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Momento</th>
                <th>Status</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{orders.id}</td>
                <td>{convertToBrazilianDateFormat(Number(orders.moment))}</td>
                <td>{formatStatus(orders.status as OrderStatus)}</td>

                <td>
                  <button
                    className="btn-primary"
                    onClick={() => handleUpdateClick(Number(orders.id))}
                  >
                    <FaEdit />
                  </button>
                </td>
                <td>
                  <button
                    className="table-btn-danger"
                    onClick={() => handleDelete(Number(orders.id))}
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
