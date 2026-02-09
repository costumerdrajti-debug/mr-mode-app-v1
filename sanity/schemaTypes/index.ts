import { type SchemaTypeDefinition } from 'sanity'
import product from '../schemas/product'
import collection from '../schemas/collection'
import heroBanner from '../schemas/heroBanner'
import siteSettings from '../schemas/siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, collection, heroBanner, siteSettings],
}
