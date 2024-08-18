// import React, { useState, useEffect, useCallback } from 'react';
// import { getCldImageUrl, getCldVideoUrl } from 'next-cloudinary';
// import { Download, Clock, FileDown, FileUp } from 'lucide-react';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// import { filesize } from 'filesize';
// import { Video } from '@/types';

// dayjs.extend(relativeTime);

// interface VideoCardProps {
//   video: Video;
//   onDownload: (url: string, title: string) => void;
// }

// const VideoCard: React.FC<VideoCardProps> = ({ video, onDownload }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [previewError, setPreviewError] = useState(false);

//   const getThumbnailUrl = useCallback((publicId: string) => {
//     return getCldImageUrl({
//       src: publicId,
//       width: 400,
//       height: 225,
//       crop: 'fill',
//       gravity: 'auto',
//       format: 'jpg',
//       quality: 'auto',
//       assetType: 'video'
//     });
//   }, []);

//   const getFullVideoUrl = useCallback((publicId: string) => {
//     return getCldVideoUrl({
//       src: publicId,
//       width: 1920,
//       height: 1080,
//     });
//   }, []);

//   const getPreviewVideoUrl = useCallback((publicId: string) => {
//     return getCldVideoUrl({
//       src: publicId,
//       width: 400,
//       height: 225,
//       rawTransformations: ['e_preview:duration_15:max_seg_9:min_seg_dur_1']
//     });
//   }, []);

//   const formatSize = useCallback((size: number) => {
//     return filesize(size);
//   }, []);

//   const formatDuration = useCallback((seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = Math.round(seconds % 60);
//     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
//   }, []);

//   const compressionPercentage = Math.round(
//     (1 - Number(video.compressedSize) / Number(video.originalSize)) * 100
//   );

//   useEffect(() => {
//     setPreviewError(false);
//   }, [isHovered]);

//   const handlePreviewError = () => {
//     setPreviewError(true);
//   };

//   const handleDownload = () => {
//     const url = getFullVideoUrl(video.publicId);
//     console.log(`Attempting to download video...`);
//     console.log(`Video title: ${video.title}`);
  
//     // Create a temporary link element
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = video.title; // Set the download attribute with the title of the video
  
//     // Open the URL in a new window to initiate the download
//     const newWindow = window.open(url, '_blank');
    
//     if (newWindow) {
//       // Use the new window to trigger the download
//       newWindow.onload = () => {
//         // Programmatically trigger the download
//         link.click();
        
//         // Close the new window after the download is triggered
//         newWindow.close();
//       };
//     } else {
//       console.error('Failed to open new window. Please check your pop-up blocker settings.');
//     }
//   };
  
//   return (
//     <div
//       className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <figure className="aspect-video relative">
//         {isHovered ? (
//           previewError ? (
//             <div className="w-full h-full flex items-center justify-center bg-gray-200">
//               <p className="text-red-500">Preview not available</p>
//             </div>
//           ) : (
//             <video
//               src={getPreviewVideoUrl(video.publicId)}
//               autoPlay
//               muted
//               loop
//               className="w-full h-full object-cover"
//               onError={handlePreviewError}
//             />
//           )
//         ) : (
//           <img
//             src={getThumbnailUrl(video.publicId)}
//             alt={video.title}
//             className="w-full h-full object-cover"
//           />
//         )}
//         <div className="absolute bottom-2 right-2 bg-base-100 bg-opacity-70 px-2 py-1 rounded-lg text-sm flex items-center">
//           <Clock size={16} className="mr-1" />
//           {formatDuration(video.duration)}
//         </div>
//       </figure>
//       <div className="card-body p-4">
//         <h2 className="card-title text-lg font-bold">{video.title}</h2>
//         <p className="text-sm text-base-content opacity-70 mb-4">
//           {video.description}
//         </p>
//         <p className="text-sm text-base-content opacity-70 mb-4">
//           Uploaded {dayjs(video.createdAt).fromNow()}
//         </p>
//         <div className="grid grid-cols-2 gap-4 text-sm">
//           <div className="flex items-center">
//             <FileUp size={18} className="mr-2 text-primary" />
//             <div>
//               <div className="font-semibold">Original</div>
//               <div>{formatSize(Number(video.originalSize))}</div>
//             </div>
//           </div>
//           <div className="flex items-center">
//             <FileDown size={18} className="mr-2 text-secondary" />
//             <div>
//               <div className="font-semibold">Compressed</div>
//               <div>{formatSize(Number(video.compressedSize))}</div>
//             </div>
//           </div>
//         </div>
//         <div className="flex justify-between items-center mt-4">
//           <div className="text-sm font-semibold">
//             Compression:{' '}
//             <span className="text-accent">{compressionPercentage}%</span>
//           </div>
//           <button
//             className="btn btn-primary btn-sm"
//             onClick={handleDownload}
//           >
//             <Download size={16} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoCard;

// import React, { useState, useEffect, useCallback } from 'react';
// import { getCldImageUrl, getCldVideoUrl } from 'next-cloudinary';
// import { Download, Clock, FileDown, FileUp, Share } from 'lucide-react';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// import { filesize } from 'filesize';
// import { Video } from '@/types';

