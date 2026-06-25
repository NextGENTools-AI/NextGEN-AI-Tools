/**
 * Tool Screenshots & Video Tutorials
 * CSS-gradient placeholders that look like real app screenshots.
 * Video embed IDs for YouTube tutorials.
 */

export interface ToolScreenshot {
  alt: string;
  caption: string;
  /** CSS gradient that simulates a screenshot */
  gradient: string;
  /** Accent colour visible on the mock UI */
  accent: string;
}

export interface ToolVideo {
  title: string;
  description: string;
  youtubeId: string;     // real YT video ID
  duration: string;
}

export interface ToolMediaData {
  screenshots: ToolScreenshot[];
  video?: ToolVideo;
}

// Map tool IDs → media
export const toolMedia: Record<string, ToolMediaData> = {
  chatgpt: {
    screenshots: [
      { alt: 'ChatGPT conversation interface', caption: 'Clean conversational interface with GPT-4', gradient: 'from-[#0d1117] to-[#161b22]', accent: '#10a37f' },
      { alt: 'ChatGPT code generation', caption: 'Advanced code generation with syntax highlighting', gradient: 'from-[#1a1a2e] to-[#16213e]', accent: '#10a37f' },
      { alt: 'ChatGPT image generation', caption: 'DALL-E 3 integration for image creation', gradient: 'from-[#0f0f1a] to-[#1a1a2e]', accent: '#10a37f' },
    ],
    video: {
      title: 'ChatGPT Complete Tutorial 2025',
      description: 'Learn how to use ChatGPT effectively for writing, coding, analysis, and more.',
      youtubeId: 'AJpK2CBEGYE',
      duration: '15:30',
    },
  },
  claude: {
    screenshots: [
      { alt: 'Claude conversation view', caption: 'Thoughtful, nuanced responses with citations', gradient: 'from-[#1a1410] to-[#231c14]', accent: '#D97706' },
      { alt: 'Claude Artifacts feature', caption: 'Artifacts for interactive code and document previews', gradient: 'from-[#14120f] to-[#1e1a15]', accent: '#D97706' },
      { alt: 'Claude Projects', caption: 'Projects feature for organised workflows', gradient: 'from-[#171310] to-[#201a14]', accent: '#D97706' },
    ],
    video: {
      title: 'Claude AI Tutorial for Beginners',
      description: 'Master Claude for research, writing, and complex analysis tasks.',
      youtubeId: 'fBp8PFKXT3U',
      duration: '12:45',
    },
  },
  gemini: {
    screenshots: [
      { alt: 'Gemini chat interface', caption: 'Multimodal conversation with Google integration', gradient: 'from-[#0d1520] to-[#131d2e]', accent: '#4285F4' },
      { alt: 'Gemini image understanding', caption: 'Upload and analyse images in conversation', gradient: 'from-[#101828] to-[#162033]', accent: '#4285F4' },
      { alt: 'Gemini extensions', caption: 'Extensions for Gmail, Drive, and Maps', gradient: 'from-[#0e1621] to-[#141e2e]', accent: '#4285F4' },
    ],
    video: {
      title: 'Google Gemini Full Guide 2025',
      description: 'Everything you need to know about Google Gemini and its capabilities.',
      youtubeId: 'beFnGat0pBo',
      duration: '14:20',
    },
  },
  perplexity: {
    screenshots: [
      { alt: 'Perplexity search results', caption: 'AI-powered answers with inline citations', gradient: 'from-[#0d1820] to-[#122030]', accent: '#20B2AA' },
      { alt: 'Perplexity Pro Search', caption: 'Pro Search for deeper multi-step research', gradient: 'from-[#0e1a22] to-[#142232]', accent: '#20B2AA' },
    ],
    video: {
      title: 'Perplexity AI Guide',
      description: 'Learn to research faster with Perplexity AI\'s citation-powered answers.',
      youtubeId: 'TuWPjdiSuqs',
      duration: '10:15',
    },
  },
  midjourney: {
    screenshots: [
      { alt: 'Midjourney image grid', caption: 'Four image variations from a single prompt', gradient: 'from-[#12101e] to-[#1a1630]', accent: '#7C3AED' },
      { alt: 'Midjourney upscaled result', caption: 'High-resolution upscaled artwork', gradient: 'from-[#100e1c] to-[#18142a]', accent: '#7C3AED' },
    ],
    video: {
      title: 'Midjourney Complete Beginner Guide',
      description: 'Create stunning AI art with Midjourney v6. Prompting tips and techniques.',
      youtubeId: 'bR0fz5K3wEg',
      duration: '18:00',
    },
  },
  cursor: {
    screenshots: [
      { alt: 'Cursor AI code editor', caption: 'AI-first code editor with inline suggestions', gradient: 'from-[#0d0d14] to-[#141420]', accent: '#8B5CF6' },
      { alt: 'Cursor Chat', caption: 'Codebase-aware AI chat panel', gradient: 'from-[#0e0e16] to-[#151522]', accent: '#8B5CF6' },
    ],
    video: {
      title: 'Cursor AI Coding Tutorial',
      description: 'Build apps faster with Cursor\'s AI-powered coding features.',
      youtubeId: 'gqUQbjsYZLQ',
      duration: '16:40',
    },
  },
  'github-copilot': {
    screenshots: [
      { alt: 'GitHub Copilot inline suggestions', caption: 'Ghost text suggestions as you type', gradient: 'from-[#0d1117] to-[#161b22]', accent: '#6e40c9' },
      { alt: 'Copilot Chat panel', caption: 'Ask questions about your codebase', gradient: 'from-[#0d1117] to-[#161b22]', accent: '#6e40c9' },
    ],
    video: {
      title: 'GitHub Copilot Full Tutorial',
      description: 'Set up and master GitHub Copilot for maximum productivity.',
      youtubeId: 'jXp5D5ZnxGM',
      duration: '13:50',
    },
  },
  runway: {
    screenshots: [
      { alt: 'Runway Gen-2 video generation', caption: 'Text and image to video generation', gradient: 'from-[#10101a] to-[#181828]', accent: '#8B5CF6' },
      { alt: 'Runway editing tools', caption: 'Professional AI video editing suite', gradient: 'from-[#0e0e18] to-[#161626]', accent: '#8B5CF6' },
    ],
    video: {
      title: 'Runway ML Video Tutorial',
      description: 'Generate and edit videos with Runway\'s Gen-2 AI model.',
      youtubeId: 'yzqP1D3dBkI',
      duration: '11:25',
    },
  },
  canva: {
    screenshots: [
      { alt: 'Canva Magic Design', caption: 'AI-powered design suggestions from your content', gradient: 'from-[#0d1820] to-[#122030]', accent: '#00C4CC' },
      { alt: 'Canva Magic Edit', caption: 'Edit images using natural language', gradient: 'from-[#0e1a22] to-[#142232]', accent: '#00C4CC' },
    ],
    video: {
      title: 'Canva AI Features Guide',
      description: 'Design faster with Canva\'s suite of AI-powered tools.',
      youtubeId: 'Mc8R5hVxIhQ',
      duration: '12:10',
    },
  },
  'notion-ai': {
    screenshots: [
      { alt: 'Notion AI writing assistant', caption: 'AI writing and editing inside your workspace', gradient: 'from-[#0d0d14] to-[#141420]', accent: '#fff' },
      { alt: 'Notion AI Q&A', caption: 'Ask questions about your Notion content', gradient: 'from-[#0e0e16] to-[#151522]', accent: '#fff' },
    ],
    video: {
      title: 'Notion AI Complete Tutorial',
      description: 'Boost productivity with Notion AI inside your workspace.',
      youtubeId: 'SUUrGK1gJzA',
      duration: '14:00',
    },
  },
  jasper: {
    screenshots: [
      { alt: 'Jasper Brand Voice', caption: 'Configure brand voice for consistent content', gradient: 'from-[#140e1e] to-[#1e1630]', accent: '#8B5CF6' },
    ],
  },
  grammarly: {
    screenshots: [
      { alt: 'Grammarly editor', caption: 'Real-time writing suggestions and tone detection', gradient: 'from-[#0d1a18] to-[#122420]', accent: '#15C39A' },
    ],
  },
};

export function getToolMedia(toolId: string): ToolMediaData | undefined {
  return toolMedia[toolId];
}
