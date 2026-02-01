import { createClient } from 'next-sanity'

export const client = createClient({
    projectId: "hkm9mj0b",
    dataset: "production",
    apiVersion: "2024-01-29",
    useCdn: true,
})
