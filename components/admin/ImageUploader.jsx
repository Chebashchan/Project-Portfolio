'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { uploadCoverImage } from '../../lib/utils/uploadImage'

export default function ImageUploader({ slug, initialUrls = [], onUploaded }) {
  const [gallery, setGallery] = useState(Array.isArray(initialUrls) ? initialUrls : [])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const fileInputRef = useRef(null)

  async function processFiles(files) {
    if (!files || files.length === 0) return

    if (!slug) {
      setError('Enter a project title first so we can name your file queue securely.')
      return
    }

    setUploading(true)
    setError(null)

    const uploadedUrls = [...gallery]

    // Process every dropped file sequentially 
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const result = await uploadCoverImage(file, slug)

      if (result.error) {
        setError(`Failed uploading ${file.name}: ${result.error}`)
      } else if (result.publicUrl) {
        uploadedUrls.push(result.publicUrl)
      }
    }

    setGallery(uploadedUrls)
    onUploaded(uploadedUrls) // Propagate full array string back up to form state
    setUploading(false)
  }

  function handleFileChange(e) {
    const files = e.target.files
    if (files) processFiles(files)
  }

  function handleRemoveImage(index, e) {
    e.stopPropagation() // Block native file layer click trigger
    const updatedGallery = gallery.filter((_, i) => i !== index)
    setGallery(updatedGallery)
    onUploaded(updatedGallery)
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm text-neutral-400 font-medium">Showcase Gallery Images</label>

      {/* Hidden native input picker (multiple enabled!) */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileChange}
        disabled={uploading}
        multiple
        className="hidden"
      />

      {/* Dynamic Grid Strip: Displays uploaded image array rows */}
      {gallery.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-neutral-950 border border-base-border rounded-bento">
          {gallery.map((url, index) => (
            <div key={url + index} className="relative aspect-video rounded-lg overflow-hidden border border-base-border group">
              <Image src={url} alt={`Showcase row ${index + 1}`} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <button
                  type="button"
                  onClick={(e) => handleRemoveImage(index, e)}
                  className="text-[10px] px-2 py-1 bg-red-500 hover:bg-red-600 text-white font-medium rounded transition-colors cursor-pointer"
                >
                  Remove Asset
                </button>
              </div>
              <div className="absolute top-1.5 left-1.5 bg-black/60 px-1.5 py-0.5 rounded text-[9px] font-mono text-neutral-400 border border-white/[0.05]">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Clickable Drag & Drop Zone Box Layout */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragActive(true); }}
        onDragLeave={() => setIsDragActive(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragActive(false); if (e.dataTransfer.files) processFiles(e.dataTransfer.files); }}
        className={`w-full min-h-[120px] flex flex-col items-center justify-center border-2 border-dashed rounded-bento cursor-pointer p-4 transition-all duration-200 bg-neutral-900/40 ${
          isDragActive ? 'border-accent bg-accent/5' : 'border-base-border hover:border-neutral-500'
        }`}
      >
        <div className="text-center pointer-events-none text-neutral-400">
          <svg className="mx-auto h-6 w-6 text-neutral-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
          </svg>
          <p className="text-xs font-medium">Click to select or drag multiple images here</p>
          <p className="text-[10px] text-neutral-500 mt-1">Supports bulk uploads of PNG, JPEG, WEBP</p>
        </div>
      </div>

      {uploading && <p className="text-xs text-neutral-500 animate-pulse">Streaming files into cloud storage bucket matrix...</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
