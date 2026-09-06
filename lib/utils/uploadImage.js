import { createClient } from '../supabase/client'

export async function uploadCoverImage(file, slug) {
  const supabase = createClient()
  const fileExt = file.name.split('.').pop()
  const path = `covers/${slug}-${Date.now()}.${fileExt}`

  // Fixed to use a Capital I to match your public Supabase Storage bucket perfectly!
  const { error } = await supabase.storage
    .from('project-Images')
    .upload(path, file, { cacheControl: '3600', upsert: false })

  if (error) {
    return { error: error.message }
  }

  const { data } = supabase.storage.from('project-Images').getPublicUrl(path)
  return { publicUrl: data.publicUrl }
}
