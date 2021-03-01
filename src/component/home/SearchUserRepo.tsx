import React, { useState } from "react";
import Dropdown from "../../common/dropdown";
import GitSvgIcon from "../../common/Icons/GitSvgIcon";
import Input from "../../common/input";
import BounceLoader from "../../common/loader/BounceLoader";
import useSearchList from "../../utils/hooks/useSearchList";
import { DropdownOptions } from "../../utils/types/enum";
import Results from "./Results";
import "./home.scss";
import NotFoundSvgIcon from "../../common/Icons/NotFoundSvgIcon";

const DropdownOpt = [
  { id: DropdownOptions.USERS, label: "Users" },
  { id: DropdownOptions.REPO, label: "Repository" },
  { id: DropdownOptions.ISSUES, label: "Issues" },
];

const SearchUserRepo: React.FC = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<DropdownOptions>(
    DropdownOptions.USERS
  );
  const {
    listItem,
    loading,
    response,
    error,
    fetchDebounce,
    searchDebounce,
    hasMoreData,
  } = useSearchList(selectedOption, inputValue);
  const { total_count } = response || {};

  const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const onChangeDropdown = (val: any) => {
    setSelectedOption(val?.id);
    setInputValue("");
  };

  return (
    <div
      className={`Home ${
        searchDebounce && searchDebounce.length > 3 ? "" : "center-block"
      }`}
    >
      <div className="SearchUserRepo">
        <div className="title-wrapper">
          <div className="flex-align-center">
            <GitSvgIcon />
            <div className="heading">
              <h2>GitHub Searcher</h2>
              <p className="grey">Search users or respositories below</p>
            </div>
          </div>
          <div className="field-wrapper flex-align-center">
            <Input
              placeholder="Start typing to seach .."
              onChange={onChangeInput}
              value={inputValue}
            />
            <Dropdown
              options={DropdownOpt}
              optionKey="label"
              defaultValue={DropdownOpt[0].label}
              onChange={onChangeDropdown}
            />
          </div>
        </div>

        {error ? (
          <>{searchDebounce && <NotFoundSvgIcon title={error} />}</>
        ) : (
          <>
            {listItem && listItem.length > 0 && (
              <Results listItem={listItem} selectedOption={selectedOption} />
            )}
            {total_count && total_count === 0 ? (
              <NotFoundSvgIcon title={"Not Found"} />
            ) : null}
          </>
        )}
      </div>
      {fetchDebounce && (
        <div className="scroll-loader">
          <BounceLoader />
        </div>
      )}
      {!fetchDebounce && !hasMoreData && listItem && listItem.length > 0 && (
        <div className="scroll-loader">
          <h4>No more Data to load ...</h4>
        </div>
      )}
    </div>
  );
};

export default SearchUserRepo;
