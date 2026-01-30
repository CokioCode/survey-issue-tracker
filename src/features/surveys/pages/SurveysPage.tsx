"use client";

import { useState } from "react";
import { DeleteDialog } from "@/components/dialog/DeleteDialog";
import { DataTable } from "@/components/table/DataTable";
import { useDelete, useGet, usePost, usePut } from "@/hooks/useApi";
import { useTablePagination } from "@/hooks/useTablePagination";
import type { ApiResponse } from "@/types";
import { createSurveyColumns } from "../components/SurveryCollumn";
import { SurveyDialog } from "../components/SurveyDialog";
import type { Survey, UpdateSurvey } from "../types";

export const SurveyPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);

  const pagination = useTablePagination(10);

  const { data, isLoading } = useGet<{
    success: boolean;
    message: string;
    meta: { page: number; limit: number; total: number };
    data: Survey[];
  }>(
    ["survey", pagination.page, pagination.pageSize, pagination.searchQuery],
    `/survey?page=${pagination.page}&limit=${pagination.pageSize}&search=${pagination.searchQuery}&statusJt=NOT_APPROVE`,
    { isAuth: true },
  );

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

  const handleSubmitSurvey = async (values: UpdateSurvey) => {
    if (selectedSurvey) {
      await updateSurveyMutation.mutateAsync(values);
    }
    handleCloseDialog();
  };

  const handleOpenDialog = (survey: Survey) => {
    setSelectedSurvey(survey);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedSurvey(null);
  };

  const handleOpenViewDialog = (survey: Survey) => {
    setSelectedSurvey(survey);
    setIsViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setIsViewDialogOpen(false);
    setSelectedSurvey(null);
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
    onEdit: handleOpenDialog,
    onDelete: handleOpenDeleteDialog,
    onView: handleOpenViewDialog,
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
      <DataTable
        title="Survey Data"
        description="Manage and view all survey data with NOT_APPROVE status"
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
      />

      {selectedSurvey && (
        <SurveyDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={handleSubmitSurvey}
          survey={selectedSurvey}
        />
      )}

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        userName={selectedSurvey?.namaPelanggan ?? ""}
        isLoading={deleteSurveyMutation.isPending}
      />
    </div>
  );
};
