import { Highlight } from "prism-react-renderer";

export function SlideCode({ slideRef, content, language }) {
  return (
    <div
      ref={slideRef}
      className="border-1 border-1 absolute inset-0 -z-10 rounded-md border border-slate-500 bg-slate-900 p-4 font-code"
    >
      <Highlight code={content} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            style={{ ...style, backgroundColor: "transparent" }}
            className="bg-transparent font-code"
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
