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
  Phone,
  X,
} from "lucide-react"

interface Line {
  speaker: "A" | "B"
  speakerLabel: string
  text: string
}

interface Scenario {
  id: string
  title: string
  description: string
  icon: React.ElementType
  color: string
  level: string
  lines: Line[]
  tips: string[]
}

const scenarios: Scenario[] = [
  {
    id: "gp",
    title: "Booking a GP Appointment",
    description: "Learn how to phone your local doctor's surgery to make or change an appointment.",
    icon: Stethoscope,
    color: "text-red-500 bg-red-50 dark:bg-red-950/30",
    level: "A2",
    lines: [
      { speaker: "A", speakerLabel: "Receptionist", text: "Good morning, Portlaoise Medical Centre. How can I help you?" },
      { speaker: "B", speakerLabel: "You", text: "Hello. I would like to make an appointment with a doctor, please." },
      { speaker: "A", speakerLabel: "Receptionist", text: "Of course. Is it urgent, or is it a routine visit?" },
      { speaker: "B", speakerLabel: "You", text: "It is a routine visit. I have had a sore throat for three days." },
      { speaker: "A", speakerLabel: "Receptionist", text: "I see. Can I take your name and date of birth?" },
      { speaker: "B", speakerLabel: "You", text: "My name is Fatima Hassan. My date of birth is the 5th of March 1990." },
      { speaker: "A", speakerLabel: "Receptionist", text: "Thank you. We have an appointment available on Thursday at 10:30 in the morning. Does that work for you?" },
      { speaker: "B", speakerLabel: "You", text: "Yes, Thursday at 10:30 is perfect. Thank you very much." },
      { speaker: "A", speakerLabel: "Receptionist", text: "You're welcome. Please bring your medical card if you have one. See you Thursday. Goodbye." },
      { speaker: "B", speakerLabel: "You", text: "Thank you. Goodbye." },
    ],
    tips: [
      "Say 'I would like to make an appointment' — it is polite and clear.",
      "Give your name clearly, spelling it if needed: 'F — A — T — I — M — A'.",
      "Ask 'Could you repeat that, please?' if you do not understand.",
      "Bring your medical card (if you have one) and PPS number.",
      "If it is very urgent, say: 'I need to see a doctor today — it is quite urgent.'",
    ],
  },
  {
    id: "school",
    title: "Enrolling a Child at School",
    description: "How to contact a school in Portlaoise to ask about enrolling your child.",
    icon: School,
    color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30",
    level: "B1",
    lines: [
      { speaker: "A", speakerLabel: "School Secretary", text: "Good afternoon, Scoil Mhuire Primary School. How can I help?" },
      { speaker: "B", speakerLabel: "You", text: "Hello. I am calling about enrolling my daughter. She is seven years old." },
      { speaker: "A", speakerLabel: "School Secretary", text: "Thank you for calling. We do have places available. Can I ask what class she would be joining — that would be First Class for a seven-year-old." },
      { speaker: "B", speakerLabel: "You", text: "Yes, First Class. We have just moved to Portlaoise from abroad." },
      { speaker: "A", speakerLabel: "School Secretary", text: "Welcome to Portlaoise! You will need to fill in an enrolment form. You can collect it from the school office or I can email it to you." },
      { speaker: "B", speakerLabel: "You", text: "Could you email it, please? My email is fatima.hassan@email.com." },
      { speaker: "A", speakerLabel: "School Secretary", text: "Perfect. You will also need a copy of her birth certificate and her PPS number. Do you have those?" },
      { speaker: "B", speakerLabel: "You", text: "I have her birth certificate. I am still waiting for the PPS number." },
      { speaker: "A", speakerLabel: "School Secretary", text: "That is fine — you can bring it later. Once we have the form, we will be in touch to arrange a start date." },
      { speaker: "B", speakerLabel: "You", text: "Thank you so much. That is very helpful." },
    ],
    tips: [
      "Bring: birth certificate, PPS number (when available), vaccination record (immunisation book).",
      "Say: 'We have just arrived from...' — schools understand and are very welcoming.",
      "Ask: 'Does the school have English language support (EAL)?' — many schools do.",
      "Portlaoise has several primary schools — you can apply to more than one.",
      "The school year runs September to June.",
    ],
  },
  {
    id: "council",
    title: "Contacting Laois County Council",
    description: "Asking about housing, bin collection, or local services.",
    icon: Building2,
    color: "text-green-500 bg-green-50 dark:bg-green-950/30",
    level: "B1",
    lines: [
      { speaker: "A", speakerLabel: "Council Staff", text: "Good morning, Laois County Council. How can I help you today?" },
      { speaker: "B", speakerLabel: "You", text: "Hello. I am calling about my bin collection. My bins were not collected this week." },
      { speaker: "A", speakerLabel: "Council Staff", text: "I am sorry to hear that. Can I take your address, please?" },
      { speaker: "B", speakerLabel: "You", text: "Yes. It is 14 Oak Drive, Portlaoise." },
      { speaker: "A", speakerLabel: "Council Staff", text: "Thank you. I can see there was a missed collection on your street. We will arrange a collection within two working days." },
      { speaker: "B", speakerLabel: "You", text: "Thank you. Also, I need to ask about a medical card application. Who do I contact for that?" },
      { speaker: "A", speakerLabel: "Council Staff", text: "Medical cards are managed by the HSE, not the Council. You can call them on 1800 700 700 or apply online at hse.ie." },
      { speaker: "B", speakerLabel: "You", text: "Thank you very much for the information. That is very helpful." },
    ],
    tips: [
      "Laois County Council number: 057 866 4000.",
      "For housing queries, say: 'I would like information about social housing / the housing list.'",
      "For the medical card, contact the HSE on 1800 700 700 (free call).",
      "You can also visit the Council offices on James Fintan Lalor Avenue, Portlaoise.",
      "Say: 'Could I speak to someone in the housing department, please?' if transferred.",
    ],
  },
  {
    id: "pharmacy",
    title: "At the Pharmacy",
    description: "Collecting a prescription or asking for advice about medicine.",
    icon: ShoppingCart,
    color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30",
    level: "A2",
    lines: [
      { speaker: "A", speakerLabel: "Pharmacist", text: "Hello, how can I help you?" },
      { speaker: "B", speakerLabel: "You", text: "Hello. I have a prescription from my doctor. I would like to collect it, please." },
      { speaker: "A", speakerLabel: "Pharmacist", text: "Of course. Can I have your name and date of birth?" },
      { speaker: "B", speakerLabel: "You", text: "My name is Ahmed Al-Rawi. Date of birth is 12th of July 1985." },
      { speaker: "A", speakerLabel: "Pharmacist", text: "Thank you. Do you have a medical card or GP visit card?" },
      { speaker: "B", speakerLabel: "You", text: "Yes, I have a medical card." },
      { speaker: "A", speakerLabel: "Pharmacist", text: "Perfect. This prescription is for antibiotics. Take one tablet three times a day with food. Finish the full course even if you feel better. Any questions?" },
      { speaker: "B", speakerLabel: "You", text: "Can I take these with other medicines?" },
      { speaker: "A", speakerLabel: "Pharmacist", text: "What other medicines are you taking?" },
      { speaker: "B", speakerLabel: "You", text: "I am taking tablets for blood pressure — Amlodipine 5mg." },
      { speaker: "A", speakerLabel: "Pharmacist", text: "That is fine, no interaction. But avoid alcohol while on the antibiotics." },
      { speaker: "B", speakerLabel: "You", text: "Understood. Thank you very much." },
    ],
    tips: [
      "Bring your prescription, medical card, and photo ID.",
      "Say: 'I do not understand — could you explain that more slowly, please?'",
      "Ask: 'Are there any side effects I should know about?'",
      "Pharmacists give free advice — you do not always need a doctor for minor problems.",
      "Many pharmacies in Portlaoise offer free blood pressure checks.",
    ],
  },
  {
    id: "bus",
    title: "Using the Bus / Public Transport",
    description: "Buying a ticket and asking about bus routes in Portlaoise.",
    icon: Bus,
    color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/30",
    level: "A2",
    lines: [
      { speaker: "B", speakerLabel: "You", text: "Excuse me, does this bus go to Dublin?" },
      { speaker: "A", speakerLabel: "Driver", text: "Yes, this is the Dublin Busáras service. Are you getting on?" },
      { speaker: "B", speakerLabel: "You", text: "Yes, please. How much is a single ticket to Dublin?" },
      { speaker: "A", speakerLabel: "Driver", text: "That is €13.50 for a single. Do you have the Leap card?" },
      { speaker: "B", speakerLabel: "You", text: "No, I do not have a Leap card. I will pay by cash." },
      { speaker: "A", speakerLabel: "Driver", text: "No problem. €13.50 please. I can give change." },
      { speaker: "B", speakerLabel: "You", text: "Here is €20. Thank you. What time do we arrive in Dublin?" },
      { speaker: "A", speakerLabel: "Driver", text: "About 1 hour 15 minutes. We arrive around 11:45." },
      { speaker: "B", speakerLabel: "You", text: "Thank you. Is there a toilet on the bus?" },
      { speaker: "A", speakerLabel: "Driver", text: "No, there is no toilet. There is a stop in Monasterevin in about 20 minutes if needed." },
      { speaker: "B", speakerLabel: "You", text: "Thank you very much." },
    ],
    tips: [
      "The Leap Card saves money on buses and trains. Get one at the train station or many shops.",
      "Bus Éireann runs from Portlaoise to Dublin, Cork, and other cities.",
      "The train (Irish Rail) is another option — Portlaoise train station is central.",
      "Say: 'Which bus stop do I need for...?' if you are unsure where to get off.",
      "Check timetables at buseireann.ie or irishrail.ie.",
    ],
  },
  {
    id: "social_welfare",
    title: "Visiting the Social Welfare / Intreo Office",
    description: "Asking about benefits, jobseeker's allowance, or registering for support.",
    icon: Phone,
    color: "text-teal-500 bg-teal-50 dark:bg-teal-950/30",
    level: "B1",
    lines: [
      { speaker: "A", speakerLabel: "Intreo Staff", text: "Good morning. How can I help you today?" },
      { speaker: "B", speakerLabel: "You", text: "Good morning. I am looking for information about Jobseeker's Allowance. I recently lost my job." },
      { speaker: "A", speakerLabel: "Intreo Staff", text: "I am sorry to hear that. How long have you been living in Ireland?" },
      { speaker: "B", speakerLabel: "You", text: "I have been living here for two years. I have a residence permit." },
      { speaker: "A", speakerLabel: "Intreo Staff", text: "Good. You will need to show your PPSN, proof of address, and your residence permit. Have you registered with us before?" },
      { speaker: "B", speakerLabel: "You", text: "No, this is my first time. I am not sure what I need to do." },
      { speaker: "A", speakerLabel: "Intreo Staff", text: "No problem. I will give you a form to fill in. We can go through it together if you like." },
      { speaker: "B", speakerLabel: "You", text: "Yes please. My English is not perfect and I want to make sure I fill it in correctly." },
      { speaker: "A", speakerLabel: "Intreo Staff", text: "Of course — take your time. We also have an interpreter service if you need it. What language do you speak at home?" },
      { speaker: "B", speakerLabel: "You", text: "I speak Arabic at home. An interpreter would be very helpful, thank you." },
    ],
    tips: [
      "Intreo Portlaoise is located at Portlaoise Employment Services, Togher Industrial Estate.",
      "Bring: PPSN card, photo ID, proof of address (e.g. a utility bill or letter), and residence permit.",
      "You can ask for an interpreter — it is a free service.",
      "Say: 'I would like to speak to a case officer, please.'",
      "You can also apply online at mywelfare.ie.",
    ],
  },
]

