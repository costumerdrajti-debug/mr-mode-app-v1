import { createClient } from 'next-sanity'

export const client = createClient({
    projectId: "dvwn5yem",
    dataset: "production",
    apiVersion: "2024-01-29",
    useCdn: true,
})
