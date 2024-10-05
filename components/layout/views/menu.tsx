"use client";

import { FC } from "react";
import Link from "next/link";
import { UsersRound, CalendarCheck2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib";

interface MenuProps {}

export const Menu: FC<MenuProps> = () => {
  const pathname = usePathname();

  return (
    <div className="bg-surface-variant flex flex-col gap-4 p-5">
      <Link
        href="/dashboard/users"
        className={cn(
          "flex items-center gap-2 py-2 px-4 rounded-md transition-colors",
          pathname === "/dashboard/users"
            ? "bg-surface-tint"
            : "hover:bg-surface-tint"
        )}
      >
        <UsersRound
          className={cn(
            pathname === "/dashboard/users" ? "text-primary" : "",
            "size-8"
          )}
        />
        <span
          className={cn(
            pathname === "/dashboard/users"
              ? "text-primary"
              : "text-on-background",
            "t-body-large"
          )}
        >
          Usuarios
        </span>
      </Link>

      <Link
        href="/dashboard/schedules"
        className={cn(
          "flex items-center gap-2 py-2 px-4 rounded-md transition-colors",
          pathname === "/dashboard/schedules"
            ? "bg-surface-tint"
            : "hover:bg-surface-tint"
        )}
      >
        <CalendarCheck2
          className={cn(
            pathname === "/dashboard/schedules" ? "text-primary" : "",
            "size-8"
          )}
        />
        <span
          className={cn(
            pathname === "/dashboard/schedules"
              ? "text-primary"
              : "text-on-background",
            "t-body-large"
          )}
        >
          Horarios
        </span>
      </Link>
    </div>
  );
};

export default Menu;
