"use client"

import { useEffect } from "react"

const MAIN_LOADSTRING = 'loadstring(game:HttpGet("https://raw.githubusercontent.com/Opex-Hub/Opex-Hub/refs/heads/main/Main"))()'

export default function MainPage() {
  useEffect(() => {
    const file = new Blob([MAIN_LOADSTRING], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(file)
    const link = document.createElement("a")
    link.href = url
    link.download = "opex-main-loader.txt"
    link.click()
    URL.revokeObjectURL(url)
  }, [])

  return null
}
