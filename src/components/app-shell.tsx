'use client'

import { useState } from 'react'
import { Beaker, ClipboardList, LayoutDashboard, Grid, Users, BookOpen, FileText, Brain, User, LogOut, Sun, Moon, BarChart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from 'next-themes'
import { theme } from './theme'
import WellPlatesContent, { WellPlates } from './well-plates'
import ResultsContent, { Results } from './results'
import { Dashboard } from './dashboard'
import { Assays } from './assays'
import { Compounds } from './compounds'
import { CellLines } from './cell-lines'
import { Inventory } from './inventory'
import { Notebook } from './notebook'

export function AppShell() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const { theme: currentTheme, setTheme } = useTheme()
  const isDarkMode = currentTheme === 'dark'

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assays', label: 'Assays', icon: Beaker },
    { id: 'compounds', label: 'Test Compounds', icon: Beaker },
    { id: 'wellplates', label: 'Well Plates', icon: Grid },
    { id: 'results', label: 'Results', icon: BarChart },
    { id: 'celllines', label: 'Cell Lines', icon: Users },
    { id: 'inventory', label: 'Inventory', icon: ClipboardList },
    { id: 'notebook', label: 'Research Notebook', icon: BookOpen },
  ]

  const handleLogin = () => {
    setIsAuthenticated(true)
    setUser({ name: 'John Doe', email: 'john@example.com' })
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark')
  }

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-background-dark text-text-dark' : 'bg-background-light text-text-light'}`}>
      {/* Sidebar */}
      <aside className={`w-64 ${isDarkMode ? 'bg-background-dark' : 'bg-background-light'} shadow-md`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold text-primary">RUERL</h1>
        </div>
        <nav className="mt-4">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className={`flex items-center px-4 py-2 ${
                activeTab === item.id ? (isDarkMode ? 'bg-gray-800' : 'bg-gray-200') : ''
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="w-5 h-5 mr-2" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold">
            {navItems.find(item => item.id === activeTab)?.label}
          </h2>
          <div className="flex items-center space-x-4">
            <Button onClick={toggleTheme} variant="outline" size="icon">
              {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Input
              type="search"
              placeholder="Search..."
              className={`${isDarkMode ? 'bg-input-dark' : 'bg-input-light'}`}
            />
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={handleLogin}>Log In</Button>
            )}
          </div>
        </header>

        {/* Content area */}
        <div className={`${isDarkMode ? 'bg-background-dark' : 'bg-background-light'} shadow-md rounded-lg p-6`}>
          {activeTab === 'dashboard' && <DashboardContent />}
          {activeTab === 'assays' && <AssaysContent />}
          {activeTab === 'compounds' && <CompoundsContent />}
          {activeTab === 'wellplates' && <WellPlates />}
          {activeTab === 'results' && <Results />}
          {activeTab === 'celllines' && <CellLinesContent />}
          {activeTab === 'inventory' && <InventoryContent />}
          {activeTab === 'notebook' && <NotebookContent />}
        </div>
      </main>
    </div>
  )
}

// Placeholder components (to be implemented)
function DashboardContent() { return <div><Dashboard/></div> }
function AssaysContent() { return <div><Assays/></div> }
function CompoundsContent() { return <div><Compounds/></div> }
// function WellPlatesContent() { return <div><WellPlates/></div> }
// function ResultsContent() { return <div><Results/></div> }
function CellLinesContent() { return <div><CellLines/></div> }
function InventoryContent() { return <div><Inventory/></div> }
function NotebookContent() { return <div><Notebook/></div> }