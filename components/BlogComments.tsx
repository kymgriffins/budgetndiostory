import {
  CommentAuthor,
  ThreadComment,
  calculateTimeAgo,
  generateCommentId
} from "@/lib/blog-types";
import { useState } from "react";

// Mock current user (in production, this would come from auth)
const CURRENT_USER: CommentAuthor = {
  id: "current_user",
  name: "Guest User",
  avatar: undefined,
  role: "user",
  isVerified: false,
};

interface BlogCommentsProps {
  postId: string;
  comments: ThreadComment[];
  onAddComment?: (comment: ThreadComment) => void;
  onReply?: (parentId: string, content: string) => void;
  onReact?: (commentId: string, reaction: string) => void;
}

export default function BlogComments({
  postId,
  comments,
  onAddComment,
  onReply,
  onReact,
}: BlogCommentsProps) {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [showReplyInput, setShowReplyInput] = useState<string | null>(null);
  const [expandedComments, setExpandedComments] = useState<Set<string>>(
    new Set(),
  );

  // Sort by date (newest first)
  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const comment: ThreadComment = {
      id: generateCommentId(),
      postId,
      parentId: null,
      author: CURRENT_USER,
      content: newComment,
      createdAt: new Date().toISOString(),
      status: "pending", // Requires moderation
      upvotes: 0,
      downvotes: 0,
      isEdited: false,
      replies: [],
    };

    onAddComment?.(comment);
    setNewComment("");
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim()) return;

    onReply?.(parentId, replyContent);
    setReplyContent("");
    setReplyingTo(null);
    setShowReplyInput(null);
  };

  const toggleExpand = (commentId: string) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedComments(newExpanded);
  };

  const CommentItem = ({
    comment,
    isReply = false,
  }: {
    comment: ThreadComment;
    isReply?: boolean;
  }) => {
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [localReaction, setLocalReaction] = useState<string | null>(null);

    const handleReaction = (emoji: string) => {
      setLocalReaction(emoji);
      onReact?.(comment.id, emoji);
    };

    return (
      <div
        className={`${isReply ? "ml-8 border-l-2 border-[#212121]/10 pl-4" : ""}`}
      >
        <div className="bg-white rounded-[12px] p-4 mb-3 border border-[#212121]/8">
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {comment.author.avatar ? (
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="w-[36px] h-[36px] rounded-full object-cover"
                />
              ) : (
                <div className="w-[36px] h-[36px] rounded-full bg-[#212121]/10 flex items-center justify-center text-[14px] font-medium text-[#212121]/60">
                  {comment.author.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[14px] font-NeueMontreal font-medium text-[#212121]">
                  {comment.author.name}
                </span>
                {comment.author.isVerified && (
                  <span className="text-[12px]">✓</span>
                )}
                {comment.author.role === "admin" && (
                  <span className="px-2 py-0.5 text-[10px] font-NeueMontreal bg-[#212121] text-white rounded-full">
                    Author
                  </span>
                )}
                {comment.author.role === "moderator" && (
                  <span className="px-2 py-0.5 text-[10px] font-NeueMontreal bg-green-600 text-white rounded-full">
                    Mod
                  </span>
                )}
                <span className="text-[12px] font-NeueMontreal text-[#212121]/40">
                  {calculateTimeAgo(comment.createdAt)}
                </span>
              </div>

              <p className="mt-2 text-[14px] font-NeueMontreal text-[#212121]/80 leading-[1.6]">
                {comment.content}
              </p>

              {/* Actions */}
              <div className="mt-3 flex items-center gap-3">
                {/* Upvote */}
                <button
                  onClick={() => handleReaction("up")}
                  className="flex items-center gap-1 text-[12px] font-NeueMontreal text-[#212121]/50 hover:text-[#212121] transition"
                >
                  <span>↑</span>
                  <span>{comment.upvotes}</span>
                </button>

                {/* Reply button */}
                <button
                  onClick={() => setShowReplyBox(!showReplyBox)}
                  className="text-[12px] font-NeueMontreal text-[#212121]/50 hover:text-[#212121] transition"
                >
                  Reply
                </button>

                {/* Expand/Collapse replies */}
                {!isReply && comment.replies && comment.replies.length > 0 && (
                  <button
                    onClick={() => toggleExpand(comment.id)}
                    className="text-[12px] font-NeueMontreal text-[#212121]/50 hover:text-[#212121] transition"
                  >
                    {expandedComments.has(comment.id)
                      ? `Hide ${comment.replies.length} replies`
                      : `Show ${comment.replies.length} replies`}
                  </button>
                )}

                {/* Edited indicator */}
                {comment.isEdited && (
                  <span className="text-[10px] font-NeueMontreal text-[#212121]/40">
                    (edited)
                  </span>
                )}
              </div>

              {/* Reply input */}
              {showReplyBox && (
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write a reply..."
                    className="flex-1 px-3 py-2 rounded-[8px] border border-[#212121]/15 bg-[#fafafa] text-[#212121] text-[14px] font-NeueMontreal placeholder-[#212121]/40 focus:outline-none focus:border-[#212121]/30"
                  />
                  <button
                    onClick={() => handleSubmitReply(comment.id)}
                    disabled={!replyContent.trim()}
                    className="px-4 py-2 bg-[#212121] text-white text-[14px] font-NeueMontreal rounded-[8px] hover:opacity-90 transition disabled:opacity-50"
                  >
                    Reply
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Nested replies */}
        {!isReply &&
          comment.replies &&
          comment.replies.length > 0 &&
          expandedComments.has(comment.id) && (
            <div className="mt-2">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} isReply={true} />
              ))}
            </div>
          )}
      </div>
    );
  };

  return (
    <section className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#212121]/8">
      <h3 className="text-[24px] font-FoundersGrotesk font-semibold text-[#111] mb-2">
        Discussion
      </h3>
      <p className="text-[14px] font-NeueMontreal text-[#212121]/60 mb-6">
        Join the conversation. Your voice matters in our democracy.
      </p>

      {/* New comment input */}
      <div className="mb-8">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-[40px] h-[40px] rounded-full bg-[#212121]/10 flex items-center justify-center text-[16px] font-medium text-[#212121]/60">
              {CURRENT_USER.name.charAt(0)}
            </div>
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows={3}
              className="w-full px-4 py-3 rounded-[12px] border border-[#212121]/15 bg-[#fafafa] text-[#212121] font-NeueMontreal placeholder-[#212121]/40 focus:outline-none focus:border-[#212121]/30 resize-none"
            />
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[12px] font-NeueMontreal text-[#212121]/40">
                Your comment will be reviewed before publishing
              </span>
              <button
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                className="px-6 py-2 bg-[#212121] text-white text-[14px] font-NeueMontreal rounded-full hover:opacity-90 transition disabled:opacity-50"
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-4">
        {sortedComments.length > 0 ? (
          sortedComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <div className="text-center py-8">
            <span className="text-[48px]">💬</span>
            <p className="mt-4 text-[16px] font-NeueMontreal text-[#212121]/50">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>

      {/* Comment guidelines */}
      <div className="mt-8 pt-6 border-t border-[#212121]/10">
        <h4 className="text-[14px] font-NeueMontreal font-medium text-[#212121]/70 mb-3">
          Community Guidelines
        </h4>
        <ul className="text-[12px] font-NeueMontreal text-[#212121]/50 space-y-2">
          <li>• Be respectful and constructive in discussions</li>
          <li>• Stay on topic and relevant to the article</li>
          <li>• Avoid spreading misinformation</li>
          <li>• Your feedback helps improve our budget journalism</li>
        </ul>
      </div>
    </section>
  );
}
