// import React, { useState } from 'react';
// import { Helmet } from 'react-helmet';

// const CattlePredictor = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [info, setInfo] = useState(null);
//   const [status, setStatus] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);

//   // 🔗 Change this to your local backend URL
//   // We'll use the local host address found in your server logs.
//   // const BACKEND_URL = 'http://127.0.0.1:5000';
//     const BACKEND_URL = 'https://sih-6-yve3.onrender.com';
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       setPrediction(null);
//       setInfo(null);
//       setStatus('');
//     } else {
//       setSelectedImage(null);
//     }
//   };

//   const handlePredict = async () => {
//     if (!selectedImage) return;

//     setIsProcessing(true);
//     setStatus('Processing image...');
//     setPrediction(null);
//     setInfo(null);

//     try {
//       // Prepare multipart/form-data
//       const formData = new FormData();
//       formData.append('file', selectedImage);

//       // Call the Flask backend /predict endpoint
//       const response = await fetch(`${BACKEND_URL}/predict`, {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       // The backend is expected to return { prediction: "...", info: { milk_yield: "...", traits: [...] } }
//       setPrediction(data.prediction);
//       setInfo(data.info);
//       setStatus('Prediction successful!');
//     } catch (error) {
//       console.error('Prediction error:', error);
//       setStatus(`Error: ${error.message || 'Failed to predict. Please ensure the Flask server is running.'}`);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const getStatusClass = () => {
//     if (isProcessing) return 'bg-blue-100 text-blue-700';
//     if (status.includes('successful')) return 'bg-green-100 text-green-700';
//     if (status.includes('Error')) return 'bg-red-100 text-red-700';
//     return 'hidden';
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
//       <Helmet>
//         <title>Cattle Breed Predictor</title>
//       </Helmet>
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl text-center">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">
//           Cattle Breed Predictor
//         </h1>
//         <p className="text-gray-600 mb-6">
//           Upload an image of a cattle to get a breed prediction.
//         </p>

//         {/* Image Upload Section */}
//         <div className="mb-6">
//           <label
//             htmlFor="image-upload"
//             className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-colors duration-300"
//           >
//             Choose an Image
//           </label>
//           <input
//             type="file"
//             id="image-upload"
//             accept="image/*"
//             className="hidden"
//             onChange={handleFileChange}
//           />
//           <p id="file-name" className="mt-2 text-gray-500">
//             {selectedImage ? selectedImage.name : ''}
//           </p>
//         </div>

//         {/* Preview and Button Section */}
//         <div className="mb-6">
//           <div
//             id="image-preview"
//             className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center mb-4"
//           >
//             {selectedImage ? (
//               <img
//                 src={URL.createObjectURL(selectedImage)}
//                 alt="Image Preview"
//                 className="w-full h-full object-contain"
//               />
//             ) : (
//               <p className="text-gray-400">Image Preview</p>
//             )}
//           </div>

//           <button
//             id="predict-button"
//             onClick={handlePredict}
//             className={`w-full bg-green-500 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors duration-300 ${
//               !selectedImage || isProcessing
//                 ? 'opacity-50 cursor-not-allowed'
//                 : 'hover:bg-green-600'
//             }`}
//             disabled={!selectedImage || isProcessing}
//           >
//             {isProcessing ? 'Predicting...' : 'Predict Breed'}
//           </button>
//         </div>

//         {/* Result Section */}
//         {prediction && info && (
//           <div
//             id="result-container"
//             className="mt-8 text-left p-6 bg-gray-50 rounded-xl"
//           >
//             <h2 className="text-2xl font-bold text-gray-700 mb-2">Prediction</h2>
//             <p
//               id="prediction-text"
//               className="text-xl font-semibold text-gray-900 mb-4"
//             >
//               {prediction}
//             </p>
//             <div id="info-details" className="space-y-2">
//               <p className="text-gray-500">
//                 <span className="font-semibold text-gray-700">Milk Yield:</span>
//                 <span id="milk-yield"> {info.milk_yield}</span>
//               </p>
//               <p className="text-gray-500">
//                 <span className="font-semibold text-gray-700">Traits:</span>
//                 <span id="traits"> {info.traits.join(', ')}</span>
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Error/Status Message Section */}
//         {status && (
//           <div
//             id="status-message"
//             className={`mt-4 p-3 rounded-lg text-sm ${getStatusClass()}`}
//           >
//             {status}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CattlePredictor;
// // import React, { useState, useEffect } from 'react';
// // import { Helmet } from 'react-helmet';
// // import Header from '../../components/ui/Header';
// // import { useLanguage } from '../../contexts/LanguageContext';
// // import Button from '../../components/ui/Button';
// // import Icon from '../../components/AppIcon';
// // import ImageUploadZone from './components/ImageUploadZone';
// // import ProcessingLoader from './components/ProcessingLoader';
// // import ResultCard from './components/ResultCard';
// // import ErrorMessage from './components/ErrorMessage';
// // import RecentPredictions from './components/RecentPredictions';
// // import InstructionsPanel from './components/InstructionsPanel';
// // import { identifyBreedWithOpenAI } from '../../services/breedIdentificationService';

