import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Services drive both the home-page tile grid and the detail sections
// on /services/. Add a markdown file to src/content/services/ to add one.
// `mood` picks the placeholder gradient scene (m0 desert, m1 amber, m2 nebula)
// until real photography replaces them.
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    mood: z.enum(['m0', 'm1', 'm2']),
    order: z.number(),
    // caps line above the title on the detail band, e.g. "Start here"
    kicker: z.string().optional(),
    sessionNote: z.string().optional(),
    // button label for this service; omit to show no booking button
    bookLabel: z.string().optional(),
    // booking URL for this service (e.g. Calendly); defaults to the
    // site-wide bookingLink when omitted
    bookHref: z.string().optional(),
    // true replaces the card's "Discover more" link with "Coming soon"
    comingSoon: z.boolean().optional(),
  }),
});

// Testimonials feed the rotating reviews band. Front-matter only; the
// markdown body is unused.
const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    label: z.string(),
    quote: z.string(),
    cite: z.string(),
    order: z.number(),
  }),
});

export const collections = { services, testimonials };
