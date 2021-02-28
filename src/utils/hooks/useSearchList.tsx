import React, { useState, useEffect } from "react";
import { DropdownOptions } from "../types/enum";
import * as Endpoints from "../../api/Endpoints";
import useAPI from "./useAPI";
import useDebounce from "./useDebounce";

const APIEndpointMatch = {
  [DropdownOptions.USERS]: Endpoints.USER_LIST,
  [DropdownOptions.REPO]: Endpoints.REPO_LIST,
  [DropdownOptions.ISSUES]: Endpoints.ISSUES_LIST,
};
type options =
  | DropdownOptions.USERS
  | DropdownOptions.REPO
  | DropdownOptions.ISSUES;

interface useSearchListResponseProps {
  listItem: any;
  loading: boolean;
  response: any;
  error: string;
  searchCondition: boolean;
  isFetching: boolean;
}

const useSearchList = (
  selectedOption: options,
  searchVal: string
): useSearchListResponseProps => {
  const [listItem, setListItem] = useState<any>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [searchCondition, setSearchCondition] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const pageCount = 10;
  const { execute, response, loading } = useAPI(
    `${
      APIEndpointMatch[selectedOption as options]
    }?q=${searchVal}&page=${pageIndex}&per_page=${pageCount}`
  );
  const searchDebounce = useDebounce(searchVal, 500);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchDebounce && searchDebounce.length > 3) {
      execute();
      setSearchCondition(true);
    } else {
      setSearchCondition(false);
    }
  }, [searchDebounce, selectedOption]);

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
    setPageIndex(pageIndex + 1);
    execute();
  };

  useEffect(() => {
    if (!loading && response) {
      const {
        total_count = 0,
        items = [],
        message = "",
        errors = null,
      } = response as any;
      if (total_count && total_count > 0 && items && items.length > 0) {
        setIsFetching(false);
        setListItem(items);
      } else {
        let errorMessage = errors && message ? message : "Not Found";
        setError(errorMessage);
      }
    }
  }, [response, loading]);

  return { listItem, loading, response, error, searchCondition, isFetching };
};

export default useSearchList;
