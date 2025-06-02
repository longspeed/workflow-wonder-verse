export const API_CONFIG = {
  google: {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || 'AIzaSyCB40Mqw0iRTDwZ9lFwXQtuOhPnkdB-vaw',
    endpoints: {
      youtube: 'https://www.googleapis.com/youtube/v3',
      maps: 'https://maps.googleapis.com/maps/api',
    },
  },
} as const;

// Helper function to get API key
export const getGoogleApiKey = () => API_CONFIG.google.apiKey;

// Helper function to get YouTube API endpoint
export const getYouTubeEndpoint = () => API_CONFIG.google.endpoints.youtube;

// Helper function to get Maps API endpoint
export const getMapsEndpoint = () => API_CONFIG.google.endpoints.maps; 