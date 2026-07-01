import { tools } from './tools';

/**
 * Tool Screenshots, Galleries, Thumbnails & Video Tutorials
 *
 * This file generates premium placeholder media for every tool in ../data/tools.
 * You can replace YouTube placeholder IDs, screenshots, thumbnails, and captions later.
 */

export interface ToolScreenshot {
  alt: string;
  caption: string;
  /** Tailwind gradient classes that simulate an app screenshot */
  gradient: string;
  /** Accent colour visible on the mock UI */
  accent: string;
}

export interface ToolGalleryItem {
  alt: string;
  caption: string;
  gradient: string;
  accent: string;
  type: 'dashboard' | 'editor' | 'workflow' | 'results' | 'analytics';
}

export interface ToolThumbnail {
  alt: string;
  title: string;
  gradient: string;
  accent: string;
  label: string;
}

export interface ToolVideo {
  title: string;
  description: string;
  /**
   * YouTube video ID.
   * Placeholder value can be replaced with a real tutorial video ID later.
   */
  youtubeId: string;
  duration: string;
  thumbnail?: ToolThumbnail;
}

export interface ToolMediaData {
  screenshots: ToolScreenshot[];
  video?: ToolVideo;
  gallery: ToolGalleryItem[];
  thumbnail: ToolThumbnail;
}

const PLACEHOLDER_YOUTUBE_ID = 'VIDEO_ID_PLACEHOLDER';

const categoryAccentMap: Record<string, string> = {
  'ai-writing': '#8B5CF6',
  'ai-copywriting': '#A855F7',
  'ai-content': '#6366F1',
  'ai-email': '#3B82F6',
  'ai-coding': '#22C55E',
  'ai-development': '#10B981',
  'ai-code-assistants': '#14B8A6',
  'ai-image-generation': '#EC4899',
  'ai-design': '#F97316',
  'ai-art': '#D946EF',
  'ai-video-generation': '#EF4444',
  'ai-video-editing': '#F43F5E',
  'ai-chatbots': '#10A37F',
  'ai-assistants': '#06B6D4',
  'ai-business': '#F59E0B',
  'ai-marketing': '#FB7185',
  'ai-sales': '#F97316',
  'ai-analytics': '#38BDF8',
  'ai-research': '#20B2AA',
  'ai-education': '#84CC16',
  'ai-search': '#2DD4BF',
  'ai-productivity': '#6366F1',
  'ai-automation': '#0EA5E9',
  'ai-meetings': '#A78BFA',
};

const categoryGradientMap: Record<string, string> = {
  'ai-writing': 'from-[#171026] to-[#251742]',
  'ai-copywriting': 'from-[#190f2e] to-[#29184a]',
  'ai-content': 'from-[#10172a] to-[#1d2a4d]',
  'ai-email': 'from-[#0d1524] to-[#14274a]',
  'ai-coding': 'from-[#071a12] to-[#0d2a1d]',
  'ai-development': 'from-[#061a18] to-[#0e2f2a]',
  'ai-code-assistants': 'from-[#06191b] to-[#0d2d31]',
  'ai-image-generation': 'from-[#211024] to-[#3b1744]',
  'ai-design': 'from-[#24140b] to-[#3d2111]',
  'ai-art': 'from-[#20102a] to-[#37194d]',
  'ai-video-generation': 'from-[#241010] to-[#421818]',
  'ai-video-editing': 'from-[#24101a] to-[#42182a]',
  'ai-chatbots': 'from-[#0d1815] to-[#132620]',
  'ai-assistants': 'from-[#0d1820] to-[#12283a]',
  'ai-business': 'from-[#201608] to-[#35250d]',
  'ai-marketing': 'from-[#241019] to-[#421827]',
  'ai-sales': 'from-[#241407] to-[#42240d]',
  'ai-analytics': 'from-[#071824] to-[#0d2a3f]',
  'ai-research': 'from-[#071c1d] to-[#0d3032]',
  'ai-education': 'from-[#111c07] to-[#20330d]',
  'ai-search': 'from-[#071c1b] to-[#0c302e]',
  'ai-productivity': 'from-[#101426] to-[#1d2444]',
  'ai-automation': 'from-[#071724] to-[#0d2940]',
  'ai-meetings': 'from-[#171026] to-[#2a1d45]',
};

