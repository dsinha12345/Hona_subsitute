import React from "react";
import VideoSection, { VideoItem } from "../../components/VideoSection";
import PhaseScreenWrapper from "../../components/PhaseScreenWrapper";

export default function Phase1Screen() {
  const videos: VideoItem[] = [
    {
      id: "phase1-video1",
      title: {
        en: "Can I use my social media accounts while my case is pending?",
        es: "¿Puedo usar mis cuentas de redes sociales mientras mi caso está pendiente?"
      },
      loomEmbedUrl: {
        en: "https://www.loom.com/embed/7f1c9f9542f74288b49ac530f1656869?sid=08526d4c-ed38-40e3-a7eb-41783e270023",
        es: "https://www.loom.com/embed/YOUR_SPANISH_VIDEO_ID_1?sid=SESSION_ID"
      },
      summary: {
        en: "Learn about the dos and don'ts of social media usage during your case. Understand how your posts can impact your legal proceedings and what precautions to take.",
        es: "Aprenda sobre lo que debe y no debe hacer en las redes sociales durante su caso. Comprenda cómo sus publicaciones pueden afectar sus procedimientos legales y qué precauciones tomar."
      }
    },
    {
      id: "phase1-video2",
      title: {
        en: "What if I owe child support?",
        es: "¿Qué pasa si debo manutención infantil?"
      },
      loomEmbedUrl: {
        en: "https://www.loom.com/embed/519660f349b6462fbd6aae99ce418d0b",
        es: "https://www.loom.com/embed/YOUR_SPANISH_VIDEO_ID_2?sid=SESSION_ID"
      },
      summary: {
        en: "Understand how child support obligations may affect your case settlement and what steps you need to take to address outstanding payments.",
        es: "Comprenda cómo las obligaciones de manutención infantil pueden afectar el acuerdo de su caso y qué pasos debe tomar para abordar los pagos pendientes."
      }
    },
    {
      id: "phase1-video3",
      title: {
        en: "What should I do if I'm being contacted by another law firm about representation?",
        es: "¿Qué debo hacer si otra firma de abogados me está contactando sobre representación?"
      },
      loomEmbedUrl: {
        en: "https://www.loom.com/embed/d6d752b73d0f4b47ab314e661afe753c",
        es: "https://www.loom.com/embed/YOUR_SPANISH_VIDEO_ID_3?sid=SESSION_ID"
      },
      summary: {
        en: "Learn what to do when other attorneys reach out to you, your rights, and why it's important to communicate with your current legal team about these contacts.",
        es: "Aprenda qué hacer cuando otros abogados lo contactan, sus derechos y por qué es importante comunicarse con su equipo legal actual sobre estos contactos."
      }
    },
    {
      id: "phase1-video4",
      title: {
        en: "Who is responsible for my dog bite injury?",
        es: "¿Quién es responsable de mi lesión por mordedura de perro?"
      },
      loomEmbedUrl: {
        en: "https://www.loom.com/embed/961fc4a048d143c28d8c776d4fe89c8d",
        es: "https://www.loom.com/embed/YOUR_SPANISH_VIDEO_ID_4?sid=SESSION_ID"
      },
      summary: {
        en: "Understand liability in dog bite cases, including owner responsibilities, property owner obligations, and how to establish fault in your injury claim.",
        es: "Comprenda la responsabilidad en casos de mordeduras de perro, incluidas las responsabilidades del dueño, las obligaciones del propietario y cómo establecer la culpa en su reclamo por lesiones."
      }
    },
    {
      id: "phase1-video5",
      title: {
        en: "How long is this process going to take?",
        es: "¿Cuánto tiempo va a tomar este proceso?"
      },
      loomEmbedUrl: {
        en: "https://www.loom.com/embed/3335a97b379347109a5e5053e7aceb16",
        es: "https://www.loom.com/embed/YOUR_SPANISH_VIDEO_ID_5?sid=SESSION_ID"
      },
      summary: {
        en: "Get realistic timelines for your case, understand factors that affect case duration, and learn what to expect at each stage of the legal process.",
        es: "Obtenga cronogramas realistas para su caso, comprenda los factores que afectan la duración del caso y aprenda qué esperar en cada etapa del proceso legal."
      }
    },
    {
      id: "phase1-video6",
      title: {
        en: "What is cyber crime?",
        es: "¿Qué es el cibercrimen?"
      },
      loomEmbedUrl: {
        en: "https://www.loom.com/embed/9a135283dd534323a45510c31e8de911",
        es: "https://www.loom.com/embed/YOUR_SPANISH_VIDEO_ID_6?sid=SESSION_ID"
      },
      summary: {
        en: "Learn about cyber crimes, how they might relate to your case, protecting your personal information, and recognizing potential online threats during legal proceedings.",
        es: "Aprenda sobre los delitos cibernéticos, cómo pueden relacionarse con su caso, cómo proteger su información personal y reconocer posibles amenazas en línea durante los procedimientos legales."
      }
    },
    {
      id: "phase1-video7",
      title: {
        en: "What happens to my personal injury claim if I pass away?",
        es: "¿Qué pasa con mi reclamo por lesiones personales si fallezco?"
      },
      loomEmbedUrl: {
        en: "https://www.loom.com/embed/20b265d0b4904524ae4f21074eba3115",
        es: "https://www.loom.com/embed/YOUR_SPANISH_VIDEO_ID_7?sid=SESSION_ID"
      },
      summary: {
        en: "Understand what happens to your claim in the event of your passing, how your estate and beneficiaries are protected, and the legal process that follows.",
        es: "Comprenda qué sucede con su reclamo en caso de su fallecimiento, cómo se protegen su patrimonio y beneficiarios, y el proceso legal que sigue."
      }
    },
    {
      id: "phase1-video8",
      title: {
        en: "What is a consortium claim?",
        es: "¿Qué es un reclamo de consorcio?"
      },
      loomEmbedUrl: {
        en: "https://www.loom.com/embed/8dab5311f9764df6958ad79ebee5c25a",
        es: "https://www.loom.com/embed/YOUR_SPANISH_VIDEO_ID_8?sid=SESSION_ID"
      },
      summary: {
        en: "Learn about consortium claims, how they allow spouses to seek compensation for loss of companionship, and when these claims apply to your case.",
        es: "Aprenda sobre los reclamos de consorcio, cómo permiten a los cónyuges buscar compensación por la pérdida de compañía y cuándo estos reclamos se aplican a su caso."
      }
    },
    {
      id: "phase1-video9",
      title: {
        en: "Why is my insurance company involved?",
        es: "¿Por qué está involucrada mi compañía de seguros?"
      },
      loomEmbedUrl: {
        en: "https://www.loom.com/embed/e67f23a2eee8473e93e45950ea3ea67f",
        es: "https://www.loom.com/embed/YOUR_SPANISH_VIDEO_ID_9?sid=SESSION_ID"
      },
      summary: {
        en: "Understand the role of insurance companies in your case, subrogation rights, how they may affect your settlement, and what to expect from their involvement.",
        es: "Comprenda el papel de las compañías de seguros en su caso, los derechos de subrogación, cómo pueden afectar su acuerdo y qué esperar de su participación."
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
          en: "Welcome to the Investigation phase. Watch these videos to understand the process and requirements for your case.",
          es: "Bienvenido a la fase de Investigación. Vea estos videos para comprender el proceso y los requisitos de su caso."
        }}
        videos={videos}
        phaseNumber={1}
      />
    </PhaseScreenWrapper>
  );
}