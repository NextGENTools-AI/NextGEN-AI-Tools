export interface ComparisonFeature {
  name: string;
  toolA: string | boolean | number;
  toolB: string | boolean | number;
  winner?: 'A' | 'B' | 'tie';
}

export interface ComparisonVerdict {
  overall: {
    winner: 'A' | 'B' | 'tie';
    reason: string;
  };
  beginners?: {
    winner: 'A' | 'B' | 'tie';
    reason: string;
  };
  value?: {
    winner: 'A' | 'B' | 'tie';
    reason: string;
  };
  enterprise?: {
    winner: 'A' | 'B' | 'tie';
    reason: string;
  };
  finalRecommendation: string;
}

export interface Comparison {
  id: string;
  slug: string;
  toolA: {
    id: string;
    name: string;
    logo: string;
    gradient: string;
    freePlan?: string;
    pricing: { plan: string; price: string }[];
    platforms?: string[]; // e.g., Web, iOS, Android, Desktop
    apiAvailable: boolean;
    imageGeneration?: boolean;
    codeGeneration?: boolean;
    speed?: string; // e.g., 'Fast', 'Moderate', 'Slow'
    easeOfUse: 'Easy' | 'Medium' | 'Hard';
    teamCollaboration: boolean;
    strengths: string[];
    weaknesses: string[];
  };
  toolB: {
    id: string;
    name: string;
    logo: string;
    gradient: string;
    freePlan?: string;
    pricing: { plan: string; price: string }[];
    platforms?: string[];
    apiAvailable: boolean;
    imageGeneration?: boolean;
    codeGeneration?: boolean;
    speed?: string;
    easeOfUse: 'Easy' | 'Medium' | 'Hard';
    teamCollaboration: boolean;
    strengths: string[];
    weaknesses: string[];
  };
  title: string;
  metaTitle: string;
  metaDescription: string;
  introduction: string;
  verdict: ComparisonVerdict; // Changed to use ComparisonVerdict interface
  features: ComparisonFeature[];
  // Removed old pricingComparison, prosConsA, prosConsB
  useCases: {
    useCase: string;
    winner: 'A' | 'B' | 'tie';
    reason: string;
  }[];
  faq: { question: string; answer: string }[];
  publishedAt: string;
  updatedAt: string;
}