// dayjs.extend(relativeTime);

// interface VideoCardProps {
//   video: Video;
//   onDownload: (url: string, title: string) => void;
// }

// const VideoCard: React.FC<VideoCardProps> = ({ video, onDownload }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [previewError, setPreviewError] = useState(false);
//   const [isShareOpen, setIsShareOpen] = useState(false);

//   const getThumbnailUrl = useCallback((publicId: string) => {
//     return getCldImageUrl({
//       src: publicId,
//       width: 400,
//       height: 225,
//       crop: 'fill',
//       gravity: 'auto',
//       format: 'jpg',
//       quality: 'auto',
//       assetType: 'video'
//     });
//   }, []);

//   const getFullVideoUrl = useCallback((publicId: string) => {
//     return getCldVideoUrl({
//       src: publicId,
//       width: 1920,
//       height: 1080,
//     });
//   }, []);

//   const getPreviewVideoUrl = useCallback((publicId: string) => {
//     return getCldVideoUrl({
//       src: publicId,
//       width: 400,
//       height: 225,
//       rawTransformations: ['e_preview:duration_15:max_seg_9:min_seg_dur_1']
//     });
//   }, []);

//   const formatSize = useCallback((size: number) => {
//     return filesize(size);
//   }, []);

//   const formatDuration = useCallback((seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = Math.round(seconds % 60);
//     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
//   }, []);

//   const compressionPercentage = Math.round(
//     (1 - Number(video.compressedSize) / Number(video.originalSize)) * 100
//   );

//   useEffect(() => {
//     setPreviewError(false);
//   }, [isHovered]);

//   const handlePreviewError = () => {
//     setPreviewError(true);
//   };

//   const handleDownload = () => {
//     const url = getFullVideoUrl(video.publicId);
//     console.log(`Attempting to download video...`);
//     console.log(`Video title: ${video.title}`);
  
//     // Create a temporary link element
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = video.title; // Set the download attribute with the title of the video
  
//     // Open the URL in a new window to initiate the download
//     const newWindow = window.open(url, '_blank');
    
//     if (newWindow) {
//       // Use the new window to trigger the download
//       newWindow.onload = () => {
//         // Programmatically trigger the download
//         link.click();
        
//         // Close the new window after the download is triggered
//         newWindow.close();
//       };
//     } else {
//       console.error('Failed to open new window. Please check your pop-up blocker settings.');
//     }
//   };

//   const handleShare = (platform: string) => {
//     const url = getFullVideoUrl(video.publicId);
//     let shareUrl = '';

//     switch (platform) {
//       case 'whatsapp':
//         shareUrl = `https://wa.me/?text=${encodeURIComponent(video.title + ' ' + url)}`;
//         break;
//       case 'facebook':
//         shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
//         break;
//       case 'twitter':
//         shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(video.title)}`;
//         break;
//       default:
//         return;
//     }

//     window.open(shareUrl, '_blank', 'noopener,noreferrer');
//   };

//   return (
//     <div
//       className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <figure className="aspect-video relative">
//         {isHovered ? (
//           previewError ? (
//             <div className="w-full h-full flex items-center justify-center bg-gray-200">
//               <p className="text-red-500">Preview not available</p>
//             </div>
//           ) : (
//             <video
//               src={getPreviewVideoUrl(video.publicId)}
//               autoPlay
//               muted
//               loop
//               className="w-full h-full object-cover"
//               onError={handlePreviewError}
//             />
//           )
//         ) : (
//           <img
//             src={getThumbnailUrl(video.publicId)}
//             alt={video.title}
//             className="w-full h-full object-cover"
//           />
//         )}
//         <div className="absolute bottom-2 right-2 bg-base-100 bg-opacity-70 px-2 py-1 rounded-lg text-sm flex items-center">
//           <Clock size={16} className="mr-1" />
//           {formatDuration(video.duration)}
//         </div>
//       </figure>
//       <div className="card-body p-4">
//         <h2 className="card-title text-lg font-bold">{video.title}</h2>
//         <p className="text-sm text-base-content opacity-70 mb-4">
//           {video.description}
//         </p>
//         <p className="text-sm text-base-content opacity-70 mb-4">
//           Uploaded {dayjs(video.createdAt).fromNow()}
//         </p>
//         <div className="grid grid-cols-2 gap-4 text-sm">
//           <div className="flex items-center">
//             <FileUp size={18} className="mr-2 text-primary" />
//             <div>
//               <div className="font-semibold">Original</div>
//               <div>{formatSize(Number(video.originalSize))}</div>
//             </div>
//           </div>
//           <div className="flex items-center">
//             <FileDown size={18} className="mr-2 text-secondary" />
//             <div>
//               <div className="font-semibold">Compressed</div>
//               <div>{formatSize(Number(video.compressedSize))}</div>
//             </div>
//           </div>
//         </div>
//         <div className="flex justify-between items-center mt-4">
//           <div className="text-sm font-semibold">
//             Compression:{' '}
//             <span className="text-accent">{compressionPercentage}%</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               className="btn btn-primary btn-sm"
//               onClick={handleDownload}
//             >
//               <Download size={16} />
//             </button>
//             <button
//               className="btn btn-secondary btn-sm"
//               onClick={() => setIsShareOpen(!isShareOpen)}
//             >
//               <Share size={16} />
//             </button>
//           </div>
//         </div>
//         {isShareOpen && (
//           <div className="absolute top-0 right-0 bg-base-100 p-4 rounded-lg shadow-lg flex flex-col items-start space-y-2">
//             <button
//               className="btn btn-sm btn-outline"
//               onClick={() => handleShare('whatsapp')}
//             >
//               Share on WhatsApp
//             </button>
//             <button
//               className="btn btn-sm btn-outline"
//               onClick={() => handleShare('facebook')}
//             >
//               Share on Facebook
//             </button>
//             <button
//               className="btn btn-sm btn-outline"
//               onClick={() => handleShare('twitter')}
//             >
//               Share on Twitter
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VideoCard;


