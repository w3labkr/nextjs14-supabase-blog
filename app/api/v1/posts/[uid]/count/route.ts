import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ApiError } from '@/lib/utils'
import { authorize } from '@/hooks/async/auth'
import { CountPosts } from '@/types/database'

export async function GET(
  request: NextRequest,
  { params: { uid } }: { params: { uid: string } }
) {
  const { user } = await authorize(uid)

  if (!user) {
    return NextResponse.json(
      { data: null, count: null, error: new ApiError(401) },
      { status: 401 }
    )
  }

  const supabase = createClient()
  const result = await supabase.rpc('count_posts', { uid })

  if (result?.error) {
    return NextResponse.json(
      { data: null, count: null, error: result?.error },
      { status: 400 }
    )
  }

  const data = result?.data
  const count = data?.reduce((acc, obj) => acc + obj.count, 0)

  const orderBy = ['publish', 'draft', 'pending', 'private', 'future', 'trash']
  const sorted = data.sort(
    (a, b) => orderBy.indexOf(a.status) - orderBy.indexOf(b.status)
  )
  // const sorted = data.sort((a, b) => (a.status > b.status ? 1 : -1)) // ASC
  // const sorted = data.sort((a, b) => (a.status > b.status ? -1 : 1)) // DESC

  return NextResponse.json({ data: sorted, count, error: null })
}
