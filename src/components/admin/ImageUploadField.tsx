"use client";

import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadFieldProps {
  name: string;
  defaultImageUrl?: string | null;
}

export default function ImageUploadField({ name, defaultImageUrl }: ImageUploadFieldProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(defaultImageUrl || null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
      
      // Update the hidden input files using DataTransfer
      if (inputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(e.dataTransfer.files[0]);
        inputRef.current.files = dataTransfer.files;
      }
    }
  };

  const handleFileChange = (file: File | undefined | null) => {
    if (file && file.type.startsWith("image/")) {
      setFileName(file.name);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else if (file) {
      alert("Please upload a valid image file.");
    }
  };

  const clearImage = () => {
    setPreview(defaultImageUrl || null);
    setFileName(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFileChange(e.target.files[0]);
          }
        }}
      />
      
      {preview && fileName ? (
        <div className="relative w-full rounded-2xl border border-gray-200 overflow-hidden bg-gray-50 aspect-video max-h-[300px] flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Preview" className="w-full h-full object-contain" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
            <p className="text-white text-sm font-medium truncate mb-2">{fileName}</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white text-xs font-semibold transition-colors flex-1"
              >
                Change Image
              </button>
              <button
                type="button"
                onClick={clearImage}
                className="px-4 py-2 bg-red-500/80 hover:bg-red-500 backdrop-blur-md rounded-lg text-white text-xs font-semibold transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center py-10 px-4 cursor-pointer transition-colors
            ${isDragging ? "border-[#1E3799] bg-[#1E3799]/5" : "border-gray-200 bg-gray-50/50 hover:bg-gray-50"}
          `}
        >
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors ${isDragging ? 'bg-[#1E3799]/10 text-[#1E3799]' : 'bg-white text-gray-400 shadow-sm border border-gray-100'}`}>
            <UploadCloud size={24} />
          </div>
          
          <h3 className="text-gray-900 font-semibold mb-1 text-sm">
            Click to upload <span className="text-gray-400 font-normal">or drag and drop</span>
          </h3>
          <p className="text-gray-400 text-xs">
            SVG, PNG, JPG, AVIF (max. 30MB)
          </p>

          {defaultImageUrl && !fileName && (
            <div className="mt-6 flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
              <ImageIcon size={14} className="text-[#1E3799]" />
              <span className="text-xs font-medium text-gray-600">Current image kept</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
