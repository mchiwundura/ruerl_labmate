'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bar, BarChart, CartesianGrid, ErrorBar, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const assayResults = [
  {
    id: 1,
    title: "Cell Viability Assay",
    description: "Comparison of cell viability across different treatment groups",
    data: [
      { name: 'Control', value: 100, error: 5 },
      { name: 'Treatment A', value: 75, error: 8 },
      { name: 'Treatment B', value: 60, error: 7 },
      { name: 'Treatment C', value: 40, error: 6 },
    ],
    explanation: "The cell viability assay results show a dose-dependent decrease in cell viability across the treatment groups. Treatment C showed the most significant reduction in cell viability (60% decrease) compared to the control group, while Treatment A had a moderate effect (25% decrease). These results suggest that Treatment C may be the most potent in inhibiting cell proliferation or inducing cell death.",
  },
  {
    id: 2,
    title: "Enzyme Activity Assay",
    description: "Measurement of enzyme activity under various conditions",
    data: [
      { name: 'Baseline', value: 1.0, error: 0.1 },
      { name: 'Inhibitor A', value: 0.6, error: 0.08 },
      { name: 'Inhibitor B', value: 0.3, error: 0.05 },
      { name: 'Activator', value: 1.5, error: 0.15 },
    ],
    explanation: "The enzyme activity assay demonstrates varying effects of different compounds on enzyme function. Inhibitor B showed the strongest inhibitory effect, reducing enzyme activity by 70%. Inhibitor A had a moderate inhibitory effect (40% reduction). Interestingly, the Activator increased enzyme activity by 50% compared to the baseline. These results provide insights into potential modulators of the enzyme's function and their relative potencies.",
  },
]

export function Results() {
  const [selectedAssay, setSelectedAssay] = React.useState(assayResults[0])

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Assay Results</h2>
        <Select onValueChange={(value) => setSelectedAssay(assayResults.find(assay => assay.id === parseInt(value)))}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select an assay" />
          </SelectTrigger>
          <SelectContent>
            {assayResults.map((assay) => (
              <SelectItem key={assay.id} value={assay.id.toString()}>{assay.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{selectedAssay.title}</CardTitle>
          <CardDescription>{selectedAssay.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={selectedAssay.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8">
                  <ErrorBar dataKey="error" width={4} strokeWidth={2} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Results Explanation</h3>
            <p className="text-gray-700 dark:text-gray-300">{selectedAssay.explanation}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}