// // // The URL for the Flask backend, update with your actual deployment URL
// // const BACKEND_URL = 'https://sih-6-yve3.onrender.com';

// // const BreedIdentificationDemo = () => {
// //   const { t } = useLanguage();
// //   const [selectedImage, setSelectedImage] = useState(null);
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const [result, setResult] = useState(null);
// //   const [error, setError] = useState(null);
// //   const [recentPredictions, setRecentPredictions] = useState([]);

// //   // Load recent predictions from localStorage on component mount
// //   useEffect(() => {
// //     const saved = localStorage.getItem('recentPredictions');
// //     if (saved) {
// //       try {
// //         setRecentPredictions(JSON.parse(saved));
// //       } catch (e) {
// //         console.error('Failed to load recent predictions:', e);
// //       }
// //     }
// //   }, []);

// //   // Save recent predictions to localStorage
// //   const saveToHistory = (prediction) => {
// //     const updated = [prediction, ...recentPredictions?.slice(0, 9)]; // Keep last 10
// //     setRecentPredictions(updated);
// //     localStorage.setItem('recentPredictions', JSON.stringify(updated));
// //   };

// //   const handleImageUpload = async (file) => {
// //     if (!file) return;

// //     // Validate file size (10MB limit)
// //     if (file?.size > 10 * 1024 * 1024) {
// //       setError({
// //         type: 'upload',
// //         message: 'File size too large. Please choose an image smaller than 10MB.'
// //       });
// //       return;
// //     }

// //     // Validate file type
// //     if (!file?.type?.startsWith('image/')) {
// //       setError({
// //         type: 'upload',
// //         message: 'Please select a valid image file (JPG, PNG, WEBP).'
// //       });
// //       return;
// //     }

// //     setSelectedImage(file);
// //     setError(null);
// //     setResult(null);
// //     setIsProcessing(true);

// //     try {
// //       // Prepare multipart/form-data
// //       const formData = new FormData();
// //       formData.append('file', file);

// //       // Call the Flask backend /predict endpoint
// //       const response = await fetch(`${BACKEND_URL}/predict`, {
// //         method: 'POST',
// //         body: formData,
// //       });

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const data = await response.json();
// //       const prediction = {
// //         breedName: data.prediction,
// //         confidence: data.confidence || null,
// //         breedInfo: {
// //           origin: data.info.origin,
// //           type: data.info.type,
// //           characteristics: data.info.traits.join('\n'),
// //           primaryUse: data.info.primary_use,
// //           averageWeight: data.info.average_weight,
// //           milkYield: data.info.milk_yield,
// //         },
// //         timestamp: Date.now(),
// //         id: Date.now().toString(),
// //       };
      
// //       setResult(prediction);
// //       saveToHistory({
// //         ...prediction,
// //         imageUrl: URL.createObjectURL(file)
// //       });
// //     } catch (err) {
// //       console.error('Breed identification error:', err);
// //       setError({
// //         type: 'processing',
// //         message: err?.message || 'Failed to process image. Please try again. Ensure the backend server is running.'
// //       });
// //     } finally {
// //       setIsProcessing(false);
// //     }
// //   };

// //   const handleRetry = () => {
// //     if (selectedImage) {
// //       handleImageUpload(selectedImage);
// //     } else {
// //       setError(null);
// //       setResult(null);
// //     }
// //   };

// //   const handleClearError = () => {
// //     setError(null);
// //   };

