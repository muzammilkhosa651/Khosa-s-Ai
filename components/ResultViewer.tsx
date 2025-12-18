import React from 'react';
import { Download, Maximize2, RefreshCw } from 'lucide-react';

interface ResultViewerProps {
  imageUrl: string | null;
  isLoading: boolean;
  placeholder?: string;
}

const ResultViewer: React.FC<ResultViewerProps> = ({ imageUrl, isLoading, placeholder = "Generated image will appear here" }) => {
  if (isLoading) {
    return (
      <div className="h-full min-h-[400px] rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-8 animate-pulse">
        <div className="relative w-20 h-20 mb-6">
           <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
           <div className="absolute inset-0 border-4 border-t-brand-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-slate-300 font-medium animate-pulse">Dreaming up your image...</p>
        <p className="text-slate-500 text-sm mt-2">This usually takes 5-10 seconds</p>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="h-full min-h-[400px] rounded-xl bg-slate-900/50 border border-slate-800 border-dashed flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
          <Maximize2 className="text-slate-600" size={24} />
        </div>
        <p className="text-slate-500">{placeholder}</p>
      </div>
    );
  }

  return (
    <div className="group relative rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl">
      <img
        src={imageUrl}
        alt="Generated Result"
        className="w-full h-auto object-cover max-h-[600px]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
        <a
          href={imageUrl}
          download={`khosa-ai-${Date.now()}.png`}
          className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg shadow-brand-900/20"
        >
          <Download size={18} />
          Download Image
        </a>
      </div>
    </div>
  );
};

export default ResultViewer;