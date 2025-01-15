import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, LogOut } from 'lucide-react';
import AdminButton from "@/components/admin/admin-button";

const ProfilePage = async () => {
  const session = await auth();

  if (!session) {
    return null; // or redirect to login page
  }

  const { user } = session;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.image || ''} alt="Profile picture" />
            <AvatarFallback>{user.name?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
          <h1 className="mt-4 text-2xl font-bold">{user.name}</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <User className="text-gray-500" />
            <span>{user.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="text-gray-500" />
            <span>{user.email}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          {user.email && <AdminButton email={user.email} />}
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit" variant="destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfilePage;

