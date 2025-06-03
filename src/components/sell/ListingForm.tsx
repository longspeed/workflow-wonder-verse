import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Plus, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const ListingForm = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    description: '',
    price: '',
    pricingModel: '',
    demo: '',
  });

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare the data to send to the webhook
      const submissionData = {
        ...formData,
        tags,
        submittedAt: new Date().toISOString(),
        commission: (parseFloat(formData.price) * 0.85).toFixed(2)
      };

      console.log('Submitting form data:', submissionData);

      // Send POST request to the webhook
      const response = await fetch('https://nguyenngocson.app.n8n.cloud/webhook-test/fdcc6b6c-7172-4312-a3f7-382e379939d9', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        toast('Your automation has been submitted for review successfully!');
        
        // Reset form
        setFormData({
          productName: '',
          category: '',
          description: '',
          price: '',
          pricingModel: '',
          demo: '',
        });
        setTags([]);
      } else {
        throw new Error(`Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast('Failed to submit your automation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    // Save to localStorage as draft
    const draftData = {
      ...formData,
      tags,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('automationDraft', JSON.stringify(draftData));
    toast('Draft saved successfully!');
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            List Your AI Automation
          </h2>
          <p className="text-xl text-gray-600">
            Fill out the form below to get your automation listed on our marketplace
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
            <CardDescription>
              Provide detailed information about your AI automation to help buyers understand its value
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name *</Label>
                  <Input 
                    id="productName" 
                    placeholder="e.g., Smart Email Responder AI"
                    value={formData.productName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <select 
                    id="category" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="email">Email Automation</option>
                    <option value="crm">CRM Integration</option>
                    <option value="social">Social Media</option>
                    <option value="analytics">Data Analytics</option>
                    <option value="customer-service">Customer Service</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description"
                  placeholder="Describe what your automation does, its key features, and benefits..."
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD) *</Label>
                  <Input 
                    id="price" 
                    type="number"
                    placeholder="99"
                    min="1"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pricingModel">Pricing Model *</Label>
                  <select 
                    id="pricingModel" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.pricingModel}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select model</option>
                    <option value="one-time">One-time Purchase</option>
                    <option value="monthly">Monthly Subscription</option>
                    <option value="yearly">Yearly Subscription</option>
                    <option value="usage">Usage-based</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commission">Your Commission (85%)</Label>
                  <Input 
                    id="commission" 
                    value={formData.price ? `$${(parseFloat(formData.price) * 0.85).toFixed(2)}` : '$0.00'}
                    disabled
                    className="bg-green-50 text-green-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input 
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tags (e.g., AI, automation, CRM)"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} size="icon" variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      {tag}
                      <button 
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:bg-blue-200 rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="demo">Demo URL (Optional)</Label>
                <Input 
                  id="demo" 
                  type="url"
                  placeholder="https://your-demo-link.com"
                  value={formData.demo}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Product Images</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Click to upload images or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Button variant="outline" type="button" onClick={handleSaveDraft}>
                  Save as Draft
                </Button>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit for Review'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ListingForm;
