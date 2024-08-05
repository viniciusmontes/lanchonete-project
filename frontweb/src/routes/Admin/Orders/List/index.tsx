import './styles.css';

import { useCallback, useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';

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
  total: number;
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

      <div className="list-container-table">
        {page?.content.length ? (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Momento</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {page.content.map((orders) => (
                  <tr key={orders.id}>
                    <td>{orders.id}</td>
                    <td>
                      {convertToBrazilianDateFormat(Number(orders.moment))}
                    </td>
                    <td>{formatStatus(orders.status as OrderStatus)}</td>
                    <td>
                      <button
                        className="btn-secondary"
                        onClick={() => setSelectedOrder(orders)}
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              pageCount={page ? page.totalPages : 0}
              range={3}
              onChange={getProducts}
            />
            {selectedOrder && (
              <ModalOrder
                order={selectedOrder}
                onDialogAnswer={handleDialogAnswer}
              />
            )}
          </>
        ) : (
          <h1>Nenhum pedido encontrado</h1>
        )}
      </div>
    </div>
  );
}
