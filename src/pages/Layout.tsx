import {
  Bell,
  Eclipse,
  Ellipsis,
  House,
  LogOut,
  Mail,
  Search,
  Twitter,
  UserRound
} from 'lucide-react';
import { useState } from 'react';
import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '~/components/auth/auth-provider';
import AlertDialog from '~/components/ui-custom/AlertDialog';
import { useTheme } from '~/components/dark-mode/theme-provider';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import {
  DropdownMenu,
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
import { StorageKey } from '~/constants/StorageKey';
import { cn } from '~/lib/utils';
import { useLogout } from '~/queries/Users';

const Layout = () => {
  const projects = [
    { name: 'Home', url: '/home', icon: House },
    { name: 'Explore', url: '/explore', icon: Search },
    { name: 'Notification', url: '/notification', icon: Bell },
    { name: 'Message', url: '/message', icon: Mail },
    { name: 'Profile', url: '/profile', icon: UserRound }
  ];

  // Change mode
  const { setTheme } = useTheme();

  // Auth
  const { auth } = useAuth();
  const user = auth?.user;

  // Logout hook
  const logout = useLogout();

  // Handle logout
  const handleLogout = () => {
    const refreshToken = localStorage.getItem(StorageKey.REFRESH_TOKEN) || '';
    logout.mutate({ refreshToken });
  };

  // State control dropdown menu
  const [openDropdown, setOpenDropdown] = useState(false);

  // State control alert dialog
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  // Open alert dialog
  const showAlertDialog = () => {
    setOpenAlertDialog(true);
  };

  // Require auth
  if (!user) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='w-screen'>
      <div className='sm:mx-auto sm:w-full md:w-5/6 lg:w-4/5 xl:w-7/12'>
        <SidebarProvider onExit={showAlertDialog}>
          <Sidebar collapsible={'offcanvas'} variant='inset'>
            {/* Header */}
            <SidebarHeader>
              <Twitter className='size-10 fill' />
            </SidebarHeader>

            {/* Content */}
            <SidebarContent>
              <SidebarMenu>
                {projects.map((project) => (
                  <SidebarMenuItem key={project.name} className='py-1'>
                    <NavLink
                      to={project.url}
                      className={({ isActive }) =>
                        cn('fill-none', {
                          'font-bold fill-current': isActive
                        })
                      }
                    >
                      <SidebarMenuButton asChild size={'lg'}>
                        <div>
                          <project.icon className='fill-inherit' size={27} />
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
                  <DropdownMenu
                    open={openDropdown}
                    onOpenChange={setOpenDropdown}
                  >
                    {/* Trigger */}
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton className='py-5 flex'>
                        {/* Avatar */}
                        <Avatar>
                          <AvatarImage src='https://github.com/shadcn.png' />
                          <AvatarFallback>{`${user?.firstName?.charAt(0)} ${user?.lastName?.charAt(0)}`}</AvatarFallback>
                        </Avatar>
                        {/* Name */}
                        <div className='flex flex-col flex-grow'>
                          <span className='font-bold'>{`${user.firstName} ${user.lastName}`}</span>
                          <span>{`@${user.username}`}</span>
                        </div>
                        {/* Three dots */}
                        <Ellipsis className='!size-4' />
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

                      <DropdownMenuItem
                        onClick={() => {
                          setOpenDropdown(false);
                          showAlertDialog();
                        }}
                      >
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
          <main className='mt-10 sm:mt-0 w-full border-x'>
            <div className='sm:hidden fixed'>
              <SidebarTrigger>
                <Avatar>
                  <AvatarImage src='https://github.com/shadcn.png' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </SidebarTrigger>
            </div>
            <Outlet />
            {/* Alert dialog */}
            <AlertDialog
              label='Log out of Twitter?'
              desc={'You can always log back in at any time.'}
              continueText='Yes, I want to logout'
              open={openAlertDialog}
              setOpen={setOpenAlertDialog}
              onContinue={handleLogout}
            />
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default Layout;
