import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Save } from "lucide-react"
import { ProfileFormData } from "../types"

const ProfileForm = ({ 
    formData, 
    onFormDataChange, 
    onGenderChange, 
    onSubmit, 
    onCancel 
  }: { 
    formData: ProfileFormData
    onFormDataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    onGenderChange: (value: string) => void
    onSubmit: (e: React.FormEvent) => void
    onCancel: () => void
  }) => {
    return (
      <Card className="border-0 bg-background">
        <CardHeader>
          <CardTitle className="text-lg">Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={onFormDataChange} required />
            </div>
  
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup value={formData.gender} onValueChange={onGenderChange} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="MALE" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FEMALE" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>
  
            <div className="space-y-2">
              <Label htmlFor="goals">Goals</Label>
              <Textarea
                id="goals"
                name="goals"
                value={formData.goals}
                onChange={onFormDataChange}
                placeholder="Your fitness goals..."
                rows={3}
              />
            </div>
  
            <div className="flex gap-2">
              <Button type="submit" className="gap-1">
                <Save className="h-4 w-4" />
                Save
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

  export default ProfileForm