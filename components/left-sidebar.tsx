"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { usePathname } from 'next/navigation';

import { LEFT_SIDEBAR_ROUTES } from '@/constants';

export const LeftSidebar = () => {

    const pathname = usePathname();

    return (
        <section className='left_sidebar'>
            <nav className='flex flex-col gap-6'>
                <Link href={"/"} className='flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center'>
                    <Image src={"/icons/logo.svg"} alt="logo" width={23} height={27} />
                    <h1 className='text-24 font-extrabold text-white max-lg:hidden'>Podcastr</h1>
                </Link>
                {LEFT_SIDEBAR_ROUTES.map(({ route, label, imgURL }) => {

                    const isActive = pathname === route || pathname.startsWith(`${route}/`);

                    return <Link
                        key={route}
                        href={route}
                        className={cn(
                            'flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start',
                            { 'bg-nav-focus border-r-4 border-orange-1': isActive }
                        )}
                    >
                        <Image src={imgURL} alt={label} width={24} height={24} />
                        <p className=''>{label}</p>
                    </Link>
                })}
            </nav>
        </section>
    )
}
