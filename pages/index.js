import Layout from "@/components/layout";
import Image from "next/image";
import posticon from '../icons/post.svg';
import Link from "next/link";
import { useState, useEffect } from 'react';

const Index = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  // Effect to update the filtered posts whenever the search query or posts change
  useEffect(() => {
    const results = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchQuery, posts]);

  return (
    <Layout pageTitle="Personal Blog" setSearchQuery={setSearchQuery} isHome={true}>
      <div className="flex font-Newsreader font-bold mt-6 text-[20px] justify-center dark:text-[#ffffff]">Posts</div>
      <div className="space-y-8 mt-6">
        {/* Render the list of filtered posts or show a message if no posts are found */}
        {
        filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`} legacyBehavior>
              <a className="pb-4 pt-2 bg-white dark:bg-[#1B1B1B] rounded-[10px] shadow-md font-Newsreader flex items-center gap-3 ease-in-out duration-300 transition-all hover:scale-[1.02] hover:shadow-lg">
                <div className="ml-3 p-4 rounded-[8px] bg-[#F7FAFC] dark:bg-[#393939]"> <Image className="dark:invert" src={posticon} alt="posticon"/> </div>
                <div className="flex flex-col">
                  <div className="text-xl font-medium text-[#0D141C] dark:text-[#FFFFFF]">{post.title}</div>
                  <p className="text-sm font-normal text-[#4F7396] dark:text-[#DCDCDC]">{post.summary}</p>
                  <p className="text-sm font-normal text-[#4F7396] dark:text-[#DCDCDC]">{post.date}</p>
                </div>
              </a>
            </Link>
          ))
        ) : (
        <div className="mt-6 text-center dark:text-[#DCDCDC] ">
          Post not found
        </div>
        )
    }
      </div>
    </Layout>
  );
};

export default Index;

// Function to fetch static data for the posts
export async function getStaticProps() {
  const posts = [
    {
      id:1,
      title: "Remote work: A new reality",
      summary: "In the past, remote work was seen as a perk. Now it's the norm",
      date: "2024-07-05"
    },
    {
      id: 2,
      title: "Exploring the metaverse",
      summary: "The metaverse is a virtual space where people can interact with each other and digital objects",
      date: "2024-07-03",
    },
    {
      id: 3,
      title: "The rise of the gig economy",
      summary: "The gig economy is a labor market characterized by short-term contracts or freelance work",
      date: "2024-07-01",
    },
  ];

  return {
    props: {
      posts,
    }
  }
}
