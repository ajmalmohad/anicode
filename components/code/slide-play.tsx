import { useEffect, useState } from "react";
import { diffWords } from "diff";
import { CodeSnippet } from "./code-snippet";

export function SlidePlay({ slideRef, slides, current, language }) {
  const [selectedSlide, setSelectedSlide] = useState(current);
  const [diffedWords, setDiffedWords] = useState<any>([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        handleForward();
      } else if (event.key === "ArrowLeft") {
        handleBackward();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedSlide]);

  useEffect(() => {
    const diffedWords = diffWords("", slides[selectedSlide].content);
    setDiffedWords(diffedWords);
  }, []);

  const handleForward = () => {
    if (selectedSlide === slides.length - 1) return;
    let next = Math.min(slides.length - 1, selectedSlide + 1);
    setSelectedSlide(next);
    const diffedWords = diffWords(
      slides[selectedSlide].content,
      slides[next].content,
    );
    setDiffedWords(diffedWords);
  };

  const handleBackward = () => {
    if (selectedSlide === 0) return;
    let prev = Math.max(0, selectedSlide - 1);
    setSelectedSlide(prev);
    const diffedWords = diffWords(
      slides[selectedSlide].content,
      slides[prev].content,
    );
    setDiffedWords(diffedWords);
  };

  return (
    <div
      ref={slideRef}
      className="border-1 border-1 absolute inset-0 -z-10 rounded-md border border-slate-500 bg-slate-900 p-4 font-code"
    >
      <div>
        <pre
          style={{ backgroundColor: "transparent" }}
          className="bg-transparent font-code"
        >
          <div className="font-code">
            {diffedWords.map((part, index) => {
              return (
                <span
                  key={index}
                  className={`${part.added ? "animate-fade-up" : ""} ${part.removed ? "animate-fade-out fill-mode-forwards" : ""}`}
                >
                  <CodeSnippet
                    key={part.value}
                    content={part.value}
                    language={language}
                  />
                </span>
              );
            })}
          </div>
        </pre>
      </div>
    </div>
  );
}
