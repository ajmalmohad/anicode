import "highlight.js/styles/base16/dracula.css";

import { useEffect, useRef } from "react";
import hljs from "highlight.js";

export function CodeSnippet({ content, language }) {
  let codeRef = useRef(null);

  useEffect(() => {
    if (codeRef && codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }

    console.log("highlighting code snippet");
  }, [content, language]);

  return (
    <span ref={codeRef} className={`!bg-transparent language-${language}`}>
      {content}
    </span>
  );
}
