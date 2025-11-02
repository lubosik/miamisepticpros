'use client'

interface Source {
  title: string
  url: string
}

interface SourcesProps {
  sources: Source[]
}

export default function Sources({ sources }: SourcesProps) {
  // Always render same structure to prevent hydration mismatch
  const hasSources = sources && sources.length > 0

  return (
    <div className="article-sources" aria-labelledby="sources-heading" aria-hidden={!hasSources ? 'true' : undefined}>
      <h2 id="sources-heading">Sources & References</h2>
      {hasSources ? (
        <ol className="article-sources-list">
          {sources.map((source, index) => (
            <li key={index} id={`source-${index + 1}`}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {source.title}
              </a>
            </li>
          ))}
        </ol>
      ) : (
        <ol className="article-sources-list"></ol>
      )}
    </div>
  )
}

