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
import { Skeleton } from "@/components/ui/skeleton";
import type { PagedResponse } from "@/lib/api/lib.types";
import { Card } from "./ui/card";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    className?: string;
  }
}

type DataTableProps<TData> = {
  data?: PagedResponse<TData>;
  columns: ColumnDef<TData, any>[];
  isLoading?: boolean;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  emptyMessage?: string;
};

export function DataTable<TData>({
  data,
  columns,
  isLoading = false,
  sorting = [],
  onSortingChange,
  page = 1,
  pageSize = 10,
  onPageChange,
  emptyMessage = "No data found.",
}: DataTableProps<TData>) {
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

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (!data || data.items.length === 0) {
    return (
      <Card className=" p-12 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="inset-shadow rounded-xl overflow-hidden border dark:border-black border-[#c7c7c7] p-1">
        <Table className="table-fixed w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-linear-to-t hover:from-card hover:to-background font-semibold text-muted-foreground border-b shadow-bottom dark:border-black border-[#c7c7c7]"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className={header.column.columnDef.meta?.className ?? ""}>
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
                className="hover:bg-card/50 font-semibold text-muted-foreground border-b shadow-bottom dark:border-black border-[#c7c7c7]"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={`py-2 px-4 text-sm ${cell.column.columnDef.meta?.className ?? ""}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, data.totalCount)} of {data.totalCount}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(page - 1)}
              disabled={!data.hasPreviousPage}
            >
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => onPageChange?.(page + 1)} disabled={!data.hasNextPage}>
              Next
            </Button>
          </div>
        </div>
      )}
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
