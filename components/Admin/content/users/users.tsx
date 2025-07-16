"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { User } from "@prisma/client";
import { useState } from "react";
import UserModal from "./user-modal";

interface Props {
  users: User[];
  ordersByUser: Record<string, number>;
  orderSumsByUser: Record<string, number>;
}

const Users = ({ users, ordersByUser, orderSumsByUser }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [updatedUsers, setUpdatedUsers] = useState(users);

  const handleOpenModal = (user: User) => {
    console.log(user);
    setSelectedUser(user);
    setOpenModal(true);
  };

  const updateUser = (updatedUser: User) => {
    setUpdatedUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Пользователи</h2>

      <Table>
        <TableCaption>
          Список зарегистрированных пользователей и их активность
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ФИО</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Телефон</TableHead>
            <TableHead>Роль</TableHead>
            <TableHead className="text-right">Кол-во заказов</TableHead>
            <TableHead className="text-right">Сумма заказов (₸)</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {updatedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone || "-"}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="text-right">
                {ordersByUser[user.id] || 0}
              </TableCell>
              <TableCell className="text-right">
                {orderSumsByUser[user.id]?.toLocaleString("ru-RU") || "0"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end items-center gap-2">
                  <FaPen
                    onClick={() => handleOpenModal(user)}
                    color="gray"
                    className="cursor-pointer"
                  />
                  <MdDelete color="red" className="cursor-pointer" size={17} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedUser && (
        <UserModal
          openModal={openModal}
          selectedUser={selectedUser!}
          setOpenModal={setOpenModal}
          updateUser={updateUser}
        />
      )}
    </div>
  );
};

export default Users;
