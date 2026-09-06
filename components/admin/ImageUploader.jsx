'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { uploadCoverImage } from '../../lib/utils/uploadImage'

export default function ImageUploader({ slug, initialUrl = '', onUploaded }) {
  const [preview, setPreview] = useState(initialUrl)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const fileInputRef = useRef(null)

  async function processFile(file) {
    if (!file) return

    if (!slug) {
      setError('Enter a project title first so we can name the file securely.')
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

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    processFile(file)
  }

  function handleRemoveImage(e) {
    e.stopPropagation() // Prevent triggering the file click window
    setPreview('')
    onUploaded('') // Clear URL out from form collection parameters
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm text-neutral-400">Cover Image</label>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileChange}
        disabled={uploading}
        className="hidden"
      />

      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragActive(true); }}
        onDragLeave={() => setIsDragActive(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragActive(false); processFile(e.dataTransfer.files?.[0]); }}
        className={`w-full min-h-[140px] flex flex-col items-center justify-center border-2 border-dashed rounded-bento cursor-pointer p-4 transition-all duration-200 bg-neutral-900/40 relative ${
          isDragActive ? 'border-accent bg-accent/5' : 'border-base-border hover:border-neutral-500'
        }`}
      >
        {preview ? (
          <div className="relative w-full h-32 rounded-lg overflow-hidden border border-base-border group">
            <Image src={preview} alt="Cover preview" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity gap-2">
              <p className="text-xs text-neutral-300 font-medium">Click box to update photo</p>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="text-xs px-2.5 py-1 rounded bg-red-500 hover:bg-red-600 text-white font-medium cursor-pointer transition-colors z-30"
              >
                Delete Image File
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center pointer-events-none text-neutral-400">
            <p className="text-xs font-medium">Click to select file or drag it here</p>
            <p className="text-[11px] text-neutral-500 mt-1">PNG, JPEG, or WEBP</p>
          </div>
        )}
      </div>
      {uploading && <p className="text-xs text-neutral-500 animate-pulse">Uploading file asset to cloud bucket...</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
