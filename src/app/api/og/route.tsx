import {ImageResponse} from '@vercel/og';

export const runtime = 'edge';


export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);

    const title = searchParams.get('name') || 'My Project';
    const desc = searchParams.get('desc') || 'Project Description';
    const tags = searchParams.get('tags')?.split(',') || [];
    const version = searchParams.get('v') || '1';
    const colors = searchParams.get('colors')?.split(',') || [];

    // Support multiple images: image, image2, image3...
    const images = [];
    for (let i = 1; i <= 3; i++) {
        const img = searchParams.get(i === 1 ? 'image' : `image${i}`);
        if (img) images.push(img);
    }

    // Generate gradient based on project name
    let gradientStart, gradientEnd, gradientMiddle;
    
    if (colors.length === 3){
        [gradientStart, gradientMiddle, gradientEnd] = colors;
    } else {
        [gradientStart, gradientEnd] = colors;
    }
    
    // Check if there is a middle color for a three-color gradient
    

    return new ImageResponse(
        (
            <div
                style={{
                    width: '1200px',
                    height: '630px',
                    background: '#ffffff',
                    display: 'flex',
                    marginRight: '20px',
                    flexDirection: 'column',
                    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    color: '#111827',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Top gradient strip */}
                { gradientMiddle ? (
                    <div
                        style={{
                            height: '12px',
                            width: '100%',
                            background: `linear-gradient(to right, ${gradientStart}, ${gradientMiddle}, ${gradientEnd})`,
                        }}
                    />
                ) : (
                    <div
                        style={{
                            height: '12px',
                            width: '100%',
                            background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`,
                        }}
                    />
                )}
                
                {/* Content container with padding */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '60px',
                    height: '100%',
                }}>
                    {/* Main content area */}
                    <div
                        style={{
                            width: '60%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* Project label */}
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            marginBottom: '48px',
                            color: gradientStart,
                        }}>
                            <div style={{ 
                                width: '24px', 
                                height: '3px', 
                                backgroundColor: gradientStart,
                                marginRight: '12px',
                            }}/>
                            <span style={{ 
                                fontSize: '18px',
                                fontWeight: '600', 
                                letterSpacing: '1px'
                            }}>
                                PROJECT
                            </span>
                        </div>
                        
                        {/* Project title */}
                        <h1 style={{
                            fontSize: title.length > 25 ? '54px' : '64px',
                            fontWeight: 'bold',
                            margin: '0 0 24px 0',
                            lineHeight: 1.1,
                            color: '#111827',
                        }}>
                            {title}
                        </h1>
                        
                        {/* Project description */}
                        <p style={{
                            fontSize: '26px',
                            marginBottom: '36px',
                            lineHeight: 1.4,
                            color: '#4B5563',
                            maxWidth: '90%',
                        }}>
                            {desc.length > 120 ? `${desc.substring(0, 120)}...` : desc}
                        </p>
                        
                        {/* Technologies tags */}
                        <div style={{
                            display: 'flex',
                            gap: '8px',
                            flexWrap: 'wrap',
                        }}>
                            {tags.slice(0, 6).map((tag) => (
                                <span
                                    key={tag}
                                    style={{
                                        background: '#FFFFFF',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '12px',
                                        padding: '6px 12px',
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        color: '#4B5563',
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                            {tags.length > 6 && (
                                <span
                                    style={{
                                        background: '#FFFFFF',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '12px',
                                        padding: '6px 12px',
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        color: '#6B7280',
                                    }}
                                >
                                    +{tags.length - 6} more
                                </span>
                            )}
                        </div>
                    </div>
                    
                    {/* Image area */}
                    <div style={{
                        width: '40%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <div style={{
                            width: '100%',
                            height: '360px',
                            borderRadius: '12px',
                            display: 'flex',
                            overflow: 'hidden',
                            border: '1px solid #E5E7EB',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
                            background: '#F9FAFB',
                        }}>
                            {images.length > 0 ? (
                                <img
                                    src={images[0]}
                                    alt={`Image for ${title}`}
                                    width={500}
                                    height={360}
                                    style={{ 
                                        objectFit: 'cover',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                />
                            ) : (
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '100%',
                                    background: '#F9FAFB',
                                    color: '#9CA3AF',
                                }}>
                                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="16 18 22 12 16 6"></polyline>
                                        <polyline points="8 6 2 12 8 18"></polyline>
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Footer */}
                <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    display: 'flex',
                    height: '60px',
                    borderTop: '1px solid #F3F4F6',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 60px',
                }}>
                    {/* Branding */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                    }}>
                        <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: gradientStart,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '16px',
                        }}>
                            N
                        </div>
                        <div style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            color: '#4B5563',
                        }}>
                            neelparpia.me
                        </div>
                    </div>
                    
                    {/* Version */}
                    <div style={{
                        fontSize: '14px',
                        color: '#6B7280',
                    }}>
                        {version ? `${version}` : ''}
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}