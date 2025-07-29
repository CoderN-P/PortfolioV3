import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || 'PR';
  const fromColor = searchParams.get('from') || 'blue-500';
  const toColor = searchParams.get('to') || 'purple-500';

  // Map Tailwind color classes to actual hex values
  // This is a simplified mapping, you may want to expand it based on your Tailwind config
  const colorMap: Record<string, string> = {
    'blue-500': '#3b82f6',
    'purple-500': '#8b5cf6',
    'green-500': '#10b981',
    'red-500': '#ef4444',
    'yellow-500': '#f59e0b',
    'indigo-500': '#6366f1',
    'pink-500': '#ec4899',
    'gray-500': '#6b7280',
    'gray-800': '#1f2937',
    'black': '#000000',
  };
  
  // Get hex colors or default to blue/purple
  const fromHex = colorMap[fromColor] || colorMap['blue-500'];
  const toHex = colorMap[toColor] || colorMap['purple-500'];

  // Generate a simple SVG with the project initials and a gradient background
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${fromHex};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${toHex};stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="shadow"/>
          <feOffset dx="3" dy="3" result="offsetShadow"/>
          <feBlend in="SourceGraphic" in2="offsetShadow" mode="normal"/>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <text 
        x="50%" 
        y="50%" 
        dominant-baseline="middle" 
        text-anchor="middle"
        fill="white"
        font-family="system-ui, sans-serif"
        font-size="240"
        font-weight="bold"
        filter="url(#shadow)"
      >
        ${name}
      </text>
      <text 
        x="50%" 
        y="85%" 
        dominant-baseline="middle" 
        text-anchor="middle"
        fill="white"
        font-family="system-ui, sans-serif"
        font-size="48"
        font-weight="medium"
        filter="url(#shadow)"
      >
        Project Preview
      </text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable'
    },
  });
}
