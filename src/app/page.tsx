"use client";
import React, { useState, useMemo } from "react";
import { ContentItem, ContentType, AddContentForm } from "@/types/content";
// import { AppSidebar } from "@/components/sidebar";
import { ContentGrid } from "@/components/ContentGrid";
import { AddContentModal } from "@/components/addContentModal";
import { ContentPreviewModal } from "@/components/contentPreviewModal";
import { FloatingActionButton } from "@/components/floatingActionButton";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { toast } from "sonner";
// Mock data for demonstration
const mockContent: ContentItem[] = [
  {
    id: "1",
    title: "Building Modern Web Applications with React",
    description:
      "A comprehensive guide to building scalable React applications with modern tools and best practices.",
    type: "article",
    url: "https://example.com/react-guide",
    isPinned: true,
    createdAt: new Date("2024-01-15"),
    tags: ["React", "JavaScript", "Web Development"],
  },
  {
    id: "2",
    title: "Advanced TypeScript Patterns",
    description:
      "Learn advanced TypeScript patterns and techniques for building type-safe applications.",
    type: "video",
    url: "https://youtube.com/watch?v=example",
    isPinned: false,
    createdAt: new Date("2024-01-14"),
    tags: ["TypeScript", "Programming"],
  },
  {
    id: "3",
    title: "The Future of Web Development",
    description:
      "An insightful thread about emerging trends in web development and what to expect in the coming years.",
    type: "tweet",
    url: "https://twitter.com/user/status/example",
    isPinned: true,
    createdAt: new Date("2024-01-13"),
    tags: ["Web Dev", "Trends"],
  },
  {
    id: "4",
    title: "CSS Grid vs Flexbox: When to Use What",
    description:
      "A detailed comparison of CSS Grid and Flexbox, with practical examples and use cases.",
    type: "article",
    url: "https://example.com/css-grid-flexbox",
    isPinned: false,
    createdAt: new Date("2024-01-12"),
    tags: ["CSS", "Layout"],
  },
];

const Index = () => {
  // const { toast } = useToast();
  const [content, setContent] = useState<ContentItem[]>(mockContent);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<ContentItem | null>(null);

  // Filter and search content
  const filteredContent = useMemo(() => {
    let filtered = content;

    // Apply filter
    switch (activeFilter) {
      case "pinned":
        filtered = filtered.filter((item) => item.isPinned);
        break;
      case "articles":
        filtered = filtered.filter((item) => item.type === "article");
        break;
      case "videos":
        filtered = filtered.filter((item) => item.type === "video");
        break;
      case "tweets":
        filtered = filtered.filter((item) => item.type === "tweet");
        break;
      default:
        // 'all' - no filtering needed
        break;
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [content, activeFilter, searchQuery]);

  const handleAddContent = (newContent: AddContentForm) => {
    const contentItem: ContentItem = {
      id: Date.now().toString(),
      title: newContent.title || "Untitled",
      description: newContent.description || "No description",
      type: newContent.type,
      url: newContent.url,
      isPinned: false,
      createdAt: new Date(),
      tags: [],
    };

    setContent((prev) => [contentItem, ...prev]);
  };

  const handlePin = (id: string) => {
    setContent((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isPinned: true } : item))
    );
    toast.success("Content Pinned", {
      description: "Content has been pinned to the top.",
    });
  };

  const handleUnpin = (id: string) => {
    setContent((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isPinned: false } : item))
    );
    toast.success("Content Unpinned", {
      description: "Content has been unpinned.",
    });
  };

  const handleItemClick = (item: ContentItem) => {
    setPreviewItem(item);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* <AppSidebar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        /> */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Your Memory
                  </h1>
                  <p className="text-muted-foreground">
                    {filteredContent.length} items
                    {searchQuery && ` matching "${searchQuery}"`}
                    {activeFilter !== "all" && ` in ${activeFilter}`}
                  </p>
                </div>
              </div>
            </div>

            <ContentGrid
              items={filteredContent}
              onPin={handlePin}
              onUnpin={handleUnpin}
              onItemClick={handleItemClick}
            />
          </div>
        </main>

        <FloatingActionButton onClick={() => setIsAddModalOpen(true)} />

        <AddContentModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddContent}
        />

        <ContentPreviewModal
          item={previewItem}
          isOpen={!!previewItem}
          onClose={() => setPreviewItem(null)}
        />
      </div>
    </SidebarProvider>
  );
};

export default Index;
