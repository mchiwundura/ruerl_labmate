'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import ReactMarkdown from 'react-markdown'

const initialNotes = [
  { id: 1, title: 'Literature Review: Compound A', content: '# Compound A Literature Review\n\n## Recent Findings\n- Study by Smith et al. (2023) shows promising results in cancer treatment\n- Johnson et al. (2022) reported potential side effects in long-term use\n\n## Our Assay Results\n- Cell viability assay showed 80% reduction in cancer cell proliferation\n- Enzyme activity assay indicated strong inhibition of target enzyme\n\n## Next Steps\n- Conduct further toxicity studies\n- Investigate synergistic effects with standard treatments' },
  { id: 2, title: 'Experiment Notes: Enzyme Inhibition', content: '# Enzyme Inhibition Experiment\n\n## Procedure\n1. Prepared enzyme solution (10 µg/mL)\n2. Added varying concentrations of Compound B (0-100 µM)\n3. Incubated for 30 minutes at 37°C\n4. Measured enzyme activity\n\n## Results\n- IC50 value: 5.3 µM\n- Hill coefficient: 1.2\n\n## Conclusions\n- Compound B is a potent inhibitor of the target enzyme\n- The Hill coefficient suggests non-cooperative binding' },
]

export function Notebook() {
  const [notes, setNotes] = useState(initialNotes)
  const [newNote, setNewNote] = useState({ title: '', content: '' })
  const [selectedNote, setSelectedNote] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const addNote = () => {
    if (newNote.title && newNote.content) {
      setNotes([...notes, { id: Date.now(), ...newNote }])
      setNewNote({ title: '', content: '' })
    }
  }

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="mb-4">
          <Input
            type="search"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          {filteredNotes.map(note => (
            <Card key={note.id} className="cursor-pointer" onClick={() => setSelectedNote(note)}>
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4">Add New Note</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Note</DialogTitle>
              <DialogDescription>Enter the details for the new note.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input 
                  id="title" 
                  value={newNote.title} 
                  onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">Content</Label>
                <Textarea 
                  id="content" 
                  value={newNote.content} 
                  onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                  className="col-span-3"
                  rows={10}
                />
              </div>
            </div>
            <Button onClick={addNote}>Add Note</Button>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        {selectedNote ? (
          <Card>
            <CardHeader>
              <CardTitle>{selectedNote.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ReactMarkdown>{selectedNote.content}</ReactMarkdown>
            </CardContent>
          </Card>
        ) : (
          <p>Select a note to view its content</p>
        )}
      </div>
    </div>
  )
}