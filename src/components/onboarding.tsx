'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useTheme } from 'next-themes'
import { theme } from './theme'

export function Onboarding({ onComplete }) {
  const { theme: currentTheme } = useTheme()
  const isDarkMode = currentTheme === 'dark'

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${isDarkMode ? 'bg-background-dark text-text-dark' : 'bg-background-light text-text-light'}`}>
      <div className="w-full max-w-md p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">RUERL</h1>
          <p className="mt-2 text-xl">Your next Lab Partner</p>
        </div>
        <div className="flex justify-center">
          <img src="labmate.svg" alt="Lab illustration" className="w-64 h-64" />
        </div>
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => {onComplete()}}
        >
          Get Started
        </Button>
      </div>
    </div>
  )
}