
import { supabase } from '@/integrations/supabase/server';
import type { Database } from '@/integrations/supabase/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

type ProductInsert = Database['public']['Tables']['products']['Insert'];

// Define Zod schema for automation creation input
const createAutomationSchema = z.object({
  seller_id: z.string().uuid(),
  title: z.string().min(3, { message: 'Title must be at least 3 characters long' }).max(100, { message: 'Title cannot exceed 100 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  category: z.string().min(1, { message: 'Category is required' }),
  image_urls: z.array(z.string().url()).optional(),
  status: z.enum(['draft', 'pending_review', 'published', 'rejected']).default('draft'),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('Authentication error in API route:', authError);
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const validationResult = createAutomationSchema.safeParse(req.body);

    if (!validationResult.success) {
      console.error('Input validation error:', validationResult.error.errors);
      return res.status(400).json({
        message: 'Invalid input data',
        errors: validationResult.error.errors,
      });
    }

    let validatedData = validationResult.data;

    validatedData = {
        ...validatedData,
        title: validatedData.title.trim(),
        description: validatedData.description.trim(),
        category: validatedData.category.trim(),
    };

    if (validatedData.seller_id !== user.id) {
        console.error('Authorization error: seller_id mismatch', { requested_seller_id: validatedData.seller_id, authenticated_user_id: user.id });
        return res.status(403).json({ message: 'Forbidden: You can only create automations for your own account.' });
    }

    const automationData: ProductInsert = {
      seller_id: validatedData.seller_id,
      title: validatedData.title,
      description: validatedData.description,
      price: validatedData.price,
      category: validatedData.category,
      image_urls: validatedData.image_urls,
      status: validatedData.status,
      created_at: new Date().toISOString(),
    };

    const { data: newAutomation, error } = await supabase
      .from('products')
      .insert([automationData])
      .select()
      .single();

    if (error) {
      console.error('Error inserting automation:', error);
      return res.status(500).json({ message: 'Failed to create automation', error: error.message });
    }

    return res.status(201).json(newAutomation);

  } catch (error) {
    console.error('Unexpected error in API route:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
