import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const SettingPage = async () => {
  const session = await auth();
  if(session){

    return (
      <div className=" flex flex-col">
      {JSON.stringify(session)}
      {session.user.image ? <Image src={session.user.image} alt="profile" width={60} height={60}/> : ""}
      <h1>{session.user.name}</h1>
      <h1>{session.user.email}</h1>
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
}
};
export default SettingPage;