import {
  ClipboardDocumentListIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { useChat } from 'ai/react'

const sampleActions = [
  {
    id: '1',
    title: 'What are the highest priority escalations?',
    action: 'What are the highest priority escalations?',
    icon: ClipboardDocumentListIcon,
  },
  {
    id: '2',
    title: 'Which Actions can I take right now?',
    action: 'Which Actions can I take right now?',
    icon: UserGroupIcon,
  },
  {
    id: '3',
    title: 'What trends are we seeing in recent high priority escalations?',
    action: 'What trends are we seeing in recent high priority escalations?',
    icon: UserGroupIcon,
  },
  {
    id: '4',
    title: 'Which Team has the most capacity?',
    action: 'Which Team has the most capacity?',
    icon: ClipboardDocumentListIcon,
  },
  {
    id: '5',
    title: 'Which developer is overloaded?',
    action: 'Which developer is overloaded?',
    icon: UserGroupIcon,
  },
  {
    id: '6',
    title: 'Who is providing the best quality escalation reports?',
    action: 'Who is providing the best quality escalation reports?',
    icon: UserGroupIcon,
  },
]

export const EmptyMessages = () => {
  const { append } = useChat({
    id: 'ai-waypoint-assistant',
  })

  const handleAction = (action: string) => {
    append({
      role: 'user',
      content: action,
    })
  }

  return (
    <div className="-mt-4">
      <h1 className="bg-gradient-to-r from-blue-600 via-pink-600 to-indigo-600 inline-block text-transparent bg-clip-text font-bold text-2xl mb-1">
        Hey, how can I help you?
      </h1>
      <p className="text-gray-600 mb-6 text-base">
        Here are few examples of what you can ask me:
      </p>

      <div className="grid gap-2">
        {sampleActions.map((action) => (
          <button
            key={action.id}
            className="bg-blue-50 text-gray-800 px-2 py-2 rounded-lg w-full text-start hover:bg-blue-100 transition-colors duration-200 ease-in-out"
            onClick={() => handleAction(action.action)}
          >
            <span className="flex items-center gap-4">
              <span className="bg-blue-50 h-8 w-8 flex items-center justify-center rounded-full">
                <action.icon className="h-5 w-5 text-blue-600" />
              </span>

              <span className="text-sm font-semibold text-blue-600">
                {action.title}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
