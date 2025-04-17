import { UserProfile } from '@/features/space/profile/user-profile';
import { mockUser } from '@/lib/mock-data';
import React from 'react';
import { ProgramCalendar } from '@/features/space/calendar/program-calendar';


const HomePage = () => {
    return (
        <div className="container mx-auto py-10 flex gap-8 md:flex-row flex-col">

            <div className="max-w-md w-full min-w-sm mx-auto ">
                <UserProfile user={mockUser} />
            </div>
            <div className="flex-auto mx-auto ">
                <ProgramCalendar userId={mockUser.id} />
            </div>
        </div>
    );
};

export default HomePage;