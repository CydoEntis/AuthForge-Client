import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import type { SortingState, OnChangeFn } from "@tanstack/react-table";
import { ApplicationsTable } from "@/features/applications/components/ApplicationsTable";
import { useApplications } from "@/features/applications/hooks/useApplications";
import { useUpdateApplication } from "@/features/applications/hooks/useUpdateApplication";
import { useApplication } from "@/features/applications/hooks/useApplication";
import type { CreateApplication } from "@/features/applications/types";
import { BrowserCard } from "@/components/shared/BrowserCard";
import { Avatar } from "@/components/ui/avatar";
import { GoogleLogoIcon, GithubLogoIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/(private)/applications/")({
  component: ApplicationsDashboard,
});

export function ApplicationsDashboard() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([{ id: "createdAt", desc: true }]);

  const pageSize = 10;

  const sortBy = sorting[0]?.id ? sorting[0].id.charAt(0).toUpperCase() + sorting[0].id.slice(1) : "CreatedAt";
  const sortOrder = sorting[0]?.desc ? "Desc" : "Asc";

  const { data, isLoading } = useApplications({
    pageNumber: page,
    pageSize,
    searchTerm: search,
    sortBy: sortBy as "Name" | "Slug" | "CreatedAt" | "UpdatedAt",
    sortOrder: sortOrder as "Asc" | "Desc",
  });

  const { data: editingApplication } = useApplication(editingId);
  const updateMutation = useUpdateApplication(editingId || "");

  const handleUpdateApp = async (formData: CreateApplication) => {
    await updateMutation.mutateAsync(formData);
    setEditingId(null);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    setSorting((old) => (typeof updaterOrValue === "function" ? updaterOrValue(old) : updaterOrValue));
  };

  return (
    <div className="flex flex-col gap-4 p-4 min-h-screen">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
            <p className="text-muted-foreground">Manage your OAuth applications and API clients</p>
          </div>
          <Link to={"/applications/create"}>
            <Button
              className="border border-primary/30 bg-primary/10 text-primary hover:bg-primary/30!"
              onClick={() => console.log("New Application")}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Application
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* {isLoading ? (
          <p>Loading...</p>
        ) : !data || data.items.length === 0 ? (
          <div className="relative flex flex-col justify-center items-center overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
              <div
                className="w-[60vw] h-[40vh]
                           bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-from)_0%,transparent_70%)]
                           from-primary/20
                           blur-3xl scale-y-150 translate-y-5"
              />
            </div>

            <div className="w-16 h-16 bg-primary/10 rounded-full flex justify-center items-center text-primary">
              <Plus size={28} />
            </div>

            <div className="space-y-1 text-center mt-4">
              <p className="text-foreground text-2xl font-semibold">Forge your first secure App</p>
              <p className="text-sm text-muted-foreground mt-1 relative z-10">
                It looks like you don't have any applications yet. <br />
                Start by forging your first app with secure authentication effortlessly.
              </p>
            </div>

            <Button className="border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 mt-4">
              Forge Application <Plus size={22} />
            </Button>
          </div>
        ) : ( */}
        {Array.from({ length: 50 }).map(() => (
          <BrowserCard url="www.authforge.com" isOnline>
            <div className="flex flex-col  px-4 py-2">
              <div className="flex items-center gap-2">
                <Avatar className="rounded bg-sidebar border flex justify-center items-center">A</Avatar>
                <div className="">
                  <h3 className="font-semibold text-sm">Auth Forge</h3>
                  <p className="text-xs text-muted-foreground">auth-forge</p>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <div className="border bg-card py-1 px-2 w-100 rounded-lg">
                  <h3 className="text-xl font-semibold">2187</h3>
                  <p className="text-muted-foreground text-xs">active users</p>
                </div>
                <div className="border bg-card py-1 px-2 w-100 rounded-lg">
                  <h3 className="text-xl font-semibold">12642</h3>
                  <p className="text-muted-foreground text-xs">weekly logins</p>
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <h3 className="text-muted-foreground text-sm">Auth Methods</h3>
                <div className="flex gap-2 mt-1">
                  <div className="p-2 border bg-card rounded">
                    <GoogleLogoIcon size={14} />
                  </div>
                  <div className="p-2 border bg-card rounded">
                    <GithubLogoIcon size={14} />
                  </div>
                  <div className="p-2 border bg-card rounded">
                    <EnvelopeSimpleIcon size={14} />
                  </div>
                </div>
              </div>
            </div>
          </BrowserCard>
        ))}
        {/* <ApplicationsTable
             data={data}
             isLoading={isLoading}
             sorting={sorting}
             onSortingChange={handleSortingChange}
             page={page}
             pageSize={pageSize}
             onPageChange={setPage}
             onEdit={handleEdit}
           /> */}
        {/* )} */}
      </div>
    </div>
  );
}
