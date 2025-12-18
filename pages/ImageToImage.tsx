import React, { useState } from 'react';
import { ArtStyle } from '../types';
import { generateImageToImage } from '../services/geminiService';
import ResultViewer from '../components/ResultViewer';
import ImageUploader from '../components/ImageUploader';
import { Wand2 } from 'lucide-react';

const ImageToImage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<ArtStyle>('none');
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || !sourceImage) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateImageToImage(sourceImage, prompt, style);
      setGeneratedImage(result);
    } catch (err: any) {
      setError(err.message || "Failed to generate image");
    } finally {
      setIsLoading(false);
    }
  };

  const styles: ArtStyle[] = ['none', 'cinematic', 'anime', 'cyberpunk', 'photorealistic', 'oil painting', 'sketch', '3d render'];

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Controls */}
      <div className="lg:col-span-2 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Image to Image</h1>
          <p className="text-slate-400">Transform existing photos with AI.</p>
        </div>

        <div className="space-y-6 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Source Image</label>
            <ImageUploader 
              currentImage={sourceImage} 
              onImageSelected={setSourceImage} 
              onClear={() => setSourceImage(null)} 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Make it look like a van gogh painting, add cyberpunk city background..."
              className="w-full h-24 bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Target Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as ArtStyle)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {styles.map((s) => (
                <option key={s} value={s} className="bg-slate-900">
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim() || !sourceImage}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-lg shadow-xl shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="animate-pulse">Transforming...</span>
            ) : (
              <>
                Generate <Wand2 size={20} />
              </>
            )}
          </button>
          
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Result Area */}
      <div className="lg:col-span-3">
        <ResultViewer 
          imageUrl={generatedImage} 
          isLoading={isLoading} 
          placeholder="Upload an image and enter a prompt to start transformation"
        />
      </div>
    </div>
  );
};

export default ImageToImage;