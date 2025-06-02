import { useState, useCallback } from 'react';
import { searchYouTubeVideos, getPlaceDetails } from '@/lib/api';

interface UseGoogleApiReturn {
  searchVideos: (query: string) => Promise<void>;
  getPlace: (placeId: string) => Promise<void>;
  data: any;
  error: string | null;
  loading: boolean;
}

export function useGoogleApi(): UseGoogleApiReturn {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const searchVideos = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await searchYouTubeVideos(query);
      if (error) {
        setError(error);
      } else {
        setData(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const getPlace = useCallback(async (placeId: string) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await getPlaceDetails(placeId);
      if (error) {
        setError(error);
      } else {
        setData(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    searchVideos,
    getPlace,
    data,
    error,
    loading,
  };
}

// Example usage in a component:
/*
import { useGoogleApi } from '@/hooks/useGoogleApi';

function VideoSearch() {
  const { searchVideos, data, error, loading } = useGoogleApi();

  const handleSearch = async (query: string) => {
    await searchVideos(query);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          {data.items.map((item: any) => (
            <div key={item.id.videoId}>
              <h3>{item.snippet.title}</h3>
              <p>{item.snippet.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
*/ 