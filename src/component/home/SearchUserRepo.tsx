import React, { useState } from 'react';
import Dropdown from '../../common/dropdown';
import GitSvgIcon from '../../common/Icons/GitSvgIcon';
import Input from '../../common/input';
import useSearchList from '../../utils/hooks/useSearchList';
import { DropdownOptions } from '../../utils/types/enum';
import './home.scss';

const DropdownOpt = [
  { id: DropdownOptions.USERS, label: 'Users' },
  { id: DropdownOptions.REPO, label: 'Repository' },
  { id: DropdownOptions.ISSUES, label: 'Issues' },
];

const SearchUserRepo: React.FC = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<DropdownOptions>(DropdownOptions.USERS);
  const { listItem, loading, response, error, searchCondition, isFetching } = useSearchList(selectedOption, inputValue);
  console.log(response, "response =====")

  const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const onChangeDropdown = (val: any) => {
    setSelectedOption(val?.id);
  };

  return (
    <div className={`Home ${searchCondition ? '' : 'center-block'}`}>
      <div className="SearchUserRepo">
        <div className="flex-align-center">
          <GitSvgIcon />
          <div className="heading">
            <h2>GitHub Searcher</h2>
            <p className="grey">Search users or respositories below</p>
          </div>
        </div>
        <div className="field-wrapper flex-align-center">
          <Input placeholder="Start typing to seach .." onChange={onChangeInput} />
          <Dropdown
            options={DropdownOpt}
            optionKey="label"
            defaultValue={DropdownOpt[0].label}
            onChange={onChangeDropdown}
          />
        </div>
        {/* <Results /> */}
      </div>
    </div>
  );
};

export default SearchUserRepo;
