export type NodesType = 1 | 2 | 3 | 4 | 5 | 6

export type NodesDefinition = {
  id: string
  name: string
  type: NodesType
  attributes?: NodesDefinitionAttributeType
  inputs?: NodesDefinitionInputType[] | []
}

export type NodesDefinitionCreationInput = {
  tenant_id: string
  name: string
  type: NodesType
  attributes?: NodesDefinitionAttributeType
  inputs?: NodesDefinitionInputType[] | []
}

export type NodesDefinitionAttributeType = {
  system_prompt?: string
  user_prompt?: string
  function?: string
}

export type NodesDefinitionInputType = {
  alias: string
  definition: string
  id: string
  type: string
}

export type RevisionDetail = {
  id: string
  status: 1 | 2 | 3 | 4
  initiated_at: string
  finished_at: string
  attributes: string | null
  input_data: string
  output_data: string
  resolver_type: NodesType
}

export type SandboxInput = {
  attributes?: string | null
  resolver_type: NodesType
  input_data: string
}
