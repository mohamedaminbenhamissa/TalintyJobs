const HtmlToPlainText = ({ html }) => {
    const dummyElement = document.createElement("div");
    dummyElement.innerHTML = html;
    const plainText = dummyElement.innerText;
  
    return <p>{plainText}</p>;
  };
  
  export default HtmlToPlainText;