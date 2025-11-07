// src/routes/(private)/applications/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import type { SortingState, OnChangeFn } from "@tanstack/react-table";
import ApplicationFormModal from "@/features/applications/components/ApplicationFormModal";
import { ApplicationsTable } from "@/features/applications/components/ApplicationsTable";
import { useApplications } from "@/features/applications/hooks/useApplications";
import { useCreateApplication } from "@/features/applications/hooks/useCreateApplication";
import { useUpdateApplication } from "@/features/applications/hooks/useUpdateApplication";
import { useApplication } from "@/features/applications/hooks/useApplication";
import type { CreateApplication } from "@/features/applications/types";
import { BrowserCard } from "@/components/shared/BrowserCard";
import { BrowserCardGlow } from "@/components/shared/BrowserCardGlow";

export const Route = createFileRoute("/(private)/applications/")({
  component: ApplicationsDashboard,
});

function ApplicationsDashboard() {
  const [modalOpen, setModalOpen] = useState(false);
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

  const { data: editingApplication, isLoading: isLoadingApplication } = useApplication(editingId);

  const createMutation = useCreateApplication();
  const updateMutation = useUpdateApplication(editingId || "");

  const handleCreateApp = async (formData: CreateApplication) => {
    await createMutation.mutateAsync(formData);
    setModalOpen(false);
  };

  const handleUpdateApp = async (formData: CreateApplication) => {
    await updateMutation.mutateAsync(formData);
    setModalOpen(false);
    setEditingId(null);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingId(null);
  };

  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    setSorting((old) => (typeof updaterOrValue === "function" ? updaterOrValue(old) : updaterOrValue));
  };

  return (
    <div className="px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
          <p className="text-muted-foreground">Manage your OAuth applications and API clients</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Application
        </Button>
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

      {/* <div className="container">
        <div className="card">
          <div className="cardimg">
            <img
              src="https://www.estadao.com.br/resizer/v2/QJGR4J7YDBGKPKRJFCG5IM7SDM.jpg?quality=80&auth=7ede915d23741bb62ea2fcc4418712b73e3629199870cf1ae38fc99788456b27&width=1262&height=710&smart=true"
              alt=""
            />
          </div>
          <div className="tag">
            <p>
              <span>Online</span>
            </p>
          </div>
          <div className="curve_one"></div>
          <div className="curve_two"></div>
        </div>
      </div> */}

      <div className="flex gap-4">
        <BrowserCard url="www.authforge.com" name={"Auth Forge"} isOnline>
          <p>Some shits gonna go in here</p>
        </BrowserCard>
        <BrowserCard url="www.example.com" name={"Example App"}>
          <p>Some shits gonna go in here</p>
        </BrowserCard>
      </div>

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

      <ApplicationFormModal
        open={modalOpen}
        onOpenChange={handleCloseModal}
        onSubmit={editingId ? handleUpdateApp : handleCreateApp}
        application={editingApplication || null}
        isLoading={isLoadingApplication}
      />
    </div>
  );
}
