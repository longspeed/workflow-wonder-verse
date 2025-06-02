import { useState } from 'react';
import { useGoogleApi } from '@/hooks/useGoogleApi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Search } from 'lucide-react';

export function YouTubeSearch() {
  const [query, setQuery] = useState('');
  const { searchVideos, data, error, loading } = useGoogleApi();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      await searchVideos(query);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search for videos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
          <span className="ml-2">Search</span>
        </Button>
      </form>

      {error && (
        <div className="text-red-500 text-sm">
          Error: {error}
        </div>
      )}

      {data?.items && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item: any) => (
            <Card key={item.id.videoId}>
              <CardHeader>
                <CardTitle className="text-base line-clamp-2">
                  {item.snippet.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video relative mb-4">
                  <img
                    src={item.snippet.thumbnails.high.url}
                    alt={item.snippet.title}
                    className="object-cover rounded-lg w-full h-full"
                  />
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.snippet.description}
                </p>
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span>{item.snippet.channelTitle}</span>
                  <span>
                    {new Date(item.snippet.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 