import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"

export default function ReadinessSummary({ data }: { data: any[] }) {
  // Calculate readiness averages
  const avgReadinessScore = Math.round(data.reduce((acc, item) => acc + item.readiness.score, 0) / data.length)

  const avgHRV = Math.round(data.reduce((acc, item) => acc + item.readiness.hrv, 0) / data.length)

  const avgRestingHR = Math.round(data.reduce((acc, item) => acc + item.readiness.restingHeartRate, 0) / data.length)

  const avgBodyTemperature = (
    data.reduce((acc, item) => acc + item.readiness.bodyTemperature, 0) / data.length
  ).toFixed(1)

  const avgRecoveryIndex = Math.round(data.reduce((acc, item) => acc + item.readiness.recoveryIndex, 0) / data.length)

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Readiness Score</CardTitle>
            <CardDescription>Average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{avgReadinessScore}</div>
            <div className="mt-4 h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${avgReadinessScore}%` }} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">HRV</CardTitle>
            <CardDescription>Average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{avgHRV} ms</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Resting HR</CardTitle>
            <CardDescription>Average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{avgRestingHR} bpm</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Body Temp</CardTitle>
            <CardDescription>Average deviation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{avgBodyTemperature}°C</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recovery Index</CardTitle>
            <CardDescription>Average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{avgRecoveryIndex}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>Recovery Trends</CardTitle>
          <CardDescription>HRV and resting heart rate over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <RecoveryTrendChart data={data} />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>Readiness Data</CardTitle>
          <CardDescription>Detailed readiness metrics for each day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-zinc-800">
            <div className="grid grid-cols-6 gap-4 p-4 text-xs font-medium border-b border-zinc-800 bg-zinc-950">
              <div>Date</div>
              <div>Score</div>
              <div>HRV</div>
              <div>Resting HR</div>
              <div>Body Temp</div>
              <div>Recovery Index</div>
            </div>
            <div className="divide-y divide-zinc-800">
              {data.map((item, i) => (
                <div key={i} className="grid grid-cols-6 gap-4 p-4 text-sm">
                  <div>{format(new Date(item.date), "MMM dd, yyyy")}</div>
                  <div>{item.readiness.score}</div>
                  <div>{item.readiness.hrv} ms</div>
                  <div>{item.readiness.restingHeartRate} bpm</div>
                  <div>{item.readiness.bodyTemperature.toFixed(1)}°C</div>
                  <div>{item.readiness.recoveryIndex}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function RecoveryTrendChart({ data }: { data: any[] }) {
  // This is a placeholder for a real chart component
  // In a real implementation, you would use a library like recharts or chart.js
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 flex items-end">
          {data.slice(-14).map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div className="flex gap-1 h-[220px] items-end">
                <div className="w-2 bg-blue-500 rounded-t-sm" style={{ height: `${item.readiness.hrv * 1.5}px` }} />
                <div
                  className="w-2 bg-red-500 rounded-t-sm"
                  style={{ height: `${item.readiness.restingHeartRate * 1.5}px` }}
                />
              </div>
              <span className="text-xs text-zinc-500">{format(new Date(item.date), "dd")}</span>
            </div>
          ))}
        </div>
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-xs text-zinc-400">HRV</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="text-xs text-zinc-400">Resting HR</span>
          </div>
        </div>
      </div>
    </div>
  )
}
