import { useState } from 'react'

import { SparklesIcon } from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useChat } from 'ai/react'

import { classNames } from '@waypoint/components'

import { AIChatContent } from './ai-chat-content'
import { AIChatInput } from './ai-chat-input'

export const AIAssistant = () => {
  const [open, setOpen] = useState(true)
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    id: 'ai-waypoint-assistant',
  })

  return (
    <>
      {/* <Button className="shadow-sm self-center" onClick={() => setOpen(!open)}>
        <span className="flex gap-2 items-center">
          <span className="text-sm font-semibold">Ask AI</span>
          <SparklesIcon className="h-4 w-4" />
        </span>
      </Button> */}

      <div
        className={classNames(
          'z-10 fixed top-[88px] right-6 rounded-xl max-h-[calc(100vh-120px)] h-full bg-white shadow-sm max-w-96 w-full text-start',
          open ? 'block' : 'hidden'
        )}
      >
        <div className="p-2 pl-6 flex justify-between items-baseline">
          <div className="flex gap-1 items-center">
            <SparklesIcon className="h-4 w-4 text-blue-600" />
            <span className="text-base font-semibold text-blue-600">
              Waypoint AI
            </span>
          </div>
          <button
            className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-md"
            onClick={() => setOpen(!open)}
          >
            <XMarkIcon className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <AIChatContent messages={messages} />

        <div className="absolute w-full bottom-0 px-6 pb-4 right-0">
          <AIChatInput
            value={input}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  )
}
