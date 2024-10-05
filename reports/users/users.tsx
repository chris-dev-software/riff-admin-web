import { useState, FC } from "react";
import { TableHead, TableRow, Pagination } from "@/utils/components/table";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./src/columns-user";
import {
  FiltersProvider,
  ClearFilters,
  ShowAll,
} from "@/utils/context/table-context";
import { UserColumns as Data } from "@/types";

interface UsersProps {
  rows: Data[];
  maxRows?: number;
}

export const Users: FC<UsersProps> = ({ rows: data = [], maxRows = 10 }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: { pageSize: maxRows, pageIndex: 0 },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <FiltersProvider>
      <div className="flex flex-col gap-5">
        <ClearFilters
          className="mt-2 ml-2"
          handleCloseFilters={() => {
            table.getColumn("dni")?.setFilterValue("");
            table.getColumn("name")?.setFilterValue("");
            table.getColumn("last_name")?.setFilterValue("");
            table.getColumn("phone")?.setFilterValue("");
            table.getColumn("rol")?.setFilterValue("");
          }}
        />
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="grid grid-cols-[100px_1fr_1fr_100px_100px_100px_24px] gap-2 px-2 py-1"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="flex items-center h-9 p-0"
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="grid grid-cols-[100px_1fr_1fr_100px_100px_100px_24px] gap-2 px-2 py-1"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className="p-0 h-9 flex items-center truncate"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sin registros.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center gap-4">
        <ShowAll
          className="m-2 mr-0"
          handleCloseFilters={() => {
            table.getColumn("dni")?.setFilterValue("");
            table.getColumn("name")?.setFilterValue("");
            table.getColumn("last_name")?.setFilterValue("");
            table.getColumn("phone")?.setFilterValue("");
            table.getColumn("rol")?.setFilterValue("");
            table.setPageSize(data.length);
          }}
        />
        <Pagination
          countTotal={data.length}
          countPage={table.getState().pagination.pageSize}
          index={table.getState().pagination.pageIndex}
          canNext={table.getCanNextPage()}
          onClickNext={() => table.nextPage()}
          canPrev={table.getCanPreviousPage()}
          onClickPrev={() => table.previousPage()}
        />
      </div>
    </FiltersProvider>
  );
};
