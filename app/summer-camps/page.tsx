"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Tent,
  MapPin,
  Filter,
  X,
  Trophy,
  TreePine,
  Palette,
  ExternalLink
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type CampType = "all" | "sport" | "outdoor" | "creative"

interface Camp {
  name: { en: string; ar: string }
  location: { en: string; ar: string }
  type: CampType
  description: { en: string; ar: string }
}

export default function SummerCampsPage() {
  const { t, language, isRTL } = useLanguage()
  const [filter, setFilter] = useState<CampType>("all")
  const [selectedCamp, setSelectedCamp] = useState<Camp | null>(null)
  const [mapOpen, setMapOpen] = useState(false)

  const camps: Camp[] = [
    {
      name: { en: "Tennis Camp", ar: "معسكر التنس" },
      location: { en: "Mountmellick, Ireland", ar: "ماونتمليك، أيرلندا" },
      type: "sport",
      description: { en: "Fun tennis training and games for ages 6–16.", ar: "تدريب ممتع على التنس وألعاب للأعمار 6-16." },
    },
    {
      name: { en: "Community Sports Camp", ar: "معسكر الرياضة المجتمعي" },
      location: { en: "Mountmellick, Ireland", ar: "ماونتمليك، أيرلندا" },
      type: "sport",
      description: { en: "Multi-sport activities and games.", ar: "أنشطة رياضية متنوعة وألعاب." },
    },
    {
      name: { en: "Forest School", ar: "مدرسة الغابة" },
      location: { en: "Laois, Ireland", ar: "لاويس، أيرلندا" },
      type: "outdoor",
      description: { en: "Nature play and outdoor learning.", ar: "اللعب في الطبيعة والتعلم في الهواء الطلق." },
    },
    {
      name: { en: "Farm Camp", ar: "معسكر المزرعة" },
      location: { en: "Laois, Ireland", ar: "لاويس، أيرلندا" },
      type: "outdoor",
      description: { en: "Animal interaction and outdoor fun.", ar: "التفاعل مع الحيوانات وأنشطة خارجية ممتعة." },
    },
    {
      name: { en: "Adventure Camp", ar: "معسكر المغامرات" },
      location: { en: "Midlands, Ireland", ar: "الميدلاندز، أيرلندا" },
      type: "outdoor",
      description: { en: "Kayaking and climbing activities.", ar: "أنشطة التجديف والتسلق." },
    },
    {
      name: { en: "Campa Craic", ar: "كامبا كريك" },
      location: { en: "Midlands, Ireland", ar: "الميدلاندز، أيرلندا" },
      type: "creative",
      description: { en: "Sports, arts, and games.", ar: "رياضة وفنون وألعاب." },
    },
    {
      name: { en: "Starcamp", ar: "ستاركامب" },
      location: { en: "Ireland", ar: "أيرلندا" },
      type: "creative",
      description: { en: "Singing, dancing, and drama.", ar: "غناء ورقص وتمثيل." },
    },
  ]

  const filterOptions: { value: CampType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { value: "all", label: t("camps.filter.all"), icon: Filter },
    { value: "sport", label: t("camps.filter.sport"), icon: Trophy },
    { value: "outdoor", label: t("camps.filter.outdoor"), icon: TreePine },
    { value: "creative", label: t("camps.filter.creative"), icon: Palette },
  ]

  const filteredCamps = filter === "all" ? camps : camps.filter(camp => camp.type === filter)

  const getTypeColor = (type: CampType) => {
    switch (type) {
      case "sport":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
      case "outdoor":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
      case "creative":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getTypeLabel = (type: CampType) => {
    switch (type) {
      case "sport":
        return t("camps.filter.sport")
      case "outdoor":
        return t("camps.filter.outdoor")
      case "creative":
        return t("camps.filter.creative")
      default:
        return ""
    }
  }

  const openMap = (camp: Camp) => {
    setSelectedCamp(camp)
    setMapOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mb-6">
          <Tent className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {t("camps.title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("camps.subtitle")}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {filterOptions.map((option) => {
          const Icon = option.icon
          const isActive = filter === option.value
          return (
            <Button
              key={option.value}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(option.value)}
              className="gap-2"
            >
              <Icon className="h-4 w-4" />
              {option.label}
            </Button>
          )
        })}
      </div>

      {/* Camps Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCamps.map((camp, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-xl">
                  {camp.name[language]}
                </CardTitle>
                <Badge variant="outline" className={getTypeColor(camp.type)}>
                  {getTypeLabel(camp.type)}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4" />
                <span>{camp.location[language]}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {camp.description[language]}
              </p>
              <Button 
                variant="outline" 
                className="w-full gap-2"
                onClick={() => openMap(camp)}
              >
                <MapPin className="h-4 w-4" />
                {t("camps.map")}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCamps.length === 0 && (
        <div className="text-center py-12">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Tent className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">
            {isRTL ? "لا توجد مخيمات في هذه الفئة" : "No camps found in this category"}
          </p>
          <Button variant="link" onClick={() => setFilter("all")}>
            {isRTL ? "عرض جميع المخيمات" : "Show all camps"}
          </Button>
        </div>
      )}

      {/* Map Modal */}
      <Dialog open={mapOpen} onOpenChange={setMapOpen}>
        <DialogContent className="max-w-4xl w-[95vw] flex flex-col p-0 max-h-[90dvh]">
          <DialogHeader className="px-4 sm:px-6 pt-5 pb-3 shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 shrink-0" />
              {selectedCamp?.name[language as "en" | "ar"]}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 min-h-0 px-4 sm:px-6 pb-4 sm:pb-6">
            {selectedCamp && (
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(selectedCamp.name.en + " " + selectedCamp.location.en)}&output=embed`}
                className="w-full rounded-lg border"
                style={{ height: "min(60vh, 480px)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map for ${selectedCamp.name.en}`}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
