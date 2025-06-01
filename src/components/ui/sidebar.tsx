import {
  LayoutDashboard,
  Settings,
  ShoppingBag,
  Users,
  ChevronsLeft,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  return (
    <aside
      className={`group/sidebar flex h-svh flex-col space-y-2 bg-secondary text-secondary-foreground ${
        isCollapsed ? "w-16" : "w-60"
      } p-2`}
    >
      <Button
        type="button"
        variant="ghost"
        className="h-8 px-2 hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <ChevronsLeft className="h-4 w-4" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
      <div className="flex-1">
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `group flex items-center space-x-2 rounded-md p-2 text-sm font-medium hover:underline ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-secondary-foreground"
                }`
              }
            >
              <LayoutDashboard className="h-4 w-4" />
              {!isCollapsed && <div>Dashboard</div>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/browse"
              className={({ isActive }) =>
                `group flex items-center space-x-2 rounded-md p-2 text-sm font-medium hover:underline ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-secondary-foreground"
                }`
              }
            >
              <ShoppingBag className="h-4 w-4" />
              {!isCollapsed && <div>Browse</div>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `group flex items-center space-x-2 rounded-md p-2 text-sm font-medium hover:underline ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-secondary-foreground"
                }`
              }
            >
              <Users className="h-4 w-4" />
              {!isCollapsed && <div>Users</div>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `group flex items-center space-x-2 rounded-md p-2 text-sm font-medium hover:underline ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-secondary-foreground"
                }`
              }
            >
              <Settings className="h-4 w-4" />
              {!isCollapsed && <div>Settings</div>}
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

export function SidebarSkeleton() {
  return (
    <aside className="group/sidebar flex h-svh w-60 flex-col space-y-2 bg-secondary p-2">
      <div className="flex h-svh">
        <div className="flex h-full w-4 shrink-0 md:w-6" />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </div>
    </aside>
  );
}