// //   const handleSelectPrediction = (prediction) => {
// //     setResult(prediction);
// //     setSelectedImage(null);
// //     setError(null);
// //   };

// //   const handleClearHistory = () => {
// //     setRecentPredictions([]);
// //     localStorage.removeItem('recentPredictions');
// //   };

// //   const handleNewIdentification = () => {
// //     setSelectedImage(null);
// //     setResult(null);
// //     setError(null);
// //     setIsProcessing(false);
// //   };

// //   return (
// //     <div className="min-h-screen bg-background">
// //       <Helmet>
// //         <title>AI-Powered Breed Identification - Cattle & Buffalo Recognition</title>
// //         <meta name="description" content="Upload cattle or buffalo images for instant AI-powered breed identification using OpenAI's advanced vision technology. Get detailed breed information and confidence scores." />
// //       </Helmet>
// //       <Header />
// //       <main className="pt-16">
// //         {/* Hero Section */}
// //         <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-12 lg:py-16">
// //           <div className="mx-4 lg:mx-6 max-w-7xl lg:mx-auto">
// //             <div className="text-center space-y-6">
// //               <div className="space-y-4">
// //                 <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">
// //                   AI-Powered Breed Identification
// //                 </h1>
// //                 <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
// //                   Upload an image of your cattle or buffalo and get instant breed identification
// //                   powered by OpenAI's advanced vision technology with detailed breed information and analysis.
// //                 </p>
// //               </div>
              
// //               <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
// //                 <div className="flex items-center gap-2">
// //                   <Icon name="Zap" size={16} className="text-primary" />
// //                   <span>OpenAI Powered</span>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <Icon name="Brain" size={16} className="text-secondary" />
// //                   <span>Advanced Vision AI</span>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <Icon name="Shield" size={16} className="text-success" />
// //                   <span>Expert Analysis</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Main Content */}
// //         <section className="py-12 lg:py-16">
// //           <div className="mx-4 lg:mx-6 max-w-7xl lg:mx-auto">
// //             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //               {/* Left Column - Upload and Results */}
// //               <div className="lg:col-span-2 space-y-8">
// //                 {/* Upload Zone */}
// //                 <div className="bg-card rounded-xl border border-border p-6 shadow-gentle">
// //                   <div className="mb-6">
// //                     <h2 className="font-heading font-semibold text-xl text-foreground mb-2">
// //                       Upload Image for AI Analysis
// //                     </h2>
// //                     <p className="text-muted-foreground text-sm">
// //                       Choose a clear image of your cattle or buffalo for OpenAI-powered breed identification
// //                     </p>
// //                   </div>
                  
// //                   <ImageUploadZone
// //                     onImageUpload={handleImageUpload}
// //                     isProcessing={isProcessing}
// //                     selectedImage={selectedImage}
// //                   />
// //                 </div>

// //                 {/* Processing Loader */}
// //                 <ProcessingLoader isVisible={isProcessing} />

// //                 {/* Error Message */}
// //                 <ErrorMessage
// //                   error={error}
// //                   onRetry={handleRetry}
// //                   onClear={handleClearError}
// //                 />

// //                 {/* Results */}
// //                 {result && (
// //                   <div className="space-y-6">
// //                     <div className="flex items-center justify-between">
// //                       <h2 className="font-heading font-semibold text-xl text-foreground">
// //                         AI Identification Result
// //                       </h2>
// //                       <Button
// //                         variant="outline"
// //                         iconName="Plus"
// //                         iconPosition="left"
// //                         onClick={handleNewIdentification}
// //                       >
// //                         New Identification
// //                       </Button>
// //                     </div>
                    
// //                     <ResultCard
// //                       result={result}
// //                       onRetry={handleRetry}
// //                     />
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Right Column - Instructions and History */}
// //               <div className="space-y-8">
// //                 <InstructionsPanel />
                
