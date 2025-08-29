'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  PanelLeft,
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  TrendingUp,
  MessageCircle,
  Settings,
  Mountain,
  User,
  Bell,
  CreditCard,
  Mic,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import React from 'react';
import { VoiceAssistant } from '../shared/voice-assistant';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { href: '/payments', icon: Wallet, label: 'Payments' },
  { href: '/cards', icon: CreditCard, label: 'Cards' },
  { href: '/wallet', icon: Wallet, label: 'Wallet' },
  { href: '/investments', icon: TrendingUp, label: 'Investments' },
  { href: '/credit', icon: CreditCard, label: 'Credit Score' },
  { href: '/chat', icon: MessageCircle, label: 'Chat Assistant' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

function Notifications() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            3
          </span>
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="pt-1.5">
                <span className="block h-2 w-2 rounded-full bg-primary"></span>
              </div>
              <div>
                <p className="font-semibold">Payment Received</p>
                <p className="text-sm text-muted-foreground">
                  You received $250.00 from John Doe.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="pt-1.5">
                <span className="block h-2 w-2 rounded-full bg-primary"></span>
              </div>
              <div>
                <p className="font-semibold">Security Alert</p>
                <p className="text-sm text-muted-foreground">
                  New sign-in from a new device.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
               <div className="pt-1.5">
                <span className="block h-2 w-2 rounded-full bg-transparent"></span>
              </div>
              <div>
                <p className="font-semibold text-muted-foreground">Offer for you</p>
                <p className="text-sm text-muted-foreground">
                  Get 5% cashback on your next purchase.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
  
function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Avatar>
            <AvatarImage src="https://picsum.photos/32/32" data-ai-hint="person" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <ThemeToggle />
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


export function AppHeader() {
  const pathname = usePathname();
  const breadcrumbParts = pathname.split('/').filter(Boolean);


  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Mountain className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">ApexBank</span>
            </Link>
            {navItems.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">ApexBank</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbParts.map((part, index) => (
            <React.Fragment key={part}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {index === breadcrumbParts.length - 1 ? (
                  <BreadcrumbPage className="capitalize">{part}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={`/${breadcrumbParts.slice(0, index + 1).join('/')}`}>
                        <span className="capitalize">{part}</span>
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <VoiceAssistant />
      <Notifications />
      <UserMenu />
    </header>
  );
}
