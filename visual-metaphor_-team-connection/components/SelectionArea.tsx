
import React from 'react';
import { ImageCard, SelectionState } from '../types';
import { PROMPTS } from '../constants';
import { XCircle } from 'lucide-react';

interface SelectionAreaProps {
  selections: SelectionState;
  onRemove: (index: number) => void;
}

export const SelectionArea: React.FC<SelectionAreaProps> = ({ selections, onRemove }) => {
  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md border-b border-slate-200 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <h1 className="text-xl md:text-2xl font-bold text-center text-slate-800 mb-4 font-sans">
          🖼️ 만남의 시간 <span className="font-light text-slate-500 text-sm ml-2 hidden sm:inline">이미지로 말하는 나의 이야기</span>
        </h1>
        
        <div className="grid grid-cols-3 gap-2 md:gap-6">
          {PROMPTS.map((prompt) => {
            const selectedImage = selections[prompt.id as keyof SelectionState];
            
            return (
              <div key={prompt.id} className="flex flex-col items-center">
                <div className={`text-xs md:text-sm font-semibold mb-2 px-2 py-1 rounded-full ${prompt.color} whitespace-nowrap`}>
                  {prompt.id + 1}. {prompt.shortTitle}
                </div>
                
                <div 
                  onClick={() => selectedImage && onRemove(prompt.id)}
                  className={`
                    relative w-full aspect-square max-w-[140px] rounded-xl border-2 
                    flex items-center justify-center cursor-pointer transition-all duration-300 overflow-hidden
                    ${selectedImage 
                      ? 'border-transparent shadow-lg scale-100 bg-white' 
                      : 'border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 scale-95'}
                  `}
                >
                  {selectedImage ? (
                    <>
                      <img 
                        src={`https://loremflickr.com/300/300/${selectedImage.keyword}?lock=${selectedImage.id}`} 
                        alt={selectedImage.label}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center group">
                         <XCircle className="text-white opacity-0 group-hover:opacity-100 w-8 h-8 drop-shadow-md transition-opacity" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] md:text-xs py-1 px-2 text-center truncate">
                        {selectedImage.label}
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-2">
                       <span className="text-2xl md:text-3xl block opacity-30 mb-1">?</span>
                       <p className="text-[10px] md:text-xs text-slate-400 leading-tight hidden sm:block">
                         {prompt.description}
                       </p>
                       <p className="text-[10px] text-slate-400 sm:hidden">선택하기</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
