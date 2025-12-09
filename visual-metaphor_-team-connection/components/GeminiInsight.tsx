import React, { useState } from 'react';
import { SelectionState } from '../types';
import { generateInsight } from '../services/geminiService';
import { Sparkles, Loader2, MessageCircleQuestion } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface GeminiInsightProps {
  selections: SelectionState;
}

export const GeminiInsight: React.FC<GeminiInsightProps> = ({ selections }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isComplete = selections[0] !== null && selections[1] !== null && selections[2] !== null;

  const handleAnalyze = async () => {
    if (!isComplete) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await generateInsight(selections);
      setInsight(result);
    } catch (err) {
      setError("AI 분석을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  if (!isComplete && !insight) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 pb-12">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 md:p-8 shadow-sm border border-indigo-100">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-xl font-bold text-indigo-900 mb-2 flex items-center gap-2">
            <Sparkles className="text-indigo-500" />
            AI 퍼실리테이터의 통찰
          </h3>
          <p className="text-indigo-700/80 mb-6 text-sm md:text-base">
            3장의 카드를 모두 선택하셨군요! AI가 여러분의 선택을 바탕으로 대화를 여는 질문을 선물해 드립니다.
          </p>

          {!insight && (
            <button
              onClick={handleAnalyze}
              disabled={loading || !isComplete}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white shadow-md transition-all
                ${loading 
                  ? 'bg-indigo-300 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:scale-105 active:scale-95'}
              `}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  분석 중입니다...
                </>
              ) : (
                <>
                  <MessageCircleQuestion />
                  이야기 주제 받기
                </>
              )}
            </button>
          )}
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg text-center text-sm">
            {error}
          </div>
        )}

        {insight && (
          <div className="mt-8 prose prose-indigo max-w-none bg-white p-6 rounded-xl shadow-sm border border-indigo-50/50 animate-fadeIn">
            <ReactMarkdown>{insight}</ReactMarkdown>
            
            <button 
              onClick={() => setInsight(null)}
              className="mt-6 text-sm text-slate-400 hover:text-indigo-600 underline"
            >
              다시 분석하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};