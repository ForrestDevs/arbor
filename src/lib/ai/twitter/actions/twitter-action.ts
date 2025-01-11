import type { TwitterApi } from "twitter-api-v2";
import { BaseAction, BaseActionResult, BaseActionSchemaAny } from "@/lib/ai/base-action";

export type TwitterActionSchemaAny = BaseActionSchemaAny;
export type TwitterActionResult<TBody> = BaseActionResult<TBody>;

/**
 * Represents the structure for Twitter Actions.
 */
export type TwitterAction<TActionSchema extends TwitterActionSchemaAny, TBody> = BaseAction<TActionSchema, TBody, TwitterApi>;