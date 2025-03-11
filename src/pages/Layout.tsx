import {
  Bell,
  Eclipse,
  Ellipsis,
  House,
  Lock,
  LogOut,
  Mail,
  Search,
  Twitter,
  UserRound
} from 'lucide-react';
import { useState } from 'react';
import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '~/components/auth/Auth';
import { ChangePasswordDialog } from '~/components/common/dialog/ChangePassword';
import { Username } from '~/components/common/Username';
import { useTheme } from '~/components/dark-mode/theme-provider';
import AlertDialog from '~/components/ui-custom/AlertDialog';
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
import { UserStatus } from '~/constants/UserStatus';
import { cn } from '~/lib/utils';
import { useLogout } from '~/queries/Users';

const Layout = () => {
  // Change mode
  const { setTheme } = useTheme();

  // Auth
  const {
    auth: { isLogin, user }
  } = useAuth();

  // Logout hook
  const logout = useLogout();

  // Handle logout
  const handleLogout = async () => {
    await logout.mutateAsync({});
  };

  // State control dropdown menu
  const [openDropdown, setOpenDropdown] = useState(false);

  // State control alert dialog
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  // State control change password dialog
  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState(false);

  // Open alert dialog
  const showAlertDialog = () => {
    setOpenAlertDialog(true);
  };

  // Require auth
  if (!isLogin) {
    return <Navigate to='/login' />;
  }

  const menuItems =
    user?.status === UserStatus.VERIFIED
      ? [
          { name: 'Home', url: '/home', icon: House },
          { name: 'Explore', url: '/explore', icon: Search },
          { name: 'Notification', url: '/notification', icon: Bell },
          { name: 'Message', url: '/message', icon: Mail },
          { name: 'Profile', url: '/profile', icon: UserRound }
        ]
      : [{ name: 'Profile', url: '/profile', icon: UserRound }];

  return (
    <div className='w-screen'>
      <div className='mx-auto w-full min-[550px]:w-5/6 md:w-5/6 lg:w-4/5 min-[1100px]:w-2/3 xl:w-7/12 min-[1500px]:w-1/2 min-[1700px]:w-5/12'>
        <SidebarProvider onExit={showAlertDialog}>
          <Sidebar collapsible={'offcanvas'} variant='inset'>
            {/* Header */}
            <SidebarHeader>
              <NavLink to={'/home'}>
                <Twitter className='size-10 fill' />
              </NavLink>
            </SidebarHeader>

            {/* Content */}
            <SidebarContent>
              <SidebarMenu>
                {menuItems.map((project) => (
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
                          <AvatarImage src={user?.avatar?.url} />
                          <AvatarFallback>{`${user?.firstName?.charAt(0)} ${user?.lastName?.charAt(0)}`}</AvatarFallback>
                        </Avatar>
                        {/* Name */}
                        <div className='flex flex-col flex-grow'>
                          <span className='font-bold'>{`${user?.firstName} ${user?.lastName}`}</span>
                          <Username
                            username={user?.username as string}
                            className='text-sm text-muted-foreground'
                          />
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

                      {/* Change password button */}
                      <DropdownMenuItem
                        onClick={() => {
                          setOpenDropdown(false);
                          setOpenChangePasswordDialog(true);
                        }}
                      >
                        <Lock />
                        <span>Change password</span>
                      </DropdownMenuItem>

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
          <main className='mt-14 sm:mt-0 w-full sm:border-x overflow-auto'>
            {/* Menu in mobile mode */}
            <div className='sm:hidden fixed top-0 left-0 right-0 z-10 h-14 bg-primary-foreground flex items-center justify-center'>
              {/* Avatar + sidebar trigger */}
              <div className='fixed top-0 left-0 px-3 h-14 flex items-center justify-center'>
                <SidebarTrigger>
                  <Avatar>
                    <AvatarImage src={user?.avatar?.url} />
                    <AvatarFallback>{`${user?.firstName?.charAt(0)} ${user?.lastName?.charAt(0)}`}</AvatarFallback>
                  </Avatar>
                </SidebarTrigger>
              </div>
              {/* Logo */}
              {/* <div className='flex-grow flex justify-center'> */}
              <NavLink to={'/home'}>
                <Twitter className='size-10 fill' />
              </NavLink>
              {/* </div> */}
              {/* Name */}
              <div className='fixed top-0 right-0 px-3 h-14 flex flex-col items-center justify-center'>
                <span className='font-bold'>{`${user?.firstName} ${user?.lastName}`}</span>
                <Username
                  username={user?.username as string}
                  className='text-sm text-muted-foreground'
                />
              </div>
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

            {/* Change password dialog */}
            <ChangePasswordDialog
              open={openChangePasswordDialog}
              setOpen={setOpenChangePasswordDialog}
            />
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default Layout;
