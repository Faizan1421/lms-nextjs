import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GithubIcon } from "lucide-react"
const LoginPage = () => {
  return (
   <Card className="w-full mx-auto">
    <CardHeader>
        <CardTitle>Welcome back!</CardTitle>
        <CardDescription>Login with your GitHub Email</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col gap-4">
        <Button className="w-full cursor-pointer" variant="outline">
            <GithubIcon className="size-4 mr-2" />
            Login with GitHub
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
        <div>
            <div className="grid gap-3">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="email@example.com" />
                </div>
                <Button className="w-full cursor-pointer">Continue with email</Button>
            </div>
        </div>
    </CardContent>
   </Card>
  )
}

export default LoginPage