import Layout from "@/components/Layout";
import Hero from "@/container/edu-page/Hero";
import LearningPath from "@/container/edu-page/LearningPath";
import { ROUTES } from "@/lib/routes";
import { GetStaticProps } from "next";
import Head from "next/head";

export default function EduStoriesPage() {
  return (
    <>
      <Head>
        <title>EduStories - BudgetNDIOStory</title>
        <meta
          name="description"
          content="Educational stories to help you understand budgeting and financial management"
        />
        <link rel="canonical" href={ROUTES.EDUSTORIES} />
      </Head>
      <Layout>
        <Hero />
        <LearningPath />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
