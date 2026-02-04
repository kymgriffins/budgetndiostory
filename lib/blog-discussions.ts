// Threading/Discussion Data for Blog Posts
import { ThreadChannel, ThreadComment } from './blog-types';

// Mock discussion channels for each blog post
export const discussionChannels: ThreadChannel[] = [
  {
    id: 'channel_1',
    name: 'General Discussion',
    description: 'Share your thoughts and questions about this article',
    postId: '1',
    isActive: true,
    createdAt: '2025-01-10T10:00:00Z',
  },
  {
    id: 'channel_2',
    name: 'Budget Questions',
    description: 'Ask specific questions about budget allocations',
    postId: '1',
    isActive: true,
    createdAt: '2025-01-10T10:00:00Z',
  },
  {
    id: 'channel_3',
    name: 'Policy Suggestions',
    description: 'Share your ideas for policy improvements',
    postId: '1',
    isActive: true,
    createdAt: '2025-01-10T10:00:00Z',
  },
];

// Mock comments for blog posts
export const threadComments: ThreadComment[] = [
  {
    id: 'cmt_001',
    postId: '1',
    parentId: null,
    author: {
      id: 'user_1',
      name: 'Sarah M.',
      avatar: null,
      role: 'user',
      isVerified: true,
    },
    content:
      "This article perfectly explains the budget process! I never understood how county budgets worked before. The visual timeline really helped clarify things.",
    createdAt: '2025-01-12T14:30:00Z',
    status: 'approved',
    upvotes: 24,
    downvotes: 0,
    isEdited: false,
    replies: [
      {
        id: 'cmt_002',
        postId: '1',
        parentId: 'cmt_001',
        author: {
          id: 'user_2',
          name: 'James K.',
          avatar: null,
          role: 'moderator',
          isVerified: true,
        },
        content:
          "Thanks Sarah! We're glad it helped. Have you attended any of your county's public participation forums? We'd love to hear about your experience.",
        createdAt: '2025-01-12T15:00:00Z',
        status: 'approved',
        upvotes: 12,
        downvotes: 0,
        isEdited: false,
      },
      {
        id: 'cmt_003',
        postId: '1',
        parentId: 'cmt_001',
        author: {
          id: 'user_3',
          name: 'Achieng O.',
          avatar: null,
          role: 'user',
        },
        content:
          "Totally agree! The budget cycle explanation was so clear. I shared this with my community group.",
        createdAt: '2025-01-12T16:30:00Z',
        status: 'approved',
        upvotes: 8,
        downvotes: 0,
        isEdited: false,
      },
    ],
  },
  {
    id: 'cmt_004',
    postId: '1',
    parentId: null,
    author: {
      id: 'user_4',
      name: 'Moses W.',
      avatar: null,
      role: 'user',
    },
    content:
      'Great work on this! I have a question: How can we as citizens actually influence the budget at the county level? What specific actions can we take?',
    createdAt: '2025-01-13T09:00:00Z',
    status: 'approved',
    upvotes: 18,
    downvotes: 0,
    isEdited: false,
    replies: [
      {
        id: 'cmt_005',
        postId: '1',
        parentId: 'cmt_004',
        author: {
          id: 'user_2',
          name: 'James K.',
          avatar: null,
          role: 'moderator',
          isVerified: true,
        },
        content:
          'Great question! You can: 1) Submit written memoranda during public participation periods, 2) Attend ward-level consultations, 3) Engage with your County Assembly representative, 4) Review budget documents on the county website. We\'ll be writing a follow-up article with practical tips!',
        createdAt: '2025-01-13T10:00:00Z',
        status: 'approved',
        upvotes: 25,
        downvotes: 0,
        isEdited: false,
      },
    ],
  },
  {
    id: 'cmt_006',
    postId: '2',
    parentId: null,
    author: {
      id: 'user_5',
      name: 'Grace N.',
      avatar: null,
      role: 'user',
    },
    content:
      'This is eye-opening! As a parent, I\'ve been struggling with the hidden costs of "free" education. My children\'s school asks for building fund every term. Is this legal?',
    createdAt: '2025-01-08T11:00:00Z',
    status: 'approved',
    upvotes: 32,
    downvotes: 0,
    isEdited: false,
    replies: [],
  },
  {
    id: 'cmt_007',
    postId: '3',
    parentId: null,
    author: {
      id: 'user_6',
      name: 'Samuel T.',
      avatar: null,
      role: 'user',
    },
    content:
      'The investigation into health equipment is shocking! We have the same issue at our local hospital. Equipment worth millions just sitting unused. Who is accountable for this waste?',
    createdAt: '2025-01-05T13:00:00Z',
    status: 'approved',
    upvotes: 45,
    downvotes: 0,
    isEdited: false,
    replies: [
      {
        id: 'cmt_008',
        postId: '3',
        parentId: 'cmt_007',
        author: {
          id: 'user_7',
          name: 'Dr. Achieng O.',
          avatar: null,
          role: 'admin',
          isVerified: true,
        },
        content:
          'Accountability is a major issue. We recommend: 1) Filing Access to Information requests, 2) Reporting to the Office of the Auditor General, 3) Engaging with your County Health Management Team, 4) Contacting your MCA. We\'re continuing to investigate and will publish more findings soon.',
        createdAt: '2025-01-05T14:30:00Z',
        status: 'approved',
        upvotes: 38,
        downvotes: 0,
        isEdited: false,
      },
    ],
  },
  {
    id: 'cmt_009',
    postId: '4',
    parentId: null,
    author: {
      id: 'user_8',
      name: 'Peninah L.',
      avatar: null,
      role: 'user',
    },
    content:
      'I was a beneficiary of the youth employment program. While the training was helpful, I never received my grant. Has anyone else experienced this delay?',
    createdAt: '2025-01-03T10:00:00Z',
    status: 'approved',
    upvotes: 22,
    downvotes: 0,
    isEdited: false,
    replies: [],
  },
  {
    id: 'cmt_010',
    postId: '5',
    parentId: null,
    author: {
      id: 'user_9',
      name: 'Robert K.',
      avatar: null,
      role: 'user',
    },
    content:
      'Makueni resident here! We\'ve been waiting for this water project for 3 years. The politicians keep promising but nothing happens. Thank you for highlighting our struggle.',
    createdAt: '2024-12-28T15:00:00Z',
    status: 'approved',
    upvotes: 56,
    downvotes: 0,
    isEdited: false,
    replies: [
      {
        id: 'cmt_011',
        postId: '5',
        parentId: 'cmt_010',
        author: {
          id: 'user_10',
          name: 'Budget Ndio Story',
          avatar: null,
          role: 'admin',
          isVerified: true,
        },
        content:
          'Thank you for sharing, Robert. We\'re committed to following up on this story. Would you be willing to share more details about your experience? You can reach us privately. Your voice matters!',
        createdAt: '2024-12-28T16:00:00Z',
        status: 'approved',
        upvotes: 30,
        downvotes: 0,
        isEdited: false,
      },
    ],
  },
];

