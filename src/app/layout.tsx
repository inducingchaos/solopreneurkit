import "~/styles/globals.css"

import { type Metadata } from "next"
import { IBM_Plex_Mono, Inter } from "next/font/google"

import { TRPCReactProvider } from "~/lib/infra/rpc/react"

//  Import fonts.

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter"
})

const ibmPlexMono = IBM_Plex_Mono({
    weight: ["100", "400", "700"],
    subsets: ["latin"],
    variable: "--font-ibm-plex-mono"
})

//  Configure the global metadata.

export const metadata: Metadata = {
    title: "SolopreneurKit",
    description: "The complete personal brand toolkit. Turn your idea into sales in minutes, not months.",
    icons: [{ rel: "icon", url: "/favicon.ico" }]
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>): JSX.Element {
    return (
        <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`}>
            <body>
                <TRPCReactProvider>{children}</TRPCReactProvider>
            </body>
        </html>
    )
}