// //                 <RecentPredictions
// //                   predictions={recentPredictions}
// //                   onSelectPrediction={handleSelectPrediction}
// //                   onClearHistory={handleClearHistory}
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Features Section */}
// //         <section className="py-12 lg:py-16 bg-muted/30">
// //           <div className="mx-4 lg:mx-6 max-w-7xl lg:mx-auto">
// //             <div className="text-center mb-12">
// //               <h2 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-4">
// //                 OpenAI Vision Technology
// //               </h2>
// //               <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
// //                 Our breed identification system leverages OpenAI's cutting-edge GPT-4o model
// //                 for accurate visual analysis and expert-level breed identification.
// //               </p>
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //               {[
// //                 {
// //                   icon: "Brain",
// //                   title: "GPT-4o Vision",
// //                   description: "Advanced multimodal AI model with superior image understanding capabilities"
// //                 },
// //                 {
// //                   icon: "Target",
// //                   title: "Expert Analysis",
// //                   description: "Professional-grade breed identification with detailed characteristics analysis"
// //                 },
// //                 {
// //                   icon: "Zap",
// //                   title: "Real-time Processing",
// //                   description: "Fast AI-powered analysis with comprehensive breed information"
// //                 },
// //                 {
// //                   icon: "Database",
// //                   title: "Comprehensive Knowledge",
// //                   description: "Trained on extensive livestock datasets covering global cattle and buffalo breeds"
// //                 }
// //               ]?.map((feature, index) => (
// //                 <div key={index} className="bg-card rounded-xl border border-border p-6 text-center shadow-gentle hover:shadow-gentle-lg transition-gentle">
// //                   <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
// //                     <Icon name={feature?.icon} size={24} className="text-primary" />
// //                   </div>
// //                   <h3 className="font-heading font-semibold text-foreground mb-2">
// //                     {feature?.title}
// //                   </h3>
// //                   <p className="text-muted-foreground text-sm leading-relaxed">
// //                     {feature?.description}
// //                   </p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </section>
// //       </main>
// //     </div>
// //   );
// // };

// // export default BreedIdentificationDemo;
import React, { useState, useEffect } from 'react';

