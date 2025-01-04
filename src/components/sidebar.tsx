// import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Model {
  id: string
  name: string
  type: string
  performance: number
  efficiency: number
  description: string
}

const models: Model[] = [
  { id: 'seed', name: 'Seed AI', type: 'CORE', performance: 100, efficiency: 100, description: 'Godly superior logical LLM, manages other tokens and deploys tokens' },
  { id: 'chia', name: 'Chia AI', type: 'ANALYZER', performance: 85, efficiency: 90, description: 'Sadistic, observant, cocky LLM, manages portfolio and tracks token prices' },
  { id: 'clover', name: 'Clover AI', type: 'CREATOR', performance: 92, efficiency: 88, description: 'Joyful, optimistic, visionary LLM, discovers potential gem projects and improves over time' },
  { id: 'amaranth', name: 'Amaranth AI', type: 'PROCESSOR', performance: 95, efficiency: 96, description: 'Nerdy, classy, efficient LLM, calculates taxes based on wallet activity' },
]

interface SidebarProps {
  onAgentSelect: (agentId: string) => void
}

export default function Sidebar({ onAgentSelect }: SidebarProps) {
  return (
    <div className="w-full h-full bg-card p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-primary">AI Models</h2>
      {models.map((model) => (
        <Card 
          key={model.id} 
          className="mb-4 cursor-pointer group hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 border-border/50 hover:border-primary/50" 
          onClick={() => onAgentSelect(model.id)}
        >
          <CardHeader>
            <CardTitle className="text-primary flex items-center justify-between">
              {model.name}
              <Badge 
                variant="outline" 
                className={`
                  ${model.type === 'CORE' && 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}
                  ${model.type === 'ANALYZER' && 'bg-blue-500/10 text-blue-500 border-blue-500/20'}
                  ${model.type === 'CREATOR' && 'bg-amber-500/10 text-amber-500 border-amber-500/20'}
                  ${model.type === 'PROCESSOR' && 'bg-red-500/10 text-red-500 border-red-500/20'}
                `}
              >
                {model.type}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Performance</span>
                  <span className={`
                    font-medium
                    ${model.type === 'CORE' && 'text-emerald-500'}
                    ${model.type === 'ANALYZER' && 'text-blue-500'}
                    ${model.type === 'CREATOR' && 'text-amber-500'}
                    ${model.type === 'PROCESSOR' && 'text-red-500'}
                  `}>
                    {model.performance}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary/50 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ease-out
                      ${model.type === 'CORE' && 'bg-emerald-500'}
                      ${model.type === 'ANALYZER' && 'bg-blue-500'}
                      ${model.type === 'CREATOR' && 'bg-amber-500'}
                      ${model.type === 'PROCESSOR' && 'bg-red-500'}
                    `}
                    style={{ 
                      width: `${model.performance}%`,
                      animation: 'growWidth 1.5s ease-out'
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Efficiency</span>
                  <span className={`
                    font-medium
                    ${model.type === 'CORE' && 'text-emerald-500'}
                    ${model.type === 'ANALYZER' && 'text-blue-500'}
                    ${model.type === 'CREATOR' && 'text-amber-500'}
                    ${model.type === 'PROCESSOR' && 'text-red-500'}
                  `}>
                    {model.efficiency}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary/50 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ease-out
                      ${model.type === 'CORE' && 'bg-emerald-500'}
                      ${model.type === 'ANALYZER' && 'bg-blue-500'}
                      ${model.type === 'CREATOR' && 'bg-amber-500'}
                      ${model.type === 'PROCESSOR' && 'bg-red-500'}
                    `}
                    style={{ 
                      width: `${model.efficiency}%`,
                      animation: 'growWidth 1.5s ease-out'
                    }}
                  />
                </div>
              </div>
              <p className="text-sm mt-2 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {model.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

