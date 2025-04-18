import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    // Skip database operations during build
    if (process.env.NEXT_PHASE === 'phase-production-build') {
        return NextResponse.json({ error: "Session endpoint not available during build" }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
        return NextResponse.json({ error: "Token manquant" }, { status: 400 });
    }

    try {
        // Récupérer la session et l'utilisateur associé
        const session = await prisma.session.findFirst({
            where: { token },
            include: {
                user: true,
            },
        });

        if (!session) {
            return NextResponse.json({ error: "Session invalide" }, { status: 401 });
        }

        return NextResponse.json({ session });
    } catch (error) {
        console.error("Error fetching session:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}