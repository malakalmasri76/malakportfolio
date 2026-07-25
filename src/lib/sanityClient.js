import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'mdvzdco5',
  dataset: 'production', 
  apiVersion: '2024-01-01',
  useCdn: true 
})

const builder = imageUrlBuilder(sanityClient)

// Usage: urlFor(project.image).width(600).height(400).url()
export function urlFor(source) {
  return builder.image(source)
}