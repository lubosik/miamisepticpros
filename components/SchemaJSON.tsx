interface SchemaJSONProps {
  schema: object
}

export default function SchemaJSON({ schema }: SchemaJSONProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

