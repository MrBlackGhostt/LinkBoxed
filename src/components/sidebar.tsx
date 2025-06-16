"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// interface AppSidebarProps {
//   activeFilter: string;
//   onFilterChange: (filter: string) => void;
//   searchQuery: string;
//   onSearchChange: (query: string) => void;
// }

const menuItems = [
  { id: "all", label: "All Content", icon: "📋" },
  { id: "pinned", label: "Pinned", icon: "📌" },
  { id: "articles", label: "Articles", icon: "📄" },
  { id: "videos", label: "Videos", icon: "🎥" },
  { id: "tweets", label: "Tweets", icon: "🐦" },
];

export function AppSidebar() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className=" text-primary-foreground font-bold text-sm">
              YM
            </span>
          </div>
          <h1 className="text-lg font-semibold text-foreground">Your Memory</h1>
          <SidebarTrigger className=" z-50  w-8 h-8 bg-amber-500" />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-border"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeFilter === item.id}
                    className="cursor-pointer">
                    <Button
                      variant="ghost"
                      onClick={() => setActiveFilter(item.id)}
                      className="w-full justify-start space-x-3 text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent">
                      <span className="text-base">{item.icon}</span>
                      <span>{item.label}</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
