import { OrderWithUser } from "@/types/admin/Order";

interface Props {
  selectedOrder: OrderWithUser;
}

const OrderInfoTable = ({ selectedOrder }: Props) => {
  return (
    <table className="w-full text-left border border-stone-200 rounded-md overflow-hidden">
      <tbody>
        <tr className="border-b">
          <th className="bg-stone-100 p-2 font-medium w-1/4">Имя</th>
          <td className="p-2">{selectedOrder?.fullName}</td>
        </tr>
        <tr className="border-b">
          <th className="bg-stone-100 p-2 font-medium">Email</th>
          <td className="p-2">{selectedOrder?.email}</td>
        </tr>
        <tr className="border-b">
          <th className="bg-stone-100 p-2 font-medium">Телефон</th>
          <td className="p-2">{selectedOrder?.phone}</td>
        </tr>
        <tr className="border-b">
          <th className="bg-stone-100 p-2 font-medium">Адрес</th>
          <td className="p-2">{selectedOrder?.address}</td>
        </tr>
        <tr className="border-b">
          <th className="bg-stone-100 p-2 font-medium">Статус</th>
          <td className="p-2">{selectedOrder?.status}</td>
        </tr>
        <tr>
          <th className="bg-stone-100 p-2 font-medium">Комментарий</th>
          <td className="p-2">{selectedOrder?.comment || "—"}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderInfoTable;
