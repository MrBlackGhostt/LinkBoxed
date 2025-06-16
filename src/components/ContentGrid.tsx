import React from "react";
import { ContentItem } from "@/types/content";
import { ContentCard } from "./contentCard";

interface ContentGridProps {
  items: ContentItem[];
  onPin: (id: string) => void;
  onUnpin: (id: string) => void;
  onItemClick: (item: ContentItem) => void;
}

export function ContentGrid({
  items,
  onPin,
  onUnpin,
  onItemClick,
}: ContentGridProps) {
  // Separate pinned and unpinned items
  const pinnedItems = items.filter((item) => item.isPinned);
  const unpinnedItems = items.filter((item) => !item.isPinned);

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-center">
        <div className="text-muted-foreground">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-lg font-medium mb-2">No content yet</h3>
          <p className="text-sm">
            Start building your knowledge base by adding your first item!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Pinned Content Section */}
      {pinnedItems.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
            <span>📌</span>
            <span>Pinned Content</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pinnedItems.map((item) => (
              <ContentCard
                key={item.id}
                item={item}
                onPin={onPin}
                onUnpin={onUnpin}
                onClick={onItemClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* Regular Content Section */}
      {unpinnedItems.length > 0 && (
        <div>
          {pinnedItems.length > 0 && (
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
              <span>📋</span>
              <span>All Content</span>
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {unpinnedItems.map((item) => (
              <ContentCard
                key={item.id}
                item={item}
                onPin={onPin}
                onUnpin={onUnpin}
                onClick={onItemClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
