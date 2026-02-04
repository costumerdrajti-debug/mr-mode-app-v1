import { createClient } from 'next-sanity'

export const client = createClient({
    projectId: "ypd52iva",
    dataset: "production",
    apiVersion: "2024-01-29",
    useCdn: true,
})
