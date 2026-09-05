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

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    processFile(file)
  }

  function handleDragOver(e) {
    e.preventDefault()
    setIsDragActive(true)
  }

  function handleDragLeave() {
    setIsDragActive(false)
  }

  function handleDrop(e) {
    e.preventDefault()
    setIsDragActive(false)
    const file = e.dataTransfer.files?.[0]
    processFile(file)
  }

  function handleBoxClick() {
    fileInputRef.current?.click()
  }

  return (
    <div>
      <label className="block text-sm text-neutral-400 mb-2">Cover Image</label>

      {/* Hidden native input picker */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileChange}
        disabled={uploading}
        className="hidden"
      />

      {/* Clickable Drag & Drop Zone */}
      <div
        onClick={handleBoxClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full min-h-[160px] flex flex-col items-center justify-center border-2 border-dashed rounded-bento cursor-pointer p-4 transition-all duration-200 bg-neutral-900/50 ${
          isDragActive
            ? 'border-accent bg-accent/5 text-white scale-[0.99]'
            : 'border-base-border text-neutral-400 hover:border-neutral-500 hover:text-white'
        }`}
      >
        {preview ? (
          <div className="relative w-full h-32 rounded-lg overflow-hidden border border-base-border">
            <Image src={preview} alt="Cover preview" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
              <p className="text-xs text-white font-medium">Click box to change image</p>
            </div>
          </div>
        ) : (
          <div className="text-center pointer-events-none">
            <svg
              className="mx-auto h-8 w-8 text-neutral-500 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm font-medium">Click to select file or drag it here</p>
            <p className="text-xs text-neutral-500 mt-1">Supports PNG, JPEG, WEBP</p>
          </div>
        )}
      </div>

      {uploading && <p className="text-xs text-neutral-500 mt-2 animate-pulse">Uploading asset to cloud storage...</p>}
      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
    </div>
  )
}
