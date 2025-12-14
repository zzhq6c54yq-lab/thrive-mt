import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, GraduationCap, Heart, Shield, Users, Calendar, FileText, Activity, Clock, Brain } from 'lucide-react';
import { AddOn } from './data/types';
import useTranslation from '@/hooks/useTranslation';

interface PreviewPortalProps {
  addOn: AddOn;
}

const PreviewPortal: React.FC<PreviewPortalProps> = ({ addOn }) => {
  const { isSpanish } = useTranslation();

  const getPortalPreview = () => {
    const addOnId = addOn.id;

    // Common preview elements
    const commonElements = {
      lockOverlay: (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
          <div className="text-center">
            <Lock className="h-8 w-8 text-white/90 mx-auto mb-2" />
            <p className="text-white/90 text-sm font-medium">
              {isSpanish ? 'Contenido Bloqueado' : 'Locked Content'}
            </p>
          </div>
        </div>
      )
    };

    switch (addOnId) {
      case 'college-students':
        return (
          <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="h-8 w-8 text-purple-400" />
              <h3 className="text-2xl font-bold text-white">
                {isSpanish ? 'Portal Universitario' : 'College Portal'}
              </h3>
            </div>
            
            {/* Tab Navigation Preview */}
            <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
              <div className="px-4 py-2 bg-purple-600/30 rounded-t-lg text-white text-sm font-medium">
                {isSpanish ? 'Recursos' : 'Resources'}
              </div>
              <div className="px-4 py-2 text-white/60 text-sm">{isSpanish ? 'Comunidad' : 'Community'}</div>
              <div className="px-4 py-2 text-white/60 text-sm">{isSpanish ? 'Evaluaciones' : 'Assessments'}</div>
            </div>

            {/* Content Grid Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
              <Card className="bg-white/5 border-white/10 relative overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-purple-400" />
                    <span className="text-white font-medium text-sm">
                      {isSpanish ? 'Manejo del Estrés' : 'Stress Management'}
                    </span>
                  </div>
                  <p className="text-white/70 text-xs">
                    {isSpanish ? 'Técnicas para exámenes...' : 'Techniques for exams...'}
                  </p>
                </CardContent>
                {commonElements.lockOverlay}
              </Card>

              <Card className="bg-white/5 border-white/10 relative overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-purple-400" />
                    <span className="text-white font-medium text-sm">
                      {isSpanish ? 'Gestión del Tiempo' : 'Time Management'}
                    </span>
                  </div>
                  <p className="text-white/70 text-xs">
                    {isSpanish ? 'Organiza tu horario...' : 'Organize your schedule...'}
                  </p>
                </CardContent>
                {commonElements.lockOverlay}
              </Card>

              <Card className="bg-white/5 border-white/10 relative overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-purple-400" />
                    <span className="text-white font-medium text-sm">
                      {isSpanish ? 'Grupos de Estudio' : 'Study Groups'}
                    </span>
                  </div>
                  <p className="text-white/70 text-xs">
                    {isSpanish ? 'Únete a grupos virtuales...' : 'Join virtual groups...'}
                  </p>
                </CardContent>
                {commonElements.lockOverlay}
              </Card>
            </div>
          </div>
        );

      case 'cancer-support':
        return (
          <div className="bg-gradient-to-br from-pink-900/20 to-rose-900/20 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="h-8 w-8 text-pink-400" />
              <h3 className="text-2xl font-bold text-white">
                {isSpanish ? 'Portal de Apoyo Cancer' : 'Cancer Support Portal'}
              </h3>
            </div>
            
            {/* Tab Navigation Preview */}
            <div className="flex gap-2 mb-6 border-b border-white/10 pb-4 flex-wrap">
              <div className="px-3 py-2 bg-pink-600/30 rounded-t-lg text-white text-sm font-medium">
                {isSpanish ? 'Pacientes' : 'Patients'}
              </div>
              <div className="px-3 py-2 text-white/60 text-sm">{isSpanish ? 'Cuidadores' : 'Caregivers'}</div>
              <div className="px-3 py-2 text-white/60 text-sm">{isSpanish ? 'Recursos' : 'Resources'}</div>
              <div className="px-3 py-2 text-white/60 text-sm">{isSpanish ? 'Comunidades' : 'Communities'}</div>
            </div>

            {/* Content Grid Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
              <Card className="bg-white/5 border-white/10 relative overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-pink-400" />
                    <span className="text-white font-medium text-sm">
                      {isSpanish ? 'Recién Diagnosticado' : 'Newly Diagnosed'}
                    </span>
                  </div>
                  <p className="text-white/70 text-xs">
                    {isSpanish ? 'Guías y recursos iniciales...' : 'Initial guides and resources...'}
                  </p>
                </CardContent>
                {commonElements.lockOverlay}
              </Card>

              <Card className="bg-white/5 border-white/10 relative overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-pink-400" />
                    <span className="text-white font-medium text-sm">
                      {isSpanish ? 'Durante el Tratamiento' : 'During Treatment'}
                    </span>
                  </div>
                  <p className="text-white/70 text-xs">
                    {isSpanish ? 'Apoyo durante la terapia...' : 'Support during therapy...'}
                  </p>
                </CardContent>
                {commonElements.lockOverlay}
              </Card>
            </div>
          </div>
        );

      case 'chronic-illness':
        return (
          <div className="bg-gradient-to-br from-emerald-900/20 to-blue-900/20 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="h-8 w-8 text-emerald-400" />
              <h3 className="text-2xl font-bold text-white">
                {isSpanish ? 'Portal Enfermedades Crónicas' : 'Chronic Illness Portal'}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
              <Card className="bg-white/5 border-white/10 relative overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-emerald-400" />
                    <span className="text-white font-medium text-sm">
                      {isSpanish ? 'Manejo de Síntomas' : 'Symptom Management'}
                    </span>
                  </div>
                  <p className="text-white/70 text-xs">
                    {isSpanish ? 'Estrategias de afrontamiento...' : 'Coping strategies...'}
                  </p>
                </CardContent>
                {commonElements.lockOverlay}
              </Card>

              <Card className="bg-white/5 border-white/10 relative overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-emerald-400" />
                    <span className="text-white font-medium text-sm">
                      {isSpanish ? 'Red de Apoyo' : 'Support Network'}
                    </span>
                  </div>
                  <p className="text-white/70 text-xs">
                    {isSpanish ? 'Conecta con otros pacientes...' : 'Connect with other patients...'}
                  </p>
                </CardContent>
                {commonElements.lockOverlay}
              </Card>
            </div>
          </div>
        );

      case 'single-parents':
        return (
          <div className="bg-gradient-to-br from-rose-900/20 to-pink-900/20 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="h-8 w-8 text-rose-400" />
              <h3 className="text-2xl font-bold text-white">
                {isSpanish ? 'Portal de Padres Solteros' : 'Single Parents Portal'}
              </h3>
            </div>
            
            {/* Tab Navigation Preview */}
            <div className="flex gap-2 mb-6 border-b border-white/10 pb-4 flex-wrap">
              <div className="px-3 py-2 bg-rose-600/30 rounded-t-lg text-white text-sm font-medium">
                {isSpanish ? 'Bienestar' : 'Wellness'}
              </div>
              <div className="px-3 py-2 text-white/60 text-sm">{isSpanish ? 'Herramientas' : 'Tools'}</div>
              <div className="px-3 py-2 text-white/60 text-sm">{isSpanish ? 'Red de Padres' : 'Parent Network'}</div>
              <div className="px-3 py-2 text-white/60 text-sm">{isSpanish ? 'Recursos' : 'Resources'}</div>
            </div>

            {/* Content Grid Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
              <Card className="bg-white/5 border-white/10 relative overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-5 w-5 text-rose-400" />
                    <span className="text-white font-medium text-sm">
                      {isSpanish ? 'Prevención de Agotamiento' : 'Burnout Prevention'}
                    </span>
                  </div>
                  <p className="text-white/70 text-xs">
                    {isSpanish ? 'Estrategias de autocuidado...' : 'Self-care strategies...'}
                  </p>
                </CardContent>
                {commonElements.lockOverlay}
              </Card>

              <Card className="bg-white/5 border-white/10 relative overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-rose-400" />
                    <span className="text-white font-medium text-sm">
                      {isSpanish ? 'Co-Paternidad' : 'Co-Parenting'}
                    </span>
                  </div>
                  <p className="text-white/70 text-xs">
                    {isSpanish ? 'Herramientas de comunicación...' : 'Communication tools...'}
                  </p>
                </CardContent>
                {commonElements.lockOverlay}
              </Card>

              <Card className="bg-white/5 border-white/10 relative overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-rose-400" />
                    <span className="text-white font-medium text-sm">
                      {isSpanish ? 'Equilibrio Trabajo-Vida' : 'Work-Life Balance'}
                    </span>
                  </div>
                  <p className="text-white/70 text-xs">
                    {isSpanish ? 'Talleres de integración...' : 'Integration workshops...'}
                  </p>
                </CardContent>
                {commonElements.lockOverlay}
              </Card>

              <Card className="bg-white/5 border-white/10 relative overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-rose-400" />
                    <span className="text-white font-medium text-sm">
                      {isSpanish ? 'Bienestar Financiero' : 'Financial Wellness'}
                    </span>
                  </div>
                  <p className="text-white/70 text-xs">
                    {isSpanish ? 'Recursos de planificación...' : 'Planning resources...'}
                  </p>
                </CardContent>
                {commonElements.lockOverlay}
              </Card>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <addOn.icon className="h-8 w-8 text-[#B87333]" />
              <h3 className="text-2xl font-bold text-white">{addOn.title} Portal</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
              <Card className="bg-white/5 border-white/10 relative overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-[#B87333]" />
                    <span className="text-white font-medium text-sm">
                      {isSpanish ? 'Recursos' : 'Resources'}
                    </span>
                  </div>
                  <p className="text-white/70 text-xs">
                    {isSpanish ? 'Acceso a materiales especializados...' : 'Access to specialized materials...'}
                  </p>
                </CardContent>
                {commonElements.lockOverlay}
              </Card>

              <Card className="bg-white/5 border-white/10 relative overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-[#B87333]" />
                    <span className="text-white font-medium text-sm">
                      {isSpanish ? 'Talleres' : 'Workshops'}
                    </span>
                  </div>
                  <p className="text-white/70 text-xs">
                    {isSpanish ? 'Sesiones en vivo especializadas...' : 'Specialized live sessions...'}
                  </p>
                </CardContent>
                {commonElements.lockOverlay}
              </Card>

              <Card className="bg-white/5 border-white/10 relative overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-[#B87333]" />
                    <span className="text-white font-medium text-sm">
                      {isSpanish ? 'Comunidad' : 'Community'}
                    </span>
                  </div>
                  <p className="text-white/70 text-xs">
                    {isSpanish ? 'Conecta con pares...' : 'Connect with peers...'}
                  </p>
                </CardContent>
                {commonElements.lockOverlay}
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-black/20">
      {getPortalPreview()}
    </div>
  );
};

export default PreviewPortal;