import { HtmlContent } from '@waypoint/api-tenant-admin'
import { MemoizedReactMarkdown } from '@waypoint/components/markdown/memoized-react-markdown'

export const HTMLContentEventSummary = ({ item }: { item: HtmlContent }) => {
  return (
    <div>
      <MemoizedReactMarkdown className="text-gray-700">
        {item.content}
      </MemoizedReactMarkdown>
      {/* <p className="text-gray-700">{item.content}</p> */}
    </div>
  )
}
