import { useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type SortingState,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2, Eye, ArrowUpDown, Calendar, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import type { PagedResponse } from "@/lib/api/types";
import type { ApplicationSummary } from "../types";

type ApplicationsTableProps = {
  data?: PagedResponse<ApplicationSummary>;
  isLoading: boolean;
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onEdit: (id: string) => void;
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
}: ApplicationsTableProps) {
  const columns = useMemo<ColumnDef<ApplicationSummary>[]>(
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
        cell: ({ row }) => <span className=" text-xs text-muted-foreground">{row.original.name}</span>,
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
        cell: ({ row }) => <code className=" text-xs text-muted-foreground">{row.original.slug}</code>,
      },
      {
        accessorKey: "publicKey",
        header: "Public Key",
        cell: ({ row }) => <code className=" text-xs text-muted-foreground">{row.original.publicKey}</code>,
      },
      {
        accessorKey: "userCount",
        header: "Users",
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground inline-flex gap-2 items-center">
            <User2 size={16} /> {row.original.userCount}
          </span>
        ),
      },
      {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => (
          <div
            className={`
              ${row.original.isActive ? " text-emerald-500" : " text-rose-400"}
            `}
          >
            {row.original.isActive ? "Active" : "Inactive"}
          </div>
        ),
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
                <Link to="/applications/$id" params={{ id: row.original.applicationId }}>
                  <Eye className="mr-2 h-4 w-4 hover:text-sidebar-accent-foreground" /> View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="rounded hover:bg-sidebar!"
                onClick={() => onEdit(row.original.applicationId)}
              >
                <Pencil className="mr-2 h-4 w-4 hover:text-sidebar-accent-foreground" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded hover:text-red-500! hover:bg-sidebar!">
                <Trash2 className="mr-2 h-4 w-4 hover:text-red-500!" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [onEdit]
  );

  const table = useReactTable({
    data: data?.items ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,
    pageCount: data?.totalPages ?? 0,
    state: { sorting },
    onSortingChange,
  });

  if (isLoading) return <TableSkeleton />;

  if (!data || data.items.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="inset-shadow rounded-xl overflow-hidden border dark:border-black border-[#c7c7c7] p-1">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-linear-to-t hover:from-card hover:to-background font-semibold  text-muted-foreground border-b  shadow-bottom dark:border-black border-[#c7c7c7]"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-foreground">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-linear-to-t hover:from-card hover:to-background font-semibold  text-muted-foreground border-b  shadow-bottom dark:border-black border-[#c7c7c7]"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-2 px-4 text-sm ">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <p>
          Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, data.totalCount)} of {data.totalCount}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onPageChange(page - 1)} disabled={!data.hasPreviousPage}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => onPageChange(page + 1)} disabled={!data.hasNextPage}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-lg" />
      ))}
    </div>
  );
}
