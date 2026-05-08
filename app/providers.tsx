"use client"

import { LanguageProvider, useLanguage } from "@/lib/language-context"
import { Header } from "@/components/header"
import { useEffect, ReactNode } from "react"

function LayoutWrapper({ children }: { children: ReactNode }) {
  const { isRTL } = useLanguage()

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
    document.documentElement.lang = isRTL ? "ar" : "en"
  }, [isRTL])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t border-border/40 py-6 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          {isRTL 
            ? "© 2024 دليل لاويس. جميع الحقوق محفوظة."
            : "© 2024 Laois Guide. All rights reserved."
          }
        </div>
      </footer>
    </div>
  )
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <LayoutWrapper>{children}</LayoutWrapper>
    </LanguageProvider>
  )
}
