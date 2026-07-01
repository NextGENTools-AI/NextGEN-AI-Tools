import { tools } from "./tools";
import { articles } from "./articles";
import { comparisons } from "./comparisons";
import { prompts } from "./prompts";

function hasNonEmptyString(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}
import { bestToolsPages } from "./bestToolsPages";

interface ValidationError {
  file: string;
  id: string;
  field: string;
  message: string;
}

const errors: ValidationError[] = [];

function validateField(file: string, id: string, field: string, value: any, condition: (v: any) => boolean, message: string) {
  if (!condition(value)) {
    errors.push({ file, id, field, message });
  }
}

// Validate Tools
tools.forEach(tool => {
  validateField("tools.ts", tool.id, "name", tool.name, (v) => typeof v === "string" && v.length > 0, "Tool name cannot be empty.");
  validateField("tools.ts", tool.id, "slug", tool.slug, (v) => typeof v === "string" && v.length > 0, "Tool slug cannot be empty.");
  // Add more tool validations as needed
});

// Validate Articles
articles.forEach(article => {
  validateField("articles.ts", article.id, "title", article.title, (v) => typeof v === "string" && v.length > 0, "Article title cannot be empty.");
  validateField("articles.ts", article.id, "slug", article.slug, (v) => typeof v === "string" && v.length > 0, "Article slug cannot be empty.");
  // Add more article validations
});

// Validate Comparisons
comparisons.forEach(comparison => {
  validateField("comparisons.ts", comparison.id, "title", comparison.title, (v) => typeof v === "string" && v.length > 0, "Comparison title cannot be empty.");
  validateField("comparisons.ts", comparison.id, "slug", comparison.slug, (v) => typeof v === "string" && v.length > 0, "Comparison slug cannot be empty.");
  // Add more comparison validations
});

// Validate Prompts
prompts.forEach(prompt => {
  validateField("prompts.ts", prompt.id, "title", prompt.title, hasNonEmptyString, "Prompt title cannot be empty.");
  validateField("prompts.ts", prompt.id, "id", prompt.id, hasNonEmptyString, "Prompt id cannot be empty.");
  // Add more prompt validations
});

// Validate Best Tools Pages
bestToolsPages.forEach(page => {
  validateField("bestToolsPages.ts", page.slug, "title", page.title, (v) => typeof v === "string" && v.length > 0, "Best tools page title cannot be empty.");
  validateField("bestToolsPages.ts", page.slug, "slug", page.slug, (v) => typeof v === "string" && v.length > 0, "Best tools page slug cannot be empty.");
  // Validate toolIds references
  page.toolIds.forEach(toolId => {
    const toolExists = tools.some(t => t.id === toolId);
    validateField("bestToolsPages.ts", page.slug, `toolId: ${toolId}`, toolExists, (v) => v === true, `Tool ID \'${toolId}\' not found in tools.ts.`);
  });
  // Add more best tools page validations
});

if (errors.length > 0) {
  errors.forEach(error => {
    console.error(`- [${error.file}] ID: \'${error.id}\', Field: \'${error.field}\' - ${error.message}`);
  });
  process.exit(1);
}