export const comparisons: Comparison[] = [
  {
    id: 'chatgpt-vs-claude',
    slug: 'chatgpt-vs-claude',
    toolA: {
      id: 'chatgpt',
      name: 'ChatGPT',
      logo: 'C',
      gradient: 'from-emerald-500/20 to-teal-600/20',
    },
    toolB: {
      id: 'claude',
      name: 'Claude',
      logo: 'C',
      gradient: 'from-orange-500/20 to-amber-600/20',
    },
    title: 'ChatGPT vs Claude: Which AI Assistant is Better in 2025?',
    metaTitle: 'ChatGPT vs Claude (2025) — In-Depth Comparison & Verdict',
    metaDescription: 'ChatGPT vs Claude: Compare features, pricing, capabilities, and performance. Discover which AI assistant is best for coding, writing, analysis, and more.',
    introduction: `ChatGPT and Claude are the two leading AI assistants, each with distinct strengths. ChatGPT, developed by OpenAI, pioneered the conversational AI revolution and offers extensive plugin ecosystem and multimodal capabilities. Claude, created by Anthropic, focuses on safety, longer context windows, and nuanced understanding. This comprehensive comparison will help you choose the right AI assistant for your specific needs.`,
    verdict: `Both ChatGPT and Claude are exceptional AI assistants, but they excel in different areas. ChatGPT is better for users who need plugins, image generation, and a versatile all-in-one tool. Claude is superior for long document analysis, coding assistance, and tasks requiring nuanced understanding. For most users, we recommend trying both on their free tiers to see which matches your workflow better.`,
    winner: 'tie',
    winnerReason: 'Both tools excel in different areas—ChatGPT for versatility and ecosystem, Claude for depth and analysis.',
    features: [
      { name: 'Context Window', toolA: '128K tokens', toolB: '200K tokens', winner: 'B' },
      { name: 'Image Generation', toolA: true, toolB: false, winner: 'A' },
      { name: 'Image Understanding', toolA: true, toolB: true, winner: 'tie' },
      { name: 'Web Browsing', toolA: true, toolB: false, winner: 'A' },
      { name: 'Code Execution', toolA: true, toolB: false, winner: 'A' },
      { name: 'Plugin Ecosystem', toolA: 'Extensive', toolB: 'Limited', winner: 'A' },
      { name: 'API Access', toolA: true, toolB: true, winner: 'tie' },
      { name: 'File Upload', toolA: true, toolB: true, winner: 'tie' },
      { name: 'Voice Mode', toolA: true, toolB: false, winner: 'A' },
      { name: 'Artifacts/Previews', toolA: false, toolB: true, winner: 'B' },
      { name: 'Custom Instructions', toolA: true, toolB: true, winner: 'tie' },
      { name: 'Team Features', toolA: true, toolB: true, winner: 'tie' },
    ],
    pricingComparison: {
      toolA: [
        { plan: 'Free', price: '$0/month' },
        { plan: 'Plus', price: '$20/month' },
        { plan: 'Team', price: '$25/user/month' },
        { plan: 'Enterprise', price: 'Custom' },
      ],
      toolB: [
        { plan: 'Free', price: '$0/month' },
        { plan: 'Pro', price: '$20/month' },
        { plan: 'Team', price: '$25/user/month' },
        { plan: 'Enterprise', price: 'Custom' },
      ],
    },
    prosConsA: {
      pros: [
        'Extensive plugin and GPT ecosystem',
        'DALL-E image generation built-in',
        'Web browsing for current information',
        'Voice conversation mode',
        'Largest user community',
      ],
      cons: [
        'Can be verbose and repetitive',
        'Smaller context window',
        'Rate limits on Plus plan',
        'Occasional hallucinations',
      ],
    },
    prosConsB: {
      pros: [
        'Largest context window (200K tokens)',
        'Excellent for long documents',
        'More nuanced and thoughtful responses',
        'Better at following complex instructions',
        'Artifacts feature for code/content preview',
      ],
      cons: [
        'No image generation',
        'No web browsing',
        'Smaller plugin ecosystem',
        'Can be overly cautious',
      ],
    },
    useCases: [
      { useCase: 'Long Document Analysis', winner: 'B', reason: 'Claude\'s 200K context window handles entire books and codebases.' },
      { useCase: 'Image Generation', winner: 'A', reason: 'ChatGPT includes DALL-E 3; Claude has no image generation.' },
      { useCase: 'Coding Assistance', winner: 'tie', reason: 'Both excel at coding, with slight edge to Claude for complex refactoring.' },
      { useCase: 'Creative Writing', winner: 'B', reason: 'Claude produces more varied, less formulaic creative content.' },
      { useCase: 'Research with Current Data', winner: 'A', reason: 'ChatGPT can browse the web; Claude relies on training data.' },
      { useCase: 'Data Analysis', winner: 'A', reason: 'ChatGPT\'s Code Interpreter can process and visualize data.' },
      { useCase: 'Content Summarization', winner: 'B', reason: 'Claude handles longer texts and produces more accurate summaries.' },
      { useCase: 'General Q&A', winner: 'tie', reason: 'Both provide excellent answers for general knowledge questions.' },
    ],
    faq: [
      {
        question: 'Is Claude better than ChatGPT for coding?',
        answer: 'Both are excellent for coding. Claude tends to be better at understanding large codebases due to its larger context window, while ChatGPT\'s Code Interpreter is better for data analysis and visualization.',
      },
      {
        question: 'Which is more accurate, ChatGPT or Claude?',
        answer: 'Both can hallucinate. Claude is often perceived as more careful and less likely to make confident incorrect statements. ChatGPT with web browsing can verify current information.',
      },
      {
        question: 'Can I use both ChatGPT and Claude for free?',
        answer: 'Yes, both offer free tiers. ChatGPT Free uses GPT-3.5/4o-mini, while Claude Free gives access to Claude 3.5 Sonnet with usage limits.',
      },
      {
        question: 'Which AI is better for business use?',
        answer: 'Both offer enterprise plans with similar security features. Choose based on your specific use case—ChatGPT for versatility, Claude for document-heavy workflows.',
      },
    ],
    publishedAt: '2025-01-10T08:00:00Z',
    updatedAt: '2025-01-24T12:00:00Z',
  },
  {
    id: 'claude-vs-gemini',
    slug: 'claude-vs-gemini',
    toolA: {
      id: 'claude',
      name: 'Claude',
      logo: 'C',
      gradient: 'from-orange-500/20 to-amber-600/20',
    },
    toolB: {
      id: 'gemini',
      name: 'Gemini',
      logo: 'G',
      gradient: 'from-blue-500/20 to-cyan-600/20',
    },
    title: 'Claude vs Gemini: Complete AI Comparison for 2025',
    metaTitle: 'Claude vs Gemini (2025) — Which AI Assistant Should You Use?',
    metaDescription: 'Claude vs Gemini comparison: Features, pricing, strengths, and weaknesses. Find out which AI assistant is better for your needs in this detailed analysis.',
    introduction: `Claude by Anthropic and Gemini by Google represent two different approaches to AI assistants. Claude focuses on safety, depth, and nuanced understanding, while Gemini leverages Google's infrastructure for real-time information and deep integration with Google services. This comparison breaks down everything you need to know to make an informed choice.`,
    verdict: `Claude excels at complex analysis, long-form content, and coding tasks where depth matters. Gemini shines when you need real-time information, Google Workspace integration, or multimodal capabilities with images and video. If you're already in the Google ecosystem, Gemini offers seamless integration. For pure reasoning and writing quality, Claude has the edge.`,
    winner: 'tie',
    winnerReason: 'Claude wins for analysis depth; Gemini wins for Google integration and real-time data.',
    features: [
      { name: 'Context Window', toolA: '200K tokens', toolB: '1M tokens (Gemini 1.5)', winner: 'B' },
      { name: 'Real-time Web Access', toolA: false, toolB: true, winner: 'B' },
      { name: 'Image Understanding', toolA: true, toolB: true, winner: 'tie' },
      { name: 'Image Generation', toolA: false, toolB: true, winner: 'B' },
      { name: 'Google Workspace Integration', toolA: false, toolB: true, winner: 'B' },
      { name: 'API Access', toolA: true, toolB: true, winner: 'tie' },
      { name: 'File Upload', toolA: true, toolB: true, winner: 'tie' },
      { name: 'Video Understanding', toolA: false, toolB: true, winner: 'B' },
      { name: 'Artifacts/Previews', toolA: true, toolB: false, winner: 'A' },
      { name: 'Reasoning Quality', toolA: 'Excellent', toolB: 'Very Good', winner: 'A' },
      { name: 'Mobile App', toolA: true, toolB: true, winner: 'tie' },
      { name: 'Projects/Organization', toolA: true, toolB: false, winner: 'A' },
    ],
    pricingComparison: {
      toolA: [
        { plan: 'Free', price: '$0/month' },
        { plan: 'Pro', price: '$20/month' },
        { plan: 'Team', price: '$25/user/month' },
        { plan: 'Enterprise', price: 'Custom' },
      ],
      toolB: [
        { plan: 'Free', price: '$0/month' },
        { plan: 'Advanced', price: '$19.99/month' },
        { plan: 'Business', price: '$24/user/month' },
        { plan: 'Enterprise', price: 'Custom' },
      ],
    },
    prosConsA: {
      pros: [
        'Superior reasoning and analysis',
        'Better at following nuanced instructions',
        'Projects feature for organized work',
        'Artifacts for interactive content',
        'More consistent output quality',
      ],
      cons: [
        'No real-time web access',
        'No image generation',
        'Limited integrations',
        'Can be overly cautious',
      ],
    },
    prosConsB: {
      pros: [
        'Massive 1M token context window',
        'Real-time Google Search integration',
        'Deep Google Workspace integration',
        'Video understanding capabilities',
        'Image generation with Imagen',
      ],
      cons: [
        'Reasoning quality sometimes inconsistent',
        'Privacy concerns with Google data',
        'Can provide outdated information despite web access',
        'Less polished conversation flow',
      ],
    },
    useCases: [
      { useCase: 'Google Workspace Users', winner: 'B', reason: 'Gemini integrates directly with Gmail, Docs, Sheets, and more.' },
      { useCase: 'Long Document Analysis', winner: 'tie', reason: 'Both excel here—Gemini has larger context, Claude better comprehension.' },
      { useCase: 'Current Events Research', winner: 'B', reason: 'Gemini has real-time Google Search; Claude lacks web access.' },
      { useCase: 'Code Review & Development', winner: 'A', reason: 'Claude provides more thoughtful, thorough code analysis.' },
      { useCase: 'Academic Writing', winner: 'A', reason: 'Claude\'s nuanced writing style is better for scholarly work.' },
      { useCase: 'Quick Answers', winner: 'B', reason: 'Gemini\'s web access provides faster, current answers.' },
      { useCase: 'Creative Projects', winner: 'A', reason: 'Claude produces more original, less formulaic creative content.' },
      { useCase: 'Video Content Analysis', winner: 'B', reason: 'Gemini can analyze video content; Claude cannot.' },
    ],
    faq: [
      {
        question: 'Is Gemini free to use?',
        answer: 'Yes, Gemini offers a generous free tier with access to Gemini Pro. Advanced features and Gemini Ultra require Gemini Advanced at $19.99/month.',
      },
      {
        question: 'Does Claude have access to real-time information?',
        answer: 'No, Claude does not have web browsing capabilities. It relies on its training data, which has a knowledge cutoff date.',
      },
      {
        question: 'Which is better for privacy?',
        answer: 'Claude (Anthropic) has a stronger privacy focus. Gemini integrates with your Google data, which may raise privacy concerns for some users.',
      },
      {
        question: 'Can Gemini analyze YouTube videos?',
        answer: 'Yes, Gemini can analyze and summarize YouTube videos, understand video content, and answer questions about them.',
      },
    ],
    publishedAt: '2025-01-12T10:00:00Z',
    updatedAt: '2025-01-23T14:00:00Z',
  },
  {
    id: 'midjourney-vs-flux',
    slug: 'midjourney-vs-flux',
    toolA: {
      id: 'midjourney',
      name: 'Midjourney',
      logo: 'M',
      gradient: 'from-indigo-500/20 to-purple-600/20',
    },
    toolB: {
      id: 'flux',
      name: 'Flux',
      logo: 'F',
      gradient: 'from-rose-500/20 to-pink-600/20',
    },
    title: 'Midjourney vs Flux: Best AI Image Generator in 2025',
    metaTitle: 'Midjourney vs Flux (2025) — Which AI Art Generator Wins?',
    metaDescription: 'Midjourney vs Flux comparison: Image quality, pricing, features, and use cases. Discover which AI image generator is best for your creative needs.',
    introduction: `The AI image generation space has become highly competitive, with Midjourney and Flux emerging as top contenders. Midjourney is known for its artistic, stylized outputs and strong community, while Flux by Black Forest Labs offers impressive photorealism and open-source flexibility. This comparison will help you choose the right tool for your visual creation needs.`,
    verdict: `Midjourney remains the king of artistic, stylized imagery with its distinctive aesthetic and polished outputs. Flux excels at photorealism and offers more flexibility through its open-source models. For professional artists and designers seeking distinctive styles, Midjourney is the better choice. For those needing photorealistic images or wanting to run models locally, Flux offers compelling advantages.`,
    winner: 'A',
    winnerReason: 'Midjourney leads in overall quality, consistency, and ease of use for most creative professionals.',
    features: [
      { name: 'Image Quality', toolA: 'Excellent', toolB: 'Excellent', winner: 'tie' },
      { name: 'Photorealism', toolA: 'Very Good', toolB: 'Excellent', winner: 'B' },
      { name: 'Artistic Styles', toolA: 'Excellent', toolB: 'Good', winner: 'A' },
      { name: 'Text in Images', toolA: 'Good', toolB: 'Excellent', winner: 'B' },
      { name: 'Ease of Use', toolA: 'Medium (Discord)', toolB: 'Varies (Multiple UIs)', winner: 'A' },
      { name: 'Speed', toolA: 'Fast', toolB: 'Varies', winner: 'A' },
      { name: 'Open Source', toolA: false, toolB: true, winner: 'B' },
      { name: 'Run Locally', toolA: false, toolB: true, winner: 'B' },
      { name: 'API Access', toolA: 'Limited', toolB: 'Full', winner: 'B' },
      { name: 'Upscaling', toolA: 'Built-in', toolB: 'External', winner: 'A' },
      { name: 'Community', toolA: 'Very Large', toolB: 'Growing', winner: 'A' },
      { name: 'Consistency', toolA: 'Excellent', toolB: 'Good', winner: 'A' },
    ],
    pricingComparison: {
      toolA: [
        { plan: 'Basic', price: '$10/month' },
        { plan: 'Standard', price: '$30/month' },
        { plan: 'Pro', price: '$60/month' },
        { plan: 'Mega', price: '$120/month' },
      ],
      toolB: [
        { plan: 'Open Source', price: 'Free (self-host)' },
        { plan: 'API Credits', price: 'Pay per use' },
        { plan: 'Replicate', price: '~$0.003/image' },
        { plan: 'fal.ai', price: '~$0.025/image' },
      ],
    },
    prosConsA: {
      pros: [
        'Exceptional artistic quality',
        'Consistent, polished outputs',
        'Strong community and inspiration',
        'Regular model updates',
        'Built-in upscaling and variations',
      ],
      cons: [
        'Discord-only interface',
        'No free tier',
        'Limited API access',
        'Cannot run locally',
        'Monthly subscription required',
      ],
    },
    prosConsB: {
      pros: [
        'Open source and free to self-host',
        'Excellent photorealism',
        'Superior text rendering',
        'Full API access',
        'Multiple model variants (Pro, Dev, Schnell)',
      ],
      cons: [
        'Requires technical setup for local use',
        'Less consistent stylization',
        'Smaller community',
        'No official UI (relies on third-party)',
        'Quality varies by hosting platform',
      ],
    },
    useCases: [
      { useCase: 'Professional Art & Design', winner: 'A', reason: 'Midjourney\'s aesthetic quality and consistency are unmatched.' },
      { useCase: 'Photorealistic Images', winner: 'B', reason: 'Flux produces more realistic, natural-looking photos.' },
      { useCase: 'Text/Logo in Images', winner: 'B', reason: 'Flux handles text rendering significantly better.' },
      { useCase: 'Quick Ideation', winner: 'A', reason: 'Midjourney\'s Discord workflow enables rapid iteration.' },
      { useCase: 'Production Pipeline', winner: 'B', reason: 'Flux\'s API and self-hosting suit automated workflows.' },
      { useCase: 'Budget-Conscious Users', winner: 'B', reason: 'Flux is free to self-host or cheap via APIs.' },
      { useCase: 'Social Media Content', winner: 'tie', reason: 'Both produce excellent results for social content.' },
      { useCase: 'Game Asset Creation', winner: 'A', reason: 'Midjourney\'s stylized outputs suit game art better.' },
    ],
    faq: [
      {
        question: 'Is Flux really free?',
        answer: 'Flux is open source and free to run locally if you have the hardware (needs powerful GPU). Otherwise, you pay per image through API providers like Replicate or fal.ai.',
      },
      {
        question: 'Why is Midjourney Discord-only?',
        answer: 'Midjourney launched on Discord and built its community there. A web interface is in development but Discord remains the primary access point.',
      },
      {
        question: 'Which produces better realistic photos?',
        answer: 'Flux generally produces more photorealistic images, especially for human faces and natural scenes. Midjourney tends toward a more stylized, artistic look.',
      },
      {
        question: 'Can I use these commercially?',
        answer: 'Midjourney allows commercial use on paid plans. Flux\'s open-source license (Apache 2.0) allows commercial use, but check specific model variants.',
      },
    ],
    publishedAt: '2025-01-08T09:00:00Z',
    updatedAt: '2025-01-22T16:00:00Z',
  },
];

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find(c => c.slug === slug);
}

export function getAllComparisons(): Comparison[] {
  return comparisons;
}

export function getRelatedComparisons(currentSlug: string): Comparison[] {
  const current = getComparisonBySlug(currentSlug);
  if (!current) return [];
  
  return comparisons
    .filter(c => c.slug !== currentSlug)
    .filter(c => 
      c.toolA.id === current.toolA.id ||
      c.toolA.id === current.toolB.id ||
      c.toolB.id === current.toolA.id ||
      c.toolB.id === current.toolB.id
    )
    .slice(0, 3);
}
