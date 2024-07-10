import Layout from "@/components/layout";

function About() {
  return (
    <Layout pageTitle="About Me">
        <div className="flex font-Newsreader dark:text-[#ffffff] font-bold mt-6 text-[20px] justify-center">About Me</div>
        <div className="mx-auto mt-6 py-8 px-6 font-Newsreader bg-white rounded-[10px] shadow-lg dark:bg-[#393939]">
            <p className="text-lg text-[#0D141C] dark:text-[#FFFFFF]">Hi, I’m User! I’m a frontend developer with a passion for crafting dynamic web experiences and a love for blogging.

              When I’m not immersed in code, I’m writing about my experiences, sharing insights on web development, and exploring personal growth topics. This blog is my space to blend my tech expertise with my enthusiasm for storytelling, offering tips, tutorials, and reflections on both the tech world and personal development.</p>
        </div>
    </Layout>
  );
}

export default About;