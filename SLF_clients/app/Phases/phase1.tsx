import React from "react";
import VideoSection, { VideoItem } from "../../components/VideoSection";
import PhaseScreenWrapper from "../../components/PhaseScreenWrapper";

export default function Phase1Screen() {
  const videos: VideoItem[] = [
    {
      id: "phase1-video1", // Unique ID for this video
      title: {
        en: "Understanding the Investigation Process",
        es: "Comprendiendo el Proceso de Investigación"
      },
      loomEmbedUrl: {
        en: "https://www.loom.com/embed/7f1c9f9542f74288b49ac530f1656869?sid=e29cf8c0-76a1-479d-8908-0d1b0b8cd75c",
        es: "https://www.loom.com/embed/SPANISH_VIDEO_ID?sid=SESSION_ID"
      },
      summary: {
        en: "In this video, we cover the initial investigation process, gathering evidence, and what to expect during the early stages of your case.",
        es: "En este video, cubrimos el proceso de investigación inicial, la recopilación de evidencia y qué esperar durante las primeras etapas de su caso."
      }
    },
    {
      id: "phase1-video2", // Unique ID for this video
      title: {
        en: "Gathering Evidence and Documentation",
        es: "Recopilación de Evidencia y Documentación"
      },
      loomEmbedUrl: {
        en: "https://www.loom.com/embed/ENGLISH_VIDEO_ID_2?sid=SESSION_ID",
        es: "https://www.loom.com/embed/SPANISH_VIDEO_ID_2?sid=SESSION_ID"
      },
      summary: {
        en: "Learn about the types of evidence needed for your case, how to organize documentation, and the importance of preserving key information.",
        es: "Aprenda sobre los tipos de evidencia necesarios para su caso, cómo organizar la documentación y la importancia de preservar información clave."
      }
    },
  ];

  return (
    <PhaseScreenWrapper phaseNumber={1} totalVideos={videos.length}>
      <VideoSection
        phaseTitle={{
          en: "Phase 1: Investigation",
          es: "Fase 1: Investigación"
        }}
        phaseDescription={{
          en: "Welcome to the Investigation phase. Watch these videos to understand the process and requirements.",
          es: "Bienvenido a la fase de Investigación. Vea estos videos para comprender el proceso y los requisitos."
        }}
        videos={videos}
        phaseNumber={1}
      />
    </PhaseScreenWrapper>
  );
}