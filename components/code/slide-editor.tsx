import { SlideCode } from "./slide-code";

export const SlideEditor = ({
  slideRef,
  selectedSlide,
  slides,
  updateSlide,
  language,
}) => {
  return (
    <div className="relative">
      <textarea
        className="z-100 border-1 relative aspect-video w-[48rem] resize-none rounded-md border border-transparent bg-transparent p-4 font-code text-transparent caret-white hover:outline-none focus:outline-none"
        value={slides[selectedSlide].content}
        onChange={(e) => {
          const newContent = e.target.value;
          const lines = newContent.split("\n");
          const isAnyLineTooLong = lines.some((line) => {
            return line.length > 72;
          });
          if (lines.length <= 16 && !isAnyLineTooLong) {
            updateSlide(selectedSlide, newContent);
          } else {
            console.log("Too many lines or too long lines!");
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            e.preventDefault();
          }
        }}
      />
      <SlideCode
        slideRef={slideRef}
        content={slides[selectedSlide].content}
        language={language}
      />
    </div>
  );
};
