'use client'

import { useEffect, useRef } from 'react'

interface Seed {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
}

export function SeedsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    updateSize()
    window.addEventListener('resize', updateSize)

    // Create initial seeds
    const seeds: Seed[] = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 4 + 2,
      opacity: Math.random(),
      speed: Math.random() * 0.001 + 0.001,
    }))

    // Animation loop
    let animationFrame: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      seeds.forEach(seed => {
        seed.opacity += seed.speed
        if (seed.opacity >= 1 || seed.opacity <= 0) {
          seed.speed = -seed.speed
        }

        ctx.beginPath()
        ctx.arc(seed.x, seed.y, seed.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34, 197, 94, ${seed.opacity * 0.2})`
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateSize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

