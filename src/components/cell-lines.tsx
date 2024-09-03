'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const initialCellLines = [
  { id: 1, name: 'HEK293', type: 'Human Embryonic Kidney', passage: 5, lastPassaged: '2023-06-01' },
  { id: 2, name: 'HeLa', type: 'Human Cervical Cancer', passage: 8, lastPassaged: '2023-05-28' },
  { id: 3, name: 'CHO', type: 'Chinese Hamster Ovary', passage: 3, lastPassaged: '2023-06-05' },
]

export function CellLines() {
  const [cellLines, setCellLines] = useState(initialCellLines)
  const [newCellLine, setNewCellLine] = useState({ name: '', type: '', passage: '', lastPassaged: '' })

  const addCellLine = () => {
    if (newCellLine.name && newCellLine.type && newCellLine.passage && newCellLine.lastPassaged) {
      setCellLines([...cellLines, { id: Date.now(), ...newCellLine, passage: Number(newCellLine.passage) }])
      setNewCellLine({ name: '', type: '', passage: '', lastPassaged: '' })
    }
  }

  const requestNewCulture = (cellLine) => {
    // This function would typically send a request to the lab manager or relevant personnel
    console.log(`Requesting new culture for ${cellLine.name}`)
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <Input
          type="search"
          placeholder="Search cell lines..."
          className="w-1/3"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Cell Line</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Cell Line</DialogTitle>
              <DialogDescription>Enter the details for the new cell line.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input 
                  id="name" 
                  value={newCellLine.name} 
                  onChange={(e) => setNewCellLine({...newCellLine, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Type</Label>
                <Input 
                  id="type" 
                  value={newCellLine.type} 
                  onChange={(e) => setNewCellLine({...newCellLine, type: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="passage" className="text-right">Passage</Label>
                <Input 
                  id="passage" 
                  type="number"
                  value={newCellLine.passage} 
                  onChange={(e) => setNewCellLine({...newCellLine, passage: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lastPassaged" className="text-right">Last Passaged</Label>
                <Input 
                  id="lastPassaged" 
                  type="date"
                  value={newCellLine.lastPassaged} 
                  onChange={(e) => setNewCellLine({...newCellLine, lastPassaged: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={addCellLine}>Add Cell Line</Button>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Passage</TableHead>
            <TableHead>Last Passaged</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cellLines.map(cellLine => (
            <TableRow key={cellLine.id}>
              <TableCell>{cellLine.name}</TableCell>
              <TableCell>{cellLine.type}</TableCell>
              <TableCell>{cellLine.passage}</TableCell>
              <TableCell>{cellLine.lastPassaged}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => requestNewCulture(cellLine)}>
                  Request New Culture
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}