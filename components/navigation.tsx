import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Mail, BookOpen, Zap, Home, Settings, Info, Shield } from 'lucide-react';
import { isCurrentUserAdmin } from '@/lib/auth';

const publicNavigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Newsletters', href: '/newsletters', icon: Mail },
  { name: 'Blog', href: '/blogs', icon: BookOpen },
  { name: 'Products', href: '/products', icon: Zap },
  { name: 'About', href: '/about', icon: Info },
];

const adminNavigation = [
  { name: 'Admin', href: '/admin', icon: Settings },
  { name: 'Test Auth', href: '/test-auth', icon: Shield },
];

export async function Navigation() {
  const isAdmin = await isCurrentUserAdmin();
  const navigation = isAdmin ? [...publicNavigation, ...adminNavigation] : publicNavigation;

  return (
    <nav className="flex space-x-1">
      {navigation.map((item) => {
        const Icon = item.icon;
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
              'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
