import React, { useState } from 'react';
import { AspectRatio, ArtStyle } from '../types';
import { generateTextToImage } from '../services/geminiService';
import ResultViewer from '../components/ResultViewer';
import { Wand2, Languages } from 'lucide-react';

const TextToImage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [style, setStyle] = useState<ArtStyle>('none');
  const [isRomanUrdu, setIsRomanUrdu] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateTextToImage(prompt, aspectRatio, style, isRomanUrdu);
      setGeneratedImage(result);
    } catch (err: any) {
      setError(err.message || "Failed to generate image");
    } finally {
      setIsLoading(false);
    }
  };

  const aspectRatios: AspectRatio[] = ['1:1', '16:9', '9:16', '4:3', '3:4'];
  const styles: ArtStyle[] = ['none', 'cinematic', 'anime', 'cyberpunk', 'photorealistic', 'oil painting', 'sketch', '3d render'];

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Controls Sidebar */}
      <div className="lg:col-span-2 space-y-8">
        <div className="space-y-2