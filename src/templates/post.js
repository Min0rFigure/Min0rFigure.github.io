import React from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { GatsbyImage } from 'gatsby-plugin-image'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { PostLayout } from '../components/PostLayout'
import { Hero } from '../components/Hero'
import config from '../utils/config'
import { slugify } from '../utils/helpers'

export default function PostTemplate({ data }) {
  const post = data.markdownRemark
  const { title, date, thumbnail, tags } = post.frontmatter

  return (
    <>
      <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
      <SEO postPath={post.fields.slug} postNode={post} postSEO />

      <PostLayout post={post}>
        {thumbnail && (
          <GatsbyImage
            image={thumbnail?.childImageSharp?.gatsbyImageData}
            className="main-article-thumbnail"
            alt="Thumbnail"
          />
        )}
        <Hero
          title={title}
          type="post"
          date={
            <div className="small flex-align-center gap">
              <span>{date}</span>
              <div className="divider" />
              <Link to="/about">Get in touch</Link>
            </div>
          }
        >
          <div className="tags">
            {tags.map((tag) => {
              return (
                <Link
                  key={tag}
                  to={`/topics/${slugify(tag)}`}
                  className="button secondary small"
                  activeClassName="active"
                >
                  {tag}
                </Link>
              )
            })}
          </div>
        </Hero>

        <div
          className="main-article"
          id={post.fields.slug}
          dangerouslySetInnerHTML={{
            __html: `<div class="introduction" id="introduction"></div>${post.html}`,
          }}
        />
      </PostLayout>
    </>
  )
}

PostTemplate.Layout = Layout

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      tableOfContents(maxDepth: 3)
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        categories
        description
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 75, height: 75, layout: FIXED)
          }
        }
      }
    }
  }
`
