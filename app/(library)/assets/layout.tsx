import SideNav from "./_components/side-nav";
import MarginWidthWrapper from "./_components/margin-width-wrapper";
import Header from "./_components/header";
import HeaderMobile from "./_components/header-mobile";
import PageWrapper from "./_components/page-wrapper";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="relative h-screen w-full">
            <div className="flex bg-white-1">
                <SideNav />
                <main className="flex-1">
                    <MarginWidthWrapper>
                        <Header />
                        <HeaderMobile />
                        <PageWrapper>{children}</PageWrapper>
                    </MarginWidthWrapper>
                </main>
            </div>
        </main>
    );
}
