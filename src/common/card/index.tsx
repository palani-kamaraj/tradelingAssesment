import React, { ReactNode } from "react";
import "./card.scss";

interface CardProps {
  children: ReactNode;
}

const Card = (props: CardProps) => {
  const { children } = props;
  return <div className="Card">{children}</div>;
};

export default Card;
