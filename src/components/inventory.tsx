'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { AlertCircle } from 'lucide-react'

const initialStock = [
  { id: 1, name: 'Reagent A', quantity: 100, unit: 'mL', reorderPoint: 50 },
  { id: 2, name: 'Reagent B', quantity: 50, unit: 'g', reorderPoint: 25 },
  { id: 3, name: 'Reagent C', quantity: 200, unit: 'mL', reorderPoint: 100 },
]

export function Inventory() {
  const [stock, setStock] = useState(initialStock)
  const [newItem, setNewItem] = useState({ name: '', quantity: '', unit: '', reorderPoint: '' })

  const addItem = () => {
    if (newItem.name && newItem.quantity && newItem.unit && newItem.reorderPoint) {
      setStock([...stock, { id: Date.now(), ...newItem, quantity: Number(newItem.quantity), reorderPoint: Number(newItem.reorderPoint) }])
      setNewItem({ name: '', quantity: '', unit: '', reorderPoint: '' })
    }
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <Input
          type="search"
          placeholder="Search inventory..."
          className="w-1/3"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Item</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
              <DialogDescription>Enter the details for the new item.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input 
                  id="name" 
                  value={newItem.name} 
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">Quantity</Label>
                <Input 
                  id="quantity" 
                  type="number"
                  value={newItem.quantity} 
                  onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="unit" className="text-right">Unit</Label>
                <Input 
                  id="unit" 
                  value={newItem.unit} 
                  onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reorderPoint" className="text-right">Reorder Point</Label>
                <Input 
                  id="reorderPoint" 
                  type="number"
                  value={newItem.reorderPoint} 
                  onChange={(e) => setNewItem({...newItem, reorderPoint: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={addItem}>Add Item</Button>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Reorder Point</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stock.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell>{item.reorderPoint}</TableCell>
              <TableCell>
                {item.quantity <= item.reorderPoint && (
                  <Button variant="outline" size="sm" className="mr-2">
                    <AlertCircle className="w-4 h-4 mr-1 text-red-500" />
                    Reorder
                  </Button>
                )}
                <Button variant="outline" size="sm">View SDS</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}