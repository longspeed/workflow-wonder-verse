-- Rename products table to automations
ALTER TABLE products RENAME TO automations;

-- Rename columns to match the new schema
ALTER TABLE automations 
  RENAME COLUMN title TO name;

-- Update foreign key references
ALTER TABLE user_purchases 
  RENAME COLUMN product_id TO automation_id;

-- Drop old foreign key constraint
ALTER TABLE user_purchases 
  DROP CONSTRAINT user_purchases_product_id_fkey;

-- Add new foreign key constraint
ALTER TABLE user_purchases 
  ADD CONSTRAINT user_purchases_automation_id_fkey 
  FOREIGN KEY (automation_id) 
  REFERENCES automations(id) 
  ON DELETE CASCADE;

-- Update RLS policies
DROP POLICY IF EXISTS "Public products are viewable by everyone" ON automations;
DROP POLICY IF EXISTS "Users can view their own products" ON automations;
DROP POLICY IF EXISTS "Sellers can insert their own products" ON automations;
DROP POLICY IF EXISTS "Sellers can update their own products" ON automations;

-- Create new policies for automations
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

-- Update indexes
CREATE INDEX IF NOT EXISTS idx_automations_seller_id ON automations(seller_id);
CREATE INDEX IF NOT EXISTS idx_automations_category ON automations(category);
CREATE INDEX IF NOT EXISTS idx_automations_status ON automations(status);
CREATE INDEX IF NOT EXISTS idx_automations_featured ON automations(featured);

-- Update user_purchases indexes
CREATE INDEX IF NOT EXISTS idx_user_purchases_automation_id ON user_purchases(automation_id);
CREATE INDEX IF NOT EXISTS idx_user_purchases_user_id ON user_purchases(user_id); 