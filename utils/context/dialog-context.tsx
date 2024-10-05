"use client";

import {
  FC,
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from "react";
import {
  Dialog as DialogComponent,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface Dialog {
  name: string;
  component: any;
  title?: string;
  description?: string;
}

interface DialogProviderProps extends PropsWithChildren {
  dialogs: Dialog[];
}

interface UseCurrent {
  dialog: string;
  options?: any;
}

export interface DialogContextProps {
  openDialog: <T>(a: string, options: T) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextProps>({
  openDialog: () => undefined,
  closeDialog: () => undefined,
});

const defaultCurrent = {
  dialog: "",
  options: {},
};

export const DialogProvider: FC<DialogProviderProps> = ({
  children,
  dialogs,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [current, setCurrent] = useState<UseCurrent>(defaultCurrent);

  const dialog = dialogs.find(({ name }) => name === current.dialog) || {
    component: () => <></>,
    name: "",
    title: "",
  };

  const onClose = () => {
    setCurrent(defaultCurrent);
    setOpen(false);
  };

  return (
    <DialogContext.Provider
      value={{
        openDialog: (name, options) => {
          const exists = dialogs.map((v) => v.name).includes(name);
          if (exists) {
            setCurrent(() => ({ dialog: name, options }));
            setOpen(true);
          }
        },
        closeDialog: onClose,
      }}
    >
      {children}
      <DialogComponent open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            {dialog.title && <DialogTitle>{dialog.title}</DialogTitle>}
          </DialogHeader>
          <dialog.component {...current.options} />
        </DialogContent>
      </DialogComponent>
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);

export default DialogContext;
