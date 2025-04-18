import {Home, User, Users, Activity, ActivityIcon} from "lucide-react";
import { Role } from "@prisma/client";

interface NavItem {
    id: string;
    title: string;
    href: string;
    icon: React.ReactNode;
    roles: Role[];
    badge?: number;
    isProtectedRoute?: boolean;
    subNav?: NavItem[];
}

export const navigationConfig: NavItem[] = [
    {
        id: "dashboard",
        title: "Dashboard",
        href: "/dashboard",
        icon: <Home className="w-5 h-5" />,
        roles: [Role.USER, Role.ADMIN],
        subNav: [
            {
                id: "dashboard",
                title: "Dashboard",
                href: "/dashboard",
                icon: <Home className="w-5 h-5" />,
                roles: [Role.USER, Role.ADMIN],
            }
        ]
    },
    {
        id: "training",
        title: "Training",
        href: "/training",
        icon: <Activity className="w-5 h-5" />,
        roles: [Role.USER, Role.ADMIN],
        subNav: [
            {
                id: "exercises",
                title: "Exercises",
                href: "/training",
                icon: <Activity className="w-5 h-5" />,
                roles: [Role.USER, Role.ADMIN]
            },
            {
                id: "new",
                title: "New Training",
                href: "/training/new",
                icon: <Activity className="w-5 h-5" />,
                roles: [Role.ADMIN]
            },
            {
                id: "my",
                title: "my Training",
                href: "/training/my",
                icon: <ActivityIcon className="w-5 h-5" />,
                roles: [Role.USER, Role.ADMIN]
            }
        ]
    },
    {
        id: "space",
        title: "My Space",
        href: "/space",
        icon: <User className="w-5 h-5" />,
        roles: [Role.USER, Role.ADMIN],
        subNav: [
            {
                id: "my-infos",
                title: "My Space",
                href: "/space",
                icon: <User className="w-5 h-5" />,
                roles: [Role.USER, Role.ADMIN]
            },
        ]
    },
    {
        id: "users",
        title: "Users",
        href: "/users",
        icon: <Users className="w-5 h-5" />,
        roles: [Role.ADMIN],
        subNav: [
            {
                id: "all",
                title: "All Users",
                href: "/users",
                icon: <Users className="w-5 h-5" />,
                roles: [Role.ADMIN]
            },
        ]
    },
];
