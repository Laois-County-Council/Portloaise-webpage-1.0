"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, 
  Globe, 
  Smartphone, 
  Headphones, 
  Youtube,
  ExternalLink,
  Download,
  FileText,
  GraduationCap
} from "lucide-react"

export default function LearnEnglishPage() {
  const { t, isRTL } = useLanguage()

  const websites = [
    {
      title: t("learn.british.council"),
      description: t("learn.british.council.desc"),
      url: "https://learnenglish.britishcouncil.org/",
      badge: isRTL ? "موصى به" : "Recommended",
    },
    {
      title: t("learn.bbc"),
      description: t("learn.bbc.desc"),
      url: "https://www.bbc.co.uk/learningenglish/",
      badge: isRTL ? "جميع المستويات" : "All Levels",
    },
    {
      title: t("learn.breaking.news"),
      description: t("learn.breaking.news.desc"),
      url: "https://breakingnewsenglish.com/",
      badge: "A2-B2",
    },
    {
      title: "Cambridge English",
      description: isRTL ? "موارد التعلم من جامعة كامبريدج" : "Learning resources from Cambridge University",
      url: "https://www.cambridgeenglish.org/learning-english/",
      badge: isRTL ? "جميع المستويات" : "All Levels",
    },
    {
      title: "Alison.com",
      description: isRTL ? "مئات الدورات المجانية عبر الإنترنت" : "Hundreds of free online courses",
      url: "https://alison.com/courses?query=english",
      badge: isRTL ? "مجاني" : "Free",
    },
  ]

  const apps = [
    {
      title: t("learn.duolingo"),
      description: t("learn.duolingo.desc"),
      url: "https://www.duolingo.com/",
      icon: "🦉",
    },
    {
      title: t("learn.memrise"),
      description: t("learn.memrise.desc"),
      url: "https://www.memrise.com/",
      icon: "🧠",
    },
    {
      title: t("learn.grammar.app"),
      description: t("learn.grammar.app.desc"),
      url: "https://learnenglish.britishcouncil.org/apps",
      icon: "📚",
    },
  ]

  const podcasts = [
    {
      title: t("learn.6min"),
      description: t("learn.6min.desc"),
      url: "https://www.bbc.co.uk/programmes/p02pc9tn/episodes/downloads",
      level: "B1/B2",
    },
    {
      title: t("learn.vocabulary"),
      description: t("learn.vocabulary.desc"),
      url: "https://www.bbc.co.uk/learningenglish/english/features/vocabulary",
      level: "A2+",
    },
    {
      title: t("learn.business"),
      description: t("learn.business.desc"),
      url: "https://www.businessenglishpod.com/",
      level: "B1+",
    },
    {
      title: "PodcastsInEnglish.com",
      description: isRTL ? "مجموعة متنوعة من البودكاست حول مواضيع مختلفة" : "Variety of podcasts on various topics",
      url: "https://www.podcastsinenglish.com/",
      level: isRTL ? "جميع المستويات" : "All Levels",
    },
  ]

  const youtubeChannels = [
    {
      title: "BBC Learning English",
      description: isRTL ? "دروس يومية من BBC" : "Daily lessons from BBC",
      url: "https://www.youtube.com/user/bbclearningenglish",
    },
    {
      title: "English with Lucy",
      description: isRTL ? "نصائح النطق والقواعد" : "Pronunciation and grammar tips",
      url: "https://www.youtube.com/channel/UCz4tgANd4yy8Oe0iXCdSWfA",
    },
    {
      title: "Oxford Online English",
      description: isRTL ? "دروس شاملة لجميع المستويات" : "Comprehensive lessons for all levels",
      url: "https://www.youtube.com/user/oxfordonlineenglish",
    },
    {
      title: isRTL ? "للناطقين بالعربية: Apna Teacher" : "For Arabic Speakers: Apna Teacher",
      description: isRTL ? "دروس بالعربية والإنجليزية" : "Lessons in Arabic and English",
      url: "https://www.youtube.com/channel/UCkFrLLHNEHkGqjHYfGqWJyQ",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mb-6">
          <GraduationCap className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {t("learn.title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("learn.subtitle")}
        </p>
      </div>

      {/* Quick Links */}
      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t("learn.downloads")}
          </CardTitle>
          <CardDescription>{t("learn.intro")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="default" className="gap-2">
              <a 
                href="https://padlet.com/ThereseGlennonLOETB/english-online-resources-for-speakers-of-other-languages-vsvzvy34p1zqdras" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                {t("learn.padlet")}
              </a>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <a 
                href="https://github.com/EskandarAtrakchi/Portloaise-webpage-1.0/blob/Docs/Online%20ESOL%20classes%20and%20resources%20July%202024.pdf" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-4 w-4" />
                {t("learn.en.doc")}
              </a>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <a 
                href="https://github.com/EskandarAtrakchi/Portloaise-webpage-1.0/blob/Docs/Arabic%20version.pdf" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-4 w-4" />
                {t("learn.ar.doc")}
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transparent Language Platform */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {t("learn.platform.title")}
          </CardTitle>
          <CardDescription>{t("learn.platform.text")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild size="lg" className="gap-2">
            <a 
              href="https://library.transparent.com/lgma/game/ng/#/login?continue=https:~2F~2Flibrary.transparent.com~2Flgma~2Fgame~2Fng~2F%23~2Fenroll%3Fcode%3Dlaoisco" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              {t("learn.platform.btn")}
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Tabs for different resources */}
      <Tabs defaultValue="websites" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-transparent p-0">
          <TabsTrigger 
            value="websites" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 py-3"
          >
            <Globe className="h-4 w-4" />
            {t("learn.websites")}
          </TabsTrigger>
          <TabsTrigger 
            value="apps"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 py-3"
          >
            <Smartphone className="h-4 w-4" />
            {t("learn.apps")}
          </TabsTrigger>
          <TabsTrigger 
            value="podcasts"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 py-3"
          >
            <Headphones className="h-4 w-4" />
            {t("learn.podcasts")}
          </TabsTrigger>
          <TabsTrigger 
            value="youtube"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 py-3"
          >
            <Youtube className="h-4 w-4" />
            {t("learn.youtube")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="websites" className="space-y-4">
          {websites.map((site, index) => (
            <Card key={index} className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <CardTitle className="text-lg">{site.title}</CardTitle>
                      <Badge variant="secondary">{site.badge}</Badge>
                    </div>
                    <CardDescription>{site.description}</CardDescription>
                  </div>
                  <Button asChild size="sm" variant="outline" className="shrink-0 gap-2">
                    <a href={site.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      {isRTL ? "زيارة" : "Visit"}
                    </a>
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="apps" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app, index) => (
            <Card key={index} className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-3">{app.icon}</div>
                <CardTitle className="text-lg">{app.title}</CardTitle>
                <CardDescription>{app.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full gap-2">
                  <a href={app.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    {isRTL ? "تحميل" : "Download"}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="podcasts" className="space-y-4">
          {podcasts.map((podcast, index) => (
            <Card key={index} className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <CardTitle className="text-lg">{podcast.title}</CardTitle>
                      <Badge variant="outline">{podcast.level}</Badge>
                    </div>
                    <CardDescription>{podcast.description}</CardDescription>
                  </div>
                  <Button asChild size="sm" variant="outline" className="shrink-0 gap-2">
                    <a href={podcast.url} target="_blank" rel="noopener noreferrer">
                      <Headphones className="h-4 w-4" />
                      {isRTL ? "استمع" : "Listen"}
                    </a>
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="youtube" className="grid gap-4 sm:grid-cols-2">
          {youtubeChannels.map((channel, index) => (
            <Card key={index} className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                    <Youtube className="h-5 w-5 text-red-500" />
                  </div>
                  <CardTitle className="text-lg">{channel.title}</CardTitle>
                </div>
                <CardDescription>{channel.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full gap-2">
                  <a href={channel.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    {isRTL ? "شاهد" : "Watch"}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
