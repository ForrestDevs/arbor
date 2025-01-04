import { Handle, Position } from 'reactflow'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Cpu, Bot, Sparkles, Leaf } from 'lucide-react'

interface CustomNodeProps {
  data: {
    title: string
    type: string
    specialization: string
    capabilities: string[]
    performanceLevel: number
    efficiency: number
    features: string[]
    isCenter?: boolean
    description: string
  }
}

export default function CustomNode({ data }: CustomNodeProps) {
  const icons = {
    'ANALYZER': Brain,
    'CREATOR': Sparkles,
    'PROCESSOR': Cpu,
    'CORE': Leaf
  }

  const Icon = icons[data.type as keyof typeof icons] || Bot

  return (
    <div className={`bg-card rounded-lg shadow-lg p-4 w-[300px] ${data.isCenter ? 'border-2 border-primary' : 'border border-border'}`}>
      <Handle type="target" position={Position.Top} className="!bg-primary" />
      
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-primary">{data.title}</h3>
          <p className="text-sm text-muted-foreground">{data.specialization}</p>
        </div>
        <Badge variant="secondary" className="ml-auto">
          {data.type}
        </Badge>
      </div>

      <div className="space-y-4 mb-4">
        <div className="flex flex-wrap gap-2">
          {data.capabilities.map((capability) => (
            <Badge key={capability} variant="outline" className="bg-secondary text-secondary-foreground">
              {capability}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4 mb-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Performance</span>
            <span className="text-primary font-medium">{data.performanceLevel}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-primary rounded-full h-2" style={{ width: `${data.performanceLevel}%` }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Efficiency</span>
            <span className="text-primary font-medium">{data.efficiency}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-primary rounded-full h-2" style={{ width: `${data.efficiency}%` }}></div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {data.features.map((feature) => (
          <Button key={feature} variant="outline" size="sm" className="w-full text-primary hover:text-primary-foreground hover:bg-primary">
            {feature}
          </Button>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">{data.description}</p>

      <Handle type="source" position={Position.Bottom} className="!bg-primary" />
      <Handle type="source" position={Position.Left} className="!bg-primary" />
      <Handle type="source" position={Position.Right} className="!bg-primary" />
    </div>
  )
}

