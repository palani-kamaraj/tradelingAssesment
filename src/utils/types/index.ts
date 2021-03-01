import { DropdownOptions } from "./enum";

export type DropdownOptionsProps =
  | DropdownOptions.USERS
  | DropdownOptions.REPO
  | DropdownOptions.ISSUES;

export interface ObjectProps {
  [key: string]: any;
}

export type UserDetailsProps = {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  score: 1;
  site_admin: false;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
};
