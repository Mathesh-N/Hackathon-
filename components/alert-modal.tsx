"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Settings, Bell, AlertTriangle } from "lucide-react"

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AlertModal({ isOpen, onClose }: AlertModalProps) {
  const [negativeThreshold, setNegativeThreshold] = useState([25])
  const [positiveThreshold, setPositiveThreshold] = useState([75])
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(false)
  const [slackAlerts, setSlackAlerts] = useState(false)

  const handleSave = () => {
    // Simulate saving alert settings
    console.log("Alert settings saved:", {
      negativeThreshold: negativeThreshold[0],
      positiveThreshold: positiveThreshold[0],
      emailAlerts,
      smsAlerts,
      slackAlerts,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center">
            <Settings className="h-5 w-5 mr-2 text-blue-600" />
            Alert Settings
          </DialogTitle>
        </DialogHeader>

        <div className="py-6 space-y-6">
          {/* Sentiment Thresholds */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Sentiment Thresholds</h3>

            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Negative Sentiment Alert: {negativeThreshold[0]}%
                </Label>
                <div className="mt-2">
                  <Slider
                    value={negativeThreshold}
                    onValueChange={setNegativeThreshold}
                    max={50}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Alert when negative sentiment exceeds this percentage</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Positive Sentiment Alert: {positiveThreshold[0]}%
                </Label>
                <div className="mt-2">
                  <Slider
                    value={positiveThreshold}
                    onValueChange={setPositiveThreshold}
                    max={95}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Alert when positive sentiment exceeds this percentage</p>
              </div>
            </div>
          </div>

          {/* Notification Methods */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Notification Methods</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4 text-gray-500" />
                  <Label className="text-sm font-medium">Email Alerts</Label>
                </div>
                <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-gray-500" />
                  <Label className="text-sm font-medium">SMS Alerts</Label>
                </div>
                <Switch checked={smsAlerts} onCheckedChange={setSmsAlerts} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4 text-gray-500" />
                  <Label className="text-sm font-medium">Slack Notifications</Label>
                </div>
                <Switch checked={slackAlerts} onCheckedChange={setSlackAlerts} />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Settings</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
