import { fetchAllPosts } from "@/lib/queries";

export default async function Home() {
  const posts = await fetchAllPosts();
  console.log("postsData", posts);
  return (
    <div>
      <h2>Categories</h2>
      <h2>Posts</h2>
      <h2>Load More</h2>
    </div>
  );
}