interface ConversationScenariosProps {
  open: boolean
  onClose: () => void
}

export function ConversationScenarios({ open, onClose }: ConversationScenariosProps) {
  const [selected, setSelected] = useState<Scenario | null>(null)
  const { t } = useLanguage()

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { onClose(); setSelected(null) } }}>
      <DialogContent className="max-w-2xl w-full p-0 gap-0 flex flex-col" style={{ maxHeight: "90dvh" }}>
        {!selected ? (
          // Scenario list
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
                {scenarios.map((s) => {
                  const Icon = s.icon
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelected(s)}
                      className="w-full text-left rounded-xl border border-border hover:border-primary/40 hover:bg-muted/50 transition-all p-3 sm:p-4 group"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`h-9 w-9 sm:h-10 sm:w-10 rounded-lg flex items-center justify-center shrink-0 ${s.color}`}>
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-semibold text-sm group-hover:text-primary transition-colors">
                              {s.title}
                            </span>
                            <Badge variant="outline" className="text-xs shrink-0">
                              {t("scenarios.level")} {s.level}
                            </Badge>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-snug">
                            {s.description}
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
          // Scenario detail
          <>
            <DialogHeader className="px-4 sm:px-6 pt-5 pb-4 border-b border-border shrink-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className={`h-8 w-8 sm:h-9 sm:w-9 rounded-lg flex items-center justify-center shrink-0 ${selected.color}`}>
                    <selected.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <DialogTitle className="text-base sm:text-lg leading-tight">{selected.title}</DialogTitle>
                    <Badge variant="outline" className="text-xs mt-0.5">{t("scenarios.level")} {selected.level}</Badge>
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
                {/* Dialogue */}
                <div className="space-y-3">
                  {selected.lines.map((line, i) => (
                    <div
                      key={i}
                      className={`flex gap-2 sm:gap-3 ${line.speaker === "B" ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                          line.speaker === "A"
                            ? "bg-muted text-muted-foreground"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {line.speaker === "A" ? line.speakerLabel[0] : "Y"}
                      </div>
                      <div className={`max-w-[80%] sm:max-w-[78%] ${line.speaker === "B" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                        <span className="text-xs text-muted-foreground px-1">
                          {line.speakerLabel}
                        </span>
                        <div
                          className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-sm leading-relaxed ${
                            line.speaker === "A"
                              ? "bg-muted text-foreground rounded-tl-sm"
                              : "bg-primary text-primary-foreground rounded-tr-sm"
                          }`}
                        >
                          {line.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tips */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <CardTitle className="text-sm font-semibold text-primary">
                      {t("scenarios.tips")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <ul className="space-y-2">
                      {selected.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1 h-4 w-4 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">
                            {i + 1}
                          </span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
