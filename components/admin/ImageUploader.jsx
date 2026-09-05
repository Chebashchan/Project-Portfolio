'use client'

import { useState } from 'react'
import Image from 'next/image'
import { uploadCoverImage } from '../../lib/utils/uploadImage'

export default function ImageUploader({ slug, initialUrl = '', onUploaded }) {
  const [preview, setPreview] = useState(initialUrl)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  async function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!slug) {
      setError('Enter a project title first so we can name the file.')
      return
    }

    setUploading(true)
    setError(null)

    const result = await uploadCoverImage(file, slug)

    if (result.error) {
      setError(result.error)
      setUploading(false)
      return
    }

    setPreview(result.publicUrl)
    onUploaded(result.publicUrl)
    setUploading(false)
  }

  return (
    <div>
      <label className="block text-sm text-neutral-400 mb-2">Cover Image</label>

      {preview && (
        <div className="relative w-full h-40 rounded-bento overflow-hidden mb-3 border border-base-border">
          <Image src={preview} alt="Cover preview" fill className="object-cover" />
        </div>
      )}

      <input
        type="file"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileChange}
        disabled={uploading}
        className="text-sm text-neutral-400"
      />

      {uploading && <p className="text-xs text-neutral-500 mt-1">Uploading...</p>}
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  )
}
