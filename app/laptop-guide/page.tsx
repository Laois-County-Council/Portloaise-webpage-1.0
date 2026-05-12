"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Power, 
  LogIn, 
  Wifi, 
  MousePointer, 
  BatteryCharging, 
  AlertTriangle,
  HelpCircle,
  Laptop,
  KeyRound
} from "lucide-react"

export default function LaptopGuidePage() {
  const { t, isRTL } = useLanguage()

  const steps = [
    {
      icon: Power,
      title: t("laptop.step1.title"),
      items: [t("laptop.step1.1"), t("laptop.step1.2"), t("laptop.step1.3")],
      color: "bg-green-500/10 text-green-600 dark:text-green-400",
    },
    {
      icon: LogIn,
      title: t("laptop.step2.title"),
      items: [t("laptop.step2.1"), t("laptop.step2.2"), t("laptop.step2.3")],
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      icon: Wifi,
      title: t("laptop.step3.title"),
      items: [t("laptop.step3.1"), t("laptop.step3.2"), t("laptop.step3.3"), t("laptop.step3.4")],
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
    {
      icon: MousePointer,
      title: t("laptop.step4.title"),
      items: [t("laptop.step4.1"), t("laptop.step4.2"), t("laptop.step4.3")],
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    },
    {
      icon: BatteryCharging,
      title: t("laptop.step5.title"),
      items: [t("laptop.step5.1"), t("laptop.step5.2"), t("laptop.step5.3")],
      color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    },
    {
      icon: AlertTriangle,
      title: t("laptop.step6.title"),
      items: [t("laptop.step6.1"), t("laptop.step6.2"), t("laptop.step6.3")],
      color: "bg-red-500/10 text-red-600 dark:text-red-400",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mb-6">
          <Laptop className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {t("laptop.title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("laptop.intro")}
        </p>
      </div>

      {/* Login Credentials Card */}
      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <KeyRound className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>{t("laptop.login.title")}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-background border">
              <Badge variant="secondary" className="shrink-0">
                {t("laptop.login.username")}
              </Badge>
              <code className="font-mono font-semibold">Admin</code>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-background border">
              <Badge variant="secondary" className="shrink-0">
                {t("laptop.login.password")}
              </Badge>
              <code className="font-mono font-semibold">laptopuser</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Steps */}
      <div className="space-y-6">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <Card key={index} className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-xl ${step.color} flex items-center justify-center shrink-0`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {step.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-muted-foreground">
                          {itemIndex + 1}
                        </span>
                      </div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}

        {/* Help Section */}
        <Card className="border-accent/20 bg-accent/5">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                <HelpCircle className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <CardTitle className="text-xl">{t("laptop.step7.title")}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {t("laptop.step7.text")}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
