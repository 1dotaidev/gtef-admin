-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create Categories Table
create table if not exists public.categories (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    "createdAt" timestamp with time zone default now() not null,
    "updatedAt" timestamp with time zone default now() not null
);

-- Enable Row Level Security
alter table public.categories enable row level security;

-- Create Blog Posts Table
create table if not exists public.blog_posts (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    content text,
    status text default 'draft' check (status in ('draft', 'published', 'rejected')),
    "categoryId" uuid references public.categories(id) on delete set null,
    "createdAt" timestamp with time zone default now() not null,
    "updatedAt" timestamp with time zone default now() not null
);

-- Enable Row Level Security
alter table public.blog_posts enable row level security;

-- Create RLS Policies for Categories

-- Allow all authenticated users to read categories
create policy "Allow all authenticated users to read categories"
    on public.categories
    for select
    to authenticated
    using (true);

-- Allow authenticated users to create categories
create policy "Allow authenticated users to create categories"
    on public.categories
    for insert
    to authenticated
    with check (true);

-- Allow authenticated users to update their categories
create policy "Allow authenticated users to update categories"
    on public.categories
    for update
    to authenticated
    using (true);

-- Allow authenticated users to delete categories
create policy "Allow authenticated users to delete categories"
    on public.categories
    for delete
    to authenticated
    using (true);

-- Create RLS Policies for Blog Posts

-- Allow all authenticated users to read blog posts
create policy "Allow all authenticated users to read blog posts"
    on public.blog_posts
    for select
    to authenticated
    using (true);

-- Allow authenticated users to create blog posts
create policy "Allow authenticated users to create blog posts"
    on public.blog_posts
    for insert
    to authenticated
    with check (true);

-- Allow authenticated users to update their blog posts
create policy "Allow authenticated users to update blog posts"
    on public.blog_posts
    for update
    to authenticated
    using (true);

-- Allow authenticated users to delete blog posts
create policy "Allow authenticated users to delete blog posts"
    on public.blog_posts
    for delete
    to authenticated
    using (true);

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer
as $$
begin
    new."updatedAt" = now();
    return new;
end;
$$;

-- Add updated_at triggers to both tables
create trigger handle_updated_at
    before update on public.categories
    for each row
    execute function public.handle_updated_at();

create trigger handle_updated_at
    before update on public.blog_posts
    for each row
    execute function public.handle_updated_at();

-- Create indexes for better performance
create index if not exists blog_posts_categoryid_idx on public.blog_posts("categoryId");
create index if not exists blog_posts_status_idx on public.blog_posts(status);
create index if not exists categories_title_idx on public.categories(title);

-- Grant Permissions
grant usage on schema public to anon, authenticated;
grant all on all tables in schema public to anon, authenticated;
grant all on all sequences in schema public to anon, authenticated;
grant execute on all functions in schema public to anon, authenticated; 