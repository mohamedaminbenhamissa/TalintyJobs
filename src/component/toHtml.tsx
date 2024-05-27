import React from "react";

interface HtmlToPlainTextProps {
  html: string;
}

const HtmlToPlainText: React.FC<HtmlToPlainTextProps> = ({ html }) => {
  const dummyElement = document.createElement("div");
  dummyElement.innerHTML = html;
  const plainText = dummyElement.innerText;

  return <p>{plainText}</p>;
};

export default HtmlToPlainText;