import { URL } from 'url';

/**
 * Analyzes an uploaded image to identify cattle or buffalo breeds using a Flask server's service.
 * @param {File} imageFile - The image file to analyze.
 * @returns {Promise<Object>} Breed identification results with confidence and detailed information.
 */
export async function identifyBreedWithFlask(imageFile) {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch('https://sih-4-b4gr.onrender.com/identify-breed', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with an error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    
    return {
      ...result,
      timestamp: Date.now(),
      id: Date.now().toString(),
    };
  } catch (error) {
    console.error('Error in breed identification:', error);
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error. Please check if the server is running and reachable.');
    } else {
      throw new Error(error.message || 'Failed to identify breed. Please try again with a clearer image.');
    }
  }
}

/**
 * Enhanced image analysis with specific focus areas using a Flask server
 * @param {File} image - Image file to analyze
 * @param {string} analysisType - Type of analysis: 'breed', 'health', 'condition'
 * @returns {Promise<Object>} Detailed analysis results
 */
export async function analyzeImageWithFlask(image, analysisType = 'breed') {
  try {
    if (!(image instanceof File)) {
      throw new Error("No valid image file provided");
    }
    
    const formData = new FormData();
    formData.append('image', image);
    formData.append('analysisType', analysisType);

    const response = await fetch('https://sih-4-b4gr.onrender.com/analyze-image', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with an error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    
    return {
      analysis: result.analysis,
      analysisType,
      imageUrl: null,
    };
  } catch (error) {
    console.error('Error analyzing image with Flask server:', error);
    throw error;
  }
}