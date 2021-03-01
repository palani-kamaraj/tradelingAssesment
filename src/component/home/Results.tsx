import React from "react";
import UserCard from "../../common/card/Usercard";
import { DropdownOptions } from "../../utils/types/enum";
import { DropdownOptionsProps, UserDetailsProps } from "../../utils/types";
import RepoCard from "../../common/card/RepoCard";
import IssuesCard from "../../common/card/IssuesCard";

interface CardListProps {
  listItem: Array<UserDetailsProps>;
  selectedOption: DropdownOptionsProps;
}

const CardList = (props: CardListProps) => {
  const { listItem = [], selectedOption = DropdownOptions.USERS } = props;
  return (
    <div className="Results">
      <div className="row">
        {listItem &&
          listItem.length > 0 &&
          listItem.map((list: any, index: number) => {
            return (
              <div key={index + "col"} className="col">
                {selectedOption === DropdownOptions.USERS &&
                  <UserCard {...list} />
                }
                {selectedOption === DropdownOptions.REPO &&
                  <RepoCard {...list} />
                }
                {selectedOption === DropdownOptions.ISSUES &&
                  <IssuesCard {...list} />
                }
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CardList;
