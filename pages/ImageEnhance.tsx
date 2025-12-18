import React, { useState } from 'react';
import { enhanceImage } from '../services/geminiService';
import ImageUploader from '../components/ImageUploader';
import { Zap, Download, SplitSquareHorizontal } from 'lucide-react';

const ImageEnhance: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEnhance = async () => {
    if (!sourceImage) return;

    setIsLoading(true);
    setError(null);
    setEnhancedImage(null);

    try {
      const result = await enhanceImage(sourceImage);
      setEnhancedImage(result);
    } catch (err: any) {
      setError(err.message || "Failed to enhance image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white">AI Image Enhancer</h1>
        <p className="text-slate-400">Upscale, sharpen, and restore your photos using advanced AI.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Input Section */}
        <div className="space-y-4">
           <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
             <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
               Original Image
             </h3>
             <ImageUploader 
               currentImage={sourceImage} 
               onImageSelected={(img) => {
                 setSourceImage(img);
                 setEnhancedImage(null);
               }} 
               onClear={() => {
                 setSourceImage(null);
                 setEnhancedImage(null);
               }}
               label="Upload Image to Enhance"
             />
             
             <div className="mt-6">
                <button
                  onClick={handleEnhance}
                  disabled={isLoading || !sourceImage}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-lg shadow-xl shadow-amber-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="animate-pulse">Enhancing details...</span>
                  ) : (
                    <>
                      Enhance Quality <Zap size={20} />
                    </>
                  )}
                </button>
             </div>
             
             {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}
           </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 h-full min-h-[400px]">
             <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
               <StarsIcon /> Enhanced Result
             </h3>
             
             {isLoading ? (
               <div className="aspect-square rounded-xl bg-slate-900 border border-slate-700 flex flex-col items-center justify-center animate-pulse">
                  <Zap className="text-amber-500 animate-bounce mb-4" size={32} />
                  <p className="text-slate-400">Working magic...</p>
               </div>
             ) : enhancedImage ? (
               <div className="space-y-4">
                 <div className="relative rounded-xl overflow-hidden border border-slate-700 group shadow-2xl">
                   <img src={enhancedImage} alt="Enhanced" className="w-full h-auto" />
                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <a 
                        href={enhancedImage} 
                        download="enhanced-khosa-ai.png"
                        className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                      >
                        <Download size={18} /> Save Image
                      </a>
                   </div>
                 </div>
                 <div className="text-center">
                    <span className="text-sm text-green-400 flex items-center justify-center gap-1">
                      <StarsIcon size={14} /> Enhancement Complete
                    </span>
                 </div>
               </div>
             ) : (
               <div className="aspect-square rounded-xl bg-slate-900/30 border border-slate-800 border-dashed flex flex-col items-center justify-center text-slate-500">
                 <SplitSquareHorizontal size={32} className="mb-2 opacity-50" />
                 <p>Enhanced result will appear here</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StarsIcon: React.FC<{size?: number}> = ({size=18}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 17.5l-2.25-5.25L4.5 10l5.25-2.25L12 2.5l2.25 5.25L19.5 10l-5.25 2.25z" />
  </svg>
)

export default ImageEnhance;