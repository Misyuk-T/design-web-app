// Keeps the Supabase project from being paused for inactivity.
//
// Supabase pauses free-tier databases after roughly a week without a single
// request. The site survives that — content.ts falls back to bundled content —
// but it quietly stops reflecting the CMS until someone restores the project by
// hand. One cheap read a day prevents it.
//
// Scheduled from vercel.json. Vercel signs cron invocations with CRON_SECRET
// when that variable is set; without it the route stays open, which is tolerable
// here (it reads a single publicly readable row) but worth closing anyway.

import { NextResponse } from 'next/server';

import { getSupabaseClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;

  if (secret && request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseClient();

  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: 'supabase-not-configured' },
      { status: 503 },
    );
  }

  const { error } = await supabase
    .from('site_settings')
    .select('id')
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('[keep-alive] Supabase ping failed.', error);

    return NextResponse.json({ ok: false, error: error.message }, { status: 503 });
  }

  return NextResponse.json({ ok: true, pingedAt: new Date().toISOString() });
}
