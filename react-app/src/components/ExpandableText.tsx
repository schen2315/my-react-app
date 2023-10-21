import React from "react";

interface Props {
  maxChars: number;
  children: string;
  expanded: boolean;
  onClick: () => void;
}

const ExpandableText = ({ maxChars, children, expanded, onClick }: Props) => {
  if (expanded)
    return (
      <>
        <div>{children}</div>
        <button onClick={onClick}>less</button>
      </>
    );
  return (
    <>
      <div>{children.substring(0, maxChars) + "..."}</div>
      <button onClick={onClick}>more</button>
    </>
  );
};

export default ExpandableText;
