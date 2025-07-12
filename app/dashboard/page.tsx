"use client"

import { BarChart3, Users, Shield, Activity, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainLayout } from "@/components/main-layout"

const stats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "Active Roles",
    value: "12",
    change: "+2",
    trend: "up",
    icon: Shield,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    title: "Today's Activity",
    value: "156",
    change: "-8%",
    trend: "down",
    icon: Activity,
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    title: "System Health",
    value: "99.9%",
    change: "Stable",
    trend: "up",
    icon: BarChart3,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
]

const recentActivity = [
  {
    id: 1,
    user: "John Doe",
    action: "Created new user",
    target: "jane.smith@example.com",
    time: "2 minutes ago",
    type: "create",
  },
  {
    id: 2,
    user: "Admin",
    action: "Updated role permissions",
    target: "Manager Role",
    time: "15 minutes ago",
    type: "update",
  },
  {
    id: 3,
    user: "Sarah Wilson",
    action: "Deleted user",
    target: "old.user@example.com",
    time: "1 hour ago",
    type: "delete",
  },
  {
    id: 4,
    user: "Mike Johnson",
    action: "Login attempt",
    target: "Dashboard",
    time: "2 hours ago",
    type: "login",
  },
]

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back! Here's what's happening with your user management system.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="flex items-center mt-2">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions performed in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "create"
                          ? "bg-green-500"
                          : activity.type === "update"
                            ? "bg-blue-500"
                            : activity.type === "delete"
                              ? "bg-red-500"
                              : "bg-gray-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        <span className="font-semibold">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{activity.target}</p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Users className="h-6 w-6 text-blue-600 mb-2" />
                  <div className="text-sm font-medium">Add User</div>
                </button>
                <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Shield className="h-6 w-6 text-green-600 mb-2" />
                  <div className="text-sm font-medium">Create Role</div>
                </button>
                <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Activity className="h-6 w-6 text-orange-600 mb-2" />
                  <div className="text-sm font-medium">View Logs</div>
                </button>
                <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <BarChart3 className="h-6 w-6 text-purple-600 mb-2" />
                  <div className="text-sm font-medium">Analytics</div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
