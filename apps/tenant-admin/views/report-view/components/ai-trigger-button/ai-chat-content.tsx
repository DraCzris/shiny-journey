import { SparklesIcon, SunIcon } from '@heroicons/react/20/solid'
import type { ToolInvocation } from 'ai'
import type { Message } from 'ai/react'

import { Avatar, Markdown } from '@waypoint/components'

import { EmptyMessages } from './empty-messages'
import { WeatherTool } from './tools'

type Props = {
  messages: Message[]
}
export const AIChatContent = ({ messages }: Props) => {
  const lastMessage =
    messages.length > 0 ? messages[messages.length - 1] : undefined

  return (
    <div className="relative h-[calc(100%-80px)] overflow-scroll pb-20 p-6">
      {messages.length === 0 && <EmptyMessages />}

      {messages.map((m: Message) => (
        <div key={m.id} className="text-sm mb-6">
          {/* avatar */}
          <div className="">
            <span className="font-semibold">
              {m.role === 'user' ? (
                <Avatar className="h-7 w-7" />
              ) : (
                <SparklesIcon className="h-5 w-5 text-blue-600 mb-2" />
              )}
            </span>
          </div>

          {/* content */}
          <Markdown className="text-gray-700">{m.content}</Markdown>

          {/* tools */}
          {m.toolInvocations?.map((toolInvocation: ToolInvocation) => {
            const toolCallId = toolInvocation.toolCallId

            if ('result' in toolInvocation) {
              if (toolInvocation.toolName === 'weather') {
                return (
                  <WeatherTool
                    key={toolCallId}
                    toolName="weather"
                    temperature={toolInvocation?.result.temperature}
                    location={toolInvocation?.result.location}
                  />
                )
              }
            }

            // other tools:
            return 'result' in toolInvocation ? (
              <div
                key={toolCallId}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <span className="text-gray-400 text-xs">
                  Tool call {`${toolInvocation.toolName}: `}
                </span>
                <div>
                  <p className="font-semibold text-blue-500">
                    {toolInvocation.result.location}
                  </p>
                  <div>
                    <SunIcon className="h-5 w-5 text-yellow-400" />
                    {toolInvocation.result.temperature}°F
                  </div>
                </div>
                <div>{JSON.stringify(toolInvocation.result)}</div>
                {/* {toolInvocation.result} */}
              </div>
            ) : (
              <div key={toolCallId}>Calling {toolInvocation.toolName}...</div>
            )
          })}
        </div>
      ))}

      {lastMessage?.role === 'user' && (
        <div className="text-sm mb-6">
          {/* avatar */}
          <div className="mb-2">
            <span className="font-semibold">
              <SparklesIcon className="h-5 w-5 text-blue-600 mb-2" />
            </span>
          </div>

          <div className="flex gap-1">
            <div className="size-2 bg-gray-300 animate-pulse rounded-full" />
            <div className="size-2 bg-gray-300 animate-pulse rounded-full" />
            <div className="size-2 bg-gray-300 animate-pulse rounded-full" />
          </div>
        </div>
      )}
    </div>
  )
}
