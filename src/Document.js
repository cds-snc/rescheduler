import React from 'react'
import { AfterRoot, AfterData } from '@jaredpalmer/after'


class Document extends React.Component {
  static async getInitialProps({ assets, data, renderPage }) {
    const page = await renderPage()
    return { assets, data, ...page }
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { helmet, assets, data, path } = this.props

    // get attributes from React Helmet
    let htmlAttrs = helmet.htmlAttributes.toComponent()
    const bodyAttrs = helmet.bodyAttributes.toComponent()

    htmlAttrs = {
      ...htmlAttrs,
      ...{
        className:
          process.env.NODE_ENV === 'development'
            ? 'development'
            : process.env.RAZZLE_STAGE || 'dev',
      },
    }

    return (
      <html {...htmlAttrs}>
        <head>
          <link
            rel="preload"
            href="/fonts/SourceSansPro-Regular.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/SourceSansPro-Bold.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link href="/fonts/fonts.css" rel="stylesheet" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          {helmet.title.toComponent()[0].key ? (
            helmet.title.toComponent()
          ) : (
            <title>Request a new citizenship appointment</title>
          )}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
        </head>
        <body {...bodyAttrs}>
          {process.env.NODE_ENV === 'production' && process.env.RAZZLE_GA_ID ? (
            <noscript />
          ) : null}
          <AfterRoot />
          <AfterData data={data} />
          <script
            type="text/javascript"
            src={assets.client.js}
            defer
            crossOrigin="anonymous"
          />
        </body>
      </html>
    )
  }
}

export default Document
