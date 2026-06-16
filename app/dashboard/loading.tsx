import { NoahMark } from './noah-logo'

export default function DashboardLoading() {
  return (
    <div className="bg-background fixed inset-0 z-200 flex flex-col items-center justify-center gap-4">
      <div className="dash-loader relative">
        <NoahMark className="size-14" />
      </div>
      <p className="text-muted-foreground animate-pulse text-sm font-medium">
        Loading dashboard…
      </p>
    </div>
  )
}
