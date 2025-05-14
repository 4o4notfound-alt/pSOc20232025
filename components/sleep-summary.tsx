import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"

export default function SleepSummary({ data }: { data: any[] }) {
  // Calculate sleep averages
  const avgSleepScore = Math.round(data.reduce((acc, item) => acc + item.sleep.score, 0) / data.length)

  const avgSleepDuration = Math.round(data.reduce((acc, item) => acc + item.sleep.duration, 0) / data.length)

  const avgDeepSleep = Math.round(data.reduce((acc, item) => acc + item.sleep.deep, 0) / data.length)

  const avgRemSleep = Math.round(data.reduce((acc, item) => acc + item.sleep.rem, 0) / data.length)

  const avgLightSleep = Math.round(data.reduce((acc, item) => acc + item.sleep.light, 0) / data.length)

  const avgHRV = Math.round(data.reduce((acc, item) => acc + item.sleep.hrv, 0) / data.length)

  const avgRestingHR = Math.round(data.reduce((acc, item) => acc + item.sleep.restingHeartRate, 0) / data.length)

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Sleep Score</CardTitle>
            <CardDescription>Average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{avgSleepScore}</div>
            <div className="mt-4 h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: `${avgSleepScore}%` }} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Sleep Duration</CardTitle>
            <CardDescription>Average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {Math.floor(avgSleepDuration / 60)}h {avgSleepDuration % 60}m
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
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>Sleep Stages</CardTitle>
          <CardDescription>Average time in each sleep stage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-purple-700"></div>
                  <span>Deep Sleep</span>
                </div>
                <span className="font-medium">
                  {Math.floor(avgDeepSleep / 60)}h {avgDeepSleep % 60}m
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full bg-purple-700"
                  style={{ width: `${(avgDeepSleep / avgSleepDuration) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-purple-500"></div>
                  <span>REM Sleep</span>
                </div>
                <span className="font-medium">
                  {Math.floor(avgRemSleep / 60)}h {avgRemSleep % 60}m
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full bg-purple-500"
                  style={{ width: `${(avgRemSleep / avgSleepDuration) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-purple-300"></div>
                  <span>Light Sleep</span>
                </div>
                <span className="font-medium">
                  {Math.floor(avgLightSleep / 60)}h {avgLightSleep % 60}m
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full bg-purple-300"
                  style={{ width: `${(avgLightSleep / avgSleepDuration) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>Sleep Data</CardTitle>
          <CardDescription>Detailed sleep metrics for each day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-zinc-800">
            <div className="grid grid-cols-7 gap-4 p-4 text-xs font-medium border-b border-zinc-800 bg-zinc-950">
              <div>Date</div>
              <div>Score</div>
              <div>Duration</div>
              <div>Deep</div>
              <div>REM</div>
              <div>HRV</div>
              <div>Resting HR</div>
            </div>
            <div className="divide-y divide-zinc-800">
              {data.map((item, i) => (
                <div key={i} className="grid grid-cols-7 gap-4 p-4 text-sm">
                  <div>{format(new Date(item.date), "MMM dd, yyyy")}</div>
                  <div>{item.sleep.score}</div>
                  <div>
                    {Math.floor(item.sleep.duration / 60)}h {item.sleep.duration % 60}m
                  </div>
                  <div>
                    {Math.floor(item.sleep.deep / 60)}h {item.sleep.deep % 60}m
                  </div>
                  <div>
                    {Math.floor(item.sleep.rem / 60)}h {item.sleep.rem % 60}m
                  </div>
                  <div>{item.sleep.hrv} ms</div>
                  <div>{item.sleep.restingHeartRate} bpm</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
