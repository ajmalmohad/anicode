import { NavBar } from "@/components/layout/navbar"
import { getCurrentUser } from "@/lib/session"
import { Suspense } from "react"

interface IndexLayoutProps {
  children: React.ReactNode
}

export default async function IndexLayout({
  children,
}: IndexLayoutProps) {
  const user = await getCurrentUser()

  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback="...">
        <NavBar user={user} scroll={true} />
      </Suspense>
      <main className="flex-1">{children}</main>
    </div>
  )
}
