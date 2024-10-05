import { FC } from "react";
import {
  Input as InputBase,
  InputProps as InputBaseProps,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";

import { cn } from "@/lib";

interface InputProps extends InputBaseProps {
  label?: string;
}

export const Input: FC<InputProps> = ({ label, className, type, ...field }) => {
  return (
    <FormItem className={className}>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <InputBase
          className={cn(
            "h-9 w-full px-2",
            "rounded-[5px] border border-surface-variant",
            "t-body-small text-secondary",
            "t-body-medium",
            ""
          )}
          placeholder="Escriba..."
          type={type}
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default Input;
