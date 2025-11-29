import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import type { SortingState, OnChangeFn } from "@tanstack/react-table";
import { ApplicationsTable } from "@/features/applications/components/ApplicationsTable";
import { useApplicationsQuery } from "@/features/applications/hooks/useApplicationsQuery";
import type { ApplicationSortField, SortOrder } from "@/features/applications/application.types";

export const Route = createFileRoute("/(private)/applications/")({
  component: ApplicationsDashboard,
});

export function ApplicationsDashboard() {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const pageSize = 10;

  const getSortParams = (): { sortBy: ApplicationSortField; sortOrder: SortOrder } => {
    if (!sorting.length) {
      return { sortBy: "CreatedAt", sortOrder: "Desc" };
    }

    const sortId = sorting[0].id;
    const sortOrder: SortOrder = sorting[0].desc ? "Desc" : "Asc";

    const sortByMap: Record<string, ApplicationSortField> = {
      name: "Name",
      slug: "Slug",
      createdAtUtc: "CreatedAt",
      updatedAtUtc: "UpdatedAt",
      isActive: "IsActive",
      userCount: "CreatedAt",
    };

    return {
      sortBy: sortByMap[sortId] || "CreatedAt",
      sortOrder,
    };
  };

  const { sortBy, sortOrder } = getSortParams();

  const { data, isLoading } = useApplicationsQuery({
    page,
    pageSize,
    search: search || undefined,
    sortBy,
    sortOrder,
  });

  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    setSorting((old) => (typeof updaterOrValue === "function" ? updaterOrValue(old) : updaterOrValue));
  };

  const handleEdit = (id: string) => {
    navigate({ to: "/applications/$id", params: { id } });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
          <p className="text-muted-foreground">Manage your OAuth applications and API clients</p>
        </div>
        <Link to="/applications/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Application
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <ApplicationsTable
        data={data}
        isLoading={isLoading}
        sorting={sorting}
        onSortingChange={handleSortingChange}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onEdit={handleEdit}
      />
    </div>
  );
}
