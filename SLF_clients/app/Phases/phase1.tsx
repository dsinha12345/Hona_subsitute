import React from "react";
import VideoSection, { VideoItem } from "../../components/VideoSection";

export default function Phase1Screen() {
  const videos: VideoItem[] = [
    {
      title: {
        en: "Understanding the Intake Process",
        es: "Comprendiendo el Proceso de Admisión"
      },
      loomEmbedUrl: {
        en: "https://www.loom.com/embed/7f1c9f9542f74288b49ac530f1656869?sid=e29cf8c0-76a1-479d-8908-0d1b0b8cd75c",
        es: "https://www.loom.com/embed/SPANISH_VIDEO_ID?sid=SESSION_ID"
      },
      summary: {
        en: "In this video, we cover the initial intake process, what documents you'll need to prepare, and what to expect during your first consultation with our legal team.",
        es: "En este video, cubrimos el proceso inicial de admisión, qué documentos necesitará preparar y qué esperar durante su primera consulta con nuestro equipo legal."
      }
    },
    {
      title: {
        en: "Required Documentation",
        es: "Documentación Requerida"
      },
      loomEmbedUrl: {
        en: "https://www.loom.com/embed/ENGLISH_VIDEO_ID_2?sid=SESSION_ID",
        es: "https://www.loom.com/embed/SPANISH_VIDEO_ID_2?sid=SESSION_ID"
      },
      summary: {
        en: "Learn about all the essential documents required for your case, including identification, financial records, and relevant correspondence.",
        es: "Aprenda sobre todos los documentos esenciales requeridos para su caso, incluyendo identificación, registros financieros y correspondencia relevante."
      }
    },
  ];

  return (
    <VideoSection
      phaseTitle={{
        en: "Phase 1: Intake",
        es: "Fase 1: Admisión"
      }}
      phaseDescription={{
        en: "Welcome to the Intake phase. Watch these videos to understand the process and requirements.",
        es: "Bienvenido a la fase de Admisión. Vea estos videos para comprender el proceso y los requisitos."
      }}
      videos={videos}
    />
  );
}