import { getContacts } from "@/app/actions"
import { AdminPanel } from "@/components/admin-panel"
import Image from "next/image"
import Link from "next/link"

export default async function AdminPage() {
  const contacts = await getContacts()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
              <Image
                src="/pid-logo.png"
                alt="PID - Programa de Inclusão Digital"
                width={140}
                height={55}
                className="h-10 w-auto"
                priority
              />
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold text-pid-blue">Painel de Administração</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
            <AdminPanel initialContacts={contacts} />
          </div>
        </div>
      </main>
    </div>
  )
}

