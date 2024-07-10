import Layout from "@/components/layout";

const Post = ({ post }) => {

    if (!post) {
        return <div>Loading...</div>
    }

    return (
        <Layout pageTitle={post.title} isHome={false}>
            <div className="text-[#4F7396] font-Newsreader font-medium dark:text-[#FFFFFF] ">Home / <span className="text-[#0D141C] dark:text-[#bcbcbc]">{post.category}</span></div>
            <div className="max-w-2xl mx-auto py-8 font-Newsreader">
                <h1 className="text-3xl text-[#0D141C] font-bold dark:text-[#FFFFFF]">{post.title}</h1>
                <p className="text-sm text-[#4F7396 dark:text-[#bcbcbc]">{post.date}</p>
                <div className="mt-6 text-[#0D141C] dark:text-[#FFFFFF]">{post.content}</div>
            </div>
        </Layout>
    )
}

// Mock data
export async function getServerSideProps({ params }) {
    const posts = [
        {
            id: 1,
            title: "Remote work: A new reality",
            summary: "In the past, remote work was seen as a perk. Now it's the norm",
            date: "2024-07-05",
            content: `Remote work has evolved from a rare benefit into a standard mode of operation for many businesses. The global pandemic accelerated this shift, demonstrating the viability and advantages of working from home. Employees enjoy the flexibility of setting their own schedules, which can lead to improved work-life balance and higher job satisfaction. Reduced commuting time and costs contribute to a better quality of life and increased productivity. However, remote work also introduces challenges. The lack of face-to-face interaction can lead to feelings of isolation and communication barriers. Maintaining a clear boundary between work and personal life becomes crucial to avoid burnout. Additionally, effective management and reliable technology are essential for sustaining productivity and team cohesion. As remote work becomes an integral part of the modern work environment, it reshapes how we think about work and productivity. Balancing the benefits and addressing the challenges will be key to making remote work a sustainable and productive practice.`,
            category: "Life",
          },
          {
            id: 2,
            title: "Exploring the metaverse",
            summary: "The metaverse is a virtual space where people can interact with each other and digital objects",
            date: "2024-07-03",
            content: `The metaverse is an evolving digital landscape that integrates virtual reality (VR), augmented reality (AR), and the internet to create immersive and interconnected virtual spaces. In this expansive virtual world, users can interact with each other and digital objects in real-time, offering new ways to socialize, work, and play. This digital universe allows for a blend of physical and virtual experiences, where people can create avatars, explore digital environments, and participate in various activities. The metaverse also supports a digital economy, where virtual assets and currencies play a significant role. As technology continues to advance, the metaverse is poised to revolutionize how we interact with digital content, making it a central part of our digital lives and providing new opportunities for engagement and creativity.`,
            category: "Metaverse",
          },
          {
            id: 3,
            title: "The rise of the gig economy",
            summary: "The gig economy is a labor market characterized by short-term contracts or freelance work",
            date: "2024-07-01",
            content: `The rise of the gig economy marks a shift from traditional full-time employment to a labor market characterized by short-term contracts and freelance work. This new economic model offers workers greater flexibility and autonomy, allowing them to choose projects and set their own schedules. Digital platforms such as ride-sharing apps, freelance marketplaces, and on-demand service providers facilitate these flexible job opportunities. While the gig economy provides advantages like freedom and varied work experiences, it also presents challenges such as income instability, lack of job security, and limited access to benefits. As the gig economy continues to grow, it reshapes the nature of work and how people approach their careers. Understanding these changes is crucial for both workers and businesses adapting to this evolving landscape.`,
            category: "Economy",
          },
    ]

    const post = posts.find(post => post.id.toString() === params.id);

    return {
        props: {
            post: post || null,
        },
    }
}

export default Post;