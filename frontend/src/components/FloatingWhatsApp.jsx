import React from 'react'
import { Phone } from 'lucide-react'

export default function FloatingWhatsApp(){
  const number = import.meta.env.VITE_WHATSAPP_NUMBER || '254700000000'
  const text = encodeURIComponent("Hi Paynoma — I need support.")
  const url = `https://wa.me/${number}?text=${text}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="fixed right-5 bottom-5 bg-green-500 text-white rounded-full p-4 shadow-lg z-50 flex items-center space-x-2"
      aria-label="Chat with Paynoma"
    >
      <Phone className="w-5 h-5" />
      <span className="hidden md:inline">Chat</span>
    </a>
  )
}
