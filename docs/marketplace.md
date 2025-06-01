# Marketplace Documentation

## Overview
The marketplace is a platform where users can buy and sell automations. It includes features for browsing, purchasing, managing favorites, and real-time notifications.

## Database Schema

### Tables

#### automations
- `id`: UUID (Primary Key)
- `seller_id`: UUID (Foreign Key to auth.users)
- `name`: Text
- `description`: Text
- `category`: Text
- `price`: Decimal(10,2)
- `currency`: Text (default: 'USD')
- `rating`: Decimal(3,2) (default: 0)
- `download_count`: Integer (default: 0)
- `tags`: Text[]
- `image_urls`: Text[]
- `demo_url`: Text
- `documentation_url`: Text
- `created_at`: Timestamp
- `updated_at`: Timestamp
- `featured`: Boolean (default: false)
- `status`: Enum ('draft', 'published', 'archived')

#### purchases
- `id`: UUID (Primary Key)
- `buyer_id`: UUID (Foreign Key to auth.users)
- `automation_id`: UUID (Foreign Key to automations)
- `amount`: Decimal(10,2)
- `currency`: Text (default: 'USD')
- `status`: Enum ('pending', 'completed', 'refunded')
- `created_at`: Timestamp
- `updated_at`: Timestamp

#### favorites
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key to auth.users)
- `automation_id`: UUID (Foreign Key to automations)
- `created_at`: Timestamp

#### reviews
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key to auth.users)
- `automation_id`: UUID (Foreign Key to automations)
- `rating`: Integer (1-5)
- `comment`: Text
- `created_at`: Timestamp
- `updated_at`: Timestamp

#### notifications
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key to auth.users)
- `title`: Text
- `message`: Text
- `type`: Text
- `read`: Boolean (default: false)
- `created_at`: Timestamp

## Features

### 1. Browse Automations
- Filter by category, price, rating, and tags
- Search by name and description
- Sort by popularity, price, rating, and latest
- View automation details including demo and documentation

### 2. Seller Dashboard
- Manage automations (create, update, delete)
- Track sales and analytics
- Update automation status
- View performance metrics
- Real-time updates for sales and reviews

### 3. Buyer Dashboard
- View purchase history
- Access purchased automations
- Manage favorites
- View demos
- Track downloads

### 4. Real-time Features
- Real-time notifications
- Connection status indicators
- Live updates for:
  - New purchases
  - Automation status changes
  - Reviews and ratings
  - System status

## Security

### Row Level Security (RLS) Policies

#### Automations
- Public automations are viewable by everyone
- Users can view their own automations
- Sellers can insert and update their own automations

#### Purchases
- Users can view their own purchases
- Users can create their own purchases

#### Favorites
- Users can view and manage their own favorites

#### Reviews
- Public reviews are viewable by everyone
- Users can create and update their own reviews

#### Notifications
- Users can view and update their own notifications

## API Integration

### Supabase Client
The marketplace uses Supabase for:
- Real-time subscriptions
- Database operations
- Authentication
- Storage

### React Query
Used for:
- Data fetching
- Caching
- State management
- Optimistic updates

## Components

### 1. AutomationCard
Displays automation information and purchase/favorite actions.

### 2. FilterSidebar
Provides filtering and sorting options for browsing automations.

### 3. RealTimeNotification
Shows real-time notifications with read/unread status.

### 4. ConnectionStatusBadge
Displays real-time connection status.

### 5. RealTimeUpdateIndicator
Shows when data is being updated in real-time.

## Hooks

### useMarketplace
Custom hook for marketplace functionality:
- Fetch automations with filters
- Manage purchases
- Toggle favorites
- Add reviews

## Error Handling
- Toast notifications for success/error messages
- Loading states for async operations
- Error boundaries for component errors
- Graceful fallbacks for failed operations

## Performance Considerations
- Pagination for large datasets
- Optimistic updates for better UX
- Caching with React Query
- Efficient real-time subscriptions

## Future Improvements
1. Add payment gateway integration
2. Implement user ratings and reviews
3. Add analytics dashboard
4. Enhance search functionality
5. Add bulk operations
6. Implement caching strategies
7. Add automated testing
8. Improve error handling
9. Add user onboarding
10. Implement A/B testing 