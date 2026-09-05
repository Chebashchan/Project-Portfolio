import { createClient } from '../supabase/client'

export async function uploadCoverImage(file, slug) {
  const supabase = createClient()
  const fileExt = file.name.split('.').pop()
  const path = `covers/${slug}-${Date.now()}.${fileExt}`

  const { error } = await supabase.storage
    .from('project-images')
    .upload(path, file, { cacheControl: '3600', upsert: false })

  if (error) {
    return { error: error.message }
  }

  const { data } = supabase.storage.from('project-images').getPublicUrl(path)
  return { publicUrl: data.publicUrl }
}
