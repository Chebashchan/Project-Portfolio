import { createClient } from '../supabase/server'

export async function getAllProjects() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching projects:', error.message)
    return []
  }
  return data
}

export async function getFeaturedProjects() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('sort_order', { ascending: true })
    .limit(4)

  if (error) {
    console.error('Error fetching featured projects:', error.message)
    return []
  }
  return data
}

export async function getProjectBySlug(slug) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching project:', error.message)
    return null
  }
  return data
}

export async function getAllTechnologies() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('technologies')
    .select('name, category')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching dynamic tags:', error.message)
    return []
  }
  return data
}
