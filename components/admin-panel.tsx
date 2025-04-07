"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { deleteContact, getContacts } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"
import {
  Trash2,
  RefreshCw,
  Search,
  Phone,
  Calendar,
  User,
  ExternalLink,
  LogOut,
  Download,
  FileText,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import type { Contact } from "@/lib/supabase"
import { jsPDF } from "jspdf"
import "jspdf-autotable"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function AdminPanel({ initialContacts }: { initialContacts: any[] }) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(initialContacts)
  const [isLoading, setIsLoading] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()
  const { signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (searchTerm) {
      const filtered = contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || contact.phone.includes(searchTerm),
      )
      setFilteredContacts(filtered)
    } else {
      setFilteredContacts(contacts)
    }
  }, [searchTerm, contacts])

  const refreshContacts = async () => {
    setIsLoading(true)
    try {
      const freshContacts = await getContacts()
      setContacts(freshContacts)
      setFilteredContacts(freshContacts)
      toast({
        title: "Atualizado",
        description: "Lista de contatos atualizada com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os contatos.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este contato?")) {
      return
    }

    try {
      await deleteContact(id)
      toast({
        title: "Sucesso",
        description: "Contato excluído com sucesso.",
      })
      refreshContacts()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o contato.",
        variant: "destructive",
      })
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      })
      router.push("/login")
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível realizar o logout.",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const generatePDF = async (contactsToExport: Contact[]) => {
    setIsGeneratingPDF(true)
    try {
      // @ts-ignore - jsPDF has autotable plugin
      const doc = new jsPDF()

      // Add header with logo
      doc.setFontSize(20)
      doc.setTextColor(0, 57, 203) // PID Blue
      doc.text("PID - Programa de Inclusão Digital", 105, 15, { align: "center" })

      doc.setFontSize(12)
      doc.setTextColor(100, 100, 100)
      doc.text("Relatório de Contatos", 105, 22, { align: "center" })

      const currentDate = new Date()
      doc.setFontSize(10)
      doc.text(`Gerado em: ${formatDate(currentDate.toISOString())}`, 105, 28, { align: "center" })

      // Add table with contacts
      const tableColumn = ["Nome", "Telefone", "Data de Cadastro", "Status"]
      const tableRows = contactsToExport.map((contact) => [
        contact.name,
        contact.phone,
        formatDate(contact.created_at),
        contact.joined_whatsapp ? "Entrou no grupo" : "Aguardando entrada",
      ])

      // @ts-ignore - jsPDF has autotable plugin
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 35,
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: {
          fillColor: [0, 57, 203], // PID Blue
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        alternateRowStyles: { fillColor: [240, 245, 255] },
        margin: { top: 35 },
      })

      // Add footer
      const pageCount = doc.internal.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.setTextColor(150, 150, 150)
        doc.text(
          `Página ${i} de ${pageCount} - PID - Programa de Inclusão Digital`,
          105,
          doc.internal.pageSize.height - 10,
          { align: "center" },
        )
      }

      // Save the PDF
      doc.save(`contatos-pid-${new Date().toISOString().split("T")[0]}.pdf`)

      toast({
        title: "PDF Gerado",
        description: "O relatório de contatos foi gerado com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao gerar PDF:", error)
      toast({
        title: "Erro",
        description: "Não foi possível gerar o PDF.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-gradient-to-r from-blue-50 to-red-50 p-4 rounded-xl shadow-sm">
        <div className="relative w-full md:w-auto flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Search className="h-5 w-5" />
          </div>
          <Input
            placeholder="Buscar por nome ou telefone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-6 sm:py-2 bg-white border-gray-200 focus:border-pid-blue focus:ring-pid-blue/20 text-base"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            {filteredContacts.length} contatos
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="text-pid-blue border-blue-200 hover:bg-blue-50 hover:text-pid-blue group py-5 sm:py-2 text-sm"
                disabled={isGeneratingPDF || filteredContacts.length === 0}
              >
                <FileText className="mr-2 h-5 w-5" />
                {isGeneratingPDF ? "Gerando..." : "Exportar"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => generatePDF(filteredContacts)} className="cursor-pointer py-2 text-sm">
                <Download className="mr-2 h-4 w-4" />
                <span>Exportar PDF</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={refreshContacts}
            variant="outline"
            disabled={isLoading}
            className="group text-blue-700 border-blue-200 hover:bg-blue-50 py-5 sm:py-2 text-sm"
            size="lg"
          >
            <RefreshCw
              className={`mr-2 h-5 w-5 ${isLoading ? "animate-spin" : "group-hover:animate-spin"}`}
            />
            {isLoading ? "Atualizando..." : "Atualizar"}
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-red-600 border-red-200 hover:bg-red-50 py-5 sm:py-2 text-sm"
            size="lg"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Sair
          </Button>
        </div>
      </div>

      {filteredContacts.length === 0 ? (
        <div className="text-center py-12 bg-gradient-to-r from-blue-50/50 to-red-50/50 rounded-xl shadow-sm">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800">Nenhum contato encontrado</h3>
          <p className="text-sm text-gray-500 mt-2">
            {searchTerm ? "Tente uma busca diferente" : "Adicione contatos através do formulário"}
          </p>
        </div>
      ) : (
        <motion.div
          className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {filteredContacts.map((contact) => (
              <motion.div key={contact.id} variants={item} layout>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-900">{contact.name}</CardTitle>
                        <CardDescription className="text-sm text-gray-500 mt-1">
                          {contact.phone}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(contact.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        Cadastrado em {formatDate(contact.created_at)}
                      </div>
                      {contact.joined_whatsapp ? (
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                          <svg
                            className="h-4 w-4 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          <span className="text-xs font-medium">Entrou no grupo</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                          <ExternalLink className="h-4 w-4 flex-shrink-0" />
                          <span className="text-xs font-medium">Aguardando entrada</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}

