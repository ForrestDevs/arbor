"use client";

import React from "react";
import { ChevronsUpDown, LogIn, LogOut, Wallet } from "lucide-react";
import { useLogin } from "@/lib/hooks/use-login";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useNativeBalance } from "@/lib/hooks/queries/solana/use-native-balance";
import { truncateAddress } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";

const WalletButton: React.FC = () => {
  const { user, ready, login, logout } = useLogin();
  const router = useRouter();
  const { isMobile } = useSidebar();

  if (!ready) return <Skeleton className="w-full h-8" />;

  if (!user || !user.wallet)
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            variant="outline"
            onClick={() => login()}
            className="w-full justify-center gap-0"
          >
            <LogIn className="h-4 w-4" />
            <span className="ml-2">Log in</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              variant="outline"
            >
              <Wallet className="size-8" />
              <span className="ml-2">
                {truncateAddress(user.wallet.address)}
              </span>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-80 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Wallet className="size-4" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {truncateAddress(user.wallet.address)}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Balances address={user.wallet.address} />
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => await logout().then(() => router.push("/"))}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const Balances: React.FC<{ address: string }> = ({ address }) => {
  const {
    data: nativeBalance,
    isLoading: isNativeBalanceLoading,
    error: nativeBalanceError,
  } = useNativeBalance(address);

  if (isNativeBalanceLoading) return <Skeleton className="h-10 w-full" />;

  if (nativeBalanceError) return <p>Error fetching balances</p>;

  return (
    <div className="flex flex-col gap-2 max-h-48 overflow-y-auto px-2">
      <div className="flex flex-row items-center gap-2">
        <Image
          src={"/solana.png"}
          alt={"Solana"}
          className="w-6 h-6 rounded-full"
          width={24}
          height={24}
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium">Solana (SOL)</span>
          <span className="text-sm text-muted-foreground">
            {nativeBalance.toFixed(4)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WalletButton;
