import { API_CONFIG, getGoogleApiKey } from '@/config/api';

interface ApiResponse<T> {
  data: T;
  error?: string;
}

export async function fetchWithGoogleApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const apiKey = getGoogleApiKey();
    const url = `${endpoint}${endpoint.includes('?') ? '&' : '?'}key=${apiKey}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('API request error:', error);
    return {
      data: null as T,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// YouTube API specific functions
export async function searchYouTubeVideos(query: string, maxResults = 10) {
  const endpoint = `${API_CONFIG.google.endpoints.youtube}/search`;
  const params = new URLSearchParams({
    part: 'snippet',
    q: query,
    maxResults: maxResults.toString(),
    type: 'video',
  });

  return fetchWithGoogleApi(`${endpoint}?${params}`);
}

// Maps API specific functions
export async function getPlaceDetails(placeId: string) {
  const endpoint = `${API_CONFIG.google.endpoints.maps}/place/details/json`;
  const params = new URLSearchParams({
    place_id: placeId,
    fields: 'name,formatted_address,geometry,rating,reviews',
  });

  return fetchWithGoogleApi(`${endpoint}?${params}`);
}

// Example usage:
// const { data, error } = await searchYouTubeVideos('workflow automation');
// if (error) {
//   console.error('Error searching videos:', error);
// } else {
//   console.log('Search results:', data);
// } 