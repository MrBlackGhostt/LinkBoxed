import React, { useState } from "react";
import { ContentType, AddContentForm } from "@/types/content";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { toast } from "sonner";

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: AddContentForm) => void;
}

export function AddContentModal({
  isOpen,
  onClose,
  onSubmit,
}: AddContentModalProps) {
  const [formData, setFormData] = useState<AddContentForm>({
    url: "",
    type: "article",
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.url.trim()) {
      toast.success("URL Required", {
        // title: "URL Required",
        description: "Please enter a valid URL",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate metadata fetching
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const contentData: AddContentForm = {
        ...formData,
        title:
          formData.title ||
          `${
            formData.type.charAt(0).toUpperCase() + formData.type.slice(1)
          } from ${new URL(formData.url).hostname}`,
        description: formData.description || `Saved ${formData.type} content`,
      };

      onSubmit(contentData);

      // Reset form
      setFormData({
        url: "",
        type: "article",
        title: "",
        description: "",
      });

      toast("Content Added", {
        description: "Your content has been successfully saved!",
      });

      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast("Error", {
          description: "Failed to add content. Please try again.",
        });
      }
      //   error instanceof Error
      //     ? toast("Error", {
      //         description: "Failed to add content. Please try again.",
      //       })
      //     : toast.error(error?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypeChange = (type: ContentType) => {
    setFormData((prev) => ({ ...prev, type }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>➕</span>
            <span>Add New Content</span>
          </DialogTitle>
          <DialogDescription>
            Save articles, videos, or tweets to your personal knowledge base.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL *</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com/article"
              value={formData.url}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, url: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Content Type</Label>
            <Select value={formData.type} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="article">📄 Article</SelectItem>
                <SelectItem value="video">🎥 Video</SelectItem>
                <SelectItem value="tweet">🐦 Tweet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Custom Title (Optional)</Label>
            <Input
              id="title"
              placeholder="Enter a custom title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add a description or notes"
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Content"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
