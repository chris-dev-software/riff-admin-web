import { FC } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

export interface MenuOption {
  label: string;
  handleClickOption: () => void;
}

interface MenuOptionsProps {
  options?: MenuOption[];
}

export const MenuOptions: FC<MenuOptionsProps> = ({ options }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex">
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="t-body-medium">
          Opciones
        </DropdownMenuLabel>
        {options?.map(({ label, handleClickOption }) => (
          <DropdownMenuItem
            className="cursor-pointer t-body-small"
            key={label}
            onClick={handleClickOption}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuOptions;
