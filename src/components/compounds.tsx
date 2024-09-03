'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const initialCompounds = [
  { id: 1, name: 'Compound A', formula: 'C10H15N', structure: '/placeholder.svg?height=200&width=200', assays: ['Cell Viability', 'Enzyme Activity'] },
  { id: 2, name: 'Compound B', formula: 'C8H10N4O2', structure: '/placeholder.svg?height=200&width=200', assays: ['Protein Quantification'] },
  { id: 3, name: 'Compound C', formula: 'C21H30O2', structure: '/placeholder.svg?height=200&width=200', assays: ['Cell Viability', 'Enzyme Activity', 'Protein Quantification'] },
]

export function Compounds() {
  const [compounds, setCompounds] = useState(initialCompounds)
  const [searchTerm, setSearchTerm] = useState('')
  const [newCompound, setNewCompound] = useState({ name: '', formula: '', structure: '', assays: '' })
  const [selectedCompound, setSelectedCompound] = useState(null)

  const filteredCompounds = compounds.filter(compound => 
    compound.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    compound.formula.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addCompound = () => {
    if (newCompound.name && newCompound.formula) {
      setCompounds([...compounds, { 
        id: Date.now(), 
        ...newCompound, 
        structure: '/placeholder.svg?height=200&width=200',
        assays: newCompound.assays.split(',').map(a => a.trim()).filter(a => a)
      }])
      setNewCompound({ name: '', formula: '', structure: '', assays: '' })
    }
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <Input
          type="search"
          placeholder="Search compounds..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Compound</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Test Compound</DialogTitle>
              <DialogDescription>Enter the details for the new test compound.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input 
                  id="name" 
                  value={newCompound.name} 
                  onChange={(e) => setNewCompound({...newCompound, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="formula" className="text-right">Formula</Label>
                <Input 
                  id="formula" 
                  value={newCompound.formula} 
                  onChange={(e) => setNewCompound({...newCompound, formula: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assays" className="text-right">Assays</Label>
                <Input 
                  id="assays" 
                  value={newCompound.assays} 
                  onChange={(e) => setNewCompound({...newCompound, assays: e.target.value})}
                  placeholder="Comma-separated assay names"
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={addCompound}>Add Compound</Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Formula</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompounds.map(compound => (
              <TableRow key={compound.id}>
                <TableCell>{compound.name}</TableCell>
                <TableCell>{compound.formula}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => setSelectedCompound(compound)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {selectedCompound && (
          <Card>
            <CardHeader>
              <CardTitle>{selectedCompound.name}</CardTitle>
              <CardDescription>{selectedCompound.formula}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <img src={selectedCompound.structure} alt={`Structure of ${selectedCompound.name}`} className="mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Associated Assays:</h3>
              <ul className="list-disc pl-5">
                {selectedCompound.assays.map((assay, index) => (
                  <li key={index}>{assay}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}