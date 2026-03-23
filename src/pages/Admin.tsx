import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { ArrowLeft, LogOut, FileText, Link2, Newspaper, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LinksManager from "@/components/admin/LinksManager";
import NewsManager from "@/components/admin/NewsManager";
import ReviewsManager from "@/components/admin/ReviewsManager";
import { toast } from "sonner";

const AdminLogin = ({ onLogin }: { onLogin: (pw: string) => boolean }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(password)) {
      setError(true);
      toast.error("Invalid password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-xl font-bold text-foreground mb-2">Admin Access</h1>
        <p className="text-sm text-muted-foreground mb-6">Enter the admin password to continue.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="Password"
            className={`w-full rounded-xl border bg-background px-4 py-2.5 text-sm ${error ? "border-destructive" : "border-input"}`}
            autoFocus
          />
          <Button type="submit" className="w-full h-11">Enter Admin Panel</Button>
        </form>
      </div>
    </div>
  );
};

const Admin = () => {
  const { isAuthenticated, login, logout } = useAdminAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-foreground">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">Manage dashboard content</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => { logout(); toast.success("Logged out"); }}>
            <LogOut className="h-4 w-4 me-1" /> Logout
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <Tabs defaultValue="links" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="links" className="gap-1.5">
              <Link2 className="h-4 w-4" /> Links
            </TabsTrigger>
            <TabsTrigger value="news" className="gap-1.5">
              <Newspaper className="h-4 w-4" /> News
            </TabsTrigger>
            <TabsTrigger value="reviews" className="gap-1.5">
              <Star className="h-4 w-4" /> Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="links">
            <LinksManager />
          </TabsContent>
          <TabsContent value="news">
            <NewsManager />
          </TabsContent>
          <TabsContent value="reviews">
            <ReviewsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
