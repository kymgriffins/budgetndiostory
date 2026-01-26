// Simple in-memory database for blog posts
let blogPosts = [
  {
    id: 1,
    title: "Hii budget inakuathiri vipi? 👀",
    content: "This is the content for the first blog post about how the budget affects you.",
    image: "/insights1.png",
    date: "2023-05-26"
  },
  {
    id: 2,
    title: "Who really benefits from this budget?",
    content: "This post explores who benefits from the current budget allocations.",
    image: "/insights2.jpeg",
    date: "2023-06-15"
  },
  {
    id: 3,
    title: "7 Budget Stories You Missed",
    content: "Here are 7 important budget stories that you might have missed.",
    image: "/insights3.jpeg",
    date: "2023-07-10"
  }
];

// Generate a new ID
function generateId() {
  return blogPosts.length > 0 ? Math.max(...blogPosts.map(post => post.id)) + 1 : 1;
}

export { blogPosts, generateId };