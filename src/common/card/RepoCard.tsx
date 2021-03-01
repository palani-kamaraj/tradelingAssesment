import React from "react";
import { formatDate } from "../../utils/helper";
import { ObjectProps } from "../../utils/types";
import StarSvgIcon from "../Icons/StarSvgIcon";
import Card from "./index";
import "./card.scss";

const RepoCard = (props: ObjectProps) => {
  const {
    full_name = "",
    stargazers_count,
    stargazers_url = "",
    html_url = "",
    description = "",
    owner = {},
    language = "",
  } = props;
  const { avatar_url = "", login = "" } = owner;
  return (
    <Card>
      <div className="RepoCard">
        {avatar_url && (
          <div className="flex-vh-center">
            <img src={avatar_url} alt={login} className="circle-img" />
          </div>
        )}
        <div>
          {full_name && html_url && (
            <a
              className="link-heading flex-vh-center"
              href={html_url}
              target="_blank"
            >
              {full_name}
            </a>
          )}
          {description && <p className="desc word-break">{description}</p>}
          <div className="count-wrapper">
            {stargazers_count ? (
              <div className="flex-vh-center">
                <StarSvgIcon /> &nbsp; &nbsp;
                <a href={stargazers_url} target="_blank">
                  {stargazers_count}
                </a>
              </div>
            ) : null}
            {language && <p>{language}</p>}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RepoCard;
