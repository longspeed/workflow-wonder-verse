
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { storageService } from '@/services/supabase';
import { useAuth } from '@/hooks/useAuth';

const CATEGORIES = [
  'Marketing',
  'Sales',
  'Customer Support',
  'HR',
  'Finance',
  'Operations',
  'Other',
];

const WEBHOOK_URL = 'https://nguyenngocson.app.n8n.cloud/webhook-test/fdcc6b6c-7172-4312-a3f7-382e379939d9';
const CREATE_AUTOMATION_API_URL = '/api/create-automation';

export function CreateAutomation() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_urls: [] as string[],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      if (!user) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(CREATE_AUTOMATION_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          seller_id: user.id,
          status: 'draft',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create automation via API');
      }

      const createdAutomation = await response.json();
      return createdAutomation;
    },
    onSuccess: async (automation) => {
      queryClient.invalidateQueries({ queryKey: ['seller-automations'] });
      toast('Automation created successfully');

      try {
        console.log('Attempting to send data to webhook:', automation);
        const response = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(automation),
        });

        console.log('Webhook response:', response);

        if (!response.ok) {
          console.error('Webhook failed to send data:', response.status, response.statusText);
          toast('Automation created, but failed to notify webhook.');
        } else {
          console.log('Webhook successfully notified');
        }
      } catch (error) {
        console.error('Error sending data to webhook:', error);
        toast('Automation created, but encountered an error sending data to webhook.');
      }

      navigate('/dashboard/automations');
    },
    onError: (error: Error) => {
      toast(error.message);
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setIsUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const path = `automations/${user!.id}/${Date.now()}-${file.name}`;
        await storageService.uploadFile('automations', path, file);
        return storageService.getPublicUrl('automations', path);
      });

      const urls = await Promise.all(uploadPromises);
      setFormData(prev => ({
        ...prev,
        image_urls: [...prev.image_urls, ...urls],
      }));
    } catch (error) {
      toast('Failed to upload images');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      toast('Please fill in all required fields');
      return;
    }

    createMutation.mutate({
      ...formData,
      price: parseFloat(formData.price),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Automation</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter automation name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your automation"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price ($)</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Images</label>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {formData.image_urls.map((url, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      image_urls: prev.image_urls.filter((_, i) => i !== index),
                    }))}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              disabled={isUploading}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard/automations')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending || isUploading}
            >
              {createMutation.isPending ? 'Creating...' : 'Create Automation'}
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}
