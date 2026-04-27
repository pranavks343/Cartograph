import { authClient } from "./auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export const useAuthProxy = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (isPending) return;

        if (session) {
            if (pathname === "/login") {
                router.push("/dashboard");
            }
        } else {
            if (pathname === "/dashboard") {
                router.push("/login");
            }
        }
    }, [session, isPending, router, pathname]);

    return { session, isPending };
};