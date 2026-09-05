'use server'

import { createClient } from '../supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

export async function createProject(formData) {
  const supabase = await createClient()

  const title = formData.get('title')
  const techStack = JSON.parse(formData.get('tech_stack') || '[]')

  const { error } = await supabase.from('projects').insert({
    title,
    slug: slugify(title),
    description: formData.get('description'),
    project_type: formData.get('project_type'),
    tech_stack: techStack,
    cover_image_url: formData.get('cover_image_url') || null,
    live_url: formData.get('live_url') || null,
    repo_url: formData.get('repo_url') || null,
    featured: formData.get('featured') === 'on',
    bento_size: formData.get('bento_size'),
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin')
  revalidatePath('/projects')
  redirect('/admin')
}

export async function updateProject(id, formData) {
  const supabase = await createClient()

  const title = formData.get('title')
  const techStack = JSON.parse(formData.get('tech_stack') || '[]')

  const { error } = await supabase
    .from('projects')
    .update({
      title,
      slug: slugify(title),
      description: formData.get('description'),
      project_type: formData.get('project_type'),
      tech_stack: techStack,
      cover_image_url: formData.get('cover_image_url') || null,
      live_url: formData.get('live_url') || null,
      repo_url: formData.get('repo_url') || null,
      featured: formData.get('featured') === 'on',
      bento_size: formData.get('bento_size'),
    })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin')
  revalidatePath('/projects')
  redirect('/admin')
}

export async function deleteProject(id) {
  const supabase = await createClient()

  const { error } = await supabase.from('projects').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin')
  revalidatePath('/projects')
  return { success: true }
}
