"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface RoleDialogProps {
  isOpen: boolean
  onClose: () => void
  role?: any
}

const availablePermissions = [
  { id: "user:create", label: "Create Users", category: "User Management" },
  { id: "user:edit", label: "Edit Users", category: "User Management" },
  { id: "user:delete", label: "Delete Users", category: "User Management" },
  { id: "user:view", label: "View Users", category: "User Management" },
  { id: "role:create", label: "Create Roles", category: "Role Management" },
  { id: "role:edit", label: "Edit Roles", category: "Role Management" },
  { id: "role:delete", label: "Delete Roles", category: "Role Management" },
  { id: "role:view", label: "View Roles", category: "Role Management" },
  { id: "log:view", label: "View Activity Logs", category: "System" },
  { id: "system:manage", label: "System Management", category: "System" },
]

export function RoleDialog({ isOpen, onClose, role }: RoleDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  })

  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name || "",
        description: role.description || "",
        permissions: role.permissions || [],
      })
    } else {
      setFormData({
        name: "",
        description: "",
        permissions: [],
      })
    }
  }, [role])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Role form submitted:", formData)
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissions: checked ? [...prev.permissions, permissionId] : prev.permissions.filter((p) => p !== permissionId),
    }))
  }

  const groupedPermissions = availablePermissions.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = []
      }
      acc[permission.category].push(permission)
      return acc
    },
    {} as Record<string, typeof availablePermissions>,
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{role ? "Edit Role" : "Create New Role"}</DialogTitle>
          <DialogDescription>
            {role ? "Update role information and permissions." : "Create a new role with specific permissions."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Role Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter role name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Enter role description"
                rows={3}
              />
            </div>
            <div className="grid gap-4">
              <Label>Permissions</Label>
              {Object.entries(groupedPermissions).map(([category, permissions]) => (
                <div key={category} className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-900 dark:text-white">{category}</h4>
                  <div className="grid grid-cols-1 gap-2 pl-4">
                    {permissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={permission.id}
                          checked={formData.permissions.includes(permission.id)}
                          onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                        />
                        <Label htmlFor={permission.id} className="text-sm font-normal cursor-pointer">
                          {permission.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{role ? "Update Role" : "Create Role"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
