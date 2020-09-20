# Blog

A starter blog using the Issues on a GitHub or GitLab repository as a headless CMS.

## Why don't use a static site generator?

I've used [Hugo](https://gohugo.io) and [Gatsby](https://www.gatsbyjs.com/) for some sites. It's amazing speed and flexibility but I'd a dynamic site that don't have to rebuild  for every change and it's easiler for me than working with GraphQL or Hugo templating.

## Limitation

Both GitHub and GitLab have an an API rate limits. For some reasons, you must to use a token for requests.

## Usage

1. Create a config for your site, see examples in `configs` directory.

2. Go to the Issues of your repository then write your posts. See [here](https://github.com/ez-connect/blog/issues), for example.

3. Build & deploy your site
