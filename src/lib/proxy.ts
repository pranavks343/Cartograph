import { authClient } from "./auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export const useAuthProxy = () => {
    const pathname = usePathname();
    const router = useRouter();
    const {
        isPending,
        data: session
    } = authClient.useSession();

    useEffect(() => {
        if (isPending) return;

        if (session) {
            if (pathname === "/login") {
                router.push("/dashboard");
            }
        } else {
            if (pathname.startsWith("/dashboard")) {
                router.push("/");
            }
        }
    }, [session, isPending, router, pathname]);

    return { session, isPending };
};