import React from "react";
import { ObjectProps } from "../../utils/types";
import { Status } from "../../utils/types/enum";
import StarSvgIcon from "../Icons/StarSvgIcon";
import StatusIcon from "../Icons/StatusIcon";
import Card from "./index";

const IssuesCard = (props: ObjectProps) => {
  const {
    stargazers_count,
    stargazers_url = "",
    user = {},
    language = "",
    body = "",
    title = "",
    url = "",
    status = Status.OPEN,
  } = props;
  const { avatar_url = "", html_url = "", login = "" } = user;
  return (
    <Card>
      <div className="IssuesCard">
        {avatar_url && (
          <div className="flex-vh-center">
            <img src={avatar_url} alt={login} className="circle-img" />
          </div>
        )}
        <div>
          {login && html_url && (
            <div>
              <a
                className="link-heading flex-vh-center"
                href={html_url}
                target="_blank"
              >
                {login}
              </a>
            </div>
          )}
          {title && url && (
            <div>
              <a
                className="flex-vh-center"
                href={url}
                title="title"
                target="_blank"
              >
                {status && (
                  <span
                    className={`${status === Status.OPEN ? "success" : "error"} statusIcon`}
                  >
                    <StatusIcon />
                  </span>
                )}
                <h6 className="title text-center">{title}</h6>
              </a>
            </div>
          )}
          {body && <p className="desc word-break text-center">{body}</p>}
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

export default IssuesCard;
