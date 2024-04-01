const BLOCK_SIZE = 2
const SCALE_BY = 2

const currentNoise: number[][] = []

export function paintDenseNoise(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const w = window.innerWidth
  canvas.width = w

  const h = window.innerHeight
  canvas.height = h

  const imageData = ctx.createImageData(w, h)
  const { data } = imageData

  for (let i = 0; i < data.length; i += 4) {
    const value = Math.floor(Math.random() * 256)

    data[i] = value
    data[i + 1] = value
    data[i + 2] = value
    data[i + 3] = 255
  }

  ctx.putImageData(imageData, 0, 0)
}

export function paintNoiseGrid(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight

  const gridWidth = Math.floor(screenWidth / SCALE_BY / BLOCK_SIZE)
  const gridHeight = Math.floor(screenHeight / SCALE_BY / BLOCK_SIZE)

  canvas.width = gridWidth * BLOCK_SIZE
  canvas.height = gridHeight * BLOCK_SIZE

  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      const v = Math.floor(Math.random() * 255)

      if (!currentNoise[y]) currentNoise[y] = []
      currentNoise[y][x] = v

      ctx.fillStyle = `rgb(${v}, ${v}, ${v})`
      ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
    }
  }
}
