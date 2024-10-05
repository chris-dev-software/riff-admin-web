import { Users, AddUser, dialogs } from "@/components/users";
import { DialogProvider } from "@/utils/context/dialog-context";

export default function UsersPage() {
  return (
    <DialogProvider dialogs={dialogs}>
      <div className="p-5 grid grid-rows-[auto_1fr] gap-5">
        <div className="flex items-center gap-5 justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="t-title-large text-on-background">Usuarios</h1>
            <p className="t-label-medium text-on-background">
              En este modulo podras registrar tus usuarios (empleados)
            </p>
          </div>
          <AddUser />
        </div>
        <Users />
      </div>
    </DialogProvider>
  );
}
