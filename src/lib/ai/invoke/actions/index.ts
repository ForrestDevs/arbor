import { InvokeAgentAction } from "./invoke-agent";

import type { InvokeAction, InvokeActionSchemaAny } from "./invoke-action";
import { agents } from "@/lib/ai/agents";

export function getAllInvokeActions(): InvokeAction<InvokeActionSchemaAny, unknown>[] {
  return [
    new InvokeAgentAction(agents)
  ];
}

export const INVOKE_ACTIONS = getAllInvokeActions();

export * from './types';
export * from './invoke-action';
