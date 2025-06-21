import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GithubIcon } from "lucide-react"
const LoginPage = () => {
  return (
   <Card className="w-full mx-auto">
    <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Login with your GitHub Email</CardDescription>
    </CardHeader>
    <CardContent>
        <Button className="w-full" variant="outline">
            <GithubIcon className="size-4 mr-2" />
            Login with GitHub
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-card px-2">Or continue with</span>
        </div>
    </CardContent>
   </Card>
  )
}

export default LoginPage