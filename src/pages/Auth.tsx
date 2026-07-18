import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { APP_NAME } from "@/constants";

export default function Auth() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState("marcus@example.com");
  const [loginPassword, setLoginPassword] = useState("password123");

  // Signup state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupRole, setSignupRole] = useState<"attendee" | "organizer">("attendee");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginEmail, loginPassword);
    if (success) {
      toast.success("Welcome back!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid email or password");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim() || !signupEmail.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    const success = await signup(signupName, signupEmail, signupRole);
    if (success) {
      toast.success("Account created successfully!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/20">
              <Ticket className="size-5 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Welcome to {APP_NAME}</h1>
          <p className="text-muted-foreground text-sm mt-1">Sign in or create your account</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="login" className="flex-1">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="flex-1">Create Account</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input id="login-email" type="email" placeholder="you@example.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="pl-9 bg-background/50 border-white/5" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative mt-1.5">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input id="login-password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="pl-9 pr-9 bg-background/50 border-white/5" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full gap-2">
                  Sign In <ArrowRight className="size-4" />
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Demo: marcus@example.com / any password
                </p>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Label htmlFor="signup-name">Full Name</Label>
                  <div className="relative mt-1.5">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input id="signup-name" placeholder="Your name" value={signupName} onChange={e => setSignupName(e.target.value)} className="pl-9 bg-background/50 border-white/5" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input id="signup-email" type="email" placeholder="you@example.com" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} className="pl-9 bg-background/50 border-white/5" required />
                  </div>
                </div>
                <div>
                  <Label>I want to</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1.5">
                    <button
                      type="button"
                      onClick={() => setSignupRole("attendee")}
                      className={`p-3 rounded-xl border text-sm transition-all ${
                        signupRole === "attendee" ? "border-primary bg-primary/10" : "border-white/5 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <User className="size-4 mx-auto mb-1" />
                      Attend Events
                    </button>
                    <button
                      type="button"
                      onClick={() => setSignupRole("organizer")}
                      className={`p-3 rounded-xl border text-sm transition-all ${
                        signupRole === "organizer" ? "border-primary bg-primary/10" : "border-white/5 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <Sparkles className="size-4 mx-auto mb-1" />
                      Create Events
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full gap-2">
                  Create Account <ArrowRight className="size-4" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}