function getAccent(categorySlug: string, fallback = '#8B5CF6') {
  return categoryAccentMap[categorySlug] || fallback;
}

function getGradient(categorySlug: string, fallback?: string) {
  return categoryGradientMap[categorySlug] || fallback || 'from-[#0d1117] to-[#161b22]';
}

function createDefaultThumbnail(tool: (typeof tools)[number]): ToolThumbnail {
  const accent = getAccent(tool.categorySlug);
  const gradient = getGradient(tool.categorySlug, tool.gradient);

  return {
    alt: `${tool.name} thumbnail preview`,
    title: `${tool.name} Interface Preview`,
    gradient,
    accent,
    label: tool.category,
  };
}

function createDefaultScreenshots(tool: (typeof tools)[number]): ToolScreenshot[] {
  const accent = getAccent(tool.categorySlug);
  const gradient = getGradient(tool.categorySlug, tool.gradient);

  return [
    {
      alt: `${tool.name} dashboard interface`,
      caption: `${tool.name} dashboard overview with core workspace and navigation`,
      gradient,
      accent,
    },
    {
      alt: `${tool.name} workflow screen`,
      caption: `${tool.name} workflow view showing AI-powered actions and outputs`,
      gradient,
      accent,
    },
    {
      alt: `${tool.name} results screen`,
      caption: `${tool.name} results preview with generated output and controls`,
      gradient,
      accent,
    },
  ];
}

function createDefaultGallery(tool: (typeof tools)[number]): ToolGalleryItem[] {
  const accent = getAccent(tool.categorySlug);
  const gradient = getGradient(tool.categorySlug, tool.gradient);

  return [
    {
      type: 'dashboard',
      alt: `${tool.name} dashboard gallery image`,
      caption: `Dashboard overview for managing ${tool.name} workflows`,
      gradient,
      accent,
    },
    {
      type: 'editor',
      alt: `${tool.name} editor gallery image`,
      caption: `Editor-style interface for creating and refining AI outputs`,
      gradient,
      accent,
    },
    {
      type: 'workflow',
      alt: `${tool.name} workflow gallery image`,
      caption: `Workflow screen showing common tasks and automation steps`,
      gradient,
      accent,
    },
    {
      type: 'results',
      alt: `${tool.name} results gallery image`,
      caption: `Results view with generated content, suggestions, or analysis`,
      gradient,
      accent,
    },
    {
      type: 'analytics',
      alt: `${tool.name} analytics gallery image`,
      caption: `Analytics-style view for tracking usage, performance, or output quality`,
      gradient,
      accent,
    },
  ];
}

function createDefaultVideo(tool: (typeof tools)[number]): ToolVideo {
  return {
    title: `${tool.name} Tutorial & Workflow Guide`,
    description: `A placeholder tutorial for learning how to use ${tool.name} for ${tool.category.toLowerCase()} workflows. Replace the YouTube ID with a real video when available.`,
    youtubeId: PLACEHOLDER_YOUTUBE_ID,
    duration: '10:00',
    thumbnail: createDefaultThumbnail(tool),
  };
}

function createDefaultMedia(tool: (typeof tools)[number]): ToolMediaData {
  return {
    screenshots: createDefaultScreenshots(tool),
    video: createDefaultVideo(tool),
    gallery: createDefaultGallery(tool),
    thumbnail: createDefaultThumbnail(tool),
  };
}

const generatedToolMedia: Record<string, ToolMediaData> = tools.reduce(
  (acc, tool) => {
    acc[tool.id] = createDefaultMedia(tool);
    return acc;
  },
  {} as Record<string, ToolMediaData>
);

/**
 * Custom premium media for popular tools.
 * These override the generated placeholders above.
 */
