import { User } from "../types";
import { prisma } from "../prisma";


function generateUsername(name: string): string {
    const base =
        name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "_") // replaces one or more spaces with a single underscore
            .replace(/[^a-z0-9_]/g, "") // removes all non-alphanumeric characters (except underscores)
            .replace(/^_+|_+$/g, ""); // trim leading/trailing underscores

    const suffix = Math.floor(1000 + Math.random() * 9000);
    return `${base}_${suffix}`;
}

export async function ensureUserProfile(neon: {
    id: string;
    name: string;
    image?: string | null;
}): Promise<User> {
    const existing = await prisma.userProfile.findUnique({
        where: {id:neon.id}
    })
    if(existing){
        return{
            id:existing.id,
            username:existing.username,
            displayName:neon.name,
            avatarUrl:neon.image ?? undefined,
        }
    }

    const row = await prisma.userProfile.create({
        data: {id:neon.id, username:generateUsername(neon.name)},
    })
    return{
        id:row.id,
        username:row.username,
        displayName:neon.name,
        avatarUrl:neon.image ?? undefined,
    }
}