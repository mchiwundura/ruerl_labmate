'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const initialAssays = [
  { id: 1, name: 'Cell Viability Assay', description: 'Measures the number of viable cells in a sample.', procedure: '1. Prepare cells\n2. Add test compounds\n3. Incubate for 24 hours\n4. Add MTT reagent\n5. Measure absorbance' },
  { id: 2, name: 'Enzyme Activity Assay', description: 'Determines the rate of an enzyme-catalyzed reaction.', procedure: '1. Prepare enzyme solution\n2. Add substrate\n3. Incubate at 37°C\n4. Add stop solution\n5. Measure product formation' },
  { id: 3, name: 'Protein Quantification Assay', description: 'Measures the concentration of protein in a sample.', procedure: '1. Prepare protein standards\n2. Add samples and standards to plate\n3. Add Bradford reagent\n4. Incubate for 5 minutes\n5. Measure absorbance at 595 nm' },
]

export function Assays() {
  const [assays, setAssays] = useState(initialAssays)
  const [searchTerm, setSearchTerm] = useState('')
  const [newAssay, setNewAssay] = useState({ name: '', description: '', procedure: '' })
  const [selectedAssay, setSelectedAssay] = useState(null)
  const [workflowStep, setWorkflowStep] = useState('select')

  const filteredAssays = assays.filter(assay => 
    assay.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assay.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addAssay = () => {
    if (newAssay.name && newAssay.description && newAssay.procedure) {
      setAssays([...assays, { id: Date.now(), ...newAssay }])
      setNewAssay({ name: '', description: '', procedure: '' })
    }
  }

  const startAssay = (assay) => {
    setSelectedAssay(assay)
    setWorkflowStep('procedure')
  }

  const renderWorkflow = () => {
    switch (workflowStep) {
      case 'select':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssays.map(assay => (
                <TableRow key={assay.id}>
                  <TableCell>{assay.name}</TableCell>
                  <TableCell>{assay.description}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => startAssay(assay)}>
                      Start Assay
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      case 'procedure':
        return (
          <Card>
            <CardHeader>
              <CardTitle>{selectedAssay.name}</CardTitle>
              <CardDescription>{selectedAssay.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">Procedure:</h3>
              <pre className="whitespace-pre-wrap">{selectedAssay.procedure}</pre>
              <Button className="mt-4" onClick={() => setWorkflowStep('wellplate')}>
                Proceed to Well Plate Mapping
              </Button>
            </CardContent>
          </Card>
        )
      case 'wellplate':
        return <WellPlateMapper />
      default:
        return null
    }
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <Input
          type="search"
          placeholder="Search assays..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Assay</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Assay</DialogTitle>
              <DialogDescription>Enter the details for the new assay.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input 
                  id="name" 
                  value={newAssay.name} 
                  onChange={(e) => setNewAssay({...newAssay, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea 
                  id="description" 
                  value={newAssay.description} 
                  onChange={(e) => setNewAssay({...newAssay, description: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="procedure" className="text-right">Procedure</Label>
                <Textarea 
                  id="procedure" 
                  value={newAssay.procedure} 
                  onChange={(e) => setNewAssay({...newAssay, procedure: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={addAssay}>Add Assay</Button>
          </DialogContent>
        </Dialog>
      </div>
      {renderWorkflow()}
    </div>
  )
}

function WellPlateMapper() {
  const [plateSize, setPlateSize] = useState('96')
  const [selectedWell, setSelectedWell] = useState(null)
  const [wellData, setWellData] = useState({})
  const [compounds, setCompounds] = useState([
    { id: 1, name: 'Compound A' },
    { id: 2, name: 'Compound B' },
    { id: 3, name: 'Compound C' },
  ])

  const renderWells = () => {
    const wells = []
    const rows = plateSize === '96' ? 8 : 4
    const cols = plateSize === '96' ? 12 : 6

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const wellId = `${String.fromCharCode(65 + i)}${j + 1}`
        wells.push(
          <div
            key={wellId}
            className={`w-8 h-8 border border-gray-300 flex items-center justify-center cursor-pointer ${
              selectedWell === wellId ? 'bg-blue-200' : ''
            }`}
            onClick={() => setSelectedWell(wellId)}
          >
            {wellId}
          </div>
        )
      }
    }

    return wells
  }

  const handleCompoundChange = (value) => {
    if (selectedWell) {
      setWellData({ ...wellData, [selectedWell]: { ...wellData[selectedWell], compound: value } })
    }
  }

  const handleConcentrationChange = (e) => {
    if (selectedWell) {
      setWellData({ ...wellData, [selectedWell]: { ...wellData[selectedWell], concentration: e.target.value } })
    }
  }

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <Select value={plateSize} onValueChange={setPlateSize}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select plate size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24">24-well plate</SelectItem>
            <SelectItem value="96">96-well plate</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-4">
        <div className={`grid gap-1 ${plateSize === '96' ? 'grid-cols-12' : 'grid-cols-6'}`}>
          {renderWells()}
        </div>
        <div className="w-64">
          <h3 className="text-lg font-semibold mb-2">Well Data</h3>
          {selectedWell && (
            <div>
              <p>Selected Well: {selectedWell}</p>
              <Select 
                value={wellData[selectedWell]?.compound || ''} 
                onValueChange={handleCompoundChange}
              >
                <SelectTrigger className="w-full mb-2">
                  <SelectValue placeholder="Select compound" />
                </SelectTrigger>
                <SelectContent>
                  {compounds.map(compound => (
                    <SelectItem key={compound.id} value={compound.name}>{compound.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Concentration (µM)"
                value={wellData[selectedWell]?.concentration || ''}
                onChange={handleConcentrationChange}
                className="mb-2"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}