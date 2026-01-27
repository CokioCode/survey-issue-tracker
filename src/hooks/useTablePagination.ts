import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

export interface PaginationState {
  page: number;
  pageSize: number;
  searchQuery: string;
}

export const useTablePagination = (initialPageSize = 5) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [searchInput, setSearchInput] = useState("");
  const searchQuery = useDebounce(searchInput, 500);

  const handleSearch = (value: string) => {
    setSearchInput(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const reset = () => {
    setPage(1);
    setPageSize(initialPageSize);
    setSearchInput("");
  };

  return {
    page,
    pageSize,
    searchQuery,
    searchInput,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    reset,
  };
};
