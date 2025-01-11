import { BaseAction, BaseActionResult, BaseActionSchemaAny } from "@/lib/ai/base-action";

export type InvokeActionSchemaAny = BaseActionSchemaAny;
export type InvokeActionResult<TBody> = BaseActionResult<TBody>;

/**
 * Represents the structure for Invoke Actions.
 */
export type InvokeAction<TActionSchema extends InvokeActionSchemaAny, TBody> = BaseAction<TActionSchema, TBody>;