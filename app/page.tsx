"use client"
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-clients";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter()
  const signOut = async() => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully")
          router.push("/login")
        },
        onError: (error) => {
          toast.error(error.error.message || "Failed to sign out")
        }
      }
    })
  }
  // useSession is a hook that returns the session data, loading state, error, and refetch function
  // authClient will be used on client component to get the session data
  // if you want to use the session data on server component, you can use the auth.api.getSession function
  const { 
    data: session, 
    // isPending, 
    // error, 
    // refetch
} = authClient.useSession() 
  return (
   <div className="flex flex-col items-center justify-center h-screen">
    <ThemeToggle />
    {session ? <div>
      <h2>Welcome back, {session.user?.name}</h2>
      <Button onClick={signOut}>Logout</Button>
   </div>
   : <div>
    <h2>Please sign in</h2>
    <Link href="/login">Sign in with GitHub</Link>
   </div>
   }
  </div>
  );
}
