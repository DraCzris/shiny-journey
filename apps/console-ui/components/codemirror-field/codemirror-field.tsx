import { json } from '@codemirror/lang-json'
import { python } from '@codemirror/lang-python'
import { okaidiaInit } from '@uiw/codemirror-theme-okaidia'
import type { Extension } from '@uiw/react-codemirror'
import CodeMirror, { EditorView } from '@uiw/react-codemirror'

import { formatJSON } from '../../utils'

type AvailableExtensions = 'JSON' | 'python'

type Props = {
  value: unknown
  onChange?: (values: string) => void
  extension: AvailableExtensions
  readonly?: boolean
  lineWrapping?: boolean
}
export const CodemirrorField = ({
  value,
  onChange,
  extension,
  readonly,
  lineWrapping = true,
}: Props) => {
  const extensions: Record<AvailableExtensions, Extension[]> = {
    JSON: [json(), lineWrapping ? EditorView.lineWrapping : []],
    python: [python()],
  }

  return (
    <CodeMirror
      className="block w-full rounded-md border-0 bg-white/5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 overflow-hidden"
      extensions={extensions[extension]}
      minHeight={readonly ? 'auto' : '300px'}
      readOnly={readonly}
      theme={okaidiaInit({
        settings: {
          lineHighlight: readonly
            ? 'rgb(255 255 255 / 0)'
            : 'rgb(255 255 255 / 0.05)',
          background: 'rgb(255 255 255 / 0.05)',
          gutterBackground: 'rgb(255 255 255 / 0)',
        },
      })}
      value={formatJSON(value)}
      onChange={(value) => {
        onChange?.(value)
      }}
    />
  )
}
