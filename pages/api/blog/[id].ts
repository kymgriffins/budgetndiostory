import { NextApiRequest, NextApiResponse } from 'next';
import { blogPosts } from '../../../utils/blogPosts';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  const postId = parseInt(id);
  const postIndex = blogPosts.findIndex(post => post.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  switch (req.method) {
    case 'GET':
      // Get a single blog post
      res.status(200).json(blogPosts[postIndex]);
      break;

    case 'PUT':
      // Update a blog post
      try {
        const { title, content, image, date } = req.body;

        if (!title || !content) {
          return res.status(400).json({ error: 'Title and content are required' });
        }

        const updatedPost = {
          ...blogPosts[postIndex],
          title: title || blogPosts[postIndex].title,
          content: content || blogPosts[postIndex].content,
          image: image || blogPosts[postIndex].image,
          date: date || blogPosts[postIndex].date
        };

        blogPosts[postIndex] = updatedPost;
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update blog post' });
      }
      break;

    case 'DELETE':
      // Delete a blog post
      try {
        const deletedPost = blogPosts.splice(postIndex, 1)[0];
        res.status(200).json(deletedPost);
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete blog post' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}