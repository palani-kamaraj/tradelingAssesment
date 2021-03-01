import React from "react";
import { UserDetailsProps } from "../../utils/types";
import Card from "./index";

const UserCard = (props: UserDetailsProps) => {
  const { avatar_url = "", login = "", html_url = "" } = props;
  return (
    <Card>
      <div className="UserCard">
        {avatar_url && (
          <div className="flex-vh-center">
            <img src={avatar_url} alt="" className="circle-img" />
          </div>
        )}
        <div>
          {html_url && (
            <a className="link-heading flex-vh-center" href={html_url} target="_blank">
              {login}
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
