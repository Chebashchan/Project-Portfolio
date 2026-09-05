'use client'

const SIZES = [
  { value: '1x1', label: 'Small (1×1)' },
  { value: '2x1', label: 'Wide (2×1)' },
  { value: '1x2', label: 'Tall (1×2)' },
  { value: '2x2', label: 'Large (2×2)' },
]

export default function BentoSizeSelector({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm text-neutral-400 mb-2">Bento Tile Size</label>
      <div className="grid grid-cols-2 gap-2">
        {SIZES.map((size) => (
          <button
            key={size.value}
            type="button"
            onClick={() => onChange(size.value)}
            className={`px-3 py-2 rounded text-sm text-left border cursor-pointer transition-all ${
              value === size.value
                ? 'border-accent bg-accent/10 text-white'
                : 'border-base-border text-neutral-400 hover:text-white hover:border-neutral-500'
            }`}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  )
}
