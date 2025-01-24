import { z } from "zod";

export type ToolSchemaAny = z.ZodObject<any, any, any, any>;

export type ToolResult<TBody> = {
  message: string;
  body?: TBody;
};
/**
 * Represents the base structure for all Tools.
 */
export interface ITool<
  TActionSchema extends ToolSchemaAny,
  TBody,
  TClient = void
> {
  /**
   * The name of the action
   */
  name: string;

  /**
   * A description of what the action does
   */
  description: string;

  /**
   * Schema for validating action arguments
   */
  argsSchema: TActionSchema;
  /**
   * The function to execute for this action
   */
  func?:
    | ((
        client: TClient,
        args: z.infer<TActionSchema>
      ) => Promise<ToolResult<TBody>>)
    | ((args: z.infer<TActionSchema>) => Promise<ToolResult<TBody>>);
}

export interface ToolAny extends ITool<ToolSchemaAny, any, any> {}

export interface IToolMetadata {
  type: "function";
  name: string;
  description: string;
  parameters?: {
    type: string;
    properties: Record<
      string,
      {
        type: string;
        description: string;
      }
    >;
    required?: string[];
    additionalProperties?: boolean;
  };
  strict?: boolean;
}
