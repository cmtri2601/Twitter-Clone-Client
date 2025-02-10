import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import {
  Bell,
  ChevronUp,
  Eclipse,
  House,
  LogOut,
  Mail,
  Search,
  Twitter,
  User2,
  UserRound
} from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '~/components/darkmode/theme-provider';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '~/components/ui/sidebar';
import { cn } from '~/lib/utils';

const Layout = () => {
  const projects = [
    { name: 'Home', url: '/home', icon: House },
    { name: 'Explore', url: '/explore', icon: Search },
    { name: 'Notification', url: '/notification', icon: Bell },
    { name: 'Message', url: '/message', icon: Mail },
    { name: 'Profile', url: '/profile', icon: UserRound }
  ];

  const { setTheme } = useTheme();

  return (
    <div className='w-screen'>
      <div className='w-4/6 md:mx-auto'>
        <SidebarProvider>
          <Sidebar collapsible={'offcanvas'} variant='inset'>
            {/* Header */}
            <SidebarHeader>
              <Twitter className='size-7 fill' />
            </SidebarHeader>

            {/* Content */}
            <SidebarContent>
              <SidebarMenu>
                {projects.map((project) => (
                  <SidebarMenuItem key={project.name}>
                    <NavLink
                      to={project.url}
                      className={({ isActive }) =>
                        cn('fill-none', {
                          'font-bold fill-current': isActive
                        })
                      }
                    >
                      <SidebarMenuButton asChild size={'lg'} svgSize='size-7'>
                        <div>
                          <project.icon className='fill-inherit' />
                          <span className='text-xl pl-3'>{project.name}</span>
                        </div>
                      </SidebarMenuButton>
                    </NavLink>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <DropdownMenu>
                    {/* Trigger */}
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton>
                        <User2 /> Username
                        <ChevronUp className='ml-auto' />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side='top'
                      className='w-[--radix-popper-anchor-width]'
                    >
                      {/* Label Header */}
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      {/* Dark mode */}
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <Eclipse />
                          <span>Dark mode</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={() => setTheme('light')}>
                              <span>Light</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme('dark')}>
                              <span>Dark</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setTheme('system')}
                            >
                              <span>System</span>
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>

                      {/* Logout button */}
                      <DropdownMenuItem>
                        <LogOut />
                        <span>Log out</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <main className='mt-10 md:mt-0'>
            <div className='md:hidden fixed'>
              <SidebarTrigger>
                <User2 />
              </SidebarTrigger>
            </div>
            <Outlet />
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default Layout;
