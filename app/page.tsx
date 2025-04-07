import { ContactForm } from "@/components/contact-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center">
            <Image src="/pid-logo.png" alt="PID Logo" width={140} height={55} className="h-10 w-auto" priority />
          </div>
        </header>

        <div className="w-full max-w-[95%] sm:max-w-md mx-auto">
          <div className="relative">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-pid-red to-pid-blue rounded-2xl blur opacity-30"></div>
            <div className="relative bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-blue-100">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-pid-blue to-pid-red bg-clip-text text-transparent">
                  Programa de Inclusão Digital
                </h2>
                <p className="text-gray-600 text-lg sm:text-xl">
                  Preencha o formulário abaixo e conecte-se ao nosso grupo exclusivo no WhatsApp.
                </p>
              </div>

              <ContactForm />

              <div className="mt-10 pt-8 border-t border-gray-100">
                <Link href="/login" className="block">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full group text-white bg-pid-blue border-pid-blue hover:bg-pid-blue/90 hover:text-white transition-all duration-300 py-7 sm:py-2 text-lg sm:text-base shadow-lg hover:shadow-xl"
                  >
                    Acesso ao Painel Administrativo
                    <ChevronRight className="ml-2 h-6 w-6 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
            <a 
              href="https://chat.whatsapp.com/CpQZUkK7X7e9NM40s9952i" 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute -bottom-5 -right-5 bg-pid-red rounded-full p-5 sm:p-4 shadow-lg transform hover:scale-105 transition-transform duration-300 group"
            >
              <svg className="h-10 w-10 sm:h-8 sm:w-8 text-white group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© 2025 PID - Programa de Inclusão Digital. Todos os direitos reservados.</p>
          <p className="mt-1">Unifesspa</p>
        </footer>
      </div>
    </div>
  )
}

