import { useEffect, useState } from 'react';
import { ChevronRight, Film, Image as ImageIcon, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface MediaFile {
  fileid: string;
  file_name: string;
  file_url: string;
  size: string | null;
  created_at: string;
}

interface GalleryProps {
  onNavigate: (page: string) => void;
}

const isVideo = (url: string) => /\.(mp4|webm|ogg|mov|m4v|avi)(\?|#|$)/i.test(url);

export default function Gallery({ onNavigate }: GalleryProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('storage')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setFiles(data || []);
      }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-amazon-lightbg">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-amazon-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <p className="text-xs text-amazon-subtle flex items-center gap-1">
            <button onClick={() => onNavigate('home')} className="hover:text-amazon-link">Home</button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-amazon-text font-bold">Gallery</span>
          </p>
        </div>
      </div>

      {/* Page heading */}
      <div className="bg-white border-b border-amazon-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-amazon-text">Media Gallery</h1>
          <p className="mt-2 text-sm text-amazon-subtle max-w-2xl">
            A showcase of our images and videos, pulled directly from our media library.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
        {loading ? (
          <div className="bg-white rounded-md border border-amazon-border p-12 text-center amazon-card">
            <Loader2 className="h-8 w-8 text-amazon-subtle animate-spin mx-auto mb-3" />
            <p className="text-sm text-amazon-subtle">Loading your media...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-md border border-amazon-border p-12 text-center amazon-card">
            <AlertCircle className="h-8 w-8 text-amazon-danger mx-auto mb-3" />
            <h2 className="text-lg font-bold text-amazon-text mb-1">Couldn't load your media</h2>
            <p className="text-sm text-amazon-subtle">{error}</p>
          </div>
        ) : files.length === 0 ? (
          <div className="bg-white rounded-md border border-amazon-border p-12 text-center amazon-card">
            <ImageIcon className="h-8 w-8 text-amazon-subtle mx-auto mb-3" />
            <h2 className="text-lg font-bold text-amazon-text mb-1">No media yet</h2>
            <p className="text-sm text-amazon-subtle max-w-md mx-auto">
              Add images and videos to your media library and they will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file) => {
              const video = isVideo(file.file_url);
              return (
                <div
                  key={file.fileid}
                  className="bg-white rounded-md border border-amazon-border amazon-card hover:shadow-lg transition overflow-hidden group"
                >
                  <div className="relative h-52 bg-amazon-lightbg overflow-hidden">
                    {video ? (
                      <video
                        src={file.file_url}
                        controls
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={file.file_url}
                        alt={file.file_name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    )}
                    <span className="absolute top-2 left-2 inline-flex items-center gap-1 bg-amazon-dark/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {video ? <Film className="h-3 w-3" /> : <ImageIcon className="h-3 w-3" />}
                      {video ? 'Video' : 'Image'}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-amazon-text truncate">{file.file_name}</h3>
                    <div className="mt-1 flex items-center justify-between text-xs text-amazon-subtle">
                      {file.size ? <span>{file.size}</span> : <span />}
                      <a
                        href={file.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-amazon-link hover:text-amazon-linkhover hover:underline font-bold"
                      >
                        Open <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
