"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileText, Download, Calendar, BarChart3, TrendingUp } from "lucide-react"

interface ReportModalProps {
  isOpen: boolean
  onClose: () => void
  brandName: string
}

export function ReportModal({ isOpen, onClose, brandName }: ReportModalProps) {
  const handleDownload = () => {
    // Simulate PDF download
    const link = document.createElement("a")
    link.href = "/sentiment-analysis-report.png"
    link.download = `${brandName}-sentiment-report.pdf`
    link.click()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <FileText className="h-6 w-6 mr-2 text-blue-600" />
            Analytics Report Preview
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          {/* Report Preview */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{brandName} Sentiment Analysis Report</h3>
              <p className="text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 text-center">
                <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">68%</div>
                <div className="text-sm text-gray-600">Positive Sentiment</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <BarChart3 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">1,247</div>
                <div className="text-sm text-gray-600">Total Mentions</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <Calendar className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">7 Days</div>
                <div className="text-sm text-gray-600">Report Period</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold mb-3">Key Insights</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Overall sentiment improved by 12% compared to last week</li>
                <li>• Twitter shows the highest engagement with 45% of total mentions</li>
                <li>• Customer service keywords trending positively</li>
                <li>• Peak mention times: 2-4 PM and 7-9 PM</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Close Preview
            </Button>
            <Button onClick={handleDownload} className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
