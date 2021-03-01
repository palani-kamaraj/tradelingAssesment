import React, { useState, useEffect, useRef } from "react";
import { DropdownOptions } from "../types/enum";
import * as Endpoints from "../../api/Endpoints";
import useAPI from "./useAPI";
import useDebounce from "./useDebounce";
import { DropdownOptionsProps } from "../types";

const APIEndpointMatch = {
  [DropdownOptions.USERS]: Endpoints.USER_LIST,
  [DropdownOptions.REPO]: Endpoints.REPO_LIST,
  [DropdownOptions.ISSUES]: Endpoints.ISSUES_LIST,
};

interface useSearchListResponseProps {
  listItem: any;
  loading: boolean;
  response: any;
  error: string;
  fetchDebounce: boolean;
  searchDebounce: string;
  hasMoreData: boolean;
}

const useSearchList = (
  selectedOption: DropdownOptionsProps,
  searchVal: string
): useSearchListResponseProps => {
  const [listItem, setListItem] = useState<Array<any>>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [scrollEnd, setScrollEnd] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>('');
  const [error, setError] = useState<string>("");
  const listItemRef = useRef<Array<any>>([]);
  const pageCount = 10;
  const query = `${
    APIEndpointMatch[selectedOption as DropdownOptionsProps]
  }?q=${searchVal}&page=${pageIndex}&per_page=${pageCount}&sort=interactions-asc`;
  const { execute, response, loading } = useAPI(query);
  const { total_count } = response || {};
  const searchDebounce = useDebounce(searchText, 500);
  const fetchDebounce = useDebounce(scrollEnd, 1500);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(()=>{
    setSearchText(searchVal);
    if(searchText) {
      setPageIndex(1);
      setHasMoreData(true);
      setListItem([]);
      listItemRef.current = [];
    }
  },[searchVal]);

  useEffect(()=> {
    if(selectedOption){setHasMoreData(false);}
  },[selectedOption])

  useEffect(() => {
    if (searchDebounce && searchDebounce.length > 3) {
      execute();
    }
  }, [searchDebounce]);

  useEffect(() => {
    const loadMoreData = total_count && Math.ceil(total_count/10)*10 >= pageIndex * pageCount;
    if (fetchDebounce) {
      setScrollEnd(false);
      if(loadMoreData){ execute(); } else { setHasMoreData(false) }
    }
  }, [fetchDebounce, pageIndex]);

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
      if(listItemRef && listItemRef.current.length > 0) {
        setScrollEnd(true);
        setIsFetching(true);
        setPageIndex((pageIndex) => pageIndex + 1);
      }
      
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
        let listItemRes = fetchDebounce? [...listItem, ...items] : [...items];
        setIsFetching(false);
        setListItem(listItemRes);
        listItemRef.current = listItemRes;
      } else {
        setListItem([]);
        listItemRef.current = [];
        if (errors || message) {
          let errorMessage = errors || message ? message : "Not Found";
          setError(errorMessage);
        }
      }
    }
  }, [response, loading]);

  return { listItem, loading, response, error, fetchDebounce, searchDebounce, hasMoreData };
};

export default useSearchList;
