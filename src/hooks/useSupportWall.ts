import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/contexts/UserContext";

export type SupportWallCategory = 'celebration' | 'struggling' | 'gratitude' | 'question' | 'resource' | 'general';

export interface SupportPost {
  id: string;
  content: string;
  hearts: number;
  created_at: string;
  user_has_hearted?: boolean;
  category: SupportWallCategory;
  comment_count: number;
  bookmark_count: number;
  is_pinned: boolean;
  tags: string[] | null;
  user_has_bookmarked?: boolean;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  hearts: number;
  created_at: string;
  user_has_hearted?: boolean;
}

export const useSupportWall = () => {
  const [posts, setPosts] = useState<SupportPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const fetchPosts = async () => {
    try {
      const { data: postsData, error } = await supabase
        .from("support_wall")
        .select("*")
        .eq("is_flagged", false)
        .order("is_pinned", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;

      let postsWithStatus = postsData || [];
      
      if (user) {
        const [heartsData, bookmarksData] = await Promise.all([
          supabase.from("support_wall_hearts").select("post_id").eq("user_id", user.id),
          supabase.from("support_wall_bookmarks").select("post_id").eq("user_id", user.id)
        ]);

        const heartedPostIds = heartsData.data?.map(h => h.post_id) || [];
        const bookmarkedPostIds = bookmarksData.data?.map(b => b.post_id) || [];
        
        postsWithStatus = postsData?.map(post => ({
          ...post,
          user_has_hearted: heartedPostIds.includes(post.id),
          user_has_bookmarked: bookmarkedPostIds.includes(post.id)
        })) || [];
      }

      setPosts(postsWithStatus);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();

    // Real-time subscription
    const channel = supabase
      .channel('support-wall-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'support_wall' }, () => {
        fetchPosts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const postMessage = async (content: string, category: SupportWallCategory, tags?: string[]) => {
    if (!user) return;

    try {
      const { error } = await supabase.from("support_wall").insert({
        user_id: user.id,
        content: content.trim(),
        category,
        tags: tags || null
      });

      if (error) throw error;
      fetchPosts();
    } catch (error) {
      console.error("Error posting message:", error);
      throw error;
    }
  };

  const toggleHeart = async (postId: string) => {
    if (!user) return;

    try {
      const { data: existingHeart } = await supabase
        .from("support_wall_hearts")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", user.id)
        .single();

      if (existingHeart) {
        await supabase.from("support_wall_hearts").delete().eq("post_id", postId).eq("user_id", user.id);
        await supabase.rpc('decrement_hearts', { post_id: postId });
      } else {
        await supabase.from("support_wall_hearts").insert({ post_id: postId, user_id: user.id });
        await supabase.rpc('increment_hearts', { post_id: postId });
      }

      fetchPosts();
    } catch (error) {
      console.error("Error toggling heart:", error);
    }
  };

  const toggleBookmark = async (postId: string) => {
    if (!user) return;

    try {
      const { data: existingBookmark } = await supabase
        .from("support_wall_bookmarks")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", user.id)
        .single();

      if (existingBookmark) {
        await supabase.from("support_wall_bookmarks").delete().eq("post_id", postId).eq("user_id", user.id);
        await supabase.rpc('decrement_bookmark_count', { post_id: postId });
      } else {
        await supabase.from("support_wall_bookmarks").insert({ post_id: postId, user_id: user.id });
        await supabase.rpc('increment_bookmark_count', { post_id: postId });
      }

      fetchPosts();
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  const fetchComments = async (postId: string): Promise<Comment[]> => {
    try {
      const { data: commentsData, error } = await supabase
        .from("support_wall_comments")
        .select("*")
        .eq("post_id", postId)
        .eq("is_flagged", false)
        .order("created_at", { ascending: true });

      if (error) throw error;

      let commentsWithHeartStatus = commentsData || [];

      if (user) {
        const { data: heartsData } = await supabase
          .from("support_wall_comment_hearts")
          .select("comment_id")
          .eq("user_id", user.id);

        const heartedCommentIds = heartsData?.map(h => h.comment_id) || [];
        
        commentsWithHeartStatus = commentsData?.map(comment => ({
          ...comment,
          user_has_hearted: heartedCommentIds.includes(comment.id)
        })) || [];
      }

      return commentsWithHeartStatus;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  };

  const postComment = async (postId: string, content: string) => {
    if (!user) return;

    try {
      const { error } = await supabase.from("support_wall_comments").insert({
        post_id: postId,
        user_id: user.id,
        content: content.trim()
      });

      if (error) throw error;
      await supabase.rpc('increment_comment_count', { post_id: postId });
      fetchPosts();
    } catch (error) {
      console.error("Error posting comment:", error);
      throw error;
    }
  };

  const toggleCommentHeart = async (commentId: string) => {
    if (!user) return;

    try {
      const { data: existingHeart } = await supabase
        .from("support_wall_comment_hearts")
        .select("id")
        .eq("comment_id", commentId)
        .eq("user_id", user.id)
        .single();

      if (existingHeart) {
        await supabase.from("support_wall_comment_hearts").delete().eq("comment_id", commentId).eq("user_id", user.id);
        await supabase.rpc('decrement_comment_hearts', { comment_id: commentId });
      } else {
        await supabase.from("support_wall_comment_hearts").insert({ comment_id: commentId, user_id: user.id });
        await supabase.rpc('increment_comment_hearts', { comment_id: commentId });
      }
    } catch (error) {
      console.error("Error toggling comment heart:", error);
    }
  };

  const reportPost = async (postId: string, reason: string) => {
    if (!user) return;

    try {
      const { error } = await supabase.from("support_wall_reports").insert({
        post_id: postId,
        reported_by: user.id,
        reason: reason.trim()
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error reporting post:", error);
      throw error;
    }
  };

  return {
    posts,
    loading,
    postMessage,
    toggleHeart,
    toggleBookmark,
    fetchComments,
    postComment,
    toggleCommentHeart,
    reportPost,
    refetch: fetchPosts
  };
};
