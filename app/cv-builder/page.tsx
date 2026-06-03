"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Laptop, AlertTriangle } from "lucide-react"

export default function CvBuilderPage() {
  const { t, isRTL } = useLanguage()
  const [isWideScreen, setIsWideScreen] = useState<boolean | null>(null)

  useEffect(() => {
    // 768px captures iPads (both portrait/landscape) and laptops/desktops
    const checkScreenSize = () => {
      setIsWideScreen(window.innerWidth >= 768)
    }

    // Check size immediately on mount
    checkScreenSize()

    // Listen for resize/rotation events
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // 1. Loading State (prevents layout flashing on initial load)
  if (isWideScreen === null) {
    return (
      <div className="min-h-[600px] flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading CV Builder...</div>
      </div>
    )
  }

  // 2. Wide Screen View (The Iframe completely fills the remaining viewport underneath your navbar)
  if (isWideScreen) {
    return (
      /* h-[calc(100vh-64px)] calculates the exact leftover screen height. 
        Change '64px' to match the precise pixel height of layout's top navbar if needed.
      */
      <div className="w-full h-[calc(100vh-64px)] bg-background overflow-hidden">
        <iframe
          src="https://laois-county-council.github.io/CV_builder/" 
          className="w-full h-full border-0"
          title="CV Builder"
          allow="downloads"
        />
      </div>
    )
  }

  // 3. Small Screen Fallback (Phone view - shows error card instead of iframe)
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4" dir={isRTL ? "rtl" : "ltr"}>
      <Card className="max-w-md mx-auto text-center border-destructive/20 shadow-md">
        <CardHeader className="space-y-4">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-destructive/10 flex items-center justify-center">
            <Laptop className="h-7 w-7 text-destructive" />
          </div>
          <CardTitle className="text-xl font-bold tracking-tight">
            {isRTL ? "شاشة كبيرة مطلوبة" : "Desktop or Tablet Required"}
          </CardTitle>
          <CardDescription className="text-base">
            {isRTL 
              ? "إنشاء السيرة الذاتية وتحميلها يتطلب استخدام جهاز كمبيوتر محمول (Laptop) أو جهاز iPad للحصول على أفضل تجربة وتنسيق للملف." 
              : "To design and download your CV properly, please use a laptop, desktop, or tablet device (like an iPad). Mobile screens are too small for accurate layout alignment."}
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-destructive/5 rounded-b-xl border-t border-muted/50 p-4 flex items-center gap-3 text-sm text-destructive-foreground">
          <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
          <p className="text-start">
            {isRTL
              ? "ملاحظة: إذا كنت تستخدم جهاز ايباد، يرجى تدوير الشاشة بالعرض لفتح المنصة."
              : "Tip: If you are using an iPad or tablet, try rotating it to landscape mode."}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
