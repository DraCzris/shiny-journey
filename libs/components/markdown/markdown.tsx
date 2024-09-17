import remarkGfm from 'remark-gfm'

import { classNames } from '../utils'

import { MemoizedReactMarkdown } from './memoized-react-markdown'

type Props = {
  children: string
  className?: string
}
export const Markdown = ({ children, className }: Props) => (
  <MemoizedReactMarkdown
    className={classNames(
      'prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0',
      className ?? ''
    )}
    remarkPlugins={[remarkGfm]}
    components={{
      p({ children }) {
        return <p className="mb-4 last:mb-0">{children}</p>
      },
      ol({ children }) {
        return (
          <ol className="list-decimal list-outside ml-5 mb-4 last:mb-0">
            {children}
          </ol>
        )
      },
      ul({ children }) {
        return (
          <ul className="list-disc list-outside mb-4 ml-5 last:mb-0">
            {children}
          </ul>
        )
      },
      pre({ children }) {
        return (
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4 last:mb-0">
            {children}
          </pre>
        )
      },
      code({ children }) {
        return (
          <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded max-w-full w-full overflow-scroll">
            {children}
          </code>
        )
      },
      blockquote({ children }) {
        return (
          <blockquote className="border-l-4 border-gray-300 pl-4 mb-4 last:mb-0">
            {children}
          </blockquote>
        )
      },
      h1({ children }) {
        return <h1 className="text-xl font-bold mb-4 last:mb-0">{children}</h1>
      },
      h2({ children }) {
        return <h2 className="text-xl font-bold mb-4 last:mb-0">{children}</h2>
      },
      h3({ children }) {
        return <h3 className="text-xl font-bold mb-4 last:mb-0">{children}</h3>
      },
    }}
  >
    {children}
  </MemoizedReactMarkdown>
)