const customToolMedia: Record<string, Partial<ToolMediaData>> = {
  chatgpt: {
    screenshots: [
      {
        alt: 'ChatGPT conversation interface',
        caption: 'Clean conversational interface with advanced reasoning and GPT models',
        gradient: 'from-[#0d1117] to-[#161b22]',
        accent: '#10a37f',
      },
      {
        alt: 'ChatGPT code generation workspace',
        caption: 'Advanced code generation with explanation, debugging, and syntax-aware responses',
        gradient: 'from-[#1a1a2e] to-[#16213e]',
        accent: '#10a37f',
      },
      {
        alt: 'ChatGPT multimodal AI workspace',
        caption: 'Multimodal AI workspace for text, images, files, analysis, and automation',
        gradient: 'from-[#0f0f1a] to-[#1a1a2e]',
        accent: '#10a37f',
      },
    ],
    video: {
      title: 'ChatGPT Complete Tutorial',
      description:
        'Learn how to use ChatGPT effectively for writing, coding, research, analysis, brainstorming, and daily productivity.',
      youtubeId: 'AJpK2CBEGYE',
      duration: '15:30',
      thumbnail: {
        alt: 'ChatGPT tutorial thumbnail',
        title: 'ChatGPT Complete Tutorial',
        gradient: 'from-[#0d1117] to-[#161b22]',
        accent: '#10a37f',
        label: 'AI Assistant',
      },
    },
    gallery: [
      {
        type: 'dashboard',
        alt: 'ChatGPT home dashboard',
        caption: 'ChatGPT start screen with recent chats and quick actions',
        gradient: 'from-[#0d1117] to-[#161b22]',
        accent: '#10a37f',
      },
      {
        type: 'editor',
        alt: 'ChatGPT prompt editor',
        caption: 'Prompt composer for writing, coding, and analysis tasks',
        gradient: 'from-[#101820] to-[#18232f]',
        accent: '#10a37f',
      },
      {
        type: 'workflow',
        alt: 'ChatGPT file analysis workflow',
        caption: 'Upload documents and analyze them with step-by-step reasoning',
        gradient: 'from-[#111827] to-[#1f2937]',
        accent: '#10a37f',
      },
      {
        type: 'results',
        alt: 'ChatGPT answer result',
        caption: 'Structured answer output with headings, bullets, and code blocks',
        gradient: 'from-[#0f172a] to-[#1e293b]',
        accent: '#10a37f',
      },
      {
        type: 'analytics',
        alt: 'ChatGPT productivity workspace',
        caption: 'Organized AI workspace for repeatable productivity workflows',
        gradient: 'from-[#111827] to-[#172033]',
        accent: '#10a37f',
      },
    ],
    thumbnail: {
      alt: 'ChatGPT thumbnail preview',
      title: 'ChatGPT AI Assistant Preview',
      gradient: 'from-[#0d1117] to-[#161b22]',
      accent: '#10a37f',
      label: 'ChatGPT',
    },
  },

  claude: {
    screenshots: [
      {
        alt: 'Claude conversation view',
        caption: 'Thoughtful, nuanced AI responses for writing, research, and complex reasoning',
        gradient: 'from-[#1a1410] to-[#231c14]',
        accent: '#D97706',
      },
      {
        alt: 'Claude Artifacts feature',
        caption: 'Artifacts for interactive documents, code, apps, and previews',
        gradient: 'from-[#14120f] to-[#1e1a15]',
        accent: '#D97706',
      },
      {
        alt: 'Claude Projects workspace',
        caption: 'Projects feature for organized long-context workflows',
        gradient: 'from-[#171310] to-[#201a14]',
        accent: '#D97706',
      },
    ],
    video: {
      title: 'Claude AI Tutorial for Beginners',
      description:
        'Master Claude for writing, research, structured thinking, document analysis, and complex planning.',
      youtubeId: 'fBp8PFKXT3U',
      duration: '12:45',
      thumbnail: {
        alt: 'Claude tutorial thumbnail',
        title: 'Claude AI Tutorial',
        gradient: 'from-[#1a1410] to-[#231c14]',
        accent: '#D97706',
        label: 'Claude',
      },
    },
    thumbnail: {
      alt: 'Claude thumbnail preview',
      title: 'Claude AI Workspace Preview',
      gradient: 'from-[#1a1410] to-[#231c14]',
      accent: '#D97706',
      label: 'Claude',
    },
  },

  gemini: {
    screenshots: [
      {
        alt: 'Gemini chat interface',
        caption: 'Multimodal conversation with Google ecosystem integration',
        gradient: 'from-[#0d1520] to-[#131d2e]',
        accent: '#4285F4',
      },
      {
        alt: 'Gemini image understanding',
        caption: 'Upload and analyze images directly in conversation',
        gradient: 'from-[#101828] to-[#162033]',
        accent: '#4285F4',
      },
      {
        alt: 'Gemini extensions screen',
        caption: 'Extensions for Gmail, Drive, Docs, YouTube, and Maps workflows',
        gradient: 'from-[#0e1621] to-[#141e2e]',
        accent: '#4285F4',
      },
    ],
    video: {
      title: 'Google Gemini Full Guide',
      description:
        'Everything you need to know about Gemini for research, productivity, multimodal prompts, and Google apps.',
      youtubeId: 'beFnGat0pBo',
      duration: '14:20',
      thumbnail: {
        alt: 'Gemini tutorial thumbnail',
        title: 'Google Gemini Full Guide',
        gradient: 'from-[#0d1520] to-[#131d2e]',
        accent: '#4285F4',
        label: 'Gemini',
      },
    },
    thumbnail: {
      alt: 'Gemini thumbnail preview',
      title: 'Gemini AI Assistant Preview',
      gradient: 'from-[#0d1520] to-[#131d2e]',
      accent: '#4285F4',
      label: 'Gemini',
    },
  },

  perplexity: {
    screenshots: [
      {
        alt: 'Perplexity search results',
        caption: 'AI-powered search answers with inline citations and source links',
        gradient: 'from-[#0d1820] to-[#122030]',
        accent: '#20B2AA',
      },
      {
        alt: 'Perplexity Pro Search',
        caption: 'Pro Search for deeper multi-step research and source discovery',
        gradient: 'from-[#0e1a22] to-[#142232]',
        accent: '#20B2AA',
      },
      {
        alt: 'Perplexity research collections',
        caption: 'Organize research threads, citations, and follow-up questions',
        gradient: 'from-[#071c1d] to-[#0d3032]',
        accent: '#20B2AA',
      },
    ],
    video: {
      title: 'Perplexity AI Research Guide',
      description:
        'Learn how to research faster with Perplexity AI, citations, Pro Search, and source-backed answers.',
      youtubeId: 'TuWPjdiSuqs',
      duration: '10:15',
      thumbnail: {
        alt: 'Perplexity tutorial thumbnail',
        title: 'Perplexity AI Research Guide',
        gradient: 'from-[#0d1820] to-[#122030]',
        accent: '#20B2AA',
        label: 'Research',
      },
    },
    thumbnail: {
      alt: 'Perplexity thumbnail preview',
      title: 'Perplexity AI Search Preview',
      gradient: 'from-[#0d1820] to-[#122030]',
      accent: '#20B2AA',
      label: 'Perplexity',
    },
  },

  midjourney: {
    screenshots: [
      {
        alt: 'Midjourney image grid',
        caption: 'Four image variations generated from a single creative prompt',
        gradient: 'from-[#12101e] to-[#1a1630]',
        accent: '#7C3AED',
      },
      {
        alt: 'Midjourney upscaled result',
        caption: 'High-resolution upscaled artwork with strong visual detail',
        gradient: 'from-[#100e1c] to-[#18142a]',
        accent: '#7C3AED',
      },
      {
        alt: 'Midjourney style exploration',
        caption: 'Explore visual styles, prompt parameters, and creative variations',
        gradient: 'from-[#1a1028] to-[#2c1745]',
        accent: '#7C3AED',
      },
    ],
    video: {
      title: 'Midjourney Complete Beginner Guide',
      description:
        'Create stunning AI art with Midjourney using prompt structure, style references, parameters, and upscaling.',
      youtubeId: 'bR0fz5K3wEg',
      duration: '18:00',
      thumbnail: {
        alt: 'Midjourney tutorial thumbnail',
        title: 'Midjourney Beginner Guide',
        gradient: 'from-[#12101e] to-[#1a1630]',
        accent: '#7C3AED',
        label: 'AI Art',
      },
    },
    thumbnail: {
      alt: 'Midjourney thumbnail preview',
      title: 'Midjourney AI Image Preview',
      gradient: 'from-[#12101e] to-[#1a1630]',
      accent: '#7C3AED',
      label: 'Midjourney',
    },
  },

  cursor: {
    screenshots: [
      {
        alt: 'Cursor AI code editor',
        caption: 'AI-first code editor with inline suggestions and natural language editing',
        gradient: 'from-[#0d0d14] to-[#141420]',
        accent: '#8B5CF6',
      },
      {
        alt: 'Cursor Chat panel',
        caption: 'Codebase-aware AI chat panel for editing, debugging, and explanations',
        gradient: 'from-[#0e0e16] to-[#151522]',
        accent: '#8B5CF6',
      },
      {
        alt: 'Cursor composer workflow',
        caption: 'Multi-file editing workflow for building features faster',
        gradient: 'from-[#10101a] to-[#1b1b2d]',
        accent: '#8B5CF6',
      },
    ],
    video: {
      title: 'Cursor AI Coding Tutorial',
      description:
        'Build apps faster with Cursor using AI chat, inline edits, codebase context, and composer workflows.',
      youtubeId: 'gqUQbjsYZLQ',
      duration: '16:40',
      thumbnail: {
        alt: 'Cursor tutorial thumbnail',
        title: 'Cursor AI Coding Tutorial',
        gradient: 'from-[#0d0d14] to-[#141420]',
        accent: '#8B5CF6',
        label: 'Coding',
      },
    },
    thumbnail: {
      alt: 'Cursor thumbnail preview',
      title: 'Cursor AI Code Editor Preview',
      gradient: 'from-[#0d0d14] to-[#141420]',
      accent: '#8B5CF6',
      label: 'Cursor',
    },
  },

  'github-copilot': {
    screenshots: [
      {
        alt: 'GitHub Copilot inline suggestions',
        caption: 'Ghost text suggestions directly inside your editor',
        gradient: 'from-[#0d1117] to-[#161b22]',
        accent: '#6e40c9',
      },
      {
        alt: 'GitHub Copilot Chat panel',
        caption: 'Ask questions about your codebase and generate implementation help',
        gradient: 'from-[#0d1117] to-[#161b22]',
        accent: '#6e40c9',
      },
      {
        alt: 'GitHub Copilot pull request workflow',
        caption: 'AI assistance for code review, pull requests, and explanations',
        gradient: 'from-[#101820] to-[#18243a]',
        accent: '#6e40c9',
      },
    ],
    video: {
      title: 'GitHub Copilot Full Tutorial',
      description:
        'Set up and master GitHub Copilot for code completion, chat, debugging, testing, and productivity.',
      youtubeId: 'jXp5D5ZnxGM',
      duration: '13:50',
      thumbnail: {
        alt: 'GitHub Copilot tutorial thumbnail',
        title: 'GitHub Copilot Full Tutorial',
        gradient: 'from-[#0d1117] to-[#161b22]',
        accent: '#6e40c9',
        label: 'Copilot',
      },
    },
    thumbnail: {
      alt: 'GitHub Copilot thumbnail preview',
      title: 'GitHub Copilot Preview',
      gradient: 'from-[#0d1117] to-[#161b22]',
      accent: '#6e40c9',
      label: 'Copilot',
    },
  },

  runway: {
    screenshots: [
      {
        alt: 'Runway video generation workspace',
        caption: 'Text and image-to-video generation with cinematic controls',
        gradient: 'from-[#10101a] to-[#181828]',
        accent: '#8B5CF6',
      },
      {
        alt: 'Runway editing tools',
        caption: 'Professional AI video editing suite for creators and teams',
        gradient: 'from-[#0e0e18] to-[#161626]',
        accent: '#8B5CF6',
      },
      {
        alt: 'Runway timeline editor',
        caption: 'Timeline workflow for editing clips, scenes, and generated video assets',
        gradient: 'from-[#141020] to-[#241834]',
        accent: '#8B5CF6',
      },
    ],
    video: {
      title: 'Runway AI Video Tutorial',
      description:
        'Generate and edit videos with Runway using text prompts, image prompts, masking, and AI editing tools.',
      youtubeId: 'yzqP1D3dBkI',
      duration: '11:25',
      thumbnail: {
        alt: 'Runway tutorial thumbnail',
        title: 'Runway AI Video Tutorial',
        gradient: 'from-[#10101a] to-[#181828]',
        accent: '#8B5CF6',
        label: 'AI Video',
      },
    },
    thumbnail: {
      alt: 'Runway thumbnail preview',
      title: 'Runway AI Video Preview',
      gradient: 'from-[#10101a] to-[#181828]',
      accent: '#8B5CF6',
      label: 'Runway',
    },
  },

  canva: {
    screenshots: [
      {
        alt: 'Canva Magic Design interface',
        caption: 'AI-powered design suggestions from your content and brand assets',
        gradient: 'from-[#0d1820] to-[#122030]',
        accent: '#00C4CC',
      },
      {
        alt: 'Canva Magic Edit image tool',
        caption: 'Edit images using natural language and AI-assisted design controls',
        gradient: 'from-[#0e1a22] to-[#142232]',
        accent: '#00C4CC',
      },
      {
        alt: 'Canva brand kit workspace',
        caption: 'Brand-aware creative workflow for social posts, presentations, and ads',
        gradient: 'from-[#071824] to-[#0d2b3d]',
        accent: '#00C4CC',
      },
    ],
    video: {
      title: 'Canva AI Features Guide',
      description:
        'Design faster with Canva AI using Magic Design, Magic Edit, brand kits, templates, and content generation.',
      youtubeId: 'Mc8R5hVxIhQ',
      duration: '12:10',
      thumbnail: {
        alt: 'Canva AI tutorial thumbnail',
        title: 'Canva AI Features Guide',
        gradient: 'from-[#0d1820] to-[#122030]',
        accent: '#00C4CC',
        label: 'Design',
      },
    },
    thumbnail: {
      alt: 'Canva thumbnail preview',
      title: 'Canva AI Design Preview',
      gradient: 'from-[#0d1820] to-[#122030]',
      accent: '#00C4CC',
      label: 'Canva',
    },
  },

  'notion-ai': {
    screenshots: [
      {
        alt: 'Notion AI writing assistant',
        caption: 'AI writing and editing inside your Notion workspace',
        gradient: 'from-[#0d0d14] to-[#141420]',
        accent: '#ffffff',
      },
      {
        alt: 'Notion AI Q&A interface',
        caption: 'Ask questions about your Notion content, notes, and docs',
        gradient: 'from-[#0e0e16] to-[#151522]',
        accent: '#ffffff',
      },
      {
        alt: 'Notion AI project workspace',
        caption: 'AI-enhanced project workspace for docs, tasks, and knowledge management',
        gradient: 'from-[#101014] to-[#1a1a22]',
        accent: '#ffffff',
      },
    ],
    video: {
      title: 'Notion AI Complete Tutorial',
      description:
        'Boost productivity with Notion AI for writing, summarizing, Q&A, task planning, and workspace management.',
      youtubeId: 'SUUrGK1gJzA',
      duration: '14:00',
      thumbnail: {
        alt: 'Notion AI tutorial thumbnail',
        title: 'Notion AI Complete Tutorial',
        gradient: 'from-[#0d0d14] to-[#141420]',
        accent: '#ffffff',
        label: 'Workspace',
      },
    },
    thumbnail: {
      alt: 'Notion AI thumbnail preview',
      title: 'Notion AI Workspace Preview',
      gradient: 'from-[#0d0d14] to-[#141420]',
      accent: '#ffffff',
      label: 'Notion AI',
    },
  },

  jasper: {
    screenshots: [
      {
        alt: 'Jasper Brand Voice workspace',
        caption: 'Configure brand voice and generate consistent marketing content',
        gradient: 'from-[#140e1e] to-[#1e1630]',
        accent: '#8B5CF6',
      },
      {
        alt: 'Jasper campaign editor',
        caption: 'Campaign-focused AI copywriting for ads, blogs, landing pages, and emails',
        gradient: 'from-[#190f2e] to-[#29184a]',
        accent: '#8B5CF6',
      },
      {
        alt: 'Jasper content workflow',
        caption: 'Marketing content workflow with templates, brand rules, and collaboration',
        gradient: 'from-[#171026] to-[#251742]',
        accent: '#8B5CF6',
      },
    ],
    thumbnail: {
      alt: 'Jasper thumbnail preview',
      title: 'Jasper Marketing AI Preview',
      gradient: 'from-[#140e1e] to-[#1e1630]',
      accent: '#8B5CF6',
      label: 'Jasper',
    },
  },

  grammarly: {
    screenshots: [
      {
        alt: 'Grammarly editor',
        caption: 'Real-time writing suggestions, grammar corrections, and tone detection',
        gradient: 'from-[#0d1a18] to-[#122420]',
        accent: '#15C39A',
      },
      {
        alt: 'Grammarly tone suggestions',
        caption: 'Improve clarity, tone, confidence, and style across your writing',
        gradient: 'from-[#071a16] to-[#0f2d25]',
        accent: '#15C39A',
      },
      {
        alt: 'Grammarly browser assistant',
        caption: 'AI writing support across email, documents, chat, and web apps',
        gradient: 'from-[#0b1715] to-[#142621]',
        accent: '#15C39A',
      },
    ],
    thumbnail: {
      alt: 'Grammarly thumbnail preview',
      title: 'Grammarly AI Writing Preview',
      gradient: 'from-[#0d1a18] to-[#122420]',
      accent: '#15C39A',
      label: 'Grammarly',
    },
  },
};

