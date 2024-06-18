import { Trash2 } from "lucide-react";

export const SlidePreview = ({ slide, index, selectedSlide, setSelectedSlide, removeSlide }) => {
  return (
    <div key={index} className={`relative`}>
      <div
        className={`relative my-4 aspect-video w-24 flex-shrink-0 overflow-hidden rounded-md border-2 ${selectedSlide === index ? "border-blue-500" : "border-gray-600"} cursor-pointer`}
        onClick={() => setSelectedSlide(index)}
      >
        <img
          src={slide.preview || "/images/preview.png"}
          alt="Slide preview"
        />
        <button
          className="text-2 absolute right-2 top-2"
          onClick={(e) => {
            e.stopPropagation();
            removeSlide(selectedSlide);
          }}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};