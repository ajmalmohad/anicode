import { CodeSnippet } from "./code-snippet";

export function SlideCode({ slideRef, content, language }) {
  return (
    <pre
      ref={slideRef}
      className="border-1 border-1 absolute inset-0 -z-10 rounded-md border border-slate-500 bg-slate-900 p-4 font-code"
    >
      <CodeSnippet key={content} content={content} language={language} />
    </pre>
  );
}
