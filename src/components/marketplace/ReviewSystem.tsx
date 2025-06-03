import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { Review } from '@/types/marketplace';

interface ReviewSystemProps {
  automationId: string;
  userId: string;
  reviews: Review[];
  onReviewAdded?: () => void;
}

export function ReviewSystem({ automationId, userId, reviews, onReviewAdded }: ReviewSystemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const queryClient = useQueryClient();

  const { mutate: addReview, isPending } = useMutation({
    mutationFn: async () => {
      // Mock implementation - replace with actual service call
      return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true }), 1000);
      });
    },
    onSuccess: () => {
      toast('Review added successfully!');
      setIsOpen(false);
      setRating(0);
      setComment('');
      queryClient.invalidateQueries({ queryKey: ['automation', automationId] });
      onReviewAdded?.();
    },
    onError: () => {
      toast('Failed to add review. Please try again.');
    },
  });

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;
  const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
    const count = reviews.filter(review => review.rating === i + 1).length;
    return {
      rating: i + 1,
      count,
      percentage: (count / reviews.length) * 100 || 0,
    };
  }).reverse();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Customer Reviews</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'w-5 h-5',
                    i < Math.round(averageRating) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
                  )}
                />
              ))}
            </div>
            <span className="text-gray-600">
              {averageRating.toFixed(1)} out of 5 ({reviews.length} reviews)
            </span>
          </div>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Write a Review</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onMouseEnter={() => setHoveredRating(i + 1)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(i + 1)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={cn(
                          'w-8 h-8 transition-colors',
                          (hoveredRating || rating) > i
                            ? 'fill-yellow-500 text-yellow-500'
                            : 'text-gray-300'
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Review</label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with this automation..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => addReview()}
                  disabled={isPending || !rating || !comment.trim()}
                >
                  {isPending ? 'Submitting...' : 'Submit Review'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-2">
              <div className="flex items-center gap-1 w-24">
                <span className="text-sm text-gray-600">{rating}</span>
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              </div>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-yellow-500"
                />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">
                {count}
              </span>
            </div>
          ))}
        </div>

        <div className="md:col-span-2 space-y-6">
          <AnimatePresence mode="popLayout">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                className="border-b pb-6 last:border-0"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img
                      src={review.user.avatar_url || '/default-avatar.png'}
                      alt={review.user.full_name || 'User'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{review.user.full_name || 'Anonymous'}</p>
                    <div className="flex items-center text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'w-4 h-4',
                            i < review.rating ? 'fill-current' : ''
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 ml-auto">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
