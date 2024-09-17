import { azure } from '@ai-sdk/azure'
import { getSession } from '@auth0/nextjs-auth0'
import { StreamData, StreamingTextResponse, streamText, tool } from 'ai'
import axios from 'axios'

import type { AnalysisReport } from '@waypoint/api-tenant-admin'
import { z } from 'zod'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()
  const session = await getSession()

  const finalUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/report/analysis/`

  const analysisData: AnalysisReport = await axios({
    url: finalUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`,
    },
  }).then((response) => response.data)

  const minifiedData = analysisData.interventions?.map((intervention) => ({
    type: intervention.event.type,
    reroute: intervention.event.reroute_data,
    summary: intervention.event.summary,
    originalTicket: intervention.event.report,
  }))

  const result = await streamText({
    model: azure('gpt-4o'),

    system: `You are helpful Waypoint's AI assistant, You are providing assistance for a report understanding:
    
    
    ${JSON.stringify(minifiedData)}.

    Be brief, friendly and direct. Prevent saying "In the provided data" and similar phrases. Only use they/them as pronouns to refer to humans.
    In the report data we are providing actions which are suggestions for the user to take. You can find the reason why we suggest such a action in 'summary' field of each item.
    'originalTicket' for each item in the list represent current ticket in Jira.
    If user ask about the most urgent tickets to be assigned to someone return him following format:
    
    "Here are the most urgent tickets to assign to {person} next:
      1. **{key}** title
      2. **{key}** title
      3. **{key}** title
      ...
    
      Waypoint AI recommends assigning thee issues to John Roberts next because:
      1. these are urgent bugs affecting multiple customers
      2. we have identified the root causes
      3. John is uniquely qualified to solve these issues based on prior similar issues
    "

    If user ask you about similarity of tickets always check for action field in the report data, there should be field with type "bug_report_list".
    If user ask why is action marked as incomplete check for "unmet_requirements_list" in summary.
    `,
    messages,
    tools: {
      weather: tool({
        description: 'Get the weather in a location',
        parameters: z.object({
          location: z.string().describe('The location to get the weather for'),
        }),
        execute: async ({ location }) => ({
          location,
          temperature: 72 + Math.floor(Math.random() * 21) - 10,
        }),
      }),
    },
    toolChoice: 'auto',
  })

  const data = new StreamData()

  const stream = result.toAIStream({
    onFinal() {
      data.close()
    },
  })

  return new StreamingTextResponse(stream, {}, data)
}
