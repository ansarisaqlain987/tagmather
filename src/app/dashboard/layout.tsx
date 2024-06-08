"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image"
import Link from "next/link"
import {
  Home,
  LineChart,
  BadgeDollarSign,
  Package2,
  PanelLeft,
  Search,
  Settings,
  Blocks,
  Landmark,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"
import { signOut } from "next-auth/react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { usePathname } from "next/navigation";
import { FC, PropsWithChildren } from "react";


const queryClient = new QueryClient()
const iconClassName = "h-5 w-5 group-hover:scale-110";
const selectedMenuItemCN = "group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base";
const defaultMenuItemCN = "group flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8";

interface MenuItem {
  name: string;
  Icon: any;
  path: string;
}

const SidePanelDesktop: FC<PropsWithChildren<{ menuItems: MenuItem[], currentPath: string }>> = ({ menuItems, currentPath }) => {
  return (<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
      <Link
        href="#"
        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
      >
        <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      {
        menuItems.map((item: MenuItem, index: number) => {
          return (<TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.path}
                  className={currentPath === item.path ? selectedMenuItemCN : defaultMenuItemCN}
                >
                  <item.Icon className={iconClassName} />
                  <span className="sr-only">{item.name}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>)
        })
      }
    </nav>
  </aside>)
}

const SidePanelMobile: FC<PropsWithChildren<{ menuItems: MenuItem[] }>> = ({ menuItems }) => {
  return (<Sheet>
    <SheetTrigger asChild>
      <Button size="icon" variant="outline" className="sm:hidden">
        <PanelLeft className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="sm:max-w-xs">
      <nav className="grid gap-6 text-lg font-medium">
        <Link
          href="#"
          className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
        >
          <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {
          menuItems.map((item: MenuItem, index: number) => (
            <Link
              key={index}
              href={item.path}
              className="group flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <item.Icon className="h-5 w-5 group-hover:scale-110" />
              {item.name}
            </Link>
          ))
        }
      </nav>
    </SheetContent>
  </Sheet>)
}

const SideDropdownMenu: FC = () => {
  return (<DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        size="icon"
        className="overflow-hidden rounded-full"
      >
        <Image
          src="https://lh3.googleusercontent.com/a/ACg8ocKKXjvPAdL8prQ5Gno3nPEAOlCijQY9PqGVhui1BYY6kJaBZ4Ly=s96-c"
          width={36}
          height={36}
          alt="Avatar"
          className="overflow-hidden rounded-full"
        />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <Link href="/settings"><DropdownMenuItem>Settings</DropdownMenuItem></Link>
      <DropdownMenuItem>Support</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>)
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pn = usePathname();
  const menuItems: MenuItem[] = [
    {
      name: 'Dashboard',
      Icon: Home,
      path: '/dashboard'
    },
    {
      name: 'Envelop',
      Icon: Blocks,
      path: '/dashboard/envelops'
    },
    {
      name: 'Transactions',
      Icon: BadgeDollarSign,
      path: '/dashboard/transactions'
    },
    {
      name: 'Loans',
      Icon: Landmark,
      path: '#'
    },
    {
      name: 'Analytics',
      Icon: LineChart,
      path: '#'
    },
    {
      name: 'Settings',
      Icon: Settings,
      path: '/dashboard/settings'
    }
  ]
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <SidePanelDesktop menuItems={menuItems} currentPath={pn} />
        <div className="flex flex-1 flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidePanelMobile menuItems={menuItems} />
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
            <SideDropdownMenu />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
