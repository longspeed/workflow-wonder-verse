import { supabase } from '@/integrations/supabase/server'; // Import server-side Supabase client
import type { Database } from '@/integrations/supabase/types';
import type { NextApiRequest, NextApiResponse } from 'next'; // Assuming Next.js API routes structure
import { z } from 'zod'; // Import Zod

type AutomationInsert = Database['public']['Tables']['automations']['Insert'];

// Define Zod schema for automation creation input
const createAutomationSchema = z.object({
  seller_id: z.string().uuid(), // Assuming seller_id is a UUID
  name: z.string().min(3, { message: 'Name must be at least 3 characters long' }).max(100, { message: 'Name cannot exceed 100 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  category: z.string().min(1, { message: 'Category is required' }),
  image_urls: z.array(z.string().url()).optional(), // Array of valid URLs, optional
  status: z.enum(['draft', 'pending_review', 'published', 'rejected']).default('draft'), // Example status enum
  // Add other fields as necessary with appropriate validation
});

// Assuming a Next.js API route handler signature. Adjust based on your serverless platform.
export default async function handler(
  req: NextApiRequest, // Replace with appropriate request type for your platform
  res: NextApiResponse // Replace with appropriate response type for your platform
) {
  // Ensure the request method is POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    // Authenticate the user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('Authentication error in API route:', authError);
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Validate the request body using the Zod schema
    const validationResult = createAutomationSchema.safeParse(req.body);

    if (!validationResult.success) {
      console.error('Input validation error:', validationResult.error.errors);
      return res.status(400).json({
        message: 'Invalid input data',
        errors: validationResult.error.errors,
      });
    }

    let validatedData = validationResult.data; // Use let to allow modification

    // Sanitize input data
    validatedData = {
        ...validatedData,
        name: validatedData.name.trim(),
        description: validatedData.description.trim(),
        category: validatedData.category.trim(),
        // TODO: Implement more robust sanitization for fields like description (e.g., strip HTML tags)
    };

    // Authorize the request: Ensure seller_id matches the authenticated user's ID
    if (validatedData.seller_id !== user.id) {
        console.error('Authorization error: seller_id mismatch', { requested_seller_id: validatedData.seller_id, authenticated_user_id: user.id });
        return res.status(403).json({ message: 'Forbidden: You can only create automations for your own account.' });
    }

    // Insert data into Supabase
    const automationData: AutomationInsert = {
      ...validatedData,
      // Ensure created_at is set or handled by DB default
      created_at: new Date().toISOString(), // Example: setting created_at explicitly
    };

    const { data: newAutomation, error } = await supabase
      .from('automations')
      .insert([automationData])
      .select()
      .single();

    if (error) {
      console.error('Error inserting automation:', error);
      return res.status(500).json({ message: 'Failed to create automation', error: error.message });
    }

    // Return the created automation data
    return res.status(201).json(newAutomation);

  } catch (error) {
    console.error('Unexpected error in API route:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
} 