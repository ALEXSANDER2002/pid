"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import { Loader2, Lock, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      toast({
        title: "Login realizado com sucesso!",
        description: "Você será redirecionado para o painel de administração.",
      })

      router.push("/admin")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Erro no login",
        description: error.message || "Credenciais inválidas. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center px-4 py-10">
      <div className="w-full max-w-[95%] sm:max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <Image
              src="/pid-logo.png"
              alt="PID Logo"
              width={120}
              height={48}
              className="h-8 w-auto mx-auto mb-6 hover:opacity-90 transition-opacity"
              priority
            />
          </Link>
          <h1 className="text-2xl font-bold text-pid-blue">Acesso ao Painel Administrativo</h1>
          <p className="text-gray-600 mt-2 text-lg sm:text-base">Entre com suas credenciais para acessar o painel</p>
        </div>

        <div className="relative">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-pid-red to-pid-blue rounded-2xl blur opacity-30"></div>
          <div className="relative bg-white rounded-2xl shadow-xl p-6 sm:p-6 border border-blue-100">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-3 sm:space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium text-lg sm:text-base">
                  Email
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                    <Mail className="h-7 w-7 sm:h-5 sm:w-5" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu-email@exemplo.com"
                    className="pl-14 sm:pl-12 py-8 sm:py-6 bg-gray-50 border-gray-200 focus:border-pid-blue focus:ring-pid-blue/20 text-lg sm:text-base"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-3 sm:space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium text-lg sm:text-base">
                  Senha
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                    <Lock className="h-7 w-7 sm:h-5 sm:w-5" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-14 sm:pl-12 py-8 sm:py-6 bg-gray-50 border-gray-200 focus:border-pid-blue focus:ring-pid-blue/20 text-lg sm:text-base"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full py-8 sm:py-6 bg-pid-blue hover:bg-pid-blue/90 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-lg sm:text-base mt-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-3 h-7 w-7 sm:h-5 sm:w-5 animate-spin" />
                    Autenticando...
                  </>
                ) : (
                  "Entrar no Painel"
                )}
              </Button>

              <div className="text-center mt-6">
                <Link href="/" className="text-lg sm:text-base text-pid-blue hover:underline py-3 inline-block">
                  Voltar para a página inicial
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

