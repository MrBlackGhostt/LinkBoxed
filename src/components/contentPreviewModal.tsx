import React from "react";
import { ContentItem } from "@/types/content";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";

interface ContentPreviewModalProps {
  item: ContentItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ContentPreviewModal({
  item,
  isOpen,
  onClose,
}: ContentPreviewModalProps) {
  if (!item) return null;

  const handleOpenOriginal = () => {
    window.open(item.url, "_blank", "noopener,noreferrer");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "article":
        return "📄";
      case "video":
        return "🎥";
      case "tweet":
        return "🐦";
      default:
        return "📄";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>{getIcon(item.type)}</span>
            <span className="line-clamp-2">{item.title}</span>
            {item.isPinned && <span>📌</span>}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{item.type}</Badge>
            <span className="text-sm text-muted-foreground">
              Added on {item.createdAt.toLocaleDateString()}
            </span>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>

          {item.tags && item.tags.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Original URL</h3>
            <p className="text-sm text-muted-foreground break-all mb-3">
              {item.url}
            </p>
            <Button onClick={handleOpenOriginal} className="w-full">
              Open Original Source
            </Button>
          </div>

          {item.type === "video" && (
            <div className="bg-muted/30 p-4 rounded-lg text-center">
              <div className="text-4xl mb-2">🎬</div>
              <p className="text-sm text-muted-foreground">
                Video preview not available. Click &quot;Open Original
                Source&quot; to watch.
              </p>
            </div>
          )}

          {item.type === "tweet" && (
            <div className="bg-muted/30 p-4 rounded-lg text-center">
              <div className="text-4xl mb-2">🐦</div>
              <p className="text-sm text-muted-foreground">
                Tweet preview not available. Click &quot;Open Original Source
                &quot; to view.
              </p>
            </div>
          )}

          {item.type === "article" && (
            <div className="bg-muted/30 p-4 rounded-lg text-center">
              <div className="text-4xl mb-2">📖</div>
              <p className="text-sm text-muted-foreground">
                Article preview not available. Click &quot;Open Original
                Source&quot; to read.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
