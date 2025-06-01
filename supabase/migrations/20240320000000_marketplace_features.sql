-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('buyer', 'seller', 'admin');
CREATE TYPE automation_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE purchase_status AS ENUM ('pending', 'completed', 'refunded');

-- Create users table with role
ALTER TABLE auth.users ADD COLUMN role user_role DEFAULT 'buyer';
ALTER TABLE auth.users ADD COLUMN full_name text;
ALTER TABLE auth.users ADD COLUMN avatar_url text;

-- Create automations table
CREATE TABLE automations (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    seller_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    name text NOT NULL,
    description text,
    category text NOT NULL,
    price decimal(10,2) NOT NULL,
    currency text DEFAULT 'USD',
    rating decimal(3,2) DEFAULT 0,
    download_count integer DEFAULT 0,
    tags text[] DEFAULT '{}',
    image_urls text[] DEFAULT '{}',
    demo_url text,
    documentation_url text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    featured boolean DEFAULT false,
    status automation_status DEFAULT 'draft'
);

-- Create purchases table
CREATE TABLE purchases (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    buyer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    automation_id uuid REFERENCES automations(id) ON DELETE CASCADE,
    amount decimal(10,2) NOT NULL,
    currency text DEFAULT 'USD',
    status purchase_status DEFAULT 'pending',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Create favorites table
CREATE TABLE favorites (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    automation_id uuid REFERENCES automations(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, automation_id)
);

-- Create reviews table
CREATE TABLE reviews (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    automation_id uuid REFERENCES automations(id) ON DELETE CASCADE,
    rating integer CHECK (rating >= 1 AND rating <= 5),
    comment text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, automation_id)
);

-- Create notifications table
CREATE TABLE notifications (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    title text NOT NULL,
    message text NOT NULL,
    type text NOT NULL,
    read boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Create RLS policies
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Automation policies
CREATE POLICY "Public automations are viewable by everyone"
    ON automations FOR SELECT
    USING (status = 'published');

CREATE POLICY "Users can view their own automations"
    ON automations FOR SELECT
    USING (auth.uid() = seller_id);

CREATE POLICY "Sellers can insert their own automations"
    ON automations FOR INSERT
    WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update their own automations"
    ON automations FOR UPDATE
    USING (auth.uid() = seller_id);

-- Purchase policies
CREATE POLICY "Users can view their own purchases"
    ON purchases FOR SELECT
    USING (auth.uid() = buyer_id);

CREATE POLICY "Users can create their own purchases"
    ON purchases FOR INSERT
    WITH CHECK (auth.uid() = buyer_id);

-- Favorite policies
CREATE POLICY "Users can view their own favorites"
    ON favorites FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own favorites"
    ON favorites FOR ALL
    USING (auth.uid() = user_id);

-- Review policies
CREATE POLICY "Public reviews are viewable by everyone"
    ON reviews FOR SELECT
    USING (true);

CREATE POLICY "Users can create their own reviews"
    ON reviews FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
    ON reviews FOR UPDATE
    USING (auth.uid() = user_id);

-- Notification policies
CREATE POLICY "Users can view their own notifications"
    ON notifications FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
    ON notifications FOR UPDATE
    USING (auth.uid() = user_id);

-- Create functions
CREATE OR REPLACE FUNCTION update_automation_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE automations
    SET rating = (
        SELECT AVG(rating)
        FROM reviews
        WHERE automation_id = NEW.automation_id
    )
    WHERE id = NEW.automation_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_automation_rating_trigger
    AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_automation_rating(); 