// The main App component that contains all the logic and UI
const App = () => {
  // State variables for the application
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [recentPredictions, setRecentPredictions] = useState([]);
  
  // The URL for the Flask backend
  const BACKEND_URL = 'https://sih-6-yve3.onrender.com';

  // Function to fetch recent predictions from local storage on load
  useEffect(() => {
    try {
      const storedPredictions = JSON.parse(localStorage.getItem('predictions')) || [];
      setRecentPredictions(storedPredictions);
    } catch (e) {
      console.error("Failed to load predictions from local storage:", e);
      setRecentPredictions([]);
    }
  }, []);

  // Saves a new prediction to local storage
  const saveToHistory = (prediction) => {
    let currentPredictions = JSON.parse(localStorage.getItem('predictions')) || [];
    currentPredictions.unshift(prediction); // Add to the start of the array
    localStorage.setItem('predictions', JSON.stringify(currentPredictions));
    setRecentPredictions(currentPredictions);
  };

  // Clears the entire prediction history from local storage
  const handleClearHistory = () => {
    localStorage.removeItem('predictions');
    setRecentPredictions([]);
  };

  // Handles the image upload and sends it to the backend for prediction
  const handleImageUpload = async (file) => {
    if (!file) return;

    if (file?.size > 10 * 1024 * 1024) {
      setError({
        type: 'upload',
        message: 'File size too large. Please choose an image smaller than 10MB.'
      });
      return;
    }

    if (!file?.type?.startsWith('image/')) {
      setError({
        type: 'upload',
        message: 'Please select a valid image file (JPG, PNG, WEBP).'
      });
      return;
    }

    setSelectedImage(file);
    setError(null);
    setResult(null);
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${BACKEND_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const prediction = {
        breedName: data.prediction,
        confidence: data.confidence || null,
        breedInfo: {
          origin: data.info.origin,
          type: data.info.type,
          characteristics: data.info.traits.join('\n'),
          primaryUse: data.info.primary_use,
          averageWeight: data.info.average_weight,
          milkYield: data.info.milk_yield,
        },
        timestamp: Date.now(),
        imageUrl: URL.createObjectURL(file),
      };
      
      setResult(prediction);
      saveToHistory(prediction);
    } catch (err) {
      console.error('Breed identification error:', err);
      setError({
        type: 'processing',
        message: err?.message || 'Failed to process image. Please try again. Ensure the backend server is running.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetry = () => {
    if (selectedImage) {
      handleImageUpload(selectedImage);
    } else {
      setError(null);
      setResult(null);
    }
  };

  const handleClearError = () => {
    setError(null);
  };

  const handleSelectPrediction = (prediction) => {
    setResult(prediction);
    setSelectedImage(null);
    setError(null);
  };

  const handleNewIdentification = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
    setIsProcessing(false);
  };

  // Inline SVG icons to replace external libraries
  const Icon = ({ name, size = 16, className = '' }) => {
    const icons = {
      Zap: (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M11 19v-7H8.5l.34-1.63a.9.9 0 0 1 .49-.51l7.85-4.4a.5.5 0 0 1 .74.45L17.5 12h3.5l-8.5 7z" />
        </svg>
      ),
      Brain: (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M9.54 8.52a4.4 4.4 0 0 1 1.09-1.95L10 6a6 6 0 0 1 4 4v1h1a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3V9a3 3 0 0 1 3-3h.5a3 3 0 0 1 2.92 2.37L22 9V8a6 6 0 0 0-6-6A6 6 0 0 0 4 8v14.4l-1.3-.87a.5.5 0 0 0-.7.42V22a.5.5 0 0 0 .5.5H8a.5.5 0 0 0 .5-.5V14a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V10a.5.5 0 0 0-.5-.5H8a.5.5 0 0 0-.5.5v3.5a.5.5 0 0 0 .5.5h2.5a.5.5 0 0 0 .5-.5V8.5" />
        </svg>
      ),
      Shield: (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      Plus: (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      ),
      Target: (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
      Database: (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5V19A9 3 0 0 0 21 19V5" />
          <path d="M3 12A9 9 0 0 0 21 12" />
        </svg>
      ),
      Trash: (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M3 6h18" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      ),
      Info: (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      ),
      Retry: (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M21 12a9 9 0 0 0-9-9c-7.23 0-11.5 5.8-11 12" />
          <path d="M12 21a9 9 0 0 0 9-9c-7.23 0-11.5 5.8-11 12" />
          <polyline points="14 10 14 14 18 14" />
          <polyline points="10 14 10 10 6 10" />
        </svg>
      ),
    };
    return icons[name] || null;
  };
  
  // Custom button component
  const Button = ({ children, onClick, variant = 'primary', iconName, iconPosition = 'left', className = '' }) => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
    const variantClasses = {
      primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-md',
      secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400',
      destructive: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-md',
    };
    const paddingClasses = 'px-4 py-2';
    const iconSpan = iconName && <span className={iconPosition === 'left' ? 'mr-2' : 'ml-2'}><Icon name={iconName} size={16} /></span>;

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses} ${className}`}
      >
        {iconPosition === 'left' && iconSpan}
        {children}
        {iconPosition === 'right' && iconSpan}
      </button>
    );
  };
  
  // Render the entire application UI
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <script src="https://cdn.tailwindcss.com"></script>
      <style>{`
        body { font-family: 'Inter', sans-serif; }
        .shadow-gentle { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
        .shadow-gentle-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
        .transition-gentle { transition: box-shadow 0.3s ease-in-out; }
      `}</style>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 text-center space-y-6">
          <div className="space-y-4">
            <h1 className="font-bold text-3xl lg:text-4xl text-gray-800">
              AI-Powered Breed Identification
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Upload an image of your cattle or buffalo and get instant breed identification
              powered by advanced vision technology with detailed breed information and analysis.
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Icon name="Zap" size={16} className="text-indigo-500" />
              <span>AI Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Brain" size={16} className="text-purple-500" />
              <span>Advanced Vision AI</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Shield" size={16} className="text-emerald-500" />
              <span>Expert Analysis</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Upload and Results */}
            <div className="lg:col-span-2 space-y-8">
              {/* Upload Zone */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-gentle">
                <div className="mb-6">
                  <h2 className="font-semibold text-xl text-gray-800 mb-2">
                    Upload Image for AI Analysis
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Choose a clear image of your cattle or buffalo for identification.
                  </p>
                </div>
                
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                  />
                  {selectedImage ? (
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Preview"
                      className="w-full h-auto max-h-64 object-contain rounded-xl mb-4"
                    />
                  ) : (
                    <div className="text-gray-400">
                      <p className="text-xl mb-2">Drag & drop or</p>
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Click to upload an image
                      </label>
                      <p className="text-sm mt-2">Maximum file size: 10MB</p>
                    </div>
                  )}
                  {selectedImage && !isProcessing && (
                    <Button onClick={() => handleImageUpload(selectedImage)} className="mt-4">
                      Identify Breed
                    </Button>
                  )}
                </div>
              </div>

              {/* Processing Loader */}
              {isProcessing && (
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-gentle text-center">
                  <svg className="animate-spin h-8 w-8 text-indigo-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  <p className="mt-4 text-gray-500">Processing image, please wait...</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 rounded-xl border border-red-200 p-4 shadow-gentle">
                  <div className="flex items-center gap-3 text-red-700">
                    <Icon name="Info" size={20} className="text-red-500" />
                    <span className="font-semibold">Error:</span>
                    <p>{error.message}</p>
                  </div>
                  <div className="flex justify-end mt-4 gap-2">
                    <Button onClick={handleClearError} variant="secondary">Clear</Button>
                    <Button onClick={handleRetry} variant="destructive" iconName="Retry" iconPosition="right">Retry</Button>
                  </div>
                </div>
              )}

              {/* Results */}
              {result && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800">
                      AI Identification Result
                    </h2>
                    <Button
                      variant="outline"
                      iconName="Plus"
                      iconPosition="left"
                      onClick={handleNewIdentification}
                    >
                      New Identification
                    </Button>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-gentle">
                    <h3 className="font-bold text-2xl text-indigo-600 mb-2">{result.breedName}</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {result.confidence && `Confidence: ${(result.confidence * 100).toFixed(2)}%`}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <p><strong>Origin:</strong> {result.breedInfo.origin}</p>
                        <p><strong>Type:</strong> {result.breedInfo.type}</p>
                        <p><strong>Primary Use:</strong> {result.breedInfo.primaryUse}</p>
                      </div>
                      <div className="space-y-2">
                        <p><strong>Average Weight:</strong> {result.breedInfo.averageWeight}</p>
                        <p><strong>Milk Yield:</strong> {result.breedInfo.milkYield}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm"><strong>Characteristics:</strong></p>
                    <pre className="whitespace-pre-wrap text-sm text-gray-600 mt-1">{result.breedInfo.characteristics}</pre>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Instructions and History */}
            <div className="space-y-8">
              {/* Instructions Panel */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-gentle">
                <h2 className="font-semibold text-xl text-gray-800 mb-2">Instructions</h2>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-2">
                  <li>Upload a clear image of the full animal.</li>
                  <li>Ensure the image is well-lit and not blurry.</li>
                  <li>Supported formats: JPG, PNG, WEBP.</li>
                  <li>Get detailed breed information instantly.</li>
                </ul>
              </div>
              
              {/* Recent Predictions History */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-gentle">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-xl text-gray-800">Recent Predictions</h2>
                  {recentPredictions.length > 0 && (
                    <Button onClick={handleClearHistory} variant="destructive" iconName="Trash">
                      Clear All
                    </Button>
                  )}
                </div>
                {recentPredictions.length > 0 ? (
                  <ul className="space-y-4">
                    {recentPredictions.map((pred, index) => (
                      <li key={index} onClick={() => handleSelectPrediction(pred)} className="cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 border border-gray-100 flex items-center space-x-4">
                        <img src={pred.imageUrl} alt="Prediction History" className="w-16 h-16 object-cover rounded-lg" />
                        <div>
                          <p className="font-semibold text-gray-800">{pred.breedName}</p>
                          <p className="text-sm text-gray-500">{new Date(pred.timestamp).toLocaleString()}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 text-center">No recent predictions found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 lg:py-16 bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="font-bold text-2xl lg:text-3xl text-gray-800 mb-4">
              Advanced Vision Technology
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our system leverages cutting-edge AI models for accurate visual analysis and expert-level breed identification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "Brain",
                title: "Advanced AI Vision",
                description: "Advanced AI with superior image understanding capabilities."
              },
              {
                icon: "Target",
                title: "Expert Analysis",
                description: "Professional-grade breed identification with detailed characteristics analysis."
              },
              {
                icon: "Zap",
                title: "Real-time Processing",
                description: "Fast AI-powered analysis with comprehensive breed information."
              },
              {
                icon: "Database",
                title: "Comprehensive Knowledge",
                description: "Trained on extensive livestock datasets covering global cattle and buffalo breeds."
              }
            ]?.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 text-center shadow-gentle hover:shadow-gentle-lg transition-gentle">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={feature?.icon} size={24} className="text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {feature?.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default App;
