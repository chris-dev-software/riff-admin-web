import { ColumnDef } from "@tanstack/react-table";
import { UserColumns as Columns } from "@/types";
import { HeadFilterInput, CellValue } from "@/utils/components/table";
import { useFilters } from "@/utils/context/table-context";
import { useDialog } from "@/utils/context/dialog-context";
import MenuOptions, { MenuOption } from "@/utils/components/menu";

//import { useDeleteUser } from "@/hooks";

export const columns: ColumnDef<Columns>[] = [
  {
    accessorKey: "dni",
    header: ({ column }) => {
      const { active, handleActiveFilters } = useFilters();
      return (
        <HeadFilterInput
          label="DNI"
          className="t-title-small"
          onClick={handleActiveFilters}
          filtered={active}
          onChangeInput={(e) => column.setFilterValue(e.target.value)}
        />
      );
    },
    cell: ({ row }) => {
      const { dni } = row.original;
      return <CellValue value={dni} />;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      const { active, handleActiveFilters } = useFilters();
      return (
        <HeadFilterInput
          className="t-title-small"
          label="Nombres"
          onClick={handleActiveFilters}
          filtered={active}
          onChangeInput={(e) => column.setFilterValue(e.target.value)}
        />
      );
    },
    cell: ({ row }) => {
      const { name } = row.original;
      return <CellValue value={name} />;
    },
  },
  {
    accessorKey: "last_name",
    header: ({ column }) => {
      const { active, handleActiveFilters } = useFilters();
      return (
        <HeadFilterInput
          className="t-title-small"
          label="Apellidos"
          onClick={handleActiveFilters}
          filtered={active}
          onChangeInput={(e) => column.setFilterValue(e.target.value)}
        />
      );
    },
    cell: ({ row }) => {
      const { last_name } = row.original;
      return <CellValue value={last_name} />;
    },
  },
  {
    accessorKey: "phone",
    header: () => (
      <div className="t-title-small w-full text-center">Telefono</div>
    ),
    cell: ({ row }) => {
      const { phone } = row.original;
      return <CellValue className="w-full" value={phone} />;
    },
  },
  {
    accessorKey: "rol",
    header: () => <div className="t-title-small w-full text-center">Rol</div>,
    cell: ({ row }) => {
      const { rol } = row.original;
      return <CellValue className="w-full" value={rol} />;
    },
  },
  {
    accessorKey: "salary",
    header: () => (
      <div className="t-title-small w-full text-center">Salario</div>
    ),
    cell: ({ row }) => {
      const { salary } = row.original;
      return <CellValue className="w-full" value={String(salary)} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { openDialog } = useDialog();
      //const [deleteSupply] = useDeleteUser();
      const { id } = row.original;

      const options: MenuOption[] = [
        {
          label: "Editar",
          handleClickOption: () =>
            openDialog("edit-user", {
              userID: id,
            }),
        },
        {
          label: "Eliminar",
          handleClickOption: () => {},
        },
      ];

      return <MenuOptions options={options} />;
    },
  },
];
