import DiyaSVG from './DiyaSVG'

interface DiyaClusterProps {
  count?: number
}

const SIZES  = [38, 46, 54, 58, 54, 46, 38]
const DELAYS = [0, 0.4, 0.8, 0.2, 1.1, 0.6, 1.4]

export default function DiyaCluster({ count = 7 }: DiyaClusterProps) {
  const n      = Math.min(count, SIZES.length)
  const sizes  = SIZES.slice(0, n)
  const delays = DELAYS.slice(0, n)

  return (
    <div className="flex items-end justify-center gap-1.5" aria-hidden>
      {sizes.map((size, i) => (
        <DiyaSVG key={i} size={size} flickerDelay={delays[i]} />
      ))}
    </div>
  )
}
