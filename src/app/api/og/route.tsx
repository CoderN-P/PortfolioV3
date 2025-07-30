// app/api/og/route.tsx
import {ImageResponse} from '@vercel/og';

export const runtime = 'edge';

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);

    const title = searchParams.get('title') || 'My Project';
    const desc = searchParams.get('desc') || 'Project Description';
    const tags = searchParams.get('tags')?.split(',') || [];
    const version = searchParams.get('v') || '1';

    // Support multiple images: image, image2, image3...
    const images = [];
    for (let i = 1; i <= 3; i++) {
        const img = searchParams.get(i === 1 ? 'image' : `image${i}`);
        if (img) images.push(img);
    }

    return new ImageResponse(
        (
            <div
                style={{
                    width: '1200px',
                    height: '630px',
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 40,
                    fontFamily: 'Arial, sans-serif',
                    color: '#111',
                    border: '4px solid #333',
                    boxSizing: 'border-box',
                    position: 'relative',
                }}
            >
                <h1 style={{fontSize: 64, fontWeight: 'bold', marginBottom: 20}}>
                    {title}
                </h1>
                <p style={{fontSize: 32, marginBottom: 20, maxWidth: '90%'}}>{desc}</p>
                <div style={{display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20}}>
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            style={{
                                backgroundColor: '#eee',
                                borderRadius: 8,
                                padding: '6px 16px',
                                fontSize: 24,
                                fontWeight: '600',
                                color: '#444',
                            }}
                        >
    {tag}
    </span>
                    ))}
                </div>
                <div
                    style={{
                        display: 'flex',
                        gap: 20,
                        position: 'absolute',
                        bottom: 40,
                        left: 40,
                    }}
                >
                    {images.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt={`Image ${i + 1}`}
                            width={120}
                            height={120}
                            style={{borderRadius: 16, objectFit: 'cover', border: '2px solid #ccc'}}
                        />
                    ))}
                </div>
                <div style={{position: 'absolute', bottom: 40, right: 40, fontSize: 18, color: '#888'}}>
                    v{version}
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}