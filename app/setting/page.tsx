import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const SettingPage = async () => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <form action={async()=> {
        "use server";
        await signOut();
      }}>
        <Button type="submit" variant={"destructive"}>
            Signout
        </Button>
      </form>
    </div>
  );
};
export default SettingPage;