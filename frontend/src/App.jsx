import { useState } from 'react'
import Navigation from './Components/Navigation'
import Player from './Components/Player'
import { useApp } from './AppContext'
import Content from './Components/Content';

export default function App() {
  const {currentlyPlaying} = useApp();

  return (
    <div className="w-full min-h-screen max-h-screen bg-black flex flex-col select-none">
      <div className="fixed inset-0 bg-[url('/logo_gray.svg')] bg-center bg-cover rotate-45 scale-240 opacity-10 z-0 pointer-events-none" />
      <Navigation />
      <Content />
      {currentlyPlaying && <Player />}
    </div>
  )
}