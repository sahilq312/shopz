import { useSession } from "next-auth/react";

export const useCurretUser = () => {
    const session = useSession();

    return session.data?.user
}