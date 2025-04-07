"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { v4 as uuidv4 } from "uuid"

export async function submitContact({ name, phone }: { name: string; phone: string }) {
  try {
    const { error } = await supabase.from("contacts").insert([
      {
        id: uuidv4(),
        name,
        phone,
        joined_whatsapp: false,
      },
    ])

    if (error) throw error

    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Erro ao salvar contato:", error)
    return { success: false, error }
  }
}

export async function getContacts() {
  try {
    const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false })

    if (error) throw error

    return data || []
  } catch (error) {
    console.error("Erro ao buscar contatos:", error)
    return []
  }
}

export async function deleteContact(id: string) {
  try {
    const { error } = await supabase.from("contacts").delete().eq("id", id)

    if (error) throw error

    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Erro ao excluir contato:", error)
    return { success: false, error }
  }
}

