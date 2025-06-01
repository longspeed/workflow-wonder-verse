import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, Plus, X, FileText, Video, Globe, DollarSign, Tag, Zap, Eye, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface AddAutomationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const AddAutomationModal = ({ open, onOpenChange, onSuccess }: AddAutomationModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    currency: 'USD',
    tags: [] as string[],
    demo_url: '',
    documentation_url: '',
    features: [] as string[],
    requirements: [] as string[],
    pricing_model: 'one-time',
    difficulty_level: 'beginner',
    status: 'draft'
  });

  const [newTag, setNewTag] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newRequirement, setNewRequirement] = useState('');

  const categories = [
    'Email Automation',
    'CRM Integration', 
    'Social Media',
    'Data Analytics',
    'Customer Service',
    'Marketing',
    'Sales',
    'Content Creation',
    'Lead Generation',
    'Workflow Automation'
  ];

  const pricingModels = [
    { value: 'one-time', label: 'One-time Purchase' },
    { value: 'monthly', label: 'Monthly Subscription' },
    { value: 'yearly', label: 'Yearly Subscription' },
    { value: 'usage', label: 'Usage-based' }
  ];

  const difficultyLevels = [
    { value: 'beginner', label: 'Beginner', color: 'bg-green-100 text-green-800' },
    { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'advanced', label: 'Advanced', color: 'bg-red-100 text-red-800' }
  ];

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (featureToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(feature => feature !== featureToRemove)
    }));
  };

  const addRequirement = () => {
    if (newRequirement.trim() && !formData.requirements.includes(newRequirement.trim())) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const removeRequirement = (requirementToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter(req => req !== requirementToRemove)
    }));
  };

  const handleSubmit = async (isDraft = true) => {
    if (!user) return;

    setLoading(true);
    try {
      const productData = {
        seller_id: user.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        currency: formData.currency,
        tags: formData.tags,
        demo_url: formData.demo_url || null,
        documentation_url: formData.documentation_url || null,
        status: isDraft ? 'draft' : 'published',
        features: formData.features,
        requirements: formData.requirements,
        pricing_model: formData.pricing_model,
        difficulty_level: formData.difficulty_level,
        rating: 0,
        download_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: isDraft ? "Draft Saved!" : "Automation Published!",
        description: isDraft 
          ? "Your automation has been saved as a draft."
          : "Your automation is now live on the marketplace.",
      });

      // Call onSuccess callback to trigger refresh
      onSuccess?.();
      onOpenChange(false);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        price: '',
        currency: 'USD',
        tags: [],
        demo_url: '',
        documentation_url: '',
        features: [],
        requirements: [],
        pricing_model: 'one-time',
        difficulty_level: 'beginner',
        status: 'draft'
      });
      setCurrentStep(1);

    } catch (error) {
      console.error('Error creating automation:', error);
      toast({
        title: "Error",
        description: "Failed to create automation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Automation Title *</Label>
          <Input 
            id="title"
            placeholder="e.g., Smart Email Marketing Bot"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea 
            id="description"
            placeholder="Describe what your automation does, its key features, and benefits..."
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <select 
              id="category"
              className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-base shadow-sm focus:shadow-md transition-all duration-200 ease-in-out smooth-motion"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              required
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <select 
              id="difficulty"
              className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-base shadow-sm focus:shadow-md transition-all duration-200 ease-in-out smooth-motion"
              value={formData.difficulty_level}
              onChange={(e) => setFormData(prev => ({ ...prev, difficulty_level: e.target.value }))}
            >
              {difficultyLevels.map(level => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price *</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              id="price"
              type="number"
              placeholder="99"
              min="1"
              step="0.01"
              className="pl-10"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <select 
            id="currency"
            className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-base shadow-sm focus:shadow-md transition-all duration-200 ease-in-out smooth-motion"
            value={formData.currency}
            onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pricing_model">Pricing Model</Label>
          <select 
            id="pricing_model"
            className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-base shadow-sm focus:shadow-md transition-all duration-200 ease-in-out smooth-motion"
            value={formData.pricing_model}
            onChange={(e) => setFormData(prev => ({ ...prev, pricing_model: e.target.value }))}
          >
            {pricingModels.map(model => (
              <option key={model.value} value={model.value}>{model.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex gap-2 mb-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Add tags (e.g., AI, automation, CRM)"
              className="pl-10"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            />
          </div>
          <Button type="button" onClick={addTag} size="icon" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {tag}
              <button 
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:bg-gray-200 rounded-full p-1"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="demo_url">Demo URL (Optional)</Label>
          <div className="relative">
            <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              id="demo_url"
              type="url"
              placeholder="https://your-demo-link.com"
              className="pl-10"
              value={formData.demo_url}
              onChange={(e) => setFormData(prev => ({ ...prev, demo_url: e.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="documentation_url">Documentation URL (Optional)</Label>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              id="documentation_url"
              type="url"
              placeholder="https://your-docs-link.com"
              className="pl-10"
              value={formData.documentation_url}
              onChange={(e) => setFormData(prev => ({ ...prev, documentation_url: e.target.value }))}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Key Features</Label>
          <div className="flex gap-2 mb-2">
            <Input 
              placeholder="Add a key feature"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
            />
            <Button type="button" onClick={addFeature} size="icon" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-500" />
                  {feature}
                </span>
                <button 
                  type="button"
                  onClick={() => removeFeature(feature)}
                  className="text-red-500 hover:bg-red-100 rounded-full p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Requirements</Label>
          <div className="flex gap-2 mb-2">
            <Input 
              placeholder="Add a requirement"
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
            />
            <Button type="button" onClick={addRequirement} size="icon" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {formData.requirements.map((requirement, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span>{requirement}</span>
                <button 
                  type="button"
                  onClick={() => removeRequirement(requirement)}
                  className="text-red-500 hover:bg-red-100 rounded-full p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Upload Images</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Click to upload images or drag and drop</p>
            <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
    </div>
  );

  const steps = [
    { number: 1, title: "Basic Info", icon: FileText },
    { number: 2, title: "Pricing & Links", icon: DollarSign },
    { number: 3, title: "Features & Media", icon: Zap }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Automation</DialogTitle>
          <DialogDescription>
            Create a new AI automation listing for the marketplace
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive ? 'border-blue-500 bg-blue-500 text-white' :
                    isCompleted ? 'border-green-500 bg-green-500 text-white' :
                    'border-gray-300 text-gray-400'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive || isCompleted ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`ml-4 w-8 h-0.5 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step Content */}
          <Card>
            <CardContent className="p-6">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            <div className="flex gap-2">
              {currentStep === 3 ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => handleSubmit(true)}
                    disabled={loading || !formData.title || !formData.description || !formData.category || !formData.price}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Draft
                  </Button>
                  <Button 
                    onClick={() => handleSubmit(false)}
                    disabled={loading || !formData.title || !formData.description || !formData.category || !formData.price}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Publish
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                  disabled={
                    (currentStep === 1 && (!formData.title || !formData.description || !formData.category)) ||
                    (currentStep === 2 && !formData.price)
                  }
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAutomationModal;
