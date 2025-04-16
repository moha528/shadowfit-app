import { ContextNav } from '@/components/navbar/context-nav';
import { MainNav } from '@/components/navbar/main-nav';
import React, { ReactNode } from 'react';


type LayoutProps = {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-black">
            <MainNav />
            <ContextNav />
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
};

export default Layout;