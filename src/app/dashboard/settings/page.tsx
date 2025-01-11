"use client";

import { useState } from "react";
import { Settings2, Wallet, Bot, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
// import { Toggle } from "@/components/ui/toggle";

export default function SettingsPage() {
  const [connectedWallet] = useState("0x742...4829");
  const [agentSettings, setAgentSettings] = useState({
    arborEnabled: true,
    chiaEnabled: true,
    cloverEnabled: true,
    amaranthEnabled: true,
    responseSpeed: 75,
    creativityLevel: 60
  });
  const [userPrompt, setUserPrompt] = useState("");

  return (
    <div className="min-h-screen p-6 space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <Settings2 className="w-6 h-6" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {/* Wallet Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Connected Wallet
        </h2>
        <div className="flex items-center gap-4">
          <code className="bg-muted px-4 py-2 rounded-lg">{connectedWallet}</code>
          <Button variant="outline">Disconnect</Button>
        </div>
      </div>

      {/* Agent Settings */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Bot className="w-5 h-5" />
          Agent Settings
        </h2>
        
        <div className="space-y-6">
          <div className="grid gap-4 border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <label className="font-medium">Arbor AI</label>
              {/* <Toggle 
                variant="outline"
                value={agentSettings.arborEnabled}
                onValueChange={(value) => 
                  setAgentSettings(prev => ({...prev, arborEnabled: value}))
                }
              /> */}
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium">Chia AI</label>
              {/* <Toggle 
                variant="outline"
                //
                onToggle={(checked) => 
                  setAgentSettings(prev => ({...prev, chiaEnabled: checked}))
                }
              /> */}
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium">Clover AI</label>
              {/* <Switch 
                checked={agentSettings.cloverEnabled}
                onCheckedChange={(checked) => 
                  setAgentSettings(prev => ({...prev, cloverEnabled: checked}))
                }
              /> */}
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium">Amaranth AI</label>
              {/* <Switch 
                checked={agentSettings.amaranthEnabled}
                onCheckedChange={(checked) => 
                  setAgentSettings(prev => ({...prev, amaranthEnabled: checked}))
                }
              /> */}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="font-medium block mb-2">Response Speed</label>
              <Slider 
                value={[agentSettings.responseSpeed]}
                onValueChange={(value) => 
                  setAgentSettings(prev => ({...prev, responseSpeed: value[0]}))
                }
                max={100}
                step={1}
              />
            </div>
            <div>
              <label className="font-medium block mb-2">Creativity Level</label>
              <Slider 
                value={[agentSettings.creativityLevel]}
                onValueChange={(value) => 
                  setAgentSettings(prev => ({...prev, creativityLevel: value[0]}))
                }
                max={100}
                step={1}
              />
            </div>
          </div>
        </div>
      </div>

      {/* User Prompts */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Custom Prompt
        </h2>
        <div className="space-y-2">
          <Input
            placeholder="Enter your custom prompt for the agents..."
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
          />
          <Button className="w-full">Save Prompt</Button>
        </div>
      </div>
    </div>
  );
}
