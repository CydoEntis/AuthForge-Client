import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import type { SortingState, OnChangeFn } from "@tanstack/react-table";
import { ApplicationsTable } from "@/features/applications/components/ApplicationsTable";
import type { ApplicationSummary } from "@/features/applications/application.types";

function generateFakeApplications(count: number): ApplicationSummary[] {
  return Array.from({ length: count }).map((_, i) => ({
    applicationId: `app-${i + 1}`,
    name: `Application ${i + 1}`,
    slug: `app-${i + 1}`,
    publicKey: `pk_${Math.random().toString(36).slice(2, 12)}`,
    userCount: Math.floor(Math.random() * 5000),
    isActive: Math.random() > 0.3,
    createdAtUtc: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  }));
}

export const Route = createFileRoute("/(private)/applications/")({
  component: ApplicationsDashboard,
});

export function ApplicationsDashboard() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const data = useMemo(() => {
    const items = generateFakeApplications(50);
    return {
      items,
      totalCount: items.length,
      totalPages: Math.ceil(items.length / pageSize),
      hasNextPage: page < Math.ceil(items.length / pageSize),
      hasPreviousPage: page > 1,
      pageNumber: page,
      pageSize: pageSize,
    };
  }, [page]);

  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    setSorting((old) => (typeof updaterOrValue === "function" ? updaterOrValue(old) : updaterOrValue));
  };

  return (
    <div className="flex flex-col gap-4">
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

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search applications..." className="pl-9" />
        </div>
      </div>

      <ApplicationsTable
        data={data}
        isLoading={false}
        sorting={sorting}
        onSortingChange={handleSortingChange}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onEdit={(id) => console.log("Edit", id)}
      />
    </div>
  );
}
