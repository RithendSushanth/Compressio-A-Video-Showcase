// 'use client'
// import React, { useState } from 'react'
// import axios from 'axios'
// import { useRouter } from 'next/navigation'

// function VideoUpload() {

//   const [file, setFile] = useState<File | null>(null)
//   const [title, setTitle] = useState('')
//   const [description, setDescription] = useState('')
//   const [isUploading, setIsUploading] = useState(false)
//   const [notification, setNotification] = useState<string | null>(null)
//   const router = useRouter();

//   // max file size of 70mb
//   const maxSize = 70 * 1024 * 1024;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form submitted");
    
//     if (!file) {
//       console.log("No file selected");
//       setNotification("No file selected");
//       return;
//     }

//     if (file.size > maxSize) {
//       console.log("File size too large:", file.size);
//       setNotification("File size too large");
//       return;
//     }

//     console.log("File size within limit:", file.size);
//     setIsUploading(true);
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('originalSize', file.size.toString());

//     try {
//       console.log("Sending upload request");
//       const response = await axios.post('/api/video-upload', formData);
//       console.log("Upload response:", response);
      
//       if (response.status === 200) {
//         setNotification("Video uploaded successfully");
//         router.push('/');
//       } else {
//         setNotification("Failed to upload video");
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//       setNotification("Failed to upload video");
//     } finally {
//       setIsUploading(false);
//       console.log("Upload process completed");
//     }
//   }

//   return (
//     <div className="container mx-auto py-8 px-4 max-w-3xl">
//       <div className="card shadow-xl bg-base-100">
//         <div className="card-body">
//           <h1 className="text-3xl font-bold text-center mb-6">Upload Your Video</h1>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text text-lg">Video Title</span>
//               </label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => {
//                   console.log("Title changed:", e.target.value);
//                   setTitle(e.target.value);
//                 }}
//                 className="input input-bordered w-full"
//                 placeholder="Enter the video title"
//                 required
//               />
//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text text-lg">Description</span>
//               </label>
//               <textarea
//                 value={description}
//                 onChange={(e) => {
//                   console.log("Description changed:", e.target.value);
//                   setDescription(e.target.value);
//                 }}
//                 className="textarea textarea-bordered w-full"
//                 placeholder="Enter a brief description"
//               />
//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text text-lg">Upload Video</span>
//               </label>
//               <input
//                 type="file"
//                 accept="video/*"
//                 onChange={(e) => {
//                   const selectedFile = e.target.files?.[0] || null;
//                   console.log("File selected:", selectedFile);
//                   setFile(selectedFile);
//                 }}
//                 className="file-input file-input-bordered w-full"
//                 required
//               />
//             </div>
//             <div className="form-control mt-6">
//               <button
//                 type="submit"
//                 className={`btn btn-secondary w-full ${isUploading ? 'loading' : ''}`}
//                 disabled={isUploading}
//               >
//                 {isUploading ? "Uploading..." : "Upload Video"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {notification && (
//         <div className="toast toast-top toast-center mt-8">
//           <div className={`alert ${notification === "Video uploaded successfully" ? 'alert-success' : 'alert-error'}`}>
//             <span>{notification}</span>
//             <button onClick={() => {
//               console.log("Notification dismissed");
//               setNotification(null);
//             }} className="btn btn-sm btn-ghost">x</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default VideoUpload;



'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const router = useRouter();

  const maxSize = 70 * 1024 * 1024;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setNotification("No file selected");
      return;
    }

    if (file.size > maxSize) {
      setNotification("File size too large");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('originalSize', file.size.toString());

    try {
      const response = await axios.post('/api/video-upload', formData);
      if (response.status === 200) {
        setNotification("Video uploaded successfully");
        router.push('/');
      } else {
        setNotification("Failed to upload video");
      }
    } catch (error) {
      setNotification("Failed to upload video");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <motion.div
        className="card shadow-xl bg-base-100"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-6">Upload Your Video</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg">Video Title</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter the video title"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg">Description</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered w-full"
                placeholder="Enter a brief description"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg">Upload Video</span>
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="file-input file-input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mt-6">
              <motion.button
                type="submit"
                className={`btn btn-secondary w-full ${isUploading ? 'loading' : ''}`}
                disabled={isUploading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {isUploading ? "Uploading..." : "Upload Video"}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>

      {notification && (
        <motion.div
          className="toast toast-top toast-center mt-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`alert ${notification === "Video uploaded successfully" ? 'alert-success' : 'alert-error'}`}>
            <span>{notification}</span>
            <button
              onClick={() => setNotification(null)}
              className="btn btn-sm btn-ghost"
            >
              x
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default VideoUpload;
