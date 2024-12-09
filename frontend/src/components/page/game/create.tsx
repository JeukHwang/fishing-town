"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Leaf, RotateCcw, Turtle, Wind } from "lucide-react";
import { useState } from "react";
import { Layout } from "../layout/layoutHeader";

export function Create() {
  const [classModeEnabled, setClassModeEnabled] = useState(false);

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Game Information */}
          <div className="space-y-4">
            <div>
              <h2 className="text-sm text-gray-500">Game for HAE 2024:</h2>
              <p className="text-xl font-bold">Fishing Utopia</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Host</h3>
              <p>Hana Kim</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Code</h3>
              <p>QWEGVPOK</p>
              <div className="mt-2 w-32 h-32 bg-gray-200"></div>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Class Mode</h3>
              <Switch
                checked={classModeEnabled}
                onCheckedChange={setClassModeEnabled}
              />
            </div>
            <p className="text-xs text-gray-500">
              Hide participants' choice of town
            </p>
          </div>

          {/* Rules */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Rule</h2>
            <div>
              <h3 className="text-sm font-semibold mb-1">Preset</h3>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-1">Advanced settings</h3>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500">Reset all as defaults</p>
                <Button variant="outline" size="icon">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Initial amount of gem
                  </label>
                  <Input
                    type="number"
                    placeholder="10000"
                    className="h-8 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Initial number of ship
                  </label>
                  <Input
                    type="number"
                    placeholder="10"
                    className="h-8 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Cost of living per year
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter cost"
                    className="h-8 text-sm"
                  />
                </div>
              </div>
            </div>

            <Button className="w-full mt-4">Start</Button>
          </div>

          {/* Ready Participants */}
          <div>
            <h2 className="text-xl font-bold mb-2">Ready Participant</h2>
            <p className="text-xs text-gray-500 mb-2">Total 37 people</p>
            <div className="space-y-1">
              {[
                "Jeuk Hwang",
                "Jake",
                "Hate Turtle",
                "Nupjuki23",
                "Jeuk Hwang",
                "Jeuk Hwang",
                "Jeuk Hwang",
              ].map((name, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-100 p-1 rounded text-sm"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs">
                      JH
                    </div>
                    <span>{name}</span>
                  </div>
                  <Button variant="outline" size="sm" className="h-6 px-2">
                    {index === 0 || index > 3 ? (
                      <Wind className="h-3 w-3" />
                    ) : index === 1 ? (
                      <Turtle className="h-3 w-3" />
                    ) : (
                      <Leaf className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Preparing Participants */}
          <div>
            <h2 className="text-xl font-bold mb-2">Preparing Participant</h2>
            <p className="text-xs text-gray-500 mb-2">Total 7 people</p>
            <div className="space-y-1">
              {[
                "Jeuk Hwang",
                "Jake",
                "Hate Turtle",
                "Jeuk Hwang",
                "Jeuk Hwang",
                "Jeuk Hwang",
                "Jeuk Hwang",
              ].map((name, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-100 p-1 rounded text-sm"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs">
                      JH
                    </div>
                    <span>{name}</span>
                  </div>
                  {index === 3 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="h-6 px-2 text-xs"
                    >
                      Kick out
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
