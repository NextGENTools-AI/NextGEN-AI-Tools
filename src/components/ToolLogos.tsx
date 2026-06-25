import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

// ChatGPT Logo
export const ChatGPTLogo: React.FC<LogoProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.6 8.3829l2.02-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997z" fill="#10a37f"/>
  </svg>
);

// Claude Logo
export const ClaudeLogo: React.FC<LogoProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4.709 15.955l4.72-2.647.08-.08 2.574-1.444c.29-.166.377-.238.377-.476 0-.238-.088-.31-.378-.476L9.51 9.388l-.08-.08-4.72-2.647c-.378-.213-.465-.308-.465-.57 0-.263.087-.358.465-.57l1.575-.884c.378-.213.465-.213.843 0l5.563 3.117.08.08 2.574 1.444c.29.166.377.238.377.476v1.492c0 .238-.088.31-.377.476l-2.574 1.444-.08.08-5.563 3.117c-.378.213-.465.213-.843 0l-1.575-.884c-.378-.212-.465-.307-.465-.57 0-.262.087-.357.465-.57z" fill="#D97706"/>
    <path d="M19.291 8.045l-4.72 2.647-.08.08-2.574 1.444c-.29.166-.377.238-.377.476 0 .238.088.31.378.476l2.573 1.444.08.08 4.72 2.647c.378.213.465.308.465.57 0 .263-.087.358-.465.57l-1.575.884c-.378.213-.465.213-.843 0l-5.563-3.117-.08-.08-2.574-1.444c-.29-.166-.377-.238-.377-.476V12.28c0-.238.088-.31.377-.476l2.574-1.444.08-.08 5.563-3.117c.378-.213.465-.213.843 0l1.575.884c.378.212.465.307.465.57 0 .262-.087.357-.465.57z" fill="#D97706"/>
  </svg>
);

// Google Gemini Logo
export const GeminiLogo: React.FC<LogoProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 24C12 24 12 12 24 12C12 12 12 0 12 0C12 0 12 12 0 12C12 12 12 24 12 24Z" fill="url(#gemini-gradient)"/>
    <defs>
      <linearGradient id="gemini-gradient" x1="0" y1="12" x2="24" y2="12" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4285F4"/>
        <stop offset="0.5" stopColor="#9B72CB"/>
        <stop offset="1" stopColor="#D96570"/>
      </linearGradient>
    </defs>
  </svg>
);

// Perplexity Logo
export const PerplexityLogo: React.FC<LogoProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L4 6v12l8 4 8-4V6l-8-4z" stroke="#20B2AA" strokeWidth="1.5" fill="none"/>
    <path d="M12 2v20M4 6l8 4 8-4M4 18l8-4 8 4" stroke="#20B2AA" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="3" fill="#20B2AA"/>
  </svg>
);

// Midjourney Logo
export const MidjourneyLogo: React.FC<LogoProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#fff"/>
    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#fff"/>
    <circle cx="12" cy="12" r="2" fill="#fff"/>
  </svg>
);

// Cursor Logo
export const CursorLogo: React.FC<LogoProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="4" fill="#000" stroke="#fff" strokeWidth="1"/>
    <path d="M8 8l8 4-8 4V8z" fill="#fff"/>
  </svg>
);

// GitHub Copilot Logo
export const CopilotLogo: React.FC<LogoProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.02 10.02 0 0022 12c0-5.52-4.48-10-10-10z" fill="#6e40c9"/>
    <path d="M9 15.5c0 .28.22.5.5.5h5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-5c-.28 0-.5.22-.5.5z" fill="#6e40c9"/>
  </svg>
);

// Runway Logo
export const RunwayLogo: React.FC<LogoProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#000"/>
    <path d="M7 12h10M12 7v10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="3" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
  </svg>
);

// ElevenLabs Logo
export const ElevenLabsLogo: React.FC<LogoProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="3" fill="#000"/>
    <rect x="7" y="6" width="2" height="12" rx="1" fill="#fff"/>
    <rect x="11" y="6" width="2" height="12" rx="1" fill="#fff"/>
    <rect x="15" y="6" width="2" height="12" rx="1" fill="#fff"/>
  </svg>
);

// Notion AI Logo
export const NotionLogo: React.FC<LogoProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.906c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.166V6.382c0-.606-.233-.933-.748-.886l-15.177.887c-.56.047-.747.327-.747.886zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.22.186c-.094-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.453-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.886.747-.933l3.222-.186zM2.24.935l13.402-.84c1.635-.14 2.055-.047 3.08.7l4.25 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.633-1.682 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.127-4.066c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.355-1.633z" fill="#fff"/>
  </svg>
);

// Jasper Logo
export const JasperLogo: React.FC<LogoProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#8B5CF6"/>
    <path d="M12 6v6l4 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="6" stroke="#fff" strokeWidth="1.5" fill="none"/>
  </svg>
);

// Canva Logo
export const CanvaLogo: React.FC<LogoProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill="#00C4CC"/>
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5c1.12 0 2.15-.37 2.99-1H15c1.1 0 2-.9 2-2v-2c0-2.76-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill="#fff"/>
  </svg>
);

// DALL-E Logo
export const DalleLogo: React.FC<LogoProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#10a37f"/>
    <path d="M7 12h10M12 7v10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="8" cy="8" r="1.5" fill="#fff"/>
    <circle cx="16" cy="16" r="1.5" fill="#fff"/>
  </svg>
);

// Stable Diffusion Logo
export const StableDiffusionLogo: React.FC<LogoProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill="#7C3AED"/>
    <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 8v8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Grammarly Logo
export const GrammarlyLogo: React.FC<LogoProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill="#15C39A"/>
    <path d="M8 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Map tool IDs to their logo components
export const toolLogos: Record<string, React.FC<LogoProps>> = {
  'chatgpt': ChatGPTLogo,
  'claude': ClaudeLogo,
  'gemini': GeminiLogo,
  'perplexity': PerplexityLogo,
  'midjourney': MidjourneyLogo,
  'cursor': CursorLogo,
  'github-copilot': CopilotLogo,
  'runway': RunwayLogo,
  'elevenlabs': ElevenLabsLogo,
  'notion-ai': NotionLogo,
  'jasper': JasperLogo,
  'canva': CanvaLogo,
  'dall-e-3': DalleLogo,
  'stable-diffusion': StableDiffusionLogo,
  'grammarly': GrammarlyLogo,
};

// Helper component to render tool logo or fallback
interface ToolLogoProps extends LogoProps {
  toolId: string;
  fallbackLetter?: string;
  fallbackGradient?: string;
}

export const ToolLogo: React.FC<ToolLogoProps> = ({ 
  toolId, 
  size = 24, 
  className = '',
  fallbackLetter = '?',
  fallbackGradient = 'from-brand-500/20 to-cyan-500/20'
}) => {
  const LogoComponent = toolLogos[toolId];
  
  if (LogoComponent) {
    return <LogoComponent size={size} className={className} />;
  }
  
  // Fallback to letter-based logo
  return (
    <div 
      className={`flex items-center justify-center rounded-lg bg-gradient-to-br ${fallbackGradient} ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="text-white font-bold" style={{ fontSize: size * 0.45 }}>
        {fallbackLetter}
      </span>
    </div>
  );
};

export default ToolLogo;
