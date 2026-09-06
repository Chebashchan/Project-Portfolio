'use server'

import { createClient } from '../supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProject(formData) {
  const supabase = await createClient()

  const projectGallery = formData.get('project_gallery') 
    ? JSON.parse(formData.get('project_gallery')) 
    : []

  const rawFormData = {
    title: formData.get('title'),
    description: formData.get('description'),
    project_type: formData.get('project_type'),
    tech_stack: JSON.parse(formData.get('tech_stack')),
    bento_size: formData.get('bento_size'),
    project_gallery: projectGallery,
    live_url: formData.get('live_url') || null,
    repo_url: formData.get('repo_url') || null,
    featured: formData.get('featured') === 'on',
    slug: formData.get('title').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  }

  const { error } = await supabase.from('projects').insert([rawFormData])

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/projects')
  revalidatePath('/admin')
  redirect('/admin')
}

export async function updateProject(id, formData) {
  const supabase = await createClient()

  const projectGallery = formData.get('project_gallery') 
    ? JSON.parse(formData.get('project_gallery')) 
    : []

  const rawFormData = {
    title: formData.get('title'),
    description: formData.get('description'),
    project_type: formData.get('project_type'),
    tech_stack: JSON.parse(formData.get('tech_stack')),
    bento_size: formData.get('bento_size'),
    project_gallery: projectGallery,
    live_url: formData.get('live_url') || null,
    repo_url: formData.get('repo_url') || null,
    featured: formData.get('featured') === 'on',
    slug: formData.get('title').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  }

  const { error } = await supabase
    .from('projects')
    .update(rawFormData)
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/projects')
  revalidatePath('/admin')
  redirect('/admin')
}

export async function deleteProject(id) {
  const supabase = await createClient()
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/')
  revalidatePath('/projects')
  revalidatePath('/admin')
}
