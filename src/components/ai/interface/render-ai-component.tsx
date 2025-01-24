import React from "react";
import { useAI } from "@/components/ai/context";
import { v4 } from "uuid";

type UIComponent = {
  id?: string | null;
  title: string | undefined;
  data: Record<string, any> | undefined;
};

export const RenderComponent: React.FC<{
  component: UIComponent;
}> = (props) => {
  const { component } = props;
  const { id, title, data } = component;
  const { selectedAgentConfigSet } = useAI();

  const hasComponent = selectedAgentConfigSet?.some((agentConfig) => {
    return (
      agentConfig.uiComponents &&
      Object.keys(agentConfig.uiComponents).includes(title || "")
    );
  });

  if (hasComponent) {
    return (
      <>
        {selectedAgentConfigSet?.map((agentConfig, index) => {
          const Component = agentConfig.uiComponents?.[title || ""];
          return Component ? (
            <div key={`uiFrag-${index}`}>
              <Component {...data} id={`uiComp-${id}`} />
            </div>
          ) : null;
        })}
      </>
    );
  }

  return null;
};
