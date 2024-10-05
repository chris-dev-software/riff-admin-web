"use client";

import {
  FC,
  createContext,
  useContext,
  PropsWithChildren,
  useState,
} from "react";
import { Button, ButtonProps as ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib";

interface FiltersProviderProps extends PropsWithChildren {}

interface FiltersContextProps {
  active: boolean;
  handleActiveFilters: () => void;
  handleDisactiveFilters: () => void;
}

const FiltersContext = createContext<FiltersContextProps>({
  active: false,
  handleActiveFilters: () => {},
  handleDisactiveFilters: () => {},
});

export const FiltersProvider: FC<FiltersProviderProps> = ({ children }) => {
  const [active, setActive] = useState<boolean>(false);

  const handleActiveFilters = () => {
    setActive(true);
  };
  const handleDisactiveFilters = () => {
    setActive(false);
  };

  return (
    <FiltersContext.Provider
      value={{
        active,
        handleDisactiveFilters,
        handleActiveFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => useContext(FiltersContext);

interface ClearFiltersProps extends ButtonProps {
  handleCloseFilters?: () => void;
}

export const ClearFilters: FC<ClearFiltersProps> = ({
  handleCloseFilters,
  className,
  children = "Cerrar Filtros",
}) => {
  const { active, handleDisactiveFilters } = useFilters();

  const handleClickEvent = () => {
    handleDisactiveFilters();
    if (handleCloseFilters) {
      handleCloseFilters();
    }
  };

  if (!active) return null;
  return (
    <Button
      className={cn(
        `w-36
        bg-tertiary hover:bg-tertiary/80 text-on-tertiary
        rounded-full`,
        className
      )}
      onClick={handleClickEvent}
    >
      {children}
    </Button>
  );
};

export const ShowAll: FC<ClearFiltersProps> = ({
  handleCloseFilters,
  className,
  children = "Mostrar Todos",
}) => {
  const { handleDisactiveFilters } = useFilters();

  const handleClickEvent = () => {
    handleDisactiveFilters();
    if (handleCloseFilters) {
      handleCloseFilters();
    }
  };

  return (
    <Button
      className={cn(
        `w-36
        bg-tertiary hover:bg-tertiary/80 text-on-tertiary
        rounded-full
        ml-4`,
        className
      )}
      onClick={handleClickEvent}
    >
      {children}
    </Button>
  );
};

export default FiltersContext;
