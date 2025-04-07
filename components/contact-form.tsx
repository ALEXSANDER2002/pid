"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { submitContact } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"
import { Send, User, Phone, Loader2, ArrowRight, RefreshCw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ContactForm() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  // Link do grupo de WhatsApp (em produção, isso poderia vir de uma variável de ambiente)
  const whatsappGroupLink = "https://chat.whatsapp.com/SEUCODIGODEGRUPO"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await submitContact({ name, phone })
      toast({
        title: "Cadastro realizado!",
        description: "Suas informações foram enviadas com sucesso.",
      })
      setIsSubmitted(true)
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      toast({
        title: "Erro no envio",
        description: "Ocorreu um erro ao enviar suas informações. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatPhone = (value: string) => {
    // Remove tudo que não for número
    const numbers = value.replace(/\D/g, "")

    // Aplica a máscara (XX) XXXXX-XXXX
    if (numbers.length <= 11) {
      let formatted = numbers
      if (numbers.length > 2) {
        formatted = `(${numbers.substring(0, 2)}) ${numbers.substring(2)}`
      }
      if (numbers.length > 7) {
        formatted = `(${numbers.substring(0, 2)}) ${numbers.substring(2, 7)}-${numbers.substring(7)}`
      }
      return formatted
    }

    return value
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value))
  }

  const resetForm = () => {
    setName("")
    setPhone("")
    setIsSubmitted(false)
  }

  return (
    <AnimatePresence mode="wait">
      {isSubmitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-pid-red to-pid-blue p-0.5 rounded-xl">
            <div className="bg-white p-6 sm:p-6 rounded-[10px] text-center space-y-5">
              <div className="w-20 h-20 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <svg
                  className="w-10 h-10 sm:w-8 sm:h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>

              <h3 className="text-2xl sm:text-xl font-bold text-gray-800">Cadastro realizado com sucesso!</h3>
              <p className="text-lg sm:text-base text-gray-600">
                Olá <span className="font-semibold">{name}</span>, agora você pode entrar no nosso grupo exclusivo do
                WhatsApp.
              </p>

              <div className="space-y-4 pt-4">
                <a href={whatsappGroupLink} target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-8 sm:py-6 text-lg sm:text-base group transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span className="mr-3 flex items-center justify-center w-12 h-12 sm:w-8 sm:h-8 bg-white bg-opacity-20 rounded-full">
                      <svg className="h-7 w-7 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </span>
                    <span className="font-medium text-lg">Entrar no Grupo do WhatsApp</span>
                    <ArrowRight className="ml-3 h-7 w-7 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>

                <Button
                  variant="outline"
                  onClick={resetForm}
                  className="w-full mt-2 bg-white border-pid-blue text-pid-blue hover:bg-gray-50 group py-7 sm:py-5 text-lg sm:text-base"
                >
                  <RefreshCw className="mr-3 h-6 w-6 sm:h-5 sm:w-5 transition-transform group-hover:rotate-180" />
                  Fazer novo cadastro
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="space-y-7 sm:space-y-6">
            <div className="space-y-3 sm:space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium text-lg sm:text-base">
                Nome completo
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                  <User className="h-7 w-7 sm:h-5 sm:w-5" />
                </div>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite seu nome completo"
                  className="pl-14 sm:pl-12 py-8 sm:py-6 bg-gray-50 border-gray-200 focus:border-pid-blue focus:ring-pid-blue/20 text-lg sm:text-base"
                />
              </div>
            </div>

            <div className="space-y-3 sm:space-y-2">
              <Label htmlFor="phone" className="text-gray-700 font-medium text-lg sm:text-base">
                Telefone com WhatsApp
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                  <Phone className="h-7 w-7 sm:h-5 sm:w-5" />
                </div>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="(00) 00000-0000"
                  className="pl-14 sm:pl-12 py-8 sm:py-6 bg-gray-50 border-gray-200 focus:border-pid-blue focus:ring-pid-blue/20 text-lg sm:text-base"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-8 sm:py-6 bg-pid-red hover:bg-pid-red/90 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 group text-lg sm:text-base mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-3 h-7 w-7 sm:h-5 sm:w-5 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  Cadastrar e entrar no grupo
                  <Send className="ml-3 h-7 w-7 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>

            <p className="text-base sm:text-sm text-center text-gray-500 mt-4">
              Ao se cadastrar, você concorda em receber mensagens do nosso grupo no WhatsApp.
            </p>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

