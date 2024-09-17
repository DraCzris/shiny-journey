import Document, { Head, Html, Main, NextScript } from 'next/document'
import type { DocumentContext } from 'next/document'

const MyDocument = () => (
  <Html className="h-full bg-[#f8fafc]" lang="en">
    <Head />
    <body className="h-full">
      <Main />
      <NextScript />
    </body>
  </Html>
)

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage

  // eslint-disable-next-line no-param-reassign
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => <App {...props} />,
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: <>{initialProps.styles}</>,
  }
}

export default MyDocument
