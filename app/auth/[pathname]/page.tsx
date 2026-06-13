import { AuthView } from "@neondatabase/auth/react";

export default async function AuthPage({
    params
}: {
    params: Promise<{ pathname: string }>;
}) {
    const {pathname} = await params;
    return (
        <div className="flex items-center justify-center mt-20">
            <div className="w-sm"><AuthView pathname={pathname}/></div>
        </div>
    )
}