export interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  categorySlug: string;
  tool: string;
  toolSlug: string;
  tags: string[];
  useCases: string[];
  tips: string[];
  example?: {
    input?: string;
    output?: string;
  };
  variables?: { name: string; description: string; example: string }[];
  copyCount: number;
  rating: number;
}

export interface PromptCategory {
  name: string;
  slug: string;
  description: string;
  icon: string;
  count: number;
}

export const promptCategories: PromptCategory[] = [
  { name: 'Writing & Content', slug: 'writing', description: 'Prompts for blog posts, articles, copywriting, and creative writing.', icon: 'pen', count: 15 },
  { name: 'Coding & Development', slug: 'coding', description: 'Prompts for code generation, debugging, and technical documentation.', icon: 'code', count: 12 },
  { name: 'Marketing & SEO', slug: 'marketing', description: 'Prompts for marketing copy, SEO content, and social media.', icon: 'chart', count: 10 },
  { name: 'Business & Strategy', slug: 'business', description: 'Prompts for analysis, planning, and business documents.', icon: 'briefcase', count: 8 },
  { name: 'Image Generation', slug: 'images', description: 'Prompts for AI art, photography, and design.', icon: 'image', count: 12 },
  { name: 'Education & Learning', slug: 'education', description: 'Prompts for studying, tutoring, and explaining concepts.', icon: 'brain', count: 8 },
  { name: 'Productivity', slug: 'productivity', description: 'Prompts for organization, planning, and task management.', icon: 'zap', count: 6 },
  { name: 'Research & Analysis', slug: 'research', description: 'Prompts for research, data analysis, and insights.', icon: 'search', count: 7 },
];

