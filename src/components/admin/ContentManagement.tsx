import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Plus, FileText, Music, Video, Image, Search, Eye, Download, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { UploadContentDialog } from "./modals";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  content_type: string;
  status: string;
  tags: string[];
  portal_tags: string[];
  category: string;
  created_at: string;
  published_at: string;
}

const ContentManagement = () => {
  const { toast } = useToast();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [analytics, setAnalytics] = useState<any[]>([]);

  // Dialog states
  const [uploadContentOpen, setUploadContentOpen] = useState(false);

  useEffect(() => {
    fetchContent();
    fetchAnalytics();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from("content_library")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      toast({
        title: "Error loading content",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .from("content_analytics")
        .select(`
          action,
          content_id,
          content_library (title, content_type)
        `)
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;

      // Aggregate by content type
      const typeStats = (data || []).reduce((acc: any, item: any) => {
        const type = item.content_library?.content_type || "unknown";
        if (!acc[type]) acc[type] = { type, views: 0, downloads: 0 };
        if (item.action === "view") acc[type].views++;
        if (item.action === "download") acc[type].downloads++;
        return acc;
      }, {});

      setAnalytics(Object.values(typeStats));
    } catch (error) {
      console.error("Error loading analytics:", error);
    }
  };

  const handlePreview = (item: ContentItem) => {
    toast({
      title: "Preview",
      description: `Previewing: ${item.title}`,
    });
  };

  const handleEdit = async (item: ContentItem) => {
    // For now, toggle status between draft and published
    const newStatus = item.status === "published" ? "draft" : "published";
    try {
      const { error } = await supabase
        .from("content_library")
        .update({ 
          status: newStatus,
          published_at: newStatus === "published" ? new Date().toISOString() : null
        })
        .eq("id", item.id);

      if (error) throw error;
      
      toast({
        title: "Content updated",
        description: `Status changed to ${newStatus}`,
      });
      fetchContent();
    } catch (error) {
      toast({
        title: "Error updating content",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "worksheet": return <FileText className="h-4 w-4" />;
      case "meditation": return <Music className="h-4 w-4" />;
      case "video": return <Video className="h-4 w-4" />;
      case "article": return <BookOpen className="h-4 w-4" />;
      case "infographic": return <Image className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-500/20 text-green-400";
      case "draft": return "bg-gray-500/20 text-gray-400";
      case "review": return "bg-yellow-500/20 text-yellow-400";
      case "archived": return "bg-red-500/20 text-red-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading content library...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dialogs */}
      <UploadContentDialog open={uploadContentOpen} onOpenChange={setUploadContentOpen} onSuccess={fetchContent} />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Content Library</h2>
          <p className="text-muted-foreground">Manage therapeutic resources and materials</p>
        </div>
        <Button className="bg-[#B87333] hover:bg-[#A66329]" onClick={() => setUploadContentOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Upload Content
        </Button>
      </div>

      <Tabs defaultValue="library" className="space-y-6">
        <TabsList className="bg-white/5">
          <TabsTrigger value="library">Content Library</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="versions">Version History</TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-4">
          {/* Filters */}
          <Card className="bg-white/5 border-white/10">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-md text-foreground"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="review">In Review</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Content Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredContent.map((item) => (
              <Card key={item.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(item.content_type)}
                      <Badge variant="outline" className="capitalize">
                        {item.content_type}
                      </Badge>
                    </div>
                    <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 3).map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {item.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{item.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="flex-1" onClick={() => handlePreview(item)}>
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm" variant="ghost" className="flex-1" onClick={() => handleEdit(item)}>
                        <Download className="h-3 w-3 mr-1" />
                        {item.status === "published" ? "Unpublish" : "Publish"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredContent.length === 0 && (
            <Card className="bg-white/5 border-white/10">
              <CardContent className="py-12">
                <div className="text-center text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No content found matching your filters</p>
                  <Button className="mt-4 bg-[#B87333] hover:bg-[#A66329]" onClick={() => setUploadContentOpen(true)}>
                    Upload Content
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Total Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#B87333]">{content.length}</div>
                <p className="text-xs text-muted-foreground">Across all types</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Published</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-400">
                  {content.filter((c) => c.status === "published").length}
                </div>
                <p className="text-xs text-muted-foreground">Live resources</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-sm font-medium">In Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-400">
                  {content.filter((c) => c.status === "review").length}
                </div>
                <p className="text-xs text-muted-foreground">Pending approval</p>
              </CardContent>
            </Card>
          </div>

          {analytics.length > 0 && (
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>Content Type Performance</CardTitle>
                <CardDescription>Views and downloads by content type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="type" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    />
                    <Bar dataKey="views" fill="#B87333" />
                    <Bar dataKey="downloads" fill="#4A90E2" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="versions" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Version history will be displayed here</p>
                <p className="text-sm">Track changes and rollback capabilities</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
