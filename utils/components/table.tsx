import { ChangeEvent, FC, MouseEvent } from "react";
import { Column } from "@tanstack/react-table";
import {
  TableRow as TableRowRoot,
  TableHead as TableHeadRoot,
} from "@/components/ui/table";
import {
  ChevronRight,
  ChevronLeft,
  ArrowDownZA,
  ArrowUpAZ,
  ArrowDownUp,
  ArrowUp01,
  ArrowDown10,
  Search,
} from "lucide-react";
import _ from "lodash";
import { cn } from "@/lib";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const Pagination: FC<{
  countPage: number;
  countTotal: number;
  index: number;
  onClickNext: (_e: MouseEvent<HTMLButtonElement>) => void;
  onClickPrev: (_e: MouseEvent<HTMLButtonElement>) => void;
  canNext: boolean;
  canPrev: boolean;
}> = ({
  countTotal,
  countPage,
  index,
  onClickNext,
  onClickPrev,
  canNext,
  canPrev,
}) => {
  return (
    <div className="flex items-center gap-2">
      <p className="text-body-small">{`${countPage * index + 1}-${
        countPage * (index + 1)
      } de ${countTotal}`}</p>
      <Button
        variant="ghost"
        disabled={!canPrev}
        className={cn(
          "h-8 w-8 p-0 border-2 border-scrim/20 hover:border-outline-variant"
        )}
        onClick={onClickPrev}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        disabled={!canNext}
        className={cn(
          "h-8 w-8 p-0 border-2 border-scrim/20 hover:border-outline-variant"
        )}
        onClick={onClickNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

const TableHead: FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({
  className,
  ...props
}) => {
  return (
    <TableHeadRoot
      className={cn("font-bold text-on-surface-variant", className)}
      {...props}
    />
  );
};

const TableRow: FC<React.HtmlHTMLAttributes<HTMLTableRowElement>> = ({
  className,
  ...props
}) => {
  return (
    <TableRowRoot
      className={cn("text-on-surface-variant even:bg-background", className)}
      {...props}
    />
  );
};

const HeadFilterSelect: FC<{
  label: string;
  filtered: boolean;
  onClick: () => void;
  column: Column<any, unknown>;
  className?: string;
}> = ({ label, filtered, onClick, column, className }) => {
  const values = column
    .getFacetedRowModel()
    .rows.map((i) => i.original[column.id]);

  const options = _.chain(values)
    .groupBy()
    .map((_, k) => k)
    .orderBy([(i) => i.length], ["desc"])
    .value();

  if (filtered) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 cursor-pointer font-normal",
          className
        )}
      >
        <Select onValueChange={(v: any) => column.setFilterValue(v)}>
          <SelectTrigger className="w-[120px] truncate overflow-hidden">
            <SelectValue placeholder={label} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value=" ">{"Todos"}</SelectItem>
              {options.map((item) => (
                <SelectItem key={item} value={item || " "}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 px-1 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {label}
      <Search className="h-4 w-4" />
    </div>
  );
};

const HeadFilterInput: FC<{
  label: string;
  filtered: boolean;
  onClick: () => void;
  toggleSorting?: () => void;
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  sort?: any;
  className?: string;
}> = ({
  label,
  filtered,
  onClick,
  toggleSorting,
  onChangeInput,
  sort,
  className,
}) => {
  const Icon = ({ sort: s }: { sort: any }) => {
    switch (s) {
      case false:
        return <ArrowDownUp />;
      case "asc":
        return <ArrowUpAZ />;
      case "desc":
        return <ArrowDownZA />;
      default:
        return null;
    }
  };

  if (filtered) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 w-full cursor-pointer font-normal",
          className
        )}
      >
        <Input
          className="w-full py-2 bg-transparent border-b-2 border-b-primary"
          onChange={onChangeInput}
          placeholder={label}
        />

        {sort != null && (
          <Button
            variant="ghost"
            className="p-0 w-6 h-8 hover:bg-surface-tint/50"
            onClick={toggleSorting}
          >
            <Icon sort={sort} />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex w-full h-full items-center justify-between gap-2 px-1 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {label}
      <Search className="size-4 min-w-4" />
    </div>
  );
};

const HeadFilterNumber: FC<{
  label: string;
  filtered: boolean;
  onClick: () => void;
  toggleSorting?: () => void;
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  sort?: any;
}> = ({
  label,
  filtered,
  onClick,
  toggleSorting,
  onChangeInput,
  sort,
  className,
}) => {
  const Icon = ({ sort: s }: { sort: any }) => {
    switch (s) {
      case false:
        return <ArrowDownUp />;
      case "asc":
        return <ArrowUp01 />;
      case "desc":
        return <ArrowDown10 />;
      default:
        return null;
    }
  };

  if (filtered) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 cursor-pointer font-normal",
          className
        )}
      >
        <Input
          type="number"
          className="w-24 py-2 bg-transparent border-b-2 border-b-primary"
          onChange={onChangeInput}
          placeholder={`${label} min`}
        />
        {sort != null && (
          <Button
            variant="ghost"
            className="p-0 w-6 h-8 hover:bg-surface-tint/50"
            onClick={toggleSorting}
          >
            <Icon sort={sort} />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 px-1 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {label}
      <Search className="h-4 w-4" />
    </div>
  );
};

interface CellValueProps extends React.HTMLAttributes<HTMLParagraphElement> {
  value: string;
}

const CellValue: FC<CellValueProps> = ({ value, className }) => {
  return <p className={cn("text-center", className)}>{value}</p>;
};

export {
  TableHead,
  TableRow,
  HeadFilterInput,
  HeadFilterSelect,
  HeadFilterNumber,
  Pagination,
  CellValue,
};
