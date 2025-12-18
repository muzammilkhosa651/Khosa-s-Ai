import React, { useRef, useState } from 'react';
import { Upload, X, ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  currentImage: string | null;
  onImageSelected: (base64: string) => void;
  onClear: () => void;
  label?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ currentImage, onImageSelected, onClear, label = "Upload Reference Image" }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelected(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload an image file");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  if (currentImage) {
    return (
      <div className="relative group rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-xl max-h-[400px] flex items-center justify-center">
        <img 
          src={currentImage} 
          alt="Uploaded" 
          className="max-h-[400px] w-auto object-contain"
        />
        <button
          onClick={onClear}
          className="absolute top-2 right-2 p-1.5 bg-red-500/90 hover:bg-red-600 text-white rounded-full transition-opacity opacity-0 group-hover:opacity-100 shadow-lg backdrop-blur-sm"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 h-64
        ${isDragging 
          ? 'border-brand-500 bg-brand-500/5' 
          : 'border-slate-700 bg-slate-900/50 hover:border-slate-500 hover:bg-slate-900'}
      `}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-4">
        <Upload className={isDragging ? 'text-brand-400' : 'text-slate-400'} size={24} />
      </div>
      <h3 className="text-slate-200 font-medium mb-1">{label}</h3>
      <p className="text-slate-500 text-sm text-center">Drag & drop or click to browse</p>
      
      <div className="absolute bottom-4 flex items-center gap-2 text-xs text-slate-600">
        <ImageIcon size={12} />
        <span>Supports JPG, PNG, WEBP</span>
      </div>
    </div>
  );
};

export default ImageUploader;