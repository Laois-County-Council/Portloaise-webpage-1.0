"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Heart, 
  BookOpen, 
  Users, 
  Laptop, 
  ArrowRight,
  Sparkles,
  Download,
  FileText
} from "lucide-react"

export default function HomePage() {
  const { t, isRTL } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Sparkles className="h-4 w-4" />
          {isRTL ? "دليلك الشامل" : "Your Complete Guide"}
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-balance">
          {t("home.title")}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
          {t("home.subtitle")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="gap-2">
            <Link href="/learn-english">
              <BookOpen className="h-5 w-5" />
              {t("home.learn.btn")}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/laptop-guide">
              <Laptop className="h-5 w-5" />
              {t("nav.laptop")}
            </Link>
          </Button>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 py-8">
        {/* General Information */}
        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>{t("home.info.title")}</CardTitle>
            <CardDescription className="text-base">
              {t("home.info.text")}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Download Booklets */}
        <Card className="group hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-3 border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>{t("home.download.title")}</CardTitle>
            <CardDescription className="text-base max-w-lg">
              {t("home.download.text")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`flex flex-wrap gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
              <Button
                asChild
                size="lg"
                className="gap-2"
              >
                <a
                  href="https://github.com/EskandarAtrakchi/Portloaise-webpage-1.0/raw/refs/heads/Docs/Welcome%20to%20Laois%20Arabic%20version.docx"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-5 w-5" />
                  {t("home.download.ar")}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <a
                  href="https://github.com/EskandarAtrakchi/Portloaise-webpage-1.0/raw/refs/heads/Docs/Welcome%20to%20Laois%20Booklet%20(EN)%20FINAL%20VERSION.docx"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-5 w-5" />
                  {t("home.download.en")}
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Healthcare */}
        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4 group-hover:bg-destructive/20 transition-colors">
              <Heart className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle>{t("home.health.title")}</CardTitle>
            <CardDescription className="text-base">
              {t("home.health.text")}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Learn English */}
        <Card className="group hover:shadow-lg transition-shadow border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>{t("home.learn.title")}</CardTitle>
            <CardDescription className="text-base">
              {t("home.learn.text")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full gap-2">
              <Link href="/learn-english">
                {t("home.learn.btn")}
                <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Computer Use */}
        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-secondary/80 transition-colors">
              <Laptop className="h-6 w-6 text-secondary-foreground" />
            </div>
            <CardTitle>{t("home.laptop.title")}</CardTitle>
            <CardDescription className="text-base">
              {t("home.laptop.text")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full gap-2">
              <Link href="/laptop-guide">
                {isRTL ? "اقرأ المزيد" : "Learn More"}
                <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
