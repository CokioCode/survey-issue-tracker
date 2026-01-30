"use client";

import { IconDotsVertical } from "@tabler/icons-react";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Survey } from "../types";

const getStatusUsulanBadgeVariant = (status: string | null) => {
  if (!status) return "outline";
  switch (status) {
    case "APPROVED":
      return "default";
    case "NOT_APPROVED":
      return "destructive";
    case "PENDING":
      return "secondary";
    default:
      return "outline";
  }
};

const getStatusIhldBadgeVariant = (status: string | null) => {
  if (!status) return "outline";
  switch (status) {
    case "Active":
      return "default";
    case "Canceled":
      return "destructive";
    case "Pending":
      return "secondary";
    default:
      return "outline";
  }
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatCurrency = (value: number | null) => {
  if (value === null || value === undefined) return "-";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

interface ColumnActions {
  onEdit?: (survey: Survey) => void;
  onDelete?: (survey: Survey) => void;
  onView?: (survey: Survey) => void;
}

export const createSurveyColumns = (
  actions?: ColumnActions,
): ColumnDef<Survey>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => (
      <div className="font-medium text-slate-900">{row.original.no}</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "idKendala",
    header: "ID Kendala",
    cell: ({ row }) => (
      <div className="text-slate-700">{row.original.idKendala || "-"}</div>
    ),
  },
  {
    accessorKey: "namaPelanggan",
    header: "Nama Pelanggan",
    cell: ({ row }) => (
      <div className="font-medium text-slate-900">
        {row.original.namaPelanggan || "-"}
      </div>
    ),
  },
  {
    accessorKey: "jenisOrder",
    header: "Jenis Order",
    cell: ({ row }) => (
      <Badge variant="outline" className="font-medium">
        {row.original.jenisOrder || "-"}
      </Badge>
    ),
  },
  {
    accessorKey: "datel",
    header: "Datel",
    cell: ({ row }) => (
      <div className="text-slate-700">{row.original.datel || "-"}</div>
    ),
  },
  {
    accessorKey: "sto",
    header: "STO",
    cell: ({ row }) => (
      <div className="text-slate-700">{row.original.sto || "-"}</div>
    ),
  },
  {
    accessorKey: "statusUsulan",
    header: "Status Usulan",
    cell: ({ row }) => (
      <Badge
        variant={getStatusUsulanBadgeVariant(row.original.statusUsulan)}
        className="font-medium"
      >
        {row.original.statusUsulan?.replace("_", " ") || "-"}
      </Badge>
    ),
  },
  {
    accessorKey: "statusIhld",
    header: "Status IHLD",
    cell: ({ row }) => (
      <Badge
        variant={getStatusIhldBadgeVariant(row.original.statusIhld)}
        className="font-medium"
      >
        {row.original.statusIhld || "-"}
      </Badge>
    ),
  },
  {
    accessorKey: "rabHldSummary",
    header: "RAB HLD",
    cell: ({ row }) => (
      <div className="text-sm text-slate-700">
        {formatCurrency(row.original.rabHldSummary)}
      </div>
    ),
  },
  {
    accessorKey: "ihld",
    header: "IHLD",
    cell: ({ row }) => (
      <div className="text-sm text-slate-700">
        {formatCurrency(row.original.ihld)}
      </div>
    ),
  },
  {
    accessorKey: "c2r",
    header: "C2R",
    cell: ({ row }) => (
      <div className="text-sm text-slate-700">{row.original.c2r || "-"}</div>
    ),
  },
  {
    accessorKey: "tglInput",
    header: "Tanggal Input",
    cell: ({ row }) => (
      <div className="text-sm text-slate-600">
        {formatDate(row.original.tglInput)}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="text-sm text-slate-600">
        {formatDate(row.original.createdAt)}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={() => actions?.onView?.(row.original)}>
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => actions?.onEdit?.(row.original)}>
            Edit Survey
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => actions?.onDelete?.(row.original)}
          >
            Delete Survey
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export const columns = createSurveyColumns();
