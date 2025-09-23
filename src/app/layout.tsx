import NextTopLoader from "nextjs-toploader";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" className="bg-white">
          <body className="bg-white">
            <NextTopLoader />
            <SpeedInsights />
            {children}
          </body>
    </html>
  );
}