export const prompts: Prompt[] = [
  // Writing Prompts
  {
    id: 'blog-post-outline',
    title: 'Comprehensive Blog Post Outline Generator',
    description: 'Generate a detailed, SEO-optimized blog post outline with sections, subsections, and key points.',
    prompt: `Create a comprehensive blog post outline for the topic: "[TOPIC]"

Target audience: [AUDIENCE]
Target word count: [WORD_COUNT]
Primary keyword: [KEYWORD]

Generate an outline that includes:
1. An engaging title with the primary keyword
2. Meta description (150-160 characters)
3. Introduction hook and thesis
4. 5-7 main sections with:
   - H2 heading
   - 3-4 H3 subheadings
   - Key points to cover
   - Suggested statistics or examples to include
5. FAQ section with 4-5 questions
6. Conclusion with call-to-action

Make sure the outline is:
- Logical in flow
- SEO-optimized with natural keyword placement
- Comprehensive enough to create authoritative content
- Reader-friendly with clear value propositions`,
    category: 'Writing & Content',
    categorySlug: 'writing',
    tool: 'ChatGPT',
    toolSlug: 'chatgpt',
    tags: ['blog', 'SEO', 'content writing', 'outline'],
    useCases: ['Blog writers', 'Content marketers', 'SEO specialists'],
    tips: [
      'Be specific about your target audience for better relevance',
      'Include competitor URLs for gap analysis',
      'Specify the tone (professional, casual, authoritative)',
    ],
    variables: [
      { name: 'TOPIC', description: 'The main topic of your blog post', example: 'Best practices for remote team management' },
      { name: 'AUDIENCE', description: 'Your target readers', example: 'HR managers and team leads at mid-sized companies' },
      { name: 'WORD_COUNT', description: 'Target article length', example: '2000-2500 words' },
      { name: 'KEYWORD', description: 'Primary SEO keyword', example: 'remote team management' },
    ],
    copyCount: 12453,
    rating: 4.8,
  },
  {
    id: 'email-sequence',
    title: 'Email Marketing Sequence Generator',
    description: 'Create a complete email nurture sequence with subject lines, preview text, and body copy.',
    prompt: `Create a [NUMBER]-email nurture sequence for:

Product/Service: [PRODUCT]
Target audience: [AUDIENCE]
Goal: [GOAL]
Tone: [TONE]

For each email, provide:
1. Subject line (A/B variants)
2. Preview text
3. Email body with:
   - Hook/opening
   - Main content
   - Call-to-action
4. Optimal send timing (days from trigger)
5. Personalization opportunities

Email flow should:
- Build trust progressively
- Address common objections
- Include social proof where relevant
- Have clear, single CTAs
- Use storytelling elements`,
    category: 'Writing & Content',
    categorySlug: 'writing',
    tool: 'Claude',
    toolSlug: 'claude',
    tags: ['email', 'marketing', 'copywriting', 'nurture sequence'],
    useCases: ['Email marketers', 'SaaS companies', 'E-commerce stores'],
    tips: [
      'Include your best-performing past emails for style matching',
      'Specify any compliance requirements (GDPR, CAN-SPAM)',
      'Define your email platform for proper formatting',
    ],
    variables: [
      { name: 'NUMBER', description: 'Number of emails in sequence', example: '5' },
      { name: 'PRODUCT', description: 'What you\'re selling', example: 'Project management SaaS for agencies' },
      { name: 'AUDIENCE', description: 'Email recipients', example: 'Agency owners who signed up for free trial' },
      { name: 'GOAL', description: 'Desired outcome', example: 'Convert free trial to paid subscription' },
      { name: 'TONE', description: 'Voice and style', example: 'Professional but friendly, value-focused' },
    ],
    copyCount: 8234,
    rating: 4.7,
  },
  // Coding Prompts
  {
    id: 'code-review',
    title: 'Comprehensive Code Review Assistant',
    description: 'Get a thorough code review covering bugs, performance, security, and best practices.',
    prompt: `Review the following code and provide comprehensive feedback:

\`\`\`[LANGUAGE]
[CODE]
\`\`\`

Analyze for:

1. **Bugs & Errors**
   - Logic errors
   - Edge cases not handled
   - Potential runtime errors

2. **Security**
   - Input validation issues
   - Injection vulnerabilities
   - Authentication/authorization concerns

3. **Performance**
   - Inefficient algorithms
   - Memory leaks
   - Unnecessary computations

4. **Best Practices**
   - Naming conventions
   - Code organization
   - Documentation needs
   - SOLID principles adherence

5. **Suggestions**
   - Refactoring opportunities
   - Modern alternatives
   - Test coverage recommendations

Format output as:
- Priority: HIGH/MEDIUM/LOW
- Location: Line number or function
- Issue: Description
- Fix: Recommended solution with code example`,
    category: 'Coding & Development',
    categorySlug: 'coding',
    tool: 'Claude',
    toolSlug: 'claude',
    tags: ['code review', 'debugging', 'best practices', 'security'],
    useCases: ['Developers', 'Tech leads', 'Code auditors'],
    tips: [
      'Include context about the codebase and dependencies',
      'Specify your team\'s coding standards if any',
      'Mention the deployment environment (production, staging)',
    ],
    variables: [
      { name: 'LANGUAGE', description: 'Programming language', example: 'typescript' },
      { name: 'CODE', description: 'The code to review', example: 'function processUser(data) { ... }' },
    ],
    copyCount: 15678,
    rating: 4.9,
  },
  {
    id: 'api-documentation',
    title: 'API Documentation Generator',
    description: 'Generate comprehensive API documentation from code or specifications.',
    prompt: `Generate comprehensive API documentation for:

[API_DESCRIPTION]

Include:

1. **Overview**
   - Purpose and use cases
   - Authentication method
   - Base URL and versioning
   - Rate limiting details

2. **Endpoints** (for each):
   - Method and path
   - Description
   - Parameters (path, query, body)
   - Request example with cURL
   - Response schema with examples
   - Error codes and handling

3. **Code Examples**
   - JavaScript/Node.js
   - Python
   - cURL

4. **Best Practices**
   - Pagination handling
   - Error handling
   - Webhooks (if applicable)

5. **Changelog**
   - Version history
   - Migration guides

Format in Markdown with proper code blocks and tables.`,
    category: 'Coding & Development',
    categorySlug: 'coding',
    tool: 'ChatGPT',
    toolSlug: 'chatgpt',
    tags: ['API', 'documentation', 'developer tools', 'technical writing'],
    useCases: ['API developers', 'Technical writers', 'DevRel teams'],
    tips: [
      'Provide actual endpoint code or OpenAPI spec for accuracy',
      'Include real response examples from your API',
      'Specify the documentation platform (GitBook, ReadMe, etc.)',
    ],
    variables: [
      { name: 'API_DESCRIPTION', description: 'Description of your API and endpoints', example: 'User management API with CRUD operations, authentication via JWT...' },
    ],
    copyCount: 6234,
    rating: 4.6,
  },
  // Image Generation Prompts
  {
    id: 'product-photography',
    title: 'E-commerce Product Photography',
    description: 'Generate professional product photography prompts for e-commerce.',
    prompt: `Create a professional product photography image:

Product: [PRODUCT]
Style: Clean e-commerce product shot
Background: [BACKGROUND]
Lighting: Professional studio lighting, soft shadows
Angle: [ANGLE]

Technical specifications:
- High resolution, sharp focus on product
- Color accurate representation
- Minimal post-processing look
- Professional commercial quality

Additional details:
[DETAILS]

--ar 4:5 --v 6 --style raw`,
    category: 'Image Generation',
    categorySlug: 'images',
    tool: 'Midjourney',
    toolSlug: 'midjourney',
    tags: ['product photography', 'e-commerce', 'commercial', 'studio'],
    useCases: ['E-commerce stores', 'Product managers', 'Marketing teams'],
    tips: [
      'Include the actual product dimensions for scale reference',
      'Specify brand colors if relevant',
      'Use --style raw for more photorealistic results',
    ],
    variables: [
      { name: 'PRODUCT', description: 'The product to photograph', example: 'Minimalist leather wallet, brown, compact bifold design' },
      { name: 'BACKGROUND', description: 'Background style', example: 'Pure white seamless background' },
      { name: 'ANGLE', description: 'Camera angle', example: '45-degree angle from above, hero shot' },
      { name: 'DETAILS', description: 'Additional styling details', example: 'Include subtle reflection, emphasize leather texture' },
    ],
    copyCount: 9876,
    rating: 4.7,
  },
  {
    id: 'character-design',
    title: 'Game Character Design Concept',
    description: 'Generate detailed character concept art for games and illustrations.',
    prompt: `Character concept art design:

Character: [CHARACTER_NAME]
Type: [CHARACTER_TYPE]
Setting: [SETTING]
Art style: [ART_STYLE]

Physical description:
- Build: [BUILD]
- Distinguishing features: [FEATURES]
- Outfit/armor: [OUTFIT]
- Accessories/weapons: [ACCESSORIES]

Personality reflected in design:
[PERSONALITY]

Mood/atmosphere:
[MOOD]

Technical:
- Full body character sheet
- Multiple angles if needed
- Detailed costume/equipment design
- Characteristic pose

--ar 3:4 --v 6 --stylize 750`,
    category: 'Image Generation',
    categorySlug: 'images',
    tool: 'Midjourney',
    toolSlug: 'midjourney',
    tags: ['character design', 'concept art', 'game art', 'illustration'],
    useCases: ['Game developers', 'Illustrators', 'Writers', 'D&D players'],
    tips: [
      'Reference existing art styles (e.g., "Studio Ghibli style")',
      'Include color palette preferences',
      'Specify if you need turnaround sheets or action poses',
    ],
    variables: [
      { name: 'CHARACTER_NAME', description: 'Name or title', example: 'Kira, the Shadow Archer' },
      { name: 'CHARACTER_TYPE', description: 'Class/role', example: 'Elven ranger assassin' },
      { name: 'SETTING', description: 'World/genre', example: 'Dark fantasy medieval' },
      { name: 'ART_STYLE', description: 'Visual style', example: 'Semi-realistic fantasy art, detailed' },
      { name: 'BUILD', description: 'Physical build', example: 'Athletic, agile, medium height' },
      { name: 'FEATURES', description: 'Notable features', example: 'Scarred left eye, silver hair, pointed ears' },
      { name: 'OUTFIT', description: 'Clothing/armor', example: 'Dark leather armor with hood, midnight blue cloak' },
      { name: 'ACCESSORIES', description: 'Items/weapons', example: 'Ornate recurve bow, quiver with glowing arrows' },
      { name: 'PERSONALITY', description: 'Character traits', example: 'Mysterious, deadly calm, haunted by past' },
      { name: 'MOOD', description: 'Overall atmosphere', example: 'Dark, moody, dramatic lighting' },
    ],
    copyCount: 7654,
    rating: 4.8,
  },
  // Marketing Prompts
  {
    id: 'landing-page-copy',
    title: 'High-Converting Landing Page Copy',
    description: 'Generate complete landing page copy optimized for conversions.',
    prompt: `Write high-converting landing page copy for:

Product/Service: [PRODUCT]
Target audience: [AUDIENCE]
Primary value proposition: [VALUE_PROP]
Main competitors: [COMPETITORS]

Generate:

1. **Hero Section**
   - Headline (benefit-focused, under 10 words)
   - Subheadline (2 sentences expanding on headline)
   - CTA button text
   - Supporting micro-copy

2. **Problem/Agitation Section**
   - 3 pain points your audience faces
   - Emotional language that resonates

3. **Solution Section**
   - How your product solves the problems
   - Key differentiators from competitors

4. **Features & Benefits**
   - 4-6 features with benefit-focused descriptions
   - Use icons or bullet points

5. **Social Proof**
   - Suggested testimonial structure
   - Stats/numbers to include
   - Trust badges needed

6. **Objection Handling**
   - 3-4 common objections with rebuttals

7. **Final CTA**
   - Urgency-based headline
   - CTA button text
   - Risk reversal (guarantee, etc.)

8. **FAQ Section**
   - 5 questions addressing remaining concerns

Tone: [TONE]
Focus on: [FOCUS]`,
    category: 'Marketing & SEO',
    categorySlug: 'marketing',
    tool: 'ChatGPT',
    toolSlug: 'chatgpt',
    tags: ['landing page', 'copywriting', 'conversion', 'marketing'],
    useCases: ['Marketers', 'Startup founders', 'Conversion specialists'],
    tips: [
      'Include competitor landing pages for differentiation',
      'Share customer research or interview insights',
      'Specify the conversion goal (signup, purchase, demo)',
    ],
    variables: [
      { name: 'PRODUCT', description: 'What you\'re selling', example: 'AI-powered email assistant for sales teams' },
      { name: 'AUDIENCE', description: 'Target customers', example: 'B2B sales reps at companies with 50-500 employees' },
      { name: 'VALUE_PROP', description: 'Main benefit', example: 'Write 10x more personalized cold emails in half the time' },
      { name: 'COMPETITORS', description: 'Main alternatives', example: 'Lavender, Instantly, Lemlist' },
      { name: 'TONE', description: 'Voice style', example: 'Confident, professional, slightly playful' },
      { name: 'FOCUS', description: 'Key emphasis', example: 'Time savings and personalization at scale' },
    ],
    copyCount: 11234,
    rating: 4.9,
  },
  // Business Prompts
  {
    id: 'swot-analysis',
    title: 'Strategic SWOT Analysis Generator',
    description: 'Generate a comprehensive SWOT analysis for business planning.',
    prompt: `Conduct a comprehensive SWOT analysis for:

Company/Project: [COMPANY]
Industry: [INDUSTRY]
Current situation: [SITUATION]
Main competitors: [COMPETITORS]

Generate:

**STRENGTHS** (Internal positive factors)
- 5-7 specific strengths with evidence
- How each strength creates competitive advantage

**WEAKNESSES** (Internal negative factors)
- 5-7 specific weaknesses honestly assessed
- Potential mitigation strategies

**OPPORTUNITIES** (External positive factors)
- 5-7 market opportunities
- Timeframe and effort to capitalize

**THREATS** (External negative factors)
- 5-7 external threats
- Risk level (High/Medium/Low)
- Contingency strategies

**STRATEGIC IMPLICATIONS**
- SO Strategies: Use strengths to capture opportunities
- WO Strategies: Overcome weaknesses using opportunities
- ST Strategies: Use strengths to avoid threats
- WT Strategies: Minimize weaknesses and avoid threats

**PRIORITY ACTIONS**
- Top 3 immediate actions based on analysis
- Resources required
- Expected outcomes`,
    category: 'Business & Strategy',
    categorySlug: 'business',
    tool: 'Claude',
    toolSlug: 'claude',
    tags: ['SWOT', 'strategy', 'business planning', 'analysis'],
    useCases: ['Executives', 'Entrepreneurs', 'Business consultants'],
    tips: [
      'Provide financial data if available',
      'Include recent market research',
      'Be honest about weaknesses for useful output',
    ],
    variables: [
      { name: 'COMPANY', description: 'Company or project name', example: 'TechStartup Inc - B2B SaaS platform' },
      { name: 'INDUSTRY', description: 'Industry and market', example: 'Project management software for remote teams' },
      { name: 'SITUATION', description: 'Current state', example: '$2M ARR, 500 customers, Series A stage, 25 employees' },
      { name: 'COMPETITORS', description: 'Main competitors', example: 'Asana, Monday.com, ClickUp' },
    ],
    copyCount: 5432,
    rating: 4.6,
  },
  // Research Prompts
  {
    id: 'literature-review',
    title: 'Academic Literature Review Synthesizer',
    description: 'Synthesize multiple research papers into a coherent literature review.',
    prompt: `Synthesize a literature review on the topic:

Topic: [TOPIC]
Research question: [QUESTION]
Key papers/sources provided: [SOURCES]

Generate a literature review that:

1. **Introduction**
   - Define the topic and its significance
   - State the research question
   - Outline the scope of the review

2. **Thematic Analysis**
   - Identify 3-5 major themes in the literature
   - For each theme:
     - Summary of key findings
     - Points of consensus
     - Debates or contradictions
     - Evolution of thinking over time

3. **Methodological Overview**
   - Common research methods used
   - Strengths and limitations
   - Gaps in methodological approaches

4. **Critical Analysis**
   - Strengths of the current body of research
   - Gaps and limitations
   - Areas of controversy

5. **Research Gap Identification**
   - What remains unanswered
   - Opportunities for future research
   - Your research question's place in the field

6. **Conclusion**
   - Summary of key insights
   - Implications for theory and practice
   - Recommendations for future research

Citation style: [STYLE]
Academic tone, objective analysis.`,
    category: 'Research & Analysis',
    categorySlug: 'research',
    tool: 'Claude',
    toolSlug: 'claude',
    tags: ['academic', 'literature review', 'research', 'synthesis'],
    useCases: ['Graduate students', 'Researchers', 'Academics'],
    tips: [
      'Provide PDFs or detailed summaries of key papers',
      'Include publication dates for temporal analysis',
      'Specify if focusing on quantitative, qualitative, or both',
    ],
    variables: [
      { name: 'TOPIC', description: 'Research topic', example: 'Impact of remote work on employee productivity' },
      { name: 'QUESTION', description: 'Research question', example: 'How does remote work affect knowledge worker productivity?' },
      { name: 'SOURCES', description: 'Key papers', example: 'Bloom et al. (2015), Choudhury et al. (2020), Yang et al. (2022)...' },
      { name: 'STYLE', description: 'Citation format', example: 'APA 7th edition' },
    ],
    copyCount: 3456,
    rating: 4.7,
  },
];

export function getPromptById(id: string): Prompt | undefined {
  return prompts.find(p => p.id === id);
}

export function getPromptsByCategory(categorySlug: string): Prompt[] {
  return prompts.filter(p => p.categorySlug === categorySlug);
}

export function getPromptsByTool(toolSlug: string): Prompt[] {
  return prompts.filter(p => p.toolSlug === toolSlug);
}

export function getAllPrompts(): Prompt[] {
  return prompts;
}

export function getFeaturedPrompts(): Prompt[] {
  return prompts.slice(0, 6);
}

export function searchPrompts(query: string): Prompt[] {
  const lowerQuery = query.toLowerCase();
  return prompts.filter(p =>
    p.title.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.tags.some(t => t.toLowerCase().includes(lowerQuery))
  );
}
