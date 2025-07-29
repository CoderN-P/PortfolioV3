'use client';

import {useState, useEffect, useCallback} from 'react';
import Image from 'next/image';
import photosData from '@/app/data/photos.json';
import { X, MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface Photo {
  id: number;
  src: string;
  alt: string;
  title: string;
  location: string;
  date: string;
  description: string;
}

const photos: Photo[] = photosData;

export default function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (photo: Photo) => {
    const index = photos.findIndex(p => p.id === photo.id);
    setCurrentIndex(index);
    setSelectedPhoto(photo);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const nextPhoto = useCallback(() => {
    const nextIndex = (currentIndex + 1) % photos.length;
    setCurrentIndex(nextIndex);
    setSelectedPhoto(photos[nextIndex]);
  }, [currentIndex]);

  const prevPhoto = useCallback(() => {
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setCurrentIndex(prevIndex);
    setSelectedPhoto(photos[prevIndex]);
  }, [currentIndex]);

  useEffect(() => {
    // Prevent background scrolling when lightbox is open
    if (selectedPhoto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to restore scrolling
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedPhoto]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextPhoto();
      } else if (e.key === 'ArrowLeft') {
        prevPhoto();
      }
    }

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedPhoto, currentIndex, nextPhoto, prevPhoto]);

  return (
    <div className="min-h-screen bg-white">
      <div className="">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-6xl font-bold mb-8">
            Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mb-12 leading-relaxed">
            A collection of moments captured during my travels and hikes.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative break-inside-avoid cursor-pointer overflow-hidden rounded-lg transition-all duration-200 hover:opacity-90"
              onClick={() => openLightbox(photo)}
            >
              <div className="relative">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                
                {/* Simple overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <h3 className="font-medium text-sm">{photo.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-10 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-2 transition-colors"
              onClick={closeLightbox}
              aria-label="Close image view"
            >
              <X size={20} />
            </button>

            {/* Navigation Arrows */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-2 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-2 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>

            <div
              className="relative w-full h-full max-w-7xl max-h-[95vh] flex flex-col lg:flex-row gap-8 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative flex-grow h-3/4 lg:h-full">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Details Sidebar */}
              <div className="w-full lg:w-80 bg-white/5 border border-white/10 p-6 rounded-lg text-white/95 overflow-y-auto flex-shrink-0">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold mb-2">{selectedPhoto.title}</h2>
                    <div className="flex items-center gap-2 text-white/70 mb-2">
                      <MapPin size={14} />
                      <span>{selectedPhoto.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <Calendar size={14} />
                      <span>{new Date(selectedPhoto.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  </div>
                  
                  <div className="h-px bg-white/10"></div>
                  
                  <div>
                    <p className="leading-relaxed text-white/90">{selectedPhoto.description}</p>
                  </div>

                  <div className="h-px bg-white/10"></div>

                  <div className="text-xs text-white/50">
                    {currentIndex + 1} of {photos.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}
