import { useMemo } from "react";
import { type ColumnDef, type OnChangeFn, type SortingState } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2, Eye, ArrowUpDown, Calendar, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
import type { ApplicationListItem, ListApplicationsResponse } from "../application.types";
import { DataTable } from "@/components/DataTable";

type ApplicationsTableProps = {
  data?: ListApplicationsResponse;
  isLoading: boolean;
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onEdit: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function ApplicationsTable({
  data,
  isLoading,
  sorting,
  onSortingChange,
  page,
  pageSize,
  onPageChange,
  onEdit,
  onDelete,
}: ApplicationsTableProps) {
  const columns = useMemo<ColumnDef<ApplicationListItem, any>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name <ArrowUpDown className="h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.name}</span>,
        meta: { className: "w-48" },
      },
      {
        accessorKey: "slug",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Slug <ArrowUpDown className="h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <code className="text-xs text-muted-foreground">{row.original.slug}</code>,
        meta: { className: "w-32" },
      },
      {
        accessorKey: "userCount",
        header: "Users",
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground inline-flex gap-2 items-center">
            <User2 size={16} /> {row.original.userCount}
          </span>
        ),
        meta: { className: "w-20" },
      },
      {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => (
          <div className={row.original.isActive ? "text-emerald-500" : "text-rose-400"}>
            {row.original.isActive ? "Active" : "Inactive"}
          </div>
        ),
        meta: { className: "w-24" },
      },
      {
        accessorKey: "createdAtUtc",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created <ArrowUpDown className="h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground inline-flex gap-2 items-center">
            <Calendar size={16} /> {new Date(row.original.createdAtUtc).toLocaleDateString()}
          </span>
        ),
        meta: { className: "w-32" },
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="bg-linear-to-t from-card to-background font-semibold hover:to-card! text-muted-foreground"
                size="icon"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild className="rounded hover:bg-sidebar!">
                <Link to="/applications/$id" params={{ id: row.original.id }}>
                  <Eye className="mr-2 h-4 w-4 hover:text-sidebar-accent-foreground" /> View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded hover:bg-sidebar!" onClick={() => onEdit(row.original.id)}>
                <Pencil className="mr-2 h-4 w-4 hover:text-sidebar-accent-foreground" /> Edit
              </DropdownMenuItem>
              {onDelete && (
                <DropdownMenuItem
                  className="rounded hover:text-red-500! hover:bg-sidebar!"
                  onClick={() => onDelete(row.original.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4 hover:text-red-500!" /> Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ),
        meta: { className: "w-12" },
      },
    ],
    [onEdit, onDelete]
  );

  return (
    <DataTable
      data={data}
      columns={columns}
      isLoading={isLoading}
      sorting={sorting}
      onSortingChange={onSortingChange}
      page={page}
      pageSize={pageSize}
      onPageChange={onPageChange}
      emptyMessage="No applications found. Create your first application to get started!"
    />
  );
}
