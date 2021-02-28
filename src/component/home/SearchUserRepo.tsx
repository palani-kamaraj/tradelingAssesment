import React, { useEffect, useState } from 'react';
import Dropdown from '../../common/dropdown';
import GitSvgIcon from '../../common/Icons/GitSvgIcon';
import Input from '../../common/input';
import * as Endpoints from '../../api/Endpoints';
import { DropdownOptions } from '../../utils/types/enum';
import useAPI from '../../utils/hooks/useAPI';
import { replaceStr } from '../../utils/helper';
import Results from './Results';
import './home.scss';
import useDebounce from '../../utils/hooks/useDebounce';

const APIEndpointMatch = {
  [DropdownOptions.USERS]: Endpoints.USER_LIST,
  [DropdownOptions.REPO]: Endpoints.REPO_LIST,
  [DropdownOptions.ISSUES]: Endpoints.ISSUES_LIST,
};

const DropdownOpt = [
  { id: DropdownOptions.USERS, label: 'Users' },
  { id: DropdownOptions.REPO, label: 'Repository' },
  { id: DropdownOptions.ISSUES, label: 'Issues' },
];

const SearchUserRepo: React.FC = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchCondition, setSearchCondition] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOptions>(DropdownOptions.USERS);
  const APIURL = replaceStr(APIEndpointMatch[selectedOption as DropdownOptions], 'SEARCHVALUE', inputValue);
  console.log(APIURL, selectedOption, "APIURL =====")
  const { execute, response, loading } = useAPI(APIURL);
  const searchDebounce = useDebounce(inputValue, 500);

  useEffect(() => {
    console.log(searchDebounce, inputValue, selectedOption, searchDebounce && searchDebounce.length > 3, 'test ===');
    if (searchDebounce && searchDebounce.length > 3) {
      execute();
      setSearchCondition(true);
    } else {
      setInputValue('');
      setSearchCondition(false);
    }
  }, [searchDebounce, selectedOption]);

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
