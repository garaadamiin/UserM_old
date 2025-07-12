"use client"

import { useState } from "react"
import { Search, Filter, Calendar, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MainLayout } from "@/components/main-layout"

const activityLogs = [
  {
    id: 1,
    user: "John Doe",
    userEmail: "john.doe@example.com",
    action: "Created User",
    details: "Created new user account for jane.smith@example.com",
    type: "create",
    timestamp: "2024-01-20 14:30:25",
    ipAddress: "192.168.1.100",
    userAgent: "Chrome 120.0.0.0",
  },
  {
    id: 2,
    user: "Admin",
    userEmail: "admin@example.com",
    action: "Updated Role",
    details: "Modified permissions for Manager role",
    type: "update",
    timestamp: "2024-01-20 14:15:10",
    ipAddress: "192.168.1.101",
    userAgent: "Firefox 121.0.0.0",
  },
  {
    id: 3,
    user: "Sarah Wilson",
    userEmail: "sarah.wilson@example.com",
    action: "Deleted User",
    details: "Soft deleted user account old.user@example.com",
    type: "delete",
    timestamp: "2024-01-20 13:45:33",
    ipAddress: "192.168.1.102",
    userAgent: "Safari 17.2.1",
  },
  {
    id: 4,
    user: "Mike Johnson",
    userEmail: "mike.johnson@example.com",
    action: "Login",
    details: "Successful login to dashboard",
    type: "login",
    timestamp: "2024-01-20 12:20:15",
    ipAddress: "192.168.1.103",
    userAgent: "Chrome 120.0.0.0",
  },
  {
    id: 5,
    user: "Jane Smith",
    userEmail: "jane.smith@example.com",
    action: "Password Change",
    details: "Changed account password",
    type: "security",
    timestamp: "2024-01-20 11:30:45",
    ipAddress: "192.168.1.104",
    userAgent: "Edge 120.0.0.0",
  },
  {
    id: 6,
    user: "Admin",
    userEmail: "admin@example.com",
    action: "Created Role",
    details: "Created new role 'Viewer' with read-only permissions",
    type: "create",
    timestamp: "2024-01-20 10:15:20",
    ipAddress: "192.168.1.101",
    userAgent: "Chrome 120.0.0.0",
  },
]

export default function LogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  const filteredLogs = activityLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || log.type === selectedType
    return matchesSearch && matchesType
  })

  const getActionBadgeColor = (type: string) => {
    switch (type) {
      case "create":
        return "default"
      case "update":
        return "secondary"
      case "delete":
        return "destructive"
      case "login":
        return "outline"
      case "security":
        return "default"
      default:
        return "outline"
    }
  }

  const getActionIcon = (type: string) => {
    switch (type) {
      case "create":
        return "+"
      case "update":
        return "✏️"
      case "delete":
        return "🗑️"
      case "login":
        return "🔑"
      case "security":
        return "🔒"
      default:
        return "📝"
    }
  }

  return (
    <MainLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Activity Logs</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Monitor all system activities and user actions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <CardTitle>System Activity</CardTitle>
                <CardDescription>Complete audit trail of all system activities</CardDescription>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search activities..."
                    className="pl-10 w-full sm:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedType("all")}>All Activities</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedType("create")}>Create Actions</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedType("update")}>Update Actions</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedType("delete")}>Delete Actions</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedType("login")}>Login Activities</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedType("security")}>Security Events</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt={log.user} />
                          <AvatarFallback>
                            {log.user
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{log.user}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{log.userEmail}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getActionIcon(log.type)}</span>
                        <Badge variant={getActionBadgeColor(log.type)}>{log.action}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="text-sm text-gray-600 dark:text-gray-400 truncate">{log.details}</div>
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      <div className="text-sm">{new Date(log.timestamp).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}</div>
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      <div className="text-sm">{log.ipAddress}</div>
                      <div className="text-xs text-gray-500 truncate max-w-24">{log.userAgent}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
