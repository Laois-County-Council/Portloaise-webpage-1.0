"use client"

import { useLanguage } from "@/lib/language-context"
import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Plus,
  Trash2,
  Download,
  Eye,
  EyeOff,
  ChevronRight,
  Globe,
} from "lucide-react"

interface WorkEntry {
  id: string
  company: string
  role: string
  from: string
  to: string
  description: string
}

interface EducationEntry {
  id: string
  institution: string
  qualification: string
  year: string
}

interface CVData {
  fullName: string
  email: string
  phone: string
  address: string
  nationality: string
  summary: string
  skills: string
  work: WorkEntry[]
  education: EducationEntry[]
}

function uid() {
  return Math.random().toString(36).slice(2)
}

const emptyCV: CVData = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  nationality: "",
  summary: "",
  skills: "",
  work: [{ id: uid(), company: "", role: "", from: "", to: "", description: "" }],
  education: [{ id: uid(), institution: "", qualification: "", year: "" }],
}

// ─── CV Preview — ALL styles are inline with safe hex/rgb values ──────────────
// Tailwind classes are intentionally avoided here because html2canvas cannot
// parse modern CSS color functions (oklch, lab) that Tailwind v4 generates.
function CVPreview({ data }: { data: CVData }) {
  const accentBlue = "#2563eb"
  const lightBlue = "#eff6ff"
  const borderBlue = "#bfdbfe"
  const textDark = "#111827"
  const textMid = "#374151"
  const textLight = "#6b7280"
  const textTiny = "#9ca3af"

  return (
    <div
      id="cv-preview"
      style={{
        background: "#ffffff",
        color: textDark,
        fontFamily: "Arial, Helvetica, sans-serif",
        width: "210mm",
        minHeight: "297mm",
        padding: "16mm 18mm",
        boxSizing: "border-box",
        fontSize: "13px",
        lineHeight: "1.5",
      }}
    >
      {/* Name & contact */}
      <div style={{ marginBottom: "24px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: textDark,
            margin: "0 0 8px 0",
            letterSpacing: "-0.5px",
          }}
        >
          {data.fullName || "Your Name"}
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px", color: textLight, fontSize: "12px" }}>
          {data.email && (
            <span><strong style={{ color: textMid }}>Email:</strong> {data.email}</span>
          )}
          {data.phone && (
            <span><strong style={{ color: textMid }}>Phone:</strong> {data.phone}</span>
          )}
          {data.address && (
            <span><strong style={{ color: textMid }}>Address:</strong> {data.address}</span>
          )}
          {data.nationality && (
            <span><strong style={{ color: textMid }}>Nationality:</strong> {data.nationality}</span>
          )}
        </div>
        <div
          style={{
            marginTop: "14px",
            height: "4px",
            width: "56px",
            borderRadius: "2px",
            background: accentBlue,
          }}
        />
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div style={{ marginBottom: "22px" }}>
          <h2
            style={{
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              color: accentBlue,
              margin: "0 0 8px 0",
            }}
          >
            Professional Summary
          </h2>
          <p style={{ color: textMid, margin: 0, lineHeight: "1.6" }}>{data.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {data.work.some((w) => w.company || w.role) && (
        <div style={{ marginBottom: "22px" }}>
          <h2
            style={{
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              color: accentBlue,
              margin: "0 0 12px 0",
            }}
          >
            Work Experience
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {data.work
              .filter((w) => w.company || w.role)
              .map((w) => (
                <div key={w.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontWeight: "600", color: textDark }}>{w.role || "Role"}</span>
                    <span style={{ fontSize: "11px", color: textTiny }}>
                      {w.from}{w.to ? ` – ${w.to}` : " – Present"}
                    </span>
                  </div>
                  <div style={{ fontSize: "12px", color: textLight, marginBottom: "4px" }}>{w.company}</div>
                  {w.description && (
                    <p style={{ color: textMid, margin: 0, lineHeight: "1.6", fontSize: "12px" }}>
                      {w.description}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.some((e) => e.institution || e.qualification) && (
        <div style={{ marginBottom: "22px" }}>
          <h2
            style={{
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              color: accentBlue,
              margin: "0 0 12px 0",
            }}
          >
            Education
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {data.education
              .filter((e) => e.institution || e.qualification)
              .map((e) => (
                <div
                  key={e.id}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}
                >
                  <div>
                    <span style={{ fontWeight: "600", color: textDark }}>{e.qualification || "Qualification"}</span>
                    {e.institution && (
                      <span style={{ fontSize: "12px", color: textLight, marginLeft: "8px" }}>{e.institution}</span>
                    )}
                  </div>
                  <span style={{ fontSize: "11px", color: textTiny }}>{e.year}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && (
        <div>
          <h2
            style={{
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              color: accentBlue,
              margin: "0 0 10px 0",
            }}
          >
            Skills
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {data.skills.split(",").map((skill, i) => (
              <span
                key={i}
                style={{
                  padding: "3px 10px",
                  borderRadius: "4px",
                  background: lightBlue,
                  border: `1px solid ${borderBlue}`,
                  fontSize: "11px",
                  color: accentBlue,
                }}
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function CVBuilderPage() {
  const { isRTL } = useLanguage()
  const [cv, setCV] = useState<CVData>(emptyCV)
  const [showPreview, setShowPreview] = useState(true)
  const [downloading, setDownloading] = useState(false)
  // Hidden off-screen div used exclusively for PDF capture
  const hiddenRef = useRef<HTMLDivElement>(null)

  const set = (field: keyof CVData, value: string) =>
    setCV((prev) => ({ ...prev, [field]: value }))

  const setWork = (id: string, field: keyof WorkEntry, value: string) =>
    setCV((prev) => ({
      ...prev,
      work: prev.work.map((w) => (w.id === id ? { ...w, [field]: value } : w)),
    }))

  const addWork = () =>
    setCV((prev) => ({
      ...prev,
      work: [...prev.work, { id: uid(), company: "", role: "", from: "", to: "", description: "" }],
    }))

  const removeWork = (id: string) =>
    setCV((prev) => ({ ...prev, work: prev.work.filter((w) => w.id !== id) }))

  const setEdu = (id: string, field: keyof EducationEntry, value: string) =>
    setCV((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }))

  const addEdu = () =>
    setCV((prev) => ({
      ...prev,
      education: [...prev.education, { id: uid(), institution: "", qualification: "", year: "" }],
    }))

  const removeEdu = (id: string) =>
    setCV((prev) => ({ ...prev, education: prev.education.filter((e) => e.id !== id) }))

  // Download as PDF — captures the hidden off-screen div which uses only safe
  // inline styles (no Tailwind / oklch / lab colors).
  const handleDownload = useCallback(async () => {
    setDownloading(true)
    // Wait one tick so React flushes the latest CV data into the hidden element
    await new Promise((r) => setTimeout(r, 100))

    try {
      const element = hiddenRef.current
      if (!element) return

      const html2canvas = (await import("html2canvas")).default
      const { default: jsPDF } = await import("jspdf")

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        // Prevent html2canvas from reading computed styles that contain oklch
        onclone: (clonedDoc) => {
          // Strip all stylesheets from the clone so only inline styles remain
          const sheets = Array.from(clonedDoc.styleSheets)
          sheets.forEach((sheet) => {
            try {
              sheet.disabled = true
            } catch {
              // cross-origin sheets may throw — ignore
            }
          })
        },
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = pageWidth
      const imgHeight = (canvas.height * pageWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      let heightLeft = imgHeight - pageHeight
      let offsetY = -pageHeight

      while (heightLeft > 0) {
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, offsetY, imgWidth, imgHeight)
        offsetY -= pageHeight
        heightLeft -= pageHeight
      }

      pdf.save(`${cv.fullName.trim() || "cv"}.pdf`)
    } finally {
      setDownloading(false)
    }
  }, [cv])

  const inputClass = "bg-background border-border"

  return (
    <div className="min-h-screen bg-background">
      {/* Hidden off-screen element used ONLY for PDF capture — inline styles only */}
      <div
        ref={hiddenRef}
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          pointerEvents: "none",
          zIndex: -1,
        }}
        aria-hidden="true"
      >
        <CVPreview data={cv} />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            <Briefcase className="h-3.5 w-3.5" />
            CV Builder
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Create Your CV</h1>
          <p className="text-muted-foreground max-w-xl">
            Fill in the form below. When you are happy with the result, click{" "}
            <strong>Download PDF</strong> to save your CV.
          </p>
        </div>

        <div className={`grid gap-8 ${showPreview ? "lg:grid-cols-2" : "lg:grid-cols-1 max-w-2xl"}`}>
          {/* ── LEFT: Form ── */}
          <div className="space-y-6">

            {/* Personal Details */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <User className="h-4 w-4 text-primary" />
                  Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Full Name</Label>
                  <Input
                    className={inputClass}
                    placeholder="e.g. Fatima Al-Hassan"
                    value={cv.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" /> Email
                    </Label>
                    <Input
                      className={inputClass}
                      type="email"
                      placeholder="email@example.com"
                      value={cv.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5" /> Phone
                    </Label>
                    <Input
                      className={inputClass}
                      placeholder="+353 ..."
                      value={cv.phone}
                      onChange={(e) => set("phone", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> Address
                    </Label>
                    <Input
                      className={inputClass}
                      placeholder="Portlaoise, Co. Laois"
                      value={cv.address}
                      onChange={(e) => set("address", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-1">
                      <Globe className="h-3.5 w-3.5" /> Nationality
                    </Label>
                    <Input
                      className={inputClass}
                      placeholder="e.g. Irish, Syrian..."
                      value={cv.nationality}
                      onChange={(e) => set("nationality", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{isRTL ? "الملخص المهني" : "Professional Summary"}</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  className={`${inputClass} min-h-28 resize-y`}
                  placeholder="Write 2–3 sentences about yourself, your experience, and what you bring to a role..."
                  value={cv.summary}
                  onChange={(e) => set("summary", e.target.value)}
                />
              </CardContent>
            </Card>

            {/* Work Experience */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Briefcase className="h-4 w-4 text-primary" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {cv.work.map((w, idx) => (
                  <div key={w.id} className="space-y-3">
                    {idx > 0 && <Separator />}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="grid gap-1.5">
                        <Label>Job Title / Role</Label>
                        <Input
                          className={inputClass}
                          placeholder="e.g. Care Assistant"
                          value={w.role}
                          onChange={(e) => setWork(w.id, "role", e.target.value)}
                        />
                      </div>
                      <div className="grid gap-1.5">
                        <Label>Company / Employer</Label>
                        <Input
                          className={inputClass}
                          placeholder="e.g. Laois County Council"
                          value={w.company}
                          onChange={(e) => setWork(w.id, "company", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="grid gap-1.5">
                        <Label>From (year or month/year)</Label>
                        <Input
                          className={inputClass}
                          placeholder="e.g. Jan 2021"
                          value={w.from}
                          onChange={(e) => setWork(w.id, "from", e.target.value)}
                        />
                      </div>
                      <div className="grid gap-1.5">
                        <Label>To (leave blank if current)</Label>
                        <Input
                          className={inputClass}
                          placeholder="e.g. Dec 2023"
                          value={w.to}
                          onChange={(e) => setWork(w.id, "to", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid gap-1.5">
                      <Label>Key duties / achievements</Label>
                      <Textarea
                        className={`${inputClass} min-h-20 resize-y`}
                        placeholder="Describe what you did in this role..."
                        value={w.description}
                        onChange={(e) => setWork(w.id, "description", e.target.value)}
                      />
                    </div>
                    {cv.work.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive gap-2"
                        onClick={() => removeWork(w.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" className="gap-2 w-full" onClick={addWork}>
                  <Plus className="h-4 w-4" />
                  Add Another Role
                </Button>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {cv.education.map((e, idx) => (
                  <div key={e.id} className="space-y-3">
                    {idx > 0 && <Separator />}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="grid gap-1.5">
                        <Label>School / College / University</Label>
                        <Input
                          className={inputClass}
                          placeholder="e.g. Portlaoise College"
                          value={e.institution}
                          onChange={(ed) => setEdu(e.id, "institution", ed.target.value)}
                        />
                      </div>
                      <div className="grid gap-1.5">
                        <Label>Qualification / Course</Label>
                        <Input
                          className={inputClass}
                          placeholder="e.g. ESOL Level 3"
                          value={e.qualification}
                          onChange={(ed) => setEdu(e.id, "qualification", ed.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid gap-1.5">
                      <Label>Year Completed</Label>
                      <Input
                        className={inputClass}
                        placeholder="e.g. 2022"
                        value={e.year}
                        onChange={(ed) => setEdu(e.id, "year", ed.target.value)}
                      />
                    </div>
                    {cv.education.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive gap-2"
                        onClick={() => removeEdu(e.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" className="gap-2 w-full" onClick={addEdu}>
                  <Plus className="h-4 w-4" />
                  Add Another Qualification
                </Button>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Label>List your skills, separated by commas</Label>
                  <Input
                    className={inputClass}
                    placeholder="e.g. Microsoft Word, Driving Licence, Customer Service, Arabic, English"
                    value={cv.skills}
                    onChange={(e) => set("skills", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action buttons */}
            <div className="flex gap-3 flex-wrap pb-8">
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onClick={() => setShowPreview((v) => !v)}
              >
                {showPreview ? (
                  <>
                    <EyeOff className="h-4 w-4" />
                    Hide Preview
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    Show Preview
                  </>
                )}
              </Button>
              <Button size="lg" className="gap-2" onClick={handleDownload} disabled={downloading}>
                <Download className="h-4 w-4" />
                {downloading ? "Generating PDF..." : "Download PDF"}
              </Button>
            </div>
          </div>

          {/* ── RIGHT: Live Preview (desktop, respects showPreview state) ── */}
          {showPreview && (
            <div>
              <div className="sticky top-24">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" />
                  Live Preview
                </p>
                <div
                  className="rounded-xl border border-border shadow-md overflow-auto"
                  style={{ maxHeight: "calc(100vh - 130px)" }}
                >
                  <div style={{ transform: "scale(0.65)", transformOrigin: "top left", width: "154%" }}>
                    <CVPreview data={cv} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
