"use client";

import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { DeleteDialog } from "@/components/dialog/DeleteDialog";
import { DataTable } from "@/components/table/DataTable";
import { useDelete, useGet, usePost, usePut } from "@/hooks/useApi";
import { useTablePagination } from "@/hooks/useTablePagination";
import { decodeJwt, getCookie } from "@/lib/utils";
import type { ApiResponse } from "@/types";
import { createSurveyColumns } from "../components/SurveryCollumn";
import { SurveyDetailDialog, SurveyDialog } from "../components/SurveyDialog";
import type { Filter, Survey, UpdateSurvey } from "../types";

export const SurveyPage = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);

  const [filters, setFilters] = useState<Filter>({
    rabHild: "",
    statusJt: "APPROVE",
    sto: "",
    tahun: "",
  });

  const token = getCookie("token");
  const decoded = decodeJwt<{
    userId: string;
    username: string;
    role: "ADMIN" | "USER";
    iat: number;
    exp: number;
  }>(token);

  const pagination = useTablePagination(5);

  const buildQueryString = () => {
    const params = new URLSearchParams();
    params.append("page", pagination.page.toString());
    params.append("limit", pagination.pageSize.toString());
    params.append("search", pagination.searchQuery);

    if (filters.statusJt) params.append("statusJt", filters.statusJt);
    if (filters.rabHild) params.append("rabHild", filters.rabHild);
    if (filters.sto) params.append("sto", filters.sto);
    if (filters.tahun) params.append("tahun", filters.tahun);

    return params.toString();
  };

  const isAdmin = decoded?.role === "ADMIN";

  const { data, isLoading } = useGet<{
    success: boolean;
    message: string;
    meta: { page: number; limit: number; total: number };
    data: Survey[];
  }>(
    [
      "survey",
      pagination.page,
      pagination.pageSize,
      pagination.searchQuery,
      filters,
    ],
    `/survey?${buildQueryString()}`,
    { isAuth: true },
  );

  const syncSurveyMutation = usePost<
    ApiResponse<{
      success: boolean;
      message: string;
    }>
  >("/sync", {
    isAuth: true,
    invalidateQueries: [["survey"]],
  });

  const updateSurveyMutation = usePut<ApiResponse<Survey>, UpdateSurvey>(
    `/admin/survey/${selectedSurvey?.nomorNcx}`,
    {
      isAuth: true,
      invalidateQueries: [["survey"]],
    },
  );

  const deleteSurveyMutation = useDelete<ApiResponse<void>>(
    `/admin/survey/${selectedSurvey?.nomorNcx}`,
    {
      isAuth: true,
      invalidateQueries: [["survey"]],
    },
  );

  const handleSync = async () => {
    await syncSurveyMutation.mutateAsync(null);
  };

  const handleFilterChange = (newFilters: Filter) => {
    setFilters(newFilters);
    pagination.handlePageChange(1);
  };

  const handleSubmitSurvey = async (values: UpdateSurvey) => {
    if (selectedSurvey) {
      await updateSurveyMutation.mutateAsync(values);
    }
    handleCloseEditDialog();
  };

  const handleOpenEditDialog = (survey: Survey) => {
    setSelectedSurvey(survey);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedSurvey(null);
  };

  const handleOpenDetailDialog = (survey: Survey) => {
    setSelectedSurvey(survey);
    setIsDetailDialogOpen(true);
  };

  const handleOpenDeleteDialog = (survey: Survey) => {
    setSelectedSurvey(survey);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedSurvey) return;
    await deleteSurveyMutation.mutateAsync(selectedSurvey.nomorNcx);
    setIsDeleteDialogOpen(false);
    setSelectedSurvey(null);
  };

  const surveyColumns = createSurveyColumns({
    onEdit: handleOpenEditDialog,
    onDelete: handleOpenDeleteDialog,
    onView: handleOpenDetailDialog,
    isAdmin,
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
      <DataTable
        title="Survey Data"
        description="Manage and view all survey data"
        columns={surveyColumns}
        data={data?.data ?? []}
        loading={isLoading}
        searchQuery={pagination.searchInput}
        onSearchChange={pagination.handleSearch}
        page={pagination.page}
        pageSize={pagination.pageSize}
        totalRows={data?.meta?.total ?? 0}
        onPageChange={pagination.handlePageChange}
        onPageSizeChange={pagination.handlePageSizeChange}
        onFilterChange={handleFilterChange}
        onCreateClick={handleSync}
        createButtonText={
          syncSurveyMutation.isPending ? (
            <RefreshCw className="animate-spin" />
          ) : (
            <RefreshCw />
          )
        }
        disabled={syncSurveyMutation.isPending}
        isAdmin={isAdmin}
      />

      {isAdmin && selectedSurvey && (
        <SurveyDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSubmit={handleSubmitSurvey}
          survey={selectedSurvey}
        />
      )}

      <SurveyDetailDialog
        isOpen={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        survey={selectedSurvey}
      />

      {isAdmin && (
        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
          userName={selectedSurvey?.namaPelanggan ?? ""}
          isLoading={deleteSurveyMutation.isPending}
        />
      )}
    </div>
  );
};
