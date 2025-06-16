import React from "react";
import { ContentItem, ContentType } from "@/types/content";
import {
  Card,
  //   CardContent,
  CardDescription,
  //   CardHeader,
  CardTitle,
} from "@/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ContentCardProps {
  item: ContentItem;
  onPin: (id: string) => void;
  onUnpin: (id: string) => void;
  onClick: (item: ContentItem) => void;
}

const getCardStyles = (type: ContentType, isPinned: boolean) => {
  if (isPinned) {
    return {
      background: "bg-pinned border-pinned-border",
      accent: "text-pinned-accent",
      icon: "📌",
    };
  }

  switch (type) {
    case "article":
      return {
        background: "bg-article border-article-border",
        accent: "text-article-accent",
        icon: "📄",
      };
    case "video":
      return {
        background: "bg-video border-video-border",
        accent: "text-video-accent",
        icon: "🎥",
      };
    case "tweet":
      return {
        background: "bg-tweet border-tweet-border",
        accent: "text-tweet-accent",
        icon: "🐦",
      };
    default:
      return {
        background: "bg-card border-border",
        accent: "text-foreground",
        icon: "📄",
      };
  }
};

export function ContentCard({
  item,
  onPin,
  onUnpin,
  onClick,
}: ContentCardProps) {
  const styles = getCardStyles(item.type, item.isPinned);

  const handlePinToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.isPinned) {
      onUnpin(item.id);
    } else {
      onPin(item.id);
    }
  };

  return (
    <Card
      className={`${styles.background} border-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in group overflow-hidden`}
      onClick={() => onClick(item)}>
      {/* Thumbnail Section */}
      <div className="relative h-40 bg-muted/20 overflow-hidden">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/30 to-muted/50">
            <span className="text-4xl opacity-60">{styles.icon}</span>
          </div>
        )}

        {/* Content Type Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            variant="secondary"
            className="text-xs bg-background/90 backdrop-blur-sm">
            <span className="mr-1 text-xs">{styles.icon}</span>
            {item.type}
          </Badge>
        </div>

        {/* Pin Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePinToggle}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8 p-0 bg-background/90 backdrop-blur-sm hover:bg-background">
          {item.isPinned ? "📌" : "📍"}
        </Button>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <CardTitle
          className={`text-base font-semibold line-clamp-2 mb-2 ${styles.accent}`}>
          {item.title}
        </CardTitle>

        <CardDescription className="line-clamp-2 text-sm text-muted-foreground mb-3 leading-relaxed">
          {item.description}
        </CardDescription>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{item.createdAt.toLocaleDateString()}</span>
          {item.tags && item.tags.length > 0 && (
            <div className="flex space-x-1">
              {item.tags.slice(0, 2).map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs px-1 py-0">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
