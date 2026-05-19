"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import {
  MessageSquare,
  Stethoscope,
  School,
  ShoppingCart,
  Bus,
  Building2,
  X,
} from "lucide-react"

// Clean configuration blueprint pointing to translation keys
interface LocalizedScenarioConfig {
  id: string
  translationPrefix: string // e.g. "scenarios.gp"
  icon: React.ElementType
  color: string
  level: string
  totalLines: number
  totalTips: number
}

const scenarioConfigurations: LocalizedScenarioConfig[] = [
  {
    id: "gp",
    translationPrefix: "scenarios.gp",
    icon: Stethoscope,
    color: "text-red-500 bg-red-50 dark:bg-red-950/30",
    level: "A2",
    totalLines: 10,
    totalTips: 5,
  },
  {
    id: "school",
    translationPrefix: "scenarios.school",
    icon: School,
    color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30",
    level: "B1",
    totalLines: 10,
    totalTips: 5,
  },
  {
    id: "council",
    translationPrefix: "scenarios.council",
    icon: Building2,
    color: "text-green-500 bg-green-50 dark:bg-green-950/30",
    level: "B1",
    totalLines: 8,
    totalTips: 5,
  },
  {
    id: "pharmacy",
    translationPrefix: "scenarios.pharmacy",
    icon: ShoppingCart,
    color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30",
    level: "A2",
    totalLines: 12,
    totalTips: 5,
  },
  {
    id: "bus",
    translationPrefix: "scenarios.bus",
    icon: Bus,
    color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/30",
    level: "A2",
    totalLines: 11,
    totalTips: 5,
  },
  {
    id: "social_welfare",
    translationPrefix: "scenarios.welfare",
    icon: Building2,
    color: "text-teal-500 bg-teal-50 dark:bg-teal-950/30",
    level: "B1",
    totalLines: 10,
    totalTips: 5,
  },
]

interface ConversationScenariosProps {
  open: boolean
  onClose: () => void
}

export function ConversationScenarios({ open, onClose }: ConversationScenariosProps) {
  const [selected, setSelected] = useState<LocalizedScenarioConfig | null>(null)
  const { t, isRTL } = useLanguage()

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { onClose(); setSelected(null) } }}>
      <DialogContent className="max-w-2xl w-full p-0 gap-0 flex flex-col" style={{ maxHeight: "90dvh" }}>
        {!selected ? (
          // 1. SCENARIO SELECTION LIST VIEW
          <>
            <DialogHeader className="px-4 sm:px-6 pt-5 pb-4 shrink-0 border-b border-border">
              <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <MessageSquare className="h-5 w-5 text-primary shrink-0" />
                {t("scenarios.title")}
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed">
                {t("scenarios.subtitle")}
              </DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto flex-1">
              <div className="grid gap-3 px-4 sm:px-6 py-4 pb-6">
                {scenarioConfigurations.map((s) => {
                  const Icon = s.icon
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelected(s)}
                      className="w-full text-left rounded-xl border border-border hover:border-primary/40 hover:bg-muted/50 transition-all p-3 sm:p-4 group"
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`h-9 w-9 sm:h-10 sm:w-10 rounded-lg flex items-center justify-center shrink-0 ${s.color}`}>
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-semibold text-sm group-hover:text-primary transition-colors">
                              {t(`${s.translationPrefix}.title`)}
                            </span>
                            <Badge variant="outline" className="text-xs shrink-0">
                              {t("scenarios.level")} {s.level}
                            </Badge>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-snug">
                            {t(`${s.translationPrefix}.description`)}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </>
        ) : (
          // 2. ACTIVE DETAILED SCENARIO DIALOGUE VIEW
          <>
            <DialogHeader className="px-4 sm:px-6 pt-5 pb-4 border-b border-border shrink-0" dir={isRTL ? "rtl" : "ltr"}>
              <div className="flex items-start justify-between gap-2 w-full">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className={`h-8 w-8 sm:h-9 sm:w-9 rounded-lg flex items-center justify-center shrink-0 ${selected.color}`}>
                    <selected.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <DialogTitle className="text-base sm:text-lg leading-tight">
                      {t(`${selected.translationPrefix}.title`)}
                    </DialogTitle>
                    <Badge variant="outline" className="text-xs mt-0.5">
                      {t("scenarios.level")} {selected.level}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground gap-1 shrink-0"
                  onClick={() => setSelected(null)}
                >
                  <X className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("scenarios.back")}</span>
                </Button>
              </div>
            </DialogHeader>

            <div className="overflow-y-auto flex-1">
              <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-5">
                
                {/* Dialogue Container */}
                <div className="space-y-3">
                  {Array.from({ length: selected.totalLines }).map((_, index) => {
                    const lineNum = index + 1
                    const speakerKey = `${selected.translationPrefix}.line${lineNum}.speaker`
                    const textKey = `${selected.translationPrefix}.line${lineNum}.text`
                    
                    // Look up static raw dictionary key value to toggle chat speech-bubble alignment direction styles
                    const rawSpeaker = t(speakerKey)
                    const isUserLine = rawSpeaker === "You" || rawSpeaker === "أنت"

                    return (
                      <div
                        key={index}
                        className={`flex gap-2 sm:gap-3 ${isUserLine ? "flex-row-reverse" : ""}`}
                        dir={isRTL ? "rtl" : "ltr"}
                      >
                        <div
                          className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                            !isUserLine
                              ? "bg-muted text-muted-foreground"
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          {rawSpeaker ? rawSpeaker[0] : "•"}
                        </div>
                        <div className={`max-w-[80%] sm:max-w-[78%] ${isUserLine ? "items-end" : "items-start"} flex flex-col gap-1`}>
                          <span className="text-xs text-muted-foreground px-1">
                            {rawSpeaker}
                          </span>
                          <div
                            className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-sm leading-relaxed ${
                              !isUserLine
                                ? "bg-muted text-foreground rounded-tl-sm"
                                : "bg-primary text-primary-foreground rounded-tr-sm"
                            }`}
                          >
                            {t(textKey)}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Useful Advice & Key Guidelines */}
                <Card className="border-primary/20 bg-primary/5" dir={isRTL ? "rtl" : "ltr"}>
                  <CardHeader className="pb-2 pt-4 px-4">
                    <CardTitle className="text-sm font-semibold text-primary">
                      {t("scenarios.tips")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <ul className="space-y-2">
                      {Array.from({ length: selected.totalTips }).map((_, index) => {
                        const tipNum = index + 1
                        return (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="mt-1 h-4 w-4 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">
                              {tipNum}
                            </span>
                            {t(`${selected.translationPrefix}.tip${tipNum}`)}
                          </li>
                        )
                      })}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
        
        {/* Footnotes & Citation anchors */}
        <div className="text-xs text-muted-foreground border-t p-4 shrink-0 bg-muted/20" dir={isRTL ? "rtl" : "ltr"}>
          <p className="font-semibold">Sources & inspiration:</p>
          <ul className="list-disc mx-4 mt-1 space-y-1">
            <li>
              <a href="https://www.citizensinformation.ie" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                Citizens Information Ireland
              </a>
            </li>
            <li>
              <a href="https://www.hse.ie" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                HSE Ireland
              </a>
            </li>
            <li>
              <a href="https://www.bbc.co.uk/learningenglish" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                BBC Learning English
              </a>
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}