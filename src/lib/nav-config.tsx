import { Home, User, Calendar, Users, Activity, UserPlus } from "lucide-react";
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
                id: "my-training",
                title: "My Training",
                href: "/training",
                icon: <Activity className="w-5 h-5" />,
                roles: [Role.USER, Role.ADMIN]
            },
            {
                id: "exercises",
                title: "Exercises",
                href: "/training/exercises",
                icon: <Activity className="w-5 h-5" />,
                roles: [Role.USER, Role.ADMIN]
            },
            {
                id: "new",
                title: "New Training",
                href: "/training/new",
                icon: <Activity className="w-5 h-5" />,
                roles: [Role.USER, Role.ADMIN]
            }
        ]
    },
    {
        id: "account",
        title: "Account",
        href: "/account",
        icon: <User className="w-5 h-5" />,
        roles: [Role.USER, Role.ADMIN],
        subNav: [
            {
                id: "my-infos",
                title: "My Infos",
                href: "/account",
                icon: <User className="w-5 h-5" />,
                roles: [Role.USER, Role.ADMIN]
            },
            {
                id: "change-password", 
                title: "Change Password",
                href: "/account/change-password",
                icon: <User className="w-5 h-5" />,
                roles: [Role.USER, Role.ADMIN]
            }
        ]
    },
    {
        id: "calendar",
        title: "Calendar",
        href: "/calendar",
        icon: <Calendar className="w-5 h-5" />,
        roles: [Role.USER, Role.ADMIN],
        subNav: [
            {
                id: "calendar",
                title: "Calendar",
                href: "/calendar",
                icon: <Calendar className="w-5 h-5" />,
                roles: [Role.USER, Role.ADMIN]
            }
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
            {
                id: "new",
                title: "New User",
                href: "/users/new",
                icon: <UserPlus className="w-5 h-5" />,
                roles: [Role.ADMIN]
            }
        ]
    },
];
