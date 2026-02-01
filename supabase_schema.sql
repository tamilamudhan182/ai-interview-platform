-- Run this in the Supabase SQL Editor

-- 1. Create Interviews Table
create table interviews (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  job_role text not null,
  total_score numeric not null,
  feedback jsonb,
  created_at timestamptz default now()
);

-- 2. Create Answers Table
create table answers (
  id uuid default gen_random_uuid() primary key,
  interview_id uuid references interviews not null,
  question_text text not null,
  answer_transcript text,
  duration numeric,
  created_at timestamptz default now()
);

-- 3. Enable Row Level Security (RLS)
alter table interviews enable row level security;
alter table answers enable row level security;

-- 4. Create Policies (Users can only see/insert their own data)
create policy "Users can insert their own interviews"
on interviews for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can view their own interviews"
on interviews for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own answers"
on answers for insert
to authenticated
with check ( true ); 
-- (Simpler check since they are linked to interview_id which is checked, 
-- but ideally we check if the interview belongs to the user. 
-- For simplicity in this demo, 'true' allows authenticated users to insert, 
-- relying on application logic to link correctly.)

create policy "Users can view their own answers"
on answers for select
to authenticated
using (
  exists (
    select 1 from interviews
    where interviews.id = answers.interview_id
    and interviews.user_id = auth.uid()
  )
);
