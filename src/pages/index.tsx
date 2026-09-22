import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import LinksBento from "../components/LinksBento";
import About from "../components/About";
import DiscordInvite from "../components/DiscordInvite";
import EventList from "../components/EventList";
import SEO from "../components/SEO";

const IndexPage: React.FC<PageProps> = () => (
  <Layout>
    <Hero />
    <LinksBento />
    <About />
    <DiscordInvite />
    <EventList />
  </Layout>
);

export default IndexPage;

export const Head: HeadFC = () => <SEO pathname="/" />;
