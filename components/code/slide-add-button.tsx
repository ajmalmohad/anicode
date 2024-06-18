import { Plus } from "lucide-react";

export const SlideAddButton = ({ addSlide }) => {
  return (
    <div
      className={`my-4 flex aspect-video w-24 flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-md border-2 border-green-600`}
      onClick={addSlide}
    >
      <Plus size={24} />
    </div>
  );
};