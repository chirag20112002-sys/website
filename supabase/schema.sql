-- ============================================================
-- AirX Solution — Supabase Database Schema
-- Run this in: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── Contact Messages ────────────────────────────────────────
create table if not exists public.contact_messages (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  email       text not null,
  phone       text,
  company     text,
  service     text,
  budget      text,
  message     text not null,
  status      text not null default 'new' check (status in ('new', 'replied', 'closed')),
  created_at  timestamptz not null default now()
);

-- ─── Blog Posts ──────────────────────────────────────────────
create table if not exists public.blog_posts (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  slug        text not null unique,
  excerpt     text,
  content     text,
  category    text,
  status      text not null default 'draft' check (status in ('draft', 'published')),
  views       integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ─── Portfolio Projects ──────────────────────────────────────
create table if not exists public.portfolio_projects (
  id            uuid primary key default uuid_generate_v4(),
  title         text not null,
  category      text not null,
  client        text,
  description   text,
  tech          text[] default '{}',
  results       text[] default '{}',
  status        text not null default 'draft' check (status in ('draft', 'published')),
  display_order integer not null default 0,
  created_at    timestamptz not null default now()
);

-- ─── Testimonials ────────────────────────────────────────────
create table if not exists public.testimonials (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  role        text,
  company     text,
  rating      integer not null default 5 check (rating between 1 and 5),
  text        text not null,
  project     text,
  status      text not null default 'draft' check (status in ('draft', 'published')),
  created_at  timestamptz not null default now()
);

-- ─── Site Settings ───────────────────────────────────────────
create table if not exists public.site_settings (
  key         text primary key,
  value       text not null,
  updated_at  timestamptz not null default now()
);

-- ─── Row Level Security ──────────────────────────────────────
-- Contact messages: anyone can insert, only service role reads
alter table public.contact_messages enable row level security;
create policy "Anyone can submit contact form"
  on public.contact_messages for insert to anon with check (true);
create policy "Service role reads all messages"
  on public.contact_messages for select using (auth.role() = 'service_role');
create policy "Service role updates messages"
  on public.contact_messages for update using (auth.role() = 'service_role');

-- Blog posts: anyone can read published ones
alter table public.blog_posts enable row level security;
create policy "Anyone reads published posts"
  on public.blog_posts for select using (status = 'published' or auth.role() = 'service_role');
create policy "Service role full access to posts"
  on public.blog_posts for all using (auth.role() = 'service_role');

-- Portfolio: anyone can read published
alter table public.portfolio_projects enable row level security;
create policy "Anyone reads published projects"
  on public.portfolio_projects for select using (status = 'published' or auth.role() = 'service_role');
create policy "Service role full access to projects"
  on public.portfolio_projects for all using (auth.role() = 'service_role');

-- Testimonials: anyone can read published
alter table public.testimonials enable row level security;
create policy "Anyone reads published testimonials"
  on public.testimonials for select using (status = 'published' or auth.role() = 'service_role');
create policy "Service role full access to testimonials"
  on public.testimonials for all using (auth.role() = 'service_role');

-- Site settings: anyone can read
alter table public.site_settings enable row level security;
create policy "Anyone reads settings"
  on public.site_settings for select using (true);
create policy "Service role manages settings"
  on public.site_settings for all using (auth.role() = 'service_role');

-- ─── Seed Default Site Settings ──────────────────────────────
insert into public.site_settings (key, value) values
  ('site_name',       'AirX Solution'),
  ('tagline',         'Premium Web Development & Digital Agency'),
  ('email',           'hello@airxsolution.com'),
  ('phone',           '+1 (234) 567-8900'),
  ('address',         '123 Digital Avenue, Tech City, TC 10001'),
  ('whatsapp',        '1234567890'),
  ('meta_title',      'AirX Solution – Premium Web Development & Digital Agency'),
  ('meta_desc',       'AirX Solution delivers premium web development, Shopify store development, custom admin panels, e-commerce solutions, and business automation.'),
  ('twitter',         'https://twitter.com/airxsolution'),
  ('linkedin',        'https://linkedin.com/company/airxsolution'),
  ('github',          'https://github.com/airxsolution'),
  ('instagram',       'https://instagram.com/airxsolution')
on conflict (key) do nothing;

-- ─── Seed Sample Portfolio ───────────────────────────────────
insert into public.portfolio_projects (title, category, client, description, tech, results, status, display_order) values
  ('LuxeCommerce Fashion Store', 'Shopify', 'LuxeStyle Inc.',
   'A premium fashion brand Shopify store with 50k+ products, custom checkout flow, subscription features, and a fully custom theme.',
   array['Shopify', 'Liquid', 'JavaScript', 'Custom Theme'],
   array['340% increase in conversions', 'Sub-2s page load', '50k+ products'],
   'published', 1),
  ('FinTrack Analytics Dashboard', 'Admin Panel', 'FinEdge Corp.',
   'Real-time financial analytics dashboard processing $2M+ in monthly transactions with multi-currency support.',
   array['React', 'Node.js', 'MongoDB', 'Chart.js'],
   array['$2M+ monthly volume', '99.9% uptime', '15hrs/week saved'],
   'published', 2),
  ('MediCare Patient Portal', 'Web App', 'MediCare Group',
   'HIPAA-compliant patient management system serving 5,000+ users with appointment scheduling and telehealth features.',
   array['Next.js', 'PostgreSQL', 'AWS', 'TypeScript'],
   array['5,000+ active users', 'HIPAA compliant', '4.9★ app rating'],
   'published', 3)
on conflict do nothing;

-- ─── Seed Sample Testimonials ────────────────────────────────
insert into public.testimonials (name, role, company, rating, text, project, status) values
  ('Sarah Mitchell', 'CEO', 'StyleVault Fashion', 5,
   'AirX Solution transformed our online store into a revenue machine. Our conversions jumped 340% after the redesign. Absolutely phenomenal team!',
   'Brand Website', 'published'),
  ('James Rodriguez', 'Founder & CTO', 'TechNova Labs', 5,
   'The admin dashboard AirX built saves our team over 15 hours every week. Delivered ahead of schedule. True professionals.',
   'SaaS Admin Dashboard', 'published'),
  ('Priya Sharma', 'Marketing Director', 'GreenLeaf Organics', 5,
   'From concept to launch in just 5 weeks. Our Shopify store loads in under 2 seconds and the subscription feature added $50k/month in recurring revenue.',
   'Shopify Store', 'published')
on conflict do nothing;

-- ─── Seed Sample Blog Posts ──────────────────────────────────
insert into public.blog_posts (title, slug, excerpt, category, status) values
  ('Next.js vs React: Which Should You Choose in 2025?',
   'nextjs-vs-react-2025',
   'A comprehensive comparison of Next.js and React for building modern web applications.',
   'Web Development', 'published'),
  ('12 Shopify Optimization Tips That Doubled Our Client Revenue',
   'shopify-optimization-tips',
   'Proven strategies we''ve implemented across 50+ Shopify stores that consistently drive conversions.',
   'Shopify', 'published')
on conflict do nothing;
