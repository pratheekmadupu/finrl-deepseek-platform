import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "FINRL-DEEPSEEK | AI Trading Intelligence",
    description: "Next-generation AI risk-aware trading research platform.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className="bg-background text-foreground antialiased">
                {children}
            </body>
        </html>
    );
}
