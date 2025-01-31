import React from "react";
import { Handle, Position } from "reactflow";

interface Stat {
  label: string;
  value: number;
  color: string;
}

interface Skill {
  name: string;
  level: number;
}

interface NodeData {
  label: string;
  icon?: string;
  type?: "main" | "function" | "service";
  description?: string;
  status?: "online" | "offline" | "maintenance";
  stats?: Stat[];
  skills?: Skill[];
}

const baseStyles = {
  padding: "12px",
  borderRadius: "12px",
  minWidth: "100px",
  textAlign: "center" as const,
  fontSize: "12px",
  color: "white",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  gap: "8px",
  backdropFilter: "blur(8px)",
};

const nodeStyles = {
  main: {
    ...baseStyles,
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
  },
  function: {
    ...baseStyles,
    // background: "linear-gradient(45deg, #45B7D1, #2C3E50)",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
    border: "1px solid rgba(148, 163, 184, 0.1)",
    width: "200px",
    minHeight: "100px",
  },
  service: {
    ...baseStyles,
    background: "linear-gradient(45deg, #45B7D1, #2C3E50)",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
    border: "1px solid rgba(148, 163, 184, 0.1)",
  },
};

const iconStyle = {
  width: "55px",
  height: "55px",
  objectFit: "contain" as const,
  padding: "6px",
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: "8px",
  backdropFilter: "blur(8px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  fill: "white",
};

const StatusIndicator: React.FC<{ status: string }> = ({ status }) => {
  const colors = {
    online: "#22c55e",
    offline: "#ef4444",
    maintenance: "#f59e0b",
  };

  return (
    <div className="flex items-center gap-1.5">
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: colors[status as keyof typeof colors] }}
      />
      <span className="text-[10px] uppercase tracking-wider opacity-80 dark:text-white text-black">
        {status}
      </span>
    </div>
  );
};

export const MainNode: React.FC<{ data: NodeData }> = ({ data }) => {
  return (
    <div>
      <Handle
        type="target"
        position={Position.Top}
        style={{ visibility: "hidden" }}
      />
      {data.icon && (
        <img
          src={data.icon}
          alt={data.label}
          className="rounded-full w-24 h-24 border-2 border-white/10"
        />
      )}
      {/* <div>{data.label}</div> */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export const FunctionNode: React.FC<{ data: NodeData }> = ({ data }) => {
  return (
    <div
      style={nodeStyles.function}
      className="backdrop-blur-sm bg-opacity-90 text-black"
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2 mb-2 ">
        {data.icon && (
          <img
            src={data.icon}
            alt={data.label}
            // style={iconStyle}
            className="rounded-lg dark:text-white text-black"
          />
        )}
        <div className="text-left">
          <div className="font-semibold text-sm mb-0.5 dark:text-white text-black">
            {data.label}
          </div>
          {data.status && <StatusIndicator status={data.status} />}
        </div>
      </div>

      {data.description && (
        <div className="text-xs mb-2 text-left leading-tight dark:text-white text-black">
          {data.description}
        </div>
      )}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export const ServiceNode: React.FC<{ data: NodeData }> = ({ data }) => {
  return (
    <div style={nodeStyles.service}>
      <Handle type="target" position={Position.Top} />
      {data.icon && (
        <img
          src={data.icon}
          alt={data.label}
          style={iconStyle}
          className="rounded-full"
        />
      )}
      {/* <div>{data.label}</div> */}
    </div>
  );
};
