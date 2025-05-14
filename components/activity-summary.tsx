import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"

export default function ActivitySummary({ data }: { data: any[] }) {
  // Calculate activity averages
  const avgActivityScore = Math.round(data.reduce((acc, item) => acc + item.activity.score, 0) / data.length)

  const avgSteps = Math.round(data.reduce((acc, item) => acc + item.activity.steps, 0) / data.length)

  const avgCalories = Math.round(data.reduce((acc, item) => acc + item.activity.calories, 0) / data.length)

  const avgActiveCalories = Math.round(data.reduce((acc, item) => acc + item.activity.activeCalories, 0) / data.length)

  const totalSteps = data.reduce((acc, item) => acc + item.activity.steps, 0)
  const totalCalories = data.reduce((acc, item) => acc + item.activity.calories, 0)
  const totalDistance = data.reduce((acc, item) => acc + item.activity.distance, 0) / 1000 // km

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Activity Score</CardTitle>
            <CardDescription>Average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{avgActivityScore}</div>
            <div className="mt-4 h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: `${avgActivityScore}%` }} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Daily Steps</CardTitle>
            <CardDescription>Average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{avgSteps.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Daily Calories</CardTitle>
            <CardDescription>Average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{avgCalories.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Calories</CardTitle>
            <CardDescription>Average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{avgActiveCalories.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Steps</CardTitle>
            <CardDescription>For selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalSteps.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Calories</CardTitle>
            <CardDescription>For selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalCalories.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Distance</CardTitle>
            <CardDescription>For selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalDistance.toFixed(1)} km</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>Activity Data</CardTitle>
          <CardDescription>Detailed activity metrics for each day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-zinc-800">
            <div className="grid grid-cols-6 gap-4 p-4 text-xs font-medium border-b border-zinc-800 bg-zinc-950">
              <div>Date</div>
              <div>Score</div>
              <div>Steps</div>
              <div>Distance</div>
              <div>Calories</div>
              <div>Active Calories</div>
            </div>
            <div className="divide-y divide-zinc-800">
              {data.map((item, i) => (
                <div key={i} className="grid grid-cols-6 gap-4 p-4 text-sm">
                  <div>{format(new Date(item.date), "MMM dd, yyyy")}</div>
                  <div>{item.activity.score}</div>
                  <div>{item.activity.steps.toLocaleString()}</div>
                  <div>{(item.activity.distance / 1000).toFixed(1)} km</div>
                  <div>{item.activity.calories.toLocaleString()}</div>
                  <div>{item.activity.activeCalories.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
