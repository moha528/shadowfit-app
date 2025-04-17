"use server"

import { UserProfile } from '@/features/space/profile/user-profile';
import React from 'react';
import { UserRepository } from '@/repository/user.repository';
import { ProgramCalendar } from '@/features/space/calendar/program-calendar';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { CreateProgramForm } from '@/features/space/program/create-program-form';
import { ProgramRepository } from '@/repository/program.repository';
import { ProgramDay } from '@prisma/client';
import { Program } from '@prisma/client';

const HomePage = async () => {
    const headersValue = await headers()
    const session = await auth.api.getSession({ headers: headersValue })
    const sessionUser = session?.user

    if (!sessionUser) {
        redirect('/login')
    }

    const user = await UserRepository.getUserById(sessionUser.id)

    if (!user) {
        redirect('/login')
    }

    const program : Program & { days: ProgramDay[] } | null = await ProgramRepository.getProgramByUserId(sessionUser.id)

    return (
        <div className="container mx-auto py-10 flex gap-8 lg:flex-row flex-col">
            <div className="max-w-xl lg:max-w-md w-full min-w-76 mx-auto space-y-4">
                <UserProfile user={user} />
            </div>
            <div className="flex-auto mx-auto">
                <ProgramCalendar userId={sessionUser.id} program={program} />
            </div>
        </div>
    );
};

export default HomePage;