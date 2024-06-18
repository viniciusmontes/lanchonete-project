export class OrderDTO {
  id?: number;
  items: OrderItemDTO[] = [];

  get total(): number {
    let sum = 0;
    this.items.forEach((item) => {
      sum += item.subTotal;
    });
    return sum;
  }
}

export class OrderItemDTO {
  constructor(
    public productId: number,
    public quantity: number,
    public name: string,
    public price: number,
    public imgUrl: string
  ) {}

  get subTotal(): number {
    return this.price * this.quantity;
  }
}

export type OrderStatus = 'WAITING_PAYMENT' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELED';

export function formatStatus(status: OrderStatus): string {
  const textByStatus: Record<OrderStatus, string> = {
    WAITING_PAYMENT: "Aguardando pagamento",
    PAID: "Pago",
    SHIPPED: "Enviado",
    DELIVERED: "Entregue",
    CANCELED: "Cancelado",
  };

  return textByStatus[status];
}