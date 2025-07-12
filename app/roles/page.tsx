"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MainLayout } from "@/components/main-layout"
import { RoleDialog } from "@/components/role-dialog"

const roles = [
  {
    id: 1,
    name: "Admin",
    description: "Full system access with all permissions",
    userCount: 3,
    permissions: [
      "user:create",
      "user:edit",
      "user:delete",
      "user:view",
      "role:create",
      "role:edit",
      "role:delete",
      "role:view",
      "log:view",
      "system:manage",
    ],
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    name: "Manager",
    description: "Manage users and view system logs",
    userCount: 8,
    permissions: ["user:create", "user:edit", "user:view", "role:view", "log:view"],
    createdAt: "2024-01-05",
  },
  {
    id: 3,
    name: "User",
    description: "Basic user access with limited permissions",
    userCount: 45,
    permissions: ["user:view"],
    createdAt: "2024-01-01",
  },
  {
    id: 4,
    name: "Viewer",
    description: "Read-only access to user information",
    userCount: 12,
    permissions: ["user:view", "log:view"],
    createdAt: "2024-01-10",
  },
]

export default function RolesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEditRole = (role: any) => {
    setSelectedRole(role)
    setIsDialogOpen(true)
  }

  const handleAddRole = () => {
    setSelectedRole(null)
    setIsDialogOpen(true)
  }

  return (
    <MainLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Roles & Permissions</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage user roles and their associated permissions</p>
          </div>
          <Button onClick={handleAddRole}>
            <Plus className="mr-2 h-4 w-4" />
            Add Role
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search roles..."
              className="pl-10 max-w-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => (
            <Card key={role.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg">{role.name}</CardTitle>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEditRole(role)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{role.userCount} users</span>
                    </div>
                    <Badge variant="outline">{role.permissions.length} permissions</Badge>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Permissions:</h4>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 3).map((permission) => (
                        <Badge key={permission} variant="secondary" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                      {role.permissions.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{role.permissions.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 dark:text-gray-400">Created: {role.createdAt}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <RoleDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} role={selectedRole} />
      </div>
    </MainLayout>
  )
}
