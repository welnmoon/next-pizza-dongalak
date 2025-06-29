import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@prisma/client";

interface Props {
  openModal: boolean;
  selectedUser: User;
  setOpenModal: (openModal: boolean) => void;
}
const AdminModal = ({ openModal, selectedUser, setOpenModal }: Props) => {
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Подробнее о пользователе</DialogTitle>
          <DialogDescription>{selectedUser.fullName}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AdminModal;
