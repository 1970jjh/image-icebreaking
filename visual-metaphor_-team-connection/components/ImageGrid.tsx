import React from 'react';
import { ImageCard, SelectionState } from '../types';
import { IMAGE_CARDS } from '../constants';
import { Check, RefreshCw } from 'lucide-react';

interface ImageGridProps {
  selections: SelectionState;
  onSelect: (image: ImageCard) => void;
  imageSeed: number;
  onRefresh: () => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ selections, onSelect, imageSeed, onRefresh }) => {
  // Check if an image is already selected in any slot
  const isSelected = (id: string) => {
    return (Object.values(selections) as (ImageCard | null)[]).some((card) => card?.id === id);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-daylight-border pb-6">
        <div>
          <h2 className="text-3xl font-serif font-medium text-daylight-text mb-2">
            Select an Image
          </h2>
          <p className="text-daylight-subtle font-sans">
            Choose an image that resonates with the questions above.
          </p>
        </div>
        
        <button 
          onClick={onRefresh}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-daylight-border text-daylight-text hover:border-daylight-accent hover:text-daylight-accent transition-all shadow-sm font-sans text-sm font-medium group"
        >
          <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
          Refresh Images
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {IMAGE_CARDS.map((card) => {
          const selected = isSelected(card.id);
          
          return (
            <button
              key={`${card.id}-${imageSeed}`}
              onClick={() => !selected && onSelect(card)}
              disabled={selected}
              className={`
                group relative aspect-square rounded-xl overflow-hidden transition-all duration-300
                ${selected 
                  ? 'opacity-40 grayscale cursor-default ring-1 ring-daylight-border' 
                  : 'hover:shadow-xl hover:-translate-y-1 cursor-pointer bg-white shadow-sm ring-1 ring-transparent hover:ring-daylight-border'}
              `}
              aria-label={card.label}
              title={card.label}
            >
              <img 
                src={`https://loremflickr.com/400/400/${card.keyword}?lock=${card.id}-${imageSeed}`}
                alt={card.label}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter sepia-[0.15]"
              />
              
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-end">
                  <span className="text-white text-xs font-medium font-serif">{card.label}</span>
              </div>
              
              {/* Selected Indicator */}
              {selected && (
                <div className="absolute inset-0 flex items-center justify-center bg-daylight-bg/20 backdrop-blur-[1px]">
                  <div className="bg-daylight-text text-white rounded-full p-2 shadow-lg">
                    <Check size={20} strokeWidth={2.5} />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};