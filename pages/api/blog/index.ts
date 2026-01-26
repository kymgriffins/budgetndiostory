import { NextApiRequest, NextApiResponse } from 'next';
import { blogPosts, generateId } from '../../../utils/blogPosts';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // Get all blog posts
      res.status(200).json(blogPosts);
      break;

    case 'POST':
      // Create a new blog post
      try {
        const { title, content, image, date } = req.body;

        if (!title || !content) {
          return res.status(400).json({ error: 'Title and content are required' });
        }

        const newPost = {
          id: generateId(),
          title,
          content,
          image: image || '/default-blog-image.png',
          date: date || new Date().toISOString().split('T')[0]
        };

        blogPosts.push(newPost);
        res.status(201).json(newPost);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create blog post' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}