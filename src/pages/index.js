import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'

import { GatsbyImage } from 'gatsby-plugin-image'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { Heading } from '../components/Heading'
import { Hero } from '../components/Hero'
import { PageLayout } from '../components/PageLayout'
import { projectsList } from '../data/projectsList'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function Index({ data }) {
  const latestNotes = data.latestNotes.edges
  const latestArticles = data.latestArticles.edges
  const highlights = data.highlights.edges
  const notes = useMemo(() => getSimplifiedPosts(latestNotes), [latestNotes])

  const articles = useMemo(
    () => getSimplifiedPosts(latestArticles),
    [latestArticles]
  )
  const simplifiedHighlights = useMemo(
    () => getSimplifiedPosts(highlights, { thumbnails: true }),
    [highlights]
  )

  return (
    <>
      <Helmet title={config.siteTitle} />
      <SEO />

      <PageLayout>
        <Hero type="index">
          <div className="hero-wrapper">
            <div>
              <h1>Hey, I'm Min0rFigure!</h1>
              <p className="hero-description">
                Welcome to my personal website. I share notes, projects, and
                technical posts here.
              </p>
              <p className="hero-description">
                Check out the <Link to="/blog">blog</Link> or learn more about me.
              </p>
              <p
                className="flex-wrap flex-align-center gap"
                style={{ marginBottom: 0 }}
              >
                <Link className="button" to="/about">
                  About Me
                </Link>
              </p>
            </div>
          </div>
        </Hero>

        <section className="section-index">
          <Heading
            title="Blog"
            description="Guides, references, and tutorials."
          />
          <Posts data={articles} />
        </section>

        <section className="section-index">
          <Heading
            title="Notes"
            description="Life, music, projects, and everything else."
          />
          <Posts data={notes} />
        </section>

        <section className="section-index">
          <Heading
            title="Deep Dives"
            slug="/topics"
            buttonText="All Topics"
            description="Long-form tutorials on a variety of development topics."
          />
          <div className="cards">
            {simplifiedHighlights.map((post) => {
              return (
                <Link
                  to={post.slug}
                  className="card card-highlight"
                  key={`popular-${post.slug}`}
                >
                  {post.thumbnail && (
                    <GatsbyImage image={post.thumbnail} alt="Thumbnail" />
                  )}
                  <div>{post.title}</div>
                </Link>
              )
            })}
          </div>
        </section>

        <section>
          <Heading
            title="Projects"
            slug="/projects"
            buttonText="All Projects"
            description="Open-source projects I've worked on over the years."
          />

          <div className="cards">
            {projectsList
              .filter((project) => project.highlight)
              .map((project) => {
                return (
                  <div className="card" key={`hightlight-${project.slug}`}>
                    <time>{project.date}</time>
                    <a
                      href={`https://github.com/Min0rFigure/${project.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.name}
                    </a>
                    <p>{project.tagline}</p>
                    <div className="card-links">
                      {project.writeup && (
                        <Link
                          className="button secondary small"
                          to={project.writeup}
                        >
                          Article
                        </Link>
                      )}
                      <a
                        className="button secondary small"
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Demo
                      </a>
                      <a
                        className="button secondary small"
                        href={`https://github.com/Min0rFigure/${project.slug}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Source
                      </a>
                    </div>
                  </div>
                )
              })}
          </div>
        </section>
      </PageLayout>
    </>
  )
}

Index.Layout = Layout

export const pageQuery = graphql`
  query IndexQuery {
    latestNotes: allMarkdownRemark(
      limit: 5
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: {
          template: { eq: "post" }
          categories: { eq: "Personal" }
        }
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            categories
          }
        }
      }
    }
    latestArticles: allMarkdownRemark(
      limit: 5
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: {
          template: { eq: "post" }
          categories: { eq: "Technical" }
        }
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            categories
          }
        }
      }
    }
    highlights: allMarkdownRemark(
      limit: 12
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { categories: { eq: "Highlight" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 40, height: 40, layout: FIXED)
              }
            }
          }
        }
      }
    }
  }
`
