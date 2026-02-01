export const metadata = {
    title: 'Sanity Studio | MR. MODE',
    description: 'Content management for MR. MODE',
}

export default function StudioLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body style={{ margin: 0 }}>{children}</body>
        </html>
    )
}
