"use client";

import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlideAddButton } from "@/components/code/slide-add-button";
import { SlideEditor } from "@/components/code/slide-editor";
import { SlidePlay } from "@/components/code/slide-play";
import { SlidePreview } from "@/components/code/slide-preview";

let dummySlides = [
  {
    content: `let i =0;
while (i < 10){
    i++;
}`,
    preview: "/images/preview/slide1.png",
  },
  {
    content: `let i =0;
while (i < 10){
    i++;
    console.log("hello");
}`,
    preview: "/images/preview/slide2.png",
  },
];

export default function PresentationPage() {
  const [slides, setSlides] = useState(dummySlides);
  const [selectedSlide, setSelectedSlide] = useState(0);
  const slideRef = useRef(null);
  const [language, setLanguage] = useState("js");
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (slideRef.current) {
        toPng(slideRef.current)
          .then((dataUrl) => {
            const newSlides = [...slides];
            newSlides[selectedSlide].preview = dataUrl;
            setSlides(newSlides);
          })
          .catch((error) => {
            console.error("oops, something went wrong!", error);
          });
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [slides[selectedSlide]]);

  const addSlide = () => {
    setSlides([...slides, { content: "", preview: "/images/preview/empty.png" }]);
  };

  const removeSlide = (indexToRemove) => {
    if (slides.length === 1) {
      setSlides([
        {
          content: "",
          preview: "/images/preview/empty.png",
        },
      ]);
      setSelectedSlide(0);
    } else {
      const newSlides = slides.filter((_, index) => index !== indexToRemove);
      setSlides(newSlides);
      if (selectedSlide >= newSlides.length) {
        setSelectedSlide(newSlides.length - 1);
      }
    }
  };

  const updateSlide = (indexToUpdate, newContent) => {
    setSlides(
      slides.map((slide, index) =>
        index === indexToUpdate ? { ...slide, content: newContent } : slide,
      ),
    );
  };

  return (
    <div className="m-auto flex h-full max-w-[1400px] items-center gap-20">
      <ScrollArea
        className="flex min-w-[150px] flex-col self-start p-6"
        style={{
          maxHeight: "calc(100vh - 100px)",
          opacity: preview ? 0.5 : 1,
          pointerEvents: preview ? "none" : "auto",
        }}
      >
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Language</SelectLabel>
              <SelectItem value="js">Javascript</SelectItem>
              <SelectItem value="py">Python</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="go">Go</SelectItem>
              <SelectItem value="ts">Typescript</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {slides.map((slide, index) => (
          <SlidePreview
            key={index}
            slide={slide}
            index={index}
            selectedSlide={selectedSlide}
            setSelectedSlide={setSelectedSlide}
            removeSlide={removeSlide}
          />
        ))}
        <SlideAddButton addSlide={addSlide} />
      </ScrollArea>

      <div className="relative mx-auto">
        {preview ? (
          <div className="relative aspect-video w-[48rem]">
            <SlidePlay
              current={selectedSlide}
              slideRef={slideRef}
              slides={slides}
              language={language}
            />
          </div>
        ) : (
          <SlideEditor
            slideRef={slideRef}
            selectedSlide={selectedSlide}
            slides={slides}
            updateSlide={updateSlide}
            language={language}
          />
        )}
        <div className="align-center mt-5 flex w-full justify-center">
          <button
            className={`w-[100px] rounded-md p-2 text-center text-white ${preview ? "bg-red-500" : "bg-blue-500"}`}
            onClick={() => setPreview(!preview)}
          >
            {preview ? "Exit" : "Preview"}
          </button>
        </div>
      </div>
    </div>
  );
}
