import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

const categories = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

const priceRanges = [
  { id: 'free', label: 'Free' },
  { id: 'paid', label: 'Paid' },
  { id: 'all', label: 'All' },
];

export function CourseFilters() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="all" className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All Categories</Label>
            </div>
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <RadioGroupItem value={category.id} id={category.id} />
                <Label htmlFor={category.id}>{category.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="all" className="space-y-2">
            {priceRanges.map((range) => (
              <div key={range.id} className="flex items-center space-x-2">
                <RadioGroupItem value={range.id} id={range.id} />
                <Label htmlFor={range.id}>{range.label}</Label>
              </div>
            ))}
          </RadioGroup>
          <div className="mt-4">
            <Label>Maximum Price</Label>
            <Slider
              defaultValue={[100]}
              max={200}
              step={10}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox id={`rating-${rating}`} />
                <Label htmlFor={`rating-${rating}`}>
                  {rating}+ Stars
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 