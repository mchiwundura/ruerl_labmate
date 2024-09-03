'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Beaker, Search } from 'lucide-react'

const initialWellPlates = [
  { id: 1, name: 'Plate A', assay: 'Cell Viability Assay', size: '96', status: 'In Progress', startDate: '2023-06-01', endDate: '2023-06-07' },
  { id: 2, name: 'Plate B', assay: 'Enzyme Activity Assay', size: '24', status: 'Completed', startDate: '2023-05-28', endDate: '2023-06-02' },
  { id: 3, name: 'Plate C', assay: 'Protein Quantification Assay', size: '96', status: 'Planned', startDate: '2023-06-10', endDate: '2023-06-17' },
]

export function WellPlates() {
  const [wellPlates, setWellPlates] = useState(initialWellPlates)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlate, setSelectedPlate] = useState(null)

  const filteredWellPlates = wellPlates.filter(plate => 
    plate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plate.assay.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'bg-blue-500'
      case 'completed':
        return 'bg-green-500'
      case 'planned':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Well Plates</h2>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search well plates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Search className="w-5 h-5 text-gray-500" />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Assay</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredWellPlates.map(plate => (
            <TableRow key={plate.id}>
              <TableCell>{plate.name}</TableCell>
              <TableCell>{plate.assay}</TableCell>
              <TableCell>{plate.size}-well</TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(plate.status)} text-white`}>
                  {plate.status}
                </Badge>
              </TableCell>
              <TableCell>{plate.startDate}</TableCell>
              <TableCell>{plate.endDate}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => setSelectedPlate(plate)}>
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedPlate && (
        <Dialog open={!!selectedPlate} onOpenChange={() => setSelectedPlate(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedPlate.name} Details</DialogTitle>
              <DialogDescription>{selectedPlate.assay}</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Size:</p>
                <p>{selectedPlate.size}-well</p>
              </div>
              <div>
                <p className="font-semibold">Status:</p>
                <Badge className={`${getStatusColor(selectedPlate.status)} text-white`}>
                  {selectedPlate.status}
                </Badge>
              </div>
              <div>
                <p className="font-semibold">Start Date:</p>
                <p>{selectedPlate.startDate}</p>
              </div>
              <div>
                <p className="font-semibold">End Date:</p>
                <p>{selectedPlate.endDate}</p>
              </div>
            </div>
            <WellPlateVisualizer size={selectedPlate.size} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function WellPlateVisualizer({ size }) {
  const rows = size === '96' ? 8 : 4
  const cols = size === '96' ? 12 : 6

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Well Plate Layout</h3>
      <div className={`grid gap-1 ${size === '96' ? 'grid-cols-12' : 'grid-cols-6'}`}>
        {Array.from({ length: rows * cols }).map((_, index) => {
          const row = String.fromCharCode(65 + Math.floor(index / cols))
          const col = (index % cols) + 1
          return (
            <div
              key={`${row}${col}`}
              className="w-8 h-8 border border-gray-300 flex items-center justify-center text-xs"
            >
              {`${row}${col}`}
            </div>
          )
        })}
      </div>
    </div>
  )
}