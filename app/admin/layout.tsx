import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Painel de Administração",
  description: "Painel de administração para gerenciar contatos",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-gray-50">{children}</div>
}

