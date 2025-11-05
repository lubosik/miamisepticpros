import { NextRequest, NextResponse } from 'next/server'

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'lDB7u4zFDvEUCFZy51zl2WyNU-q70sbw_b7wXW2L1Zo'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  const width = searchParams.get('w') || '400'
  const height = searchParams.get('h') || '300'

  if (!query) {
    return NextResponse.json({ error: 'Query parameter required' }, { status: 400 })
  }

  try {
    // Use Unsplash API to search for photos
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`,
      {
        headers: {
          'Accept-Version': 'v1',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.results && data.results.length > 0) {
      // Use the regular URL and add size parameters
      const imageUrl = `${data.results[0].urls.regular}&w=${width}&h=${height}&fit=crop`
      return NextResponse.json({ 
        url: imageUrl,
        alt: query
      })
    } else {
      // Fallback to a default septic service image
      return NextResponse.json({ 
        url: `https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=${width}&h=${height}&fit=crop`,
        alt: query
      })
    }
  } catch (error) {
    console.error('Unsplash API error:', error)
    // Fallback to a placeholder service image
    return NextResponse.json({ 
      url: `https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=${width}&h=${height}&fit=crop`,
      alt: query
    })
  }
}

