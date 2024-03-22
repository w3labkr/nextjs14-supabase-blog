import * as React from 'react'

import { DashboardForm } from './dashboard-form'
import { authenticate } from '@/lib/supabase/auth'

export default async function DashboardPage() {
  const { isAuthenticated, user } = await authenticate()

  return (
    <main className="flex-1 overflow-auto p-10 pb-16">
      <div className="space-y-16">
        <DashboardForm />
      </div>
    </main>
  )
}
