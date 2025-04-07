import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  try {
    const supabase = createMiddlewareClient({ req, res })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Se o usuário não estiver autenticado e estiver tentando acessar a página de admin
    if (!session && req.nextUrl.pathname.startsWith("/admin")) {
      const redirectUrl = new URL("/login", req.url)
      return NextResponse.redirect(redirectUrl)
    }

    // Se o usuário estiver autenticado e estiver tentando acessar a página de login
    if (session && req.nextUrl.pathname === "/login") {
      const redirectUrl = new URL("/admin", req.url)
      return NextResponse.redirect(redirectUrl)
    }
  } catch (error) {
    console.error("Erro no middleware:", error)
    // Em caso de erro, redireciona para a página de login por segurança
    if (req.nextUrl.pathname.startsWith("/admin")) {
      const redirectUrl = new URL("/login", req.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}

