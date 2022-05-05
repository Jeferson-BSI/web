import { useState } from "react";
import bugImageUrl from '../../assets/0.svg';
import ideaImageUrl from '../../assets/1.svg';
import thoughtImageUrl from '../../assets/2.svg';
import { FeedBackTypeStep } from "./Steps/FeedBackTypeStep";
import { FeedBackContentStep } from "./Steps/FeedBackContentStep";
import { FeedBackSuccessStep } from "./Steps/FeedBackSuccessStep";


export const feedbackTypes = {
  BUG: {
      title: "Problema",
      image: {
        source: bugImageUrl,
        alt: "Image de um inseto"
      }
  },

  IDEA: {
    title: "Idea",
    image: {
        source: ideaImageUrl,
        alt: "Image de uma lâmpada"
      }
  },

  OTHER: {
    title: "Outro",
      image: {
        source: thoughtImageUrl,
        alt: "Imagem de um balão de pensamento"
      }
  }
}

export type FeedBackType = keyof typeof feedbackTypes;

export function WidgetForm() {

  const [feedBackType, setFeedBackType] = useState<null | FeedBackType>(null);
  const [feedBackSent, setFeedBackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedBackSent(false)
    setFeedBackType(null)
  }

  return(
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      { feedBackSent ? (
        <FeedBackSuccessStep onFeedBackRestartRequested={handleRestartFeedback} />
      ):
        <>
          {!feedBackType ? (
            <FeedBackTypeStep onFeedBackTypeChanged={setFeedBackType} />
          ):
            <FeedBackContentStep 
              feedbackType={feedBackType} 
              onFeedBackRestartRequested={handleRestartFeedback} 
              onFeedBackSent={() => setFeedBackSent(true)}
            />
          }
        </>
      }

      <footer className="text-xs text-neutral-400">
        Feito com * pela <a className="underline underline-offset-2" href="https://rocketseat.com.br"> Rocketseat</a>
      </footer> 
    </div>
  );
}