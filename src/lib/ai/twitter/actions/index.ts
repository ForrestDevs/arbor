import { TwitterSearchRecentAction } from "./search-recent";

import type { TwitterAction, TwitterActionSchemaAny } from "./twitter-action";

export function getAllTwitterActions(): TwitterAction<TwitterActionSchemaAny, unknown>[] {
  return [
    new TwitterSearchRecentAction()
  ];
}

export const TWITTER_ACTIONS = getAllTwitterActions();

export * from './types';
export * from './twitter-action';