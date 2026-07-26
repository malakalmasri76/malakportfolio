import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'mdvzdco5',
  dataset: 'production', // ⚠️ change this if your dataset has a different name
  apiVersion: '2024-01-01',
  useCdn: true // fine for public, read-only data like a portfolio's projects
})

const builder = createImageUrlBuilder(sanityClient)

// Usage: urlFor(project.image).width(600).height(400).url()
export function urlFor(source) {
  return builder.image(source)
}