function mergeMedia(
  base: ToolMediaData,
  override?: Partial<ToolMediaData>
): ToolMediaData {
  if (!override) {
    return base;
  }

  return {
    screenshots: override.screenshots || base.screenshots,
    video: override.video || base.video,
    gallery: override.gallery || base.gallery,
    thumbnail: override.thumbnail || base.thumbnail,
  };
}

/**
 * Final media map.
 * Every tool from ../data/tools receives screenshots, gallery, thumbnail, and video data.
 */
export const toolMedia: Record<string, ToolMediaData> = tools.reduce(
  (acc, tool) => {
    acc[tool.id] = mergeMedia(generatedToolMedia[tool.id], customToolMedia[tool.id]);
    return acc;
  },
  {} as Record<string, ToolMediaData>
);

export function getToolMedia(toolId: string): ToolMediaData | undefined {
  return toolMedia[toolId];
}

export function getToolScreenshots(toolId: string): ToolScreenshot[] {
  return toolMedia[toolId]?.screenshots || [];
}

export function getToolGallery(toolId: string): ToolGalleryItem[] {
  return toolMedia[toolId]?.gallery || [];
}

export function getToolVideo(toolId: string): ToolVideo | undefined {
  return toolMedia[toolId]?.video;
}

export function getToolThumbnail(toolId: string): ToolThumbnail | undefined {
  return toolMedia[toolId]?.thumbnail;
}

export default toolMedia;