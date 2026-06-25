/**
 * Newsletter Integration Architecture
 * Drop-in ready for Beehiiv or MailerLite.
 *
 * SETUP:
 * 1. Set `provider` to 'beehiiv' or 'mailerlite'.
 * 2. Fill in your publication / group IDs.
 * 3. The `subscribe()` function handles both providers.
 */

export type NewsletterProvider = 'beehiiv' | 'mailerlite';

export interface NewsletterConfig {
  provider: NewsletterProvider;
  beehiiv: {
    publicationId: string;        // e.g. "pub_xxxxxxxx"
    apiUrl: string;                // "https://api.beehiiv.com/v2"
  };
  mailerlite: {
    groupId: string;               // numeric group ID
    apiUrl: string;                // "https://connect.mailerlite.com/api"
    apiKey: string;                // server-side only
  };
}

export const newsletterConfig: NewsletterConfig = {
  provider: 'beehiiv',
  beehiiv: {
    publicationId: 'pub_XXXXXXXX',
    apiUrl: 'https://api.beehiiv.com/v2',
  },
  mailerlite: {
    groupId: '',
    apiUrl: 'https://connect.mailerlite.com/api',
    apiKey: '',
  },
};

export interface SubscribeResult {
  success: boolean;
  message: string;
}

/**
 * Subscribe an email.
 * In production, proxy through your own API to keep keys secret.
 */
export async function subscribe(email: string): Promise<SubscribeResult> {
  if (!email || !email.includes('@')) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  const { provider } = newsletterConfig;

  try {
    if (provider === 'beehiiv') {
      // Beehiiv embedded form POST (client-safe)
      // Replace with your actual Beehiiv form action URL
      const formUrl = `https://embeds.beehiiv.com/subscribe/${newsletterConfig.beehiiv.publicationId}`;
      const res = await fetch(formUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) return { success: true, message: 'You\'re subscribed! Check your inbox.' };
      return { success: false, message: 'Something went wrong. Please try again.' };
    }

    if (provider === 'mailerlite') {
      // MailerLite — proxy this through your backend
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) return { success: true, message: 'You\'re subscribed! Check your inbox.' };
      return { success: false, message: data.message || 'Something went wrong.' };
    }

    return { success: false, message: 'Newsletter provider not configured.' };
  } catch {
    return { success: false, message: 'Network error. Please try again.' };
  }
}
