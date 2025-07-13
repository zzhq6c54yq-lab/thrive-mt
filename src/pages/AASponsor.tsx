
import React, { useState } from "react";
import Page from "@/components/Page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Users, MessageCircle, Calendar, Phone, Heart, Shield } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

const AASponsor = () => {
  const { isSpanish } = useTranslation();
  const [activeTab, setActiveTab] = useState("connect");

  const sponsorshipSteps = [
    {
      title: isSpanish ? "Encontrar un Padrino" : "Finding a Sponsor",
      description: isSpanish ? "Consejos para encontrar el padrino adecuado que se alinee con tus valores y objetivos de recuperación" : "Tips for finding the right sponsor who aligns with your values and recovery goals",
      detailedInfo: isSpanish ? 
        "Busca a alguien con al menos un año de sobriedad, que comparta experiencias similares, que sea del mismo género (recomendado), y que demuestre estabilidad emocional y compromiso con el programa." :
        "Look for someone with at least one year of sobriety, who shares similar experiences, is the same gender (recommended), and demonstrates emotional stability and program commitment.",
      icon: <Users className="w-6 h-6 text-blue-500" />
    },
    {
      title: isSpanish ? "Primera Reunión" : "First Meeting",
      description: isSpanish ? "Qué esperar en tu primera reunión y cómo prepararte para esta importante conversación" : "What to expect in your first meeting and how to prepare for this important conversation",
      detailedInfo: isSpanish ?
        "La primera reunión es una oportunidad para conocerse mutuamente. Prepara preguntas sobre su experiencia, expectativas, y disponibilidad. Es normal sentirse nervioso." :
        "The first meeting is an opportunity to get to know each other. Prepare questions about their experience, expectations, and availability. It's normal to feel nervous.",
      icon: <MessageCircle className="w-6 h-6 text-green-500" />
    },
    {
      title: isSpanish ? "Trabajo de Pasos" : "Step Work",
      description: isSpanish ? "Guía detallada para trabajar los 12 pasos con tu padrino de manera efectiva y significativa" : "Detailed guide to working the 12 steps with your sponsor effectively and meaningfully",
      detailedInfo: isSpanish ?
        "Los 12 pasos son la base del programa. Tu padrino te guiará a través de cada paso, desde admitir la impotencia hasta ayudar a otros. Cada paso tiene su tiempo y propósito específico." :
        "The 12 steps are the foundation of the program. Your sponsor will guide you through each step, from admitting powerlessness to helping others. Each step has its specific time and purpose.",
      icon: <Calendar className="w-6 h-6 text-purple-500" />
    },
    {
      title: isSpanish ? "Apoyo Continuo" : "Ongoing Support",
      description: isSpanish ? "Mantener una relación saludable de padrinazgo que evoluciona con tu crecimiento en recuperación" : "Maintaining a healthy sponsorship relationship that evolves with your growth in recovery",
      detailedInfo: isSpanish ?
        "La relación de padrinazgo es un compromiso a largo plazo. Incluye comunicación regular, honestidad total, y respeto mutuo. Tu padrino estará allí en crisis y celebraciones." :
        "The sponsorship relationship is a long-term commitment. It includes regular communication, complete honesty, and mutual respect. Your sponsor will be there through crises and celebrations.",
      icon: <Heart className="w-6 h-6 text-red-500" />
    }
  ];

  const emergencyContacts = [
    {
      name: isSpanish ? "Línea de Crisis AA" : "AA Crisis Line",
      number: "1-800-923-8722",
      available: isSpanish ? "24/7" : "24/7",
      description: isSpanish ? "Apoyo inmediato para crisis de alcoholismo" : "Immediate support for alcohol-related crises"
    },
    {
      name: isSpanish ? "Línea de Crisis NA" : "NA Crisis Line", 
      number: "1-818-773-9999",
      available: isSpanish ? "24/7" : "24/7",
      description: isSpanish ? "Ayuda urgente para adicción a drogas" : "Urgent help for drug addiction"
    },
    {
      name: isSpanish ? "Línea Nacional de Prevención del Suicidio" : "National Suicide Prevention Lifeline",
      number: "988",
      available: isSpanish ? "24/7" : "24/7",
      description: isSpanish ? "Apoyo en crisis de salud mental" : "Mental health crisis support"
    },
    {
      name: isSpanish ? "Texto de Crisis" : "Crisis Text Line",
      number: isSpanish ? "Envía 'HOLA' al 741741" : "Text 'HOME' to 741741",
      available: isSpanish ? "24/7" : "24/7",
      description: isSpanish ? "Apoyo por mensaje de texto" : "Text-based crisis support"
    }
  ];

  return (
    <Page title={isSpanish ? "Padrino AA/NA" : "AA/NA Sponsor"}>
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <div className="relative mb-6">
            <Shield className="w-20 h-20 text-primary mx-auto mb-6 drop-shadow-lg" />
            <div className="absolute inset-0 w-20 h-20 mx-auto bg-primary/10 rounded-full blur-xl"></div>
          </div>
          
          {/* Enhanced, More Visible Title */}
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-foreground to-accent mb-6 tracking-tight leading-tight">
            {isSpanish ? "Apoyo de Padrino AA/NA" : "AA/NA Sponsor Support"}
          </h1>
          
          {/* Comprehensive Description */}
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-xl text-muted-foreground font-medium">
              {isSpanish 
                ? "Tu puente hacia la recuperación y el crecimiento personal"
                : "Your bridge to recovery and personal growth"
              }
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {isSpanish 
                ? "Conecta con recursos de padrinazgo, herramientas de comunicación y apoyo integral para tu viaje de recuperación. Encuentra la guía que necesitas para mantener tu sobriedad y construir una vida plena."
                : "Connect with sponsorship resources, communication tools, and comprehensive support for your recovery journey. Find the guidance you need to maintain sobriety and build a fulfilling life."
              }
            </p>
            
            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-sm">
              <div className="bg-muted/50 rounded-lg p-4">
                <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="font-semibold text-foreground">
                  {isSpanish ? "Encuentra Padrinos" : "Find Sponsors"}
                </p>
                <p className="text-muted-foreground">
                  {isSpanish ? "Conecta con mentores experimentados" : "Connect with experienced mentors"}
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <MessageCircle className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="font-semibold text-foreground">
                  {isSpanish ? "Comunicación 24/7" : "24/7 Communication"}
                </p>
                <p className="text-muted-foreground">
                  {isSpanish ? "Apoyo cuando lo necesites" : "Support when you need it"}
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="font-semibold text-foreground">
                  {isSpanish ? "Trabajo de Pasos" : "Step Work"}
                </p>
                <p className="text-muted-foreground">
                  {isSpanish ? "Guía estructurada para tu crecimiento" : "Structured guidance for growth"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button 
            variant={activeTab === "connect" ? "default" : "outline"}
            onClick={() => setActiveTab("connect")}
          >
            {isSpanish ? "Conectar" : "Connect"}
          </Button>
          <Button 
            variant={activeTab === "steps" ? "default" : "outline"}
            onClick={() => setActiveTab("steps")}
          >
            {isSpanish ? "Trabajo de Pasos" : "Step Work"}
          </Button>
          <Button 
            variant={activeTab === "resources" ? "default" : "outline"}
            onClick={() => setActiveTab("resources")}
          >
            {isSpanish ? "Recursos" : "Resources"}
          </Button>
          <Button 
            variant={activeTab === "emergency" ? "default" : "outline"}
            onClick={() => setActiveTab("emergency")}
          >
            {isSpanish ? "Emergencia" : "Emergency"}
          </Button>
        </div>

        {activeTab === "connect" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-500" />
                  {isSpanish ? "Encontrar un Padrino" : "Find a Sponsor"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input placeholder={isSpanish ? "Tu ubicación" : "Your location"} />
                  <Input placeholder={isSpanish ? "Programa preferido (AA/NA)" : "Preferred program (AA/NA)"} />
                  <Button className="w-full">
                    {isSpanish ? "Buscar Padrinos Disponibles" : "Search Available Sponsors"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                  {isSpanish ? "Comunicación con Padrino" : "Sponsor Communication"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea placeholder={isSpanish ? "Mensaje para tu padrino..." : "Message to your sponsor..."} />
                  <Button className="w-full">
                    {isSpanish ? "Enviar Mensaje" : "Send Message"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "steps" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sponsorshipSteps.map((step, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    {step.icon}
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">
                      {isSpanish ? "Información Detallada:" : "Detailed Information:"}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.detailedInfo}</p>
                  </div>
                  <Button size="sm" className="w-full">
                    {isSpanish ? "Aprender Más" : "Learn More"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "resources" && (
          <div className="space-y-8">
            {/* Primary Resources */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    {isSpanish ? "Reuniones Locales" : "Local Meetings"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">
                    {isSpanish ? "Encuentra reuniones AA/NA cerca de ti con horarios actualizados" : "Find AA/NA meetings near you with updated schedules"}
                  </p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• {isSpanish ? "Búsqueda por ubicación" : "Location-based search"}</p>
                    <p>• {isSpanish ? "Filtros por tipo de reunión" : "Meeting type filters"}</p>
                    <p>• {isSpanish ? "Reuniones virtuales disponibles" : "Virtual meetings available"}</p>
                  </div>
                  <Button className="w-full">
                    {isSpanish ? "Buscar Reuniones" : "Find Meetings"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    {isSpanish ? "Literatura Aprobada" : "Approved Literature"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">
                    {isSpanish ? "Accede a libros y materiales oficiales de recuperación" : "Access official recovery books and materials"}
                  </p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• {isSpanish ? "Libro Grande de AA" : "AA Big Book"}</p>
                    <p>• {isSpanish ? "Texto Básico de NA" : "NA Basic Text"}</p>
                    <p>• {isSpanish ? "Meditaciones diarias" : "Daily meditations"}</p>
                  </div>
                  <Button className="w-full">
                    {isSpanish ? "Ver Literatura" : "View Literature"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-purple-500" />
                    {isSpanish ? "Seguimiento Personal" : "Personal Tracker"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">
                    {isSpanish ? "Rastrea tu progreso diario y celebra tus logros" : "Track your daily progress and celebrate achievements"}
                  </p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• {isSpanish ? "Contador de días sobrios" : "Sober day counter"}</p>
                    <p>• {isSpanish ? "Registro de emociones" : "Mood tracking"}</p>
                    <p>• {isSpanish ? "Reflexiones diarias" : "Daily reflections"}</p>
                  </div>
                  <Button className="w-full">
                    {isSpanish ? "Abrir Seguimiento" : "Open Tracker"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Additional Resources */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{isSpanish ? "Herramientas de Recuperación" : "Recovery Tools"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <Button variant="outline" size="sm">{isSpanish ? "Oración de la Serenidad" : "Serenity Prayer"}</Button>
                    <Button variant="outline" size="sm">{isSpanish ? "Los 12 Pasos" : "The 12 Steps"}</Button>
                    <Button variant="outline" size="sm">{isSpanish ? "Las 12 Tradiciones" : "The 12 Traditions"}</Button>
                    <Button variant="outline" size="sm">{isSpanish ? "Inventario Personal" : "Personal Inventory"}</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{isSpanish ? "Apoyo Comunitario" : "Community Support"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <Button variant="outline" size="sm">{isSpanish ? "Foros de Recuperación" : "Recovery Forums"}</Button>
                    <Button variant="outline" size="sm">{isSpanish ? "Historias de Éxito" : "Success Stories"}</Button>
                    <Button variant="outline" size="sm">{isSpanish ? "Grupos de Apoyo" : "Support Groups"}</Button>
                    <Button variant="outline" size="sm">{isSpanish ? "Red de Mentores" : "Mentor Network"}</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "emergency" && (
          <div className="space-y-8">
            {/* Emergency Alert */}
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
              <Phone className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-destructive mb-2">
                {isSpanish ? "¿En Crisis? Llama Ahora" : "In Crisis? Call Now"}
              </h2>
              <p className="text-destructive/80 mb-4">
                {isSpanish 
                  ? "Si estás en peligro inmediato o contemplando autolesión, busca ayuda inmediatamente." 
                  : "If you're in immediate danger or contemplating self-harm, seek help immediately."
                }
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="destructive" size="lg">
                  911 - {isSpanish ? "Emergencia" : "Emergency"}
                </Button>
                <Button variant="outline" size="lg">
                  988 - {isSpanish ? "Prevención Suicidio" : "Suicide Prevention"}
                </Button>
              </div>
            </div>

            {/* Emergency Contacts */}
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-destructive text-xl">
                  <Shield className="w-6 h-6" />
                  {isSpanish ? "Contactos de Emergencia 24/7" : "24/7 Emergency Contacts"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="bg-background border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-foreground text-lg">{contact.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{contact.description}</p>
                          <p className="text-xs text-primary font-medium">
                            {isSpanish ? "Disponible" : "Available"}: {contact.available}
                          </p>
                        </div>
                        <Phone className="w-5 h-5 text-primary mt-1" />
                      </div>
                      <Button variant="outline" className="w-full font-mono text-sm" size="sm">
                        {contact.number}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Crisis Response Guide */}
            <Card>
              <CardHeader>
                <CardTitle>{isSpanish ? "Guía de Respuesta a Crisis" : "Crisis Response Guide"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">
                      {isSpanish ? "Paso 1: Respira" : "Step 1: Breathe"}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {isSpanish ? "Toma respiraciones profundas y lentas. Cuenta hasta 10." : "Take deep, slow breaths. Count to 10."}
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">
                      {isSpanish ? "Paso 2: Conecta" : "Step 2: Connect"}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {isSpanish ? "Llama a tu padrino, amigo de confianza o línea de crisis." : "Call your sponsor, trusted friend, or crisis line."}
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">
                      {isSpanish ? "Paso 3: Mantente Seguro" : "Step 3: Stay Safe"}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {isSpanish ? "Ve a un lugar seguro. Evita sustancias y situaciones de riesgo." : "Go to a safe place. Avoid substances and risky situations."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Page>
  );
};

export default AASponsor;
