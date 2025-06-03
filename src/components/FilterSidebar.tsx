import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AutomationFilters } from '@/types/automation';

interface FilterSidebarProps {
  filters: AutomationFilters;
  onFilterChange: (filters: AutomationFilters) => void;
}

const categories = ['All Categories', 'Productivity', 'CRM', 'Marketing', 'Analytics', 'E-commerce', 'Social Media'];
const priceRanges = [
  { value: '', label: 'All Prices' },
  { value: '0', label: 'Free' },
  { value: '50', label: 'Under $50' },
  { value: '100', label: 'Under $100' },
  { value: '200', label: 'Under $200' }
];
const ratingRanges = [
  { value: '', label: 'All Ratings' },
  { value: '4', label: '4 stars & up' },
  { value: '3', label: '3 stars & up' },
  { value: '2', label: '2 stars & up' }
];

export function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const handleCategoryChange = (value: string) => {
    onFilterChange({ ...filters, category: value });
  };

  const handlePriceChange = (value: string) => {
    onFilterChange({ ...filters, price: value });
  };

  const handleRatingChange = (value: string) => {
    onFilterChange({ ...filters, rating: value });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <Select value={filters.category} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category === 'All Categories' ? 'all' : category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <Select value={filters.price} onValueChange={handlePriceChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select price range" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <Select value={filters.rating} onValueChange={handleRatingChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select minimum rating" />
              </SelectTrigger>
              <SelectContent>
                {ratingRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
} 