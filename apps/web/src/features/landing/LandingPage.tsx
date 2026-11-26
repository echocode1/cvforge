'use client';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Check, Download, Eye, FolderOpen, LayoutTemplate, Save, Sparkles, ArrowRight } from 'lucide-react';
import { sampleCvData, TEMPLATE_IDS } from '@cvforge/types';
import {
  brand,
  CvShowcase,
  FaqList,
  FeatureCard,
  Reveal,
  RevealGroup,
  RevealItem,
  Section,
  SectionHeading,
  SiteFooter,
  SiteHeader,
  StepCard,
  TemplateCard,
  fadeUp,
  scaleIn,
  titleDown,
} from '@cvforge/ui';
import { ROUTES } from '@/lib/routes';
import { FAQS, NAV_LINKS, STEPS, TEMPLATES } from './content';

const FEATURES = [
  { icon: <Eye size={20} />, title: 'Live A4 preview', text: 'See the exact page you will download, updating with every keystroke.' },
  { icon: <LayoutTemplate size={20} />, title: 'Switch templates instantly', text: 'Content and design are separate, so one click restyles the whole CV.' },
  { icon: <Save size={20} />, title: 'Autosave', text: 'Changes are saved moments after you stop typing. Nothing to remember.' },
  { icon: <Download size={20} />, title: 'One-click PDF', text: 'Download a clean, selectable-text A4 PDF ready to attach.' },
  { icon: <FolderOpen size={20} />, title: 'Your dashboard', text: 'Every CV you make is kept in one place to reopen, edit or download again.' },
  { icon: <Sparkles size={20} />, title: 'AI assistance', text: 'Rewrite bullets, tailor to a job post and check keywords.', badge: 'Coming soon' },
];

export function LandingPage() {
  return (
    <>
      <SiteHeader
        links={NAV_LINKS}
        signIn={{ label: 'Sign in', href: ROUTES.signIn }}
        cta={{ label: 'Get started', href: ROUTES.signUp }}
        linkComponent={Link}
      />

      <main>
        {/* Hero */}
        <Section tone="ink">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' }, gap: { xs: 4, md: 6 }, alignItems: 'center', py: { xs: 1, md: 2 } }}>
            <RevealGroup stagger={0.12} sx={{ display: 'grid', gap: 2.5, justifyItems: 'start' }}>
              <RevealItem variants={titleDown}>
                <Typography variant="h1" component="h1" sx={{ color: '#fff' }}>
                  Build a CV that gets <Box component="span" sx={{ color: brand.marigold }}>read</Box>.
                </Typography>
              </RevealItem>
              <RevealItem variants={fadeUp}>
                <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,.78)', maxWidth: 520 }}>
                  Start from scratch or a sample, edit with a live preview, switch templates in one click and download a clean A4 PDF. Your CVs wait for you in your dashboard.
                </Typography>
              </RevealItem>
              <RevealItem variants={fadeUp}>
                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                  <Button component={Link} href={ROUTES.signUp} size="large" variant="contained" color="secondary" endIcon={<ArrowRight size={18} />}>
                    Create your CV
                  </Button>
                  <Button component="a" href="#how-it-works" size="large" variant="outlined" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.35)', '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,.06)' } }}>
                    See how it works
                  </Button>
                </Box>
              </RevealItem>
              <RevealItem variants={fadeUp}>
                <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: '8px 20px', color: 'rgba(255,255,255,.8)', fontSize: '0.9375rem' }}>
                  {['3 templates', 'Live A4 preview', 'PDF export'].map((item) => (
                    <Box component="li" key={item} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
                      <Check size={16} color={brand.marigold} /> {item}
                    </Box>
                  ))}
                </Box>
              </RevealItem>
            </RevealGroup>

            <Reveal variants={scaleIn} delay={0.2} sx={{ display: 'grid', placeItems: 'center', position: 'relative', '&::before': { content: '""', position: 'absolute', inset: '8% 4%', background: `radial-gradient(closest-side, ${brand.cobalt}, transparent)`, opacity: 0.55, filter: 'blur(30px)', zIndex: 0 }, '& > *': { position: 'relative', zIndex: 1 } }}>
              <CvShowcase data={sampleCvData} templates={TEMPLATE_IDS} />
            </Reveal>
          </Box>
        </Section>

        {/* How it works */}
        <Section id="how-it-works">
          <SectionHeading title="From blank page to PDF in three steps" subtitle="No design skills needed. You write, we handle the layout." />
          <RevealGroup stagger={0.14} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
            {STEPS.map((step, i) => (
              <RevealItem key={step.title}>
                <StepCard step={i + 1} title={step.title} text={step.text} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>

        {/* Features */}
        <Section id="features" tone="white">
          <SectionHeading title="Everything you need, nothing you don’t" subtitle="Focused tools that make writing a CV faster and the result sharper." />
          <RevealGroup stagger={0.09} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2 }}>
            {FEATURES.map((f) => (
              <RevealItem key={f.title}>
                <FeatureCard icon={f.icon} title={f.title} text={f.text} badge={f.badge} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>

        {/* Templates */}
        <Section id="templates">
          <SectionHeading title="Three templates, one set of data" subtitle="Write once and try each look. More designs are on the way." />
          <RevealGroup stagger={0.14} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2 }}>
            {TEMPLATES.map((t) => (
              <RevealItem key={t.id}>
                <TemplateCard data={sampleCvData} templateId={t.id} description={t.description} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>

        {/* FAQ */}
        <Section id="faq" tone="white">
          <SectionHeading title="Questions, answered" />
          <FaqList items={FAQS} />
        </Section>

        {/* Final call to action */}
        <Section tone="ink">
          <Box sx={{ textAlign: 'center', display: 'grid', gap: 2.5, justifyItems: 'center' }}>
            <Reveal variants={titleDown}>
              <Typography variant="h2" component="h2" sx={{ color: '#fff', maxWidth: 640 }}>
                Your next application deserves a better CV
              </Typography>
            </Reveal>
            <Reveal variants={fadeUp} delay={0.12}>
              <Button component={Link} href={ROUTES.signUp} size="large" variant="contained" color="secondary" endIcon={<ArrowRight size={18} />}>
                Create your CV
              </Button>
            </Reveal>
          </Box>
        </Section>
      </main>

      <SiteFooter links={NAV_LINKS} />
    </>
  );
}
