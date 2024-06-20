import './styles.css';

import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { IoTrashBin } from 'react-icons/io5';
import { toast } from 'react-toastify';

import Pagination from '../../../../components/Pagination';
import { formatStatus, OrderItemDTO, OrderStatus } from '../../../../models/order';
import { convertToBrazilianDateFormat } from '../../../../utils/formatters';
import { requestBackend } from '../../../../utils/requests';
import { SpringPage } from '../../../../utils/vendor/spring';
import ModalOrder from '../ModalOrder';

export type OrderList = {
  id: number;
  moment: string;
  status: string;
  items: OrderItemDTO[];
  total : number;
};

export default function List() {
  
  const [page, setPage] = useState<SpringPage<OrderList>>();

  const [selectedOrder, setSelectedOrder] = useState<OrderList | null>(null);

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

  function handleDialogAnswer(answer: boolean) {
    if (answer) {
      // Execute some action if needed
    }
    setSelectedOrder(null); // Close the modal
  }

  return (
    <div className="orders-list-container form-control">
      <div className="orders-list-title">
        <h1>Pedidos</h1>
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
                    className="btn-secondary"
                    onClick={() => setSelectedOrder(orders)}
                  >
                    <FaEye />
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
      {selectedOrder && (
        <ModalOrder order={selectedOrder} onDialogAnswer={handleDialogAnswer} />
      )}
    </div>
  );
}
