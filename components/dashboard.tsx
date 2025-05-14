"use client"

import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { Sidebar } from "./sidebar"
import SleepSummary from "./sleep-summary"
import ActivitySummary from "./activity-summary"
import ReadinessSummary from "./readiness-summary"
import { mockOuraData } from "@/lib/mock-data"

export default function Dashboard() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })
  const [timeframe, setTimeframe] = useState("month")
  const [activeTab, setActiveTab] = useState("overview")

  // Filter data based on selected date range
  const filteredData = mockOuraData.filter((item) => {
    const itemDate = new Date(item.date)
    return (!date?.from || itemDate >= date.from) && (!date?.to || itemDate <= date.to)
  })

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <div className="flex-1 p-6 lg:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Your health data summary and insights</p>
            </div>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal bg-zinc-900 border-zinc-800 hover:bg-zinc-800"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800" align="end">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                    className="bg-zinc-900 text-white"
                  />
                </PopoverContent>
              </Popover>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[130px] bg-zinc-900 border-zinc-800 hover:bg-zinc-800">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList className="bg-zinc-900 border-zinc-800">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sleep">Sleep</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="readiness">Readiness</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Sleep Score</CardTitle>
                    <CardDescription>Average over selected period</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">
                      {Math.round(filteredData.reduce((acc, item) => acc + item.sleep.score, 0) / filteredData.length)}
                    </div>
                    <div className="mt-4 h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{
                          width: `${Math.round(
                            filteredData.reduce((acc, item) => acc + item.sleep.score, 0) / filteredData.length,
                          )}%`,
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Activity Score</CardTitle>
                    <CardDescription>Average over selected period</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">
                      {Math.round(
                        filteredData.reduce((acc, item) => acc + item.activity.score, 0) / filteredData.length,
                      )}
                    </div>
                    <div className="mt-4 h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{
                          width: `${Math.round(
                            filteredData.reduce((acc, item) => acc + item.activity.score, 0) / filteredData.length,
                          )}%`,
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Readiness Score</CardTitle>
                    <CardDescription>Average over selected period</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">
                      {Math.round(
                        filteredData.reduce((acc, item) => acc + item.readiness.score, 0) / filteredData.length,
                      )}
                    </div>
                    <div className="mt-4 h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{
                          width: `${Math.round(
                            filteredData.reduce((acc, item) => acc + item.readiness.score, 0) / filteredData.length,
                          )}%`,
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-full lg:col-span-2 bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <CardTitle>Trends Over Time</CardTitle>
                    <CardDescription>Your scores for the selected period</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <TrendChart data={filteredData} />
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-full lg:col-span-1 bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <CardTitle>Summary Statistics</CardTitle>
                    <CardDescription>Key metrics for the selected period</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Sleep Time</span>
                        <span className="font-medium">
                          {Math.round(
                            filteredData.reduce((acc, item) => acc + item.sleep.duration, 0) / filteredData.length / 60,
                          )}{" "}
                          hrs
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg. Resting Heart Rate</span>
                        <span className="font-medium">
                          {Math.round(
                            filteredData.reduce((acc, item) => acc + item.sleep.restingHeartRate, 0) /
                              filteredData.length,
                          )}{" "}
                          bpm
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg. HRV</span>
                        <span className="font-medium">
                          {Math.round(
                            filteredData.reduce((acc, item) => acc + item.sleep.hrv, 0) / filteredData.length,
                          )}{" "}
                          ms
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg. Steps</span>
                        <span className="font-medium">
                          {Math.round(
                            filteredData.reduce((acc, item) => acc + item.activity.steps, 0) / filteredData.length,
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg. Calories</span>
                        <span className="font-medium">
                          {Math.round(
                            filteredData.reduce((acc, item) => acc + item.activity.calories, 0) / filteredData.length,
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sleep" className="space-y-4">
              <SleepSummary data={filteredData} />
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <ActivitySummary data={filteredData} />
            </TabsContent>

            <TabsContent value="readiness" className="space-y-4">
              <ReadinessSummary data={filteredData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function TrendChart({ data }: { data: any[] }) {
  // This is a placeholder for a real chart component
  // In a real implementation, you would use a library like recharts or chart.js
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 flex items-end">
          {data.slice(-14).map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div className="flex gap-1 h-[220px] items-end">
                <div className="w-2 bg-purple-500 rounded-t-sm" style={{ height: `${item.sleep.score * 2}px` }} />
                <div className="w-2 bg-green-500 rounded-t-sm" style={{ height: `${item.activity.score * 2}px` }} />
                <div className="w-2 bg-blue-500 rounded-t-sm" style={{ height: `${item.readiness.score * 2}px` }} />
              </div>
              <span className="text-xs text-zinc-500">{format(new Date(item.date), "dd")}</span>
            </div>
          ))}
        </div>
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-purple-500 rounded-full" />
            <span className="text-xs text-zinc-400">Sleep</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-xs text-zinc-400">Activity</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-xs text-zinc-400">Readiness</span>
          </div>
        </div>
      </div>
    </div>
  )
}