// Reaction emojis available
export const REACTION_EMOJIS = ['👍', '❤️', '💡', '🤔', '🔥', '👏'] as const;

// Helper functions
export function getCommentsByPostId(postId: string): ThreadComment[] {
  return threadComments.filter((comment) => comment.postId === postId);
}

export function getTopLevelComments(postId: string): ThreadComment[] {
  return threadComments.filter(
    (comment) => comment.postId === postId && comment.parentId === null
  );
}

export function getRepliesByCommentId(commentId: string): ThreadComment[] {
  const parentComment = threadComments.find((c) => c.id === commentId);
  return parentComment?.replies || [];
}

export function getCommentById(commentId: string): ThreadComment | undefined {
  // Search in top-level comments
  let comment = threadComments.find((c) => c.id === commentId);

  // If not found, search in replies
  if (!comment) {
    for (const topComment of threadComments) {
      comment = topComment.replies?.find((r) => r.id === commentId);
      if (comment) break;
    }
  }

  return comment;
}

export function getCommentCount(postId: string): number {
  const topLevel = getTopLevelComments(postId);
  let count = topLevel.length;

  for (const comment of topLevel) {
    if (comment.replies) {
      count += comment.replies.length;
      for (const reply of comment.replies) {
        if (reply.replies) {
          count += reply.replies.length;
        }
      }
    }
  }

  return count;
}

export function getChannelByPostId(postId: string): ThreadChannel[] {
  return discussionChannels.filter((channel) => channel.postId === postId);
}

// Sort comments by upvotes
export function sortCommentsByPopularity(
  comments: ThreadComment[]
): ThreadComment[] {
  return [...comments].sort((a, b) => b.upvotes - a.upvotes);
}

// Sort comments by date (newest first)
export function sortCommentsByDate(
  comments: ThreadComment[]
): ThreadComment[] {
  return [...comments].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
