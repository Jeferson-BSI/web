import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedBackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedBackTypeProps {
  feedbackType: FeedBackType;
  onFeedBackRestartRequested: () => void;
  onFeedBackSent: () => void;
}

export function FeedBackContentStep({
  feedbackType, 
  onFeedBackRestartRequested, 
  onFeedBackSent
}: FeedBackTypeProps) {

  const feedBackTypeInfo = feedbackTypes[feedbackType];
  const [screenshot, setScreenshot] = useState<String | null>(null);
  const [ comment, setComment ] = useState('');


  function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();
    console.log({comment, screenshot});
    onFeedBackSent();
    return;
  }

  return(
  <>
      <header>
        <button
        onClick={onFeedBackRestartRequested}
        >
          <ArrowLeft weight="bold" className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"/>
        </button>
        <span className="flex items-center gap-2 text-xl leading-6">
          <img className="  w-6 h-6" src={feedBackTypeInfo.image.source} alt={feedBackTypeInfo.image.alt} />
          {feedBackTypeInfo.title}
          </span>
        <CloseButton />
      </header>
      <form className="my-4 w-full">
        <textarea 
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-600 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin" 
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={(event) => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton  
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
          <button 
            type="submit"
            disabled={comment.length === 0}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-bran-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
            onClick={handleSubmitFeedback}
          >
            Enviar
          </button>
        </footer>
      </form>
  </>
  );
}