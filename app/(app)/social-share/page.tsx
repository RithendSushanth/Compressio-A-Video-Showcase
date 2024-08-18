// 'use client'
// import React, { useState, useEffect, useRef } from 'react'
// import { CldImage } from 'next-cloudinary';

// const socialFormats = {
//   "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
//   "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
//   "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
//   "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
//   "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
// };

// type SocialFormat = keyof typeof socialFormats;

// export default function SocialShare() {
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null);
//   const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)");
//   const [isUploading, setIsUploading] = useState(false);
//   const [isTransforming, setIsTransforming] = useState(false);
//   const [notification, setNotification] = useState<string | null>(null);
//   const imageRef = useRef<HTMLImageElement>(null);

//   useEffect(() => {
//     if (uploadedImage) {
//       setIsTransforming(true);
//     }
//   }, [selectedFormat, uploadedImage]);

//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) {
//       return;
//     }
//     setIsUploading(true);
//     const formData = new FormData();
//     formData.append('file', file);
//     try {
//       const response = await fetch('/api/image-upload', {
//         method: 'POST',
//         body: formData
//       })

//       if (!response.ok) {
//         throw new Error('Image Upload failed');
//       }

//       const data = await response.json();
//       setUploadedImage(data.publicId);
//       setNotification("Image Ready for Download!");
//     } catch (error) {
//       console.log(error);
//       setNotification("Failed to upload image.");
//     } finally {
//       setIsUploading(false);
//     }
//   }

//   const handleDownload = () => {
//     if (!imageRef.current) return;
//     fetch(imageRef.current.src)
//       .then((response) => response.blob())
//       .then((blob) => {
//         const url = window.URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = url;
//         link.download = 'image.png';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         window.URL.revokeObjectURL(url);
//       });
//   }

//   return (
//     <div className='container mx-auto p-4 max-w-4xl'>
//       <h1 className='text-3xl font-bold mb-6 text-center'>
//         Social Media Picture Generator
//       </h1>
//       <div className='card shadow-lg'>
//         <div className='card-body'>
//           <h2 className='card-title mb-4'>Upload an Image</h2>
//           <div className='form-control'>
//             <label className='label'><span className='label-text'>Choose Image</span></label>
//             <input type="file"
//               onChange={handleFileUpload}
//               className="file-input file-input-bordered file-input-secondary w-full"
//             />
//           </div>

//           {isUploading && (
//             <div className='mt-4'>
//               <progress className="progress progress-secondary w-full"></progress>
//             </div>
//           )}

//           {uploadedImage && (
//             <div className='mt-6'>
//               <h2 className='card-title mb-4'>Select Social Media Format</h2>
//               <div className='form-control'>
//                 <select
//                   className='select select-bordered w-full'
//                   value={selectedFormat}
//                   onChange={(e) =>
//                     setSelectedFormat(e.target.value as SocialFormat)
//                   }
//                 >
//                   {Object.keys(socialFormats).map((format) => (
//                     <option key={format} value={format}>
//                       {format}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className='mt-6 relative'>
//                 <h3 className='text-lg font-semibold mb-2'>Preview:</h3>
//                 <div className='flex justify-center'>
//                   {isTransforming && (
//                     <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-50 z-10">
//                       <span className="loading loading-spinner loading-lg"></span>
//                     </div>
//                   )}
//                   <CldImage
//                     width={socialFormats[selectedFormat].width}
//                     height={socialFormats[selectedFormat].height}
//                     src={uploadedImage}
//                     sizes='100vw'
//                     alt='Transformed Image'
//                     crop='fill'
//                     aspectRatio={socialFormats[selectedFormat].aspectRatio}
//                     gravity='auto'
//                     ref={imageRef}
//                     onLoad={() => setIsTransforming(false)}
//                   />
//                 </div>
//               </div>
//               <div className="card-actions justify-end mt-6">
//                 <button className="btn btn-secondary" onClick={handleDownload}>
//                   Download for {selectedFormat}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {notification && (
//         <div className="toast toast-top toast-center">
//           <div className={`alert ${notification.includes("success") ? 'alert-success' : 'alert-error'}`}>
//             <span>{notification}</span>
//             <button onClick={() => setNotification(null)} className="btn btn-sm btn-ghost">x</button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }


'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CldImage } from 'next-cloudinary';

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
};

type SocialFormat = keyof typeof socialFormats;

export default function SocialShare() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)");
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (uploadedImage) {
      setIsTransforming(true);
    }
  }, [selectedFormat, uploadedImage]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('/api/image-upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Image Upload failed');
      }

      const data = await response.json();
      setUploadedImage(data.publicId);
      setNotification("Image Ready for Download!");
    } catch (error) {
      console.log(error);
      setNotification("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (!imageRef.current) return;
    fetch(imageRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <div className='container mx-auto p-4 max-w-4xl'>
      <motion.h1
        className='text-3xl font-bold mb-6 text-center'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Social Media Picture Generator
      </motion.h1>
      <motion.div
        className='card shadow-lg'
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className='card-body'>
          <h2 className='card-title mb-4'>Upload an Image</h2>
          <div className='form-control'>
            <label className='label'><span className='label-text'>Choose Image</span></label>
            <input
              type="file"
              onChange={handleFileUpload}
              className="file-input file-input-bordered file-input-secondary w-full"
            />
          </div>

          {isUploading && (
            <motion.div
              className='mt-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <progress className="progress progress-secondary w-full"></progress>
            </motion.div>
          )}

          {uploadedImage && (
            <motion.div
              className='mt-6'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className='card-title mb-4'>Select Social Media Format</h2>
              <div className='form-control'>
                <select
                  className='select select-bordered w-full'
                  value={selectedFormat}
                  onChange={(e) =>
                    setSelectedFormat(e.target.value as SocialFormat)
                  }
                >
                  {Object.keys(socialFormats).map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mt-6 relative'>
                <h3 className='text-lg font-semibold mb-2'>Preview:</h3>
                <div className='flex justify-center relative'>
                  {isTransforming && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-50 z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="loading loading-spinner loading-lg"></span>
                    </motion.div>
                  )}
                  <CldImage
                    width={socialFormats[selectedFormat].width}
                    height={socialFormats[selectedFormat].height}
                    src={uploadedImage}
                    sizes='100vw'
                    alt='Transformed Image'
                    crop='fill'
                    aspectRatio={socialFormats[selectedFormat].aspectRatio}
                    gravity='auto'
                    ref={imageRef}
                    onLoad={() => setIsTransforming(false)}
                    className="transition-transform duration-500 ease-in-out"
                    style={{ transform: isTransforming ? 'scale(0.95)' : 'scale(1)' }}
                  />
                </div>
              </div>
              <div className="card-actions justify-end mt-6">
                <button className="btn btn-secondary" onClick={handleDownload}>
                  Download for {selectedFormat}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {notification && (
        <motion.div
          className="toast toast-top toast-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="alert alert-success"> {/* Always use green alert */}
            <span>{notification}</span>
            <button onClick={() => setNotification(null)} className="btn btn-sm btn-ghost">x</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
