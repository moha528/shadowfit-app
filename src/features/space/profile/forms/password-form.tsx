import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Save } from "lucide-react"
import { PasswordFormData } from "../types"
import { Button } from "@/components/ui/button"

const PasswordForm = ({ 
    formData, 
    onFormDataChange, 
    onSubmit, 
    onCancel 
  }: { 
    formData: PasswordFormData
    onFormDataChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: (e: React.FormEvent) => void
    onCancel: () => void
  }) => {
    return (
      <Card className="border-0 bg-background">
        <CardHeader>
          <CardTitle className="text-lg">Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input 
                id="currentPassword" 
                name="currentPassword" 
                type="password"
                value={formData.currentPassword} 
                onChange={onFormDataChange} 
                required 
              />
            </div>
  
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input 
                id="newPassword" 
                name="newPassword" 
                type="password"
                value={formData.newPassword} 
                onChange={onFormDataChange} 
                required 
              />
            </div>
  
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input 
                id="confirmPassword" 
                name="confirmPassword" 
                type="password"
                value={formData.confirmPassword} 
                onChange={onFormDataChange} 
                required 
              />
            </div>
  
            <div className="flex gap-2">
              <Button type="submit" className="gap-1">
                <Save className="h-4 w-4" />
                Update Password
              </Button>
              <Button type="button" variant="ghost" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  export default PasswordForm