// components/VideoCard.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getCldImageUrl, getCldVideoUrl } from 'next-cloudinary';
import { Download, Clock, FileDown, FileUp, Share } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { filesize } from 'filesize';
import { Video } from '@/types';

dayjs.extend(relativeTime);

interface VideoCardProps {
  video: Video;
  onDownload: (url: string, title: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onDownload }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const getThumbnailUrl = useCallback((publicId: string) => {
    return getCldImageUrl({
      src: publicId,
      width: 400,
      height: 225,
      crop: 'fill',
      gravity: 'auto',
      format: 'jpg',
      quality: 'auto',
      assetType: 'video'
    });
  }, []);

  const getFullVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 1920,
      height: 1080,
    });
  }, []);

  const getPreviewVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 400,
      height: 225,
      rawTransformations: ['e_preview:duration_15:max_seg_9:min_seg_dur_1']
    });
  }, []);

  const formatSize = useCallback((size: number) => {
    return filesize(size);
  }, []);

  const formatDuration = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  const compressionPercentage = Math.round(
    (1 - Number(video.compressedSize) / Number(video.originalSize)) * 100
  );

  useEffect(() => {
    setPreviewError(false);
  }, [isHovered]);

  const handlePreviewError = () => {
    setPreviewError(true);
  };

  const handleDownload = () => {
    const url = getFullVideoUrl(video.publicId);
    console.log(`Attempting to download video...`);
    console.log(`Video title: ${video.title}`);
  
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = video.title; // Set the download attribute with the title of the video
 
    // Open the URL in a new window to initiate the download
    const newWindow = window.open(url, '_blank');
    
    if (newWindow) {
      // Use the new window to trigger the download
      newWindow.onload = () => {
        // Programmatically trigger the download
        link.click();
        
        // Close the new window after the download is triggered
        newWindow.close();
      };
    } else {
      console.error('Failed to open new window. Please check your pop-up blocker settings.');
    }
  };

  const handleShare = (platform: string) => {
    const url = getFullVideoUrl(video.publicId);
    let shareUrl = '';

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(video.title + ' ' + url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(video.title)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      className="card bg-base-100 shadow-xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure className="aspect-video relative">
        {isHovered ? (
          previewError ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <p className="text-red-500">Preview not available</p>
            </div>
          ) : (
            <video
              src={getPreviewVideoUrl(video.publicId)}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
              onError={handlePreviewError}
            />
          )
        ) : (
          <img
            src={getThumbnailUrl(video.publicId)}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute bottom-2 right-2 bg-base-100 bg-opacity-70 px-2 py-1 rounded-lg text-sm flex items-center">
          <Clock size={16} className="mr-1" />
          {formatDuration(video.duration)}
        </div>
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-bold">{video.title}</h2>
        <p className="text-sm text-base-content opacity-70 mb-4">
          {video.description}
        </p>
        <p className="text-sm text-base-content opacity-70 mb-4">
          Uploaded {dayjs(video.createdAt).fromNow()}
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <FileUp size={18} className="mr-2 text-primary" />
            <div>
              <div className="font-semibold">Original</div>
              <div>{formatSize(Number(video.originalSize))}</div>
            </div>
          </div>
          <div className="flex items-center">
            <FileDown size={18} className="mr-2 text-secondary" />
            <div>
              <div className="font-semibold">Compressed</div>
              <div>{formatSize(Number(video.compressedSize))}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm font-semibold">
            Compression:{' '}
            <span className="text-accent">{compressionPercentage}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={handleDownload}
            >
              <Download size={16} />
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setIsShareOpen(!isShareOpen)}
            >
              <Share size={16} />
            </button>
          </div>
        </div>
        {isShareOpen && (
          <motion.div
            className="absolute top-0 right-0 bg-base-100 p-4 rounded-lg shadow-lg flex flex-col items-start space-y-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="btn btn-sm btn-outline"
              onClick={() => handleShare('whatsapp')}
            >
              Share on WhatsApp
            </button>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => handleShare('facebook')}
            >
              Share on Facebook
            </button>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => handleShare('twitter')}
            >
              Share on Twitter
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default VideoCard;
