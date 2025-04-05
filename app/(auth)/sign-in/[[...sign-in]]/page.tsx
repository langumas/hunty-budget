import  Image  from "next/image";
import { Loader2 } from 'lucide-react';
import { SignIn, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';

export default function Page() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-400 via-purple-200 to-white grid grid-cols-1 lg:grid-cols-2">
            <div className="h-full lg:flex flex-col items-center justify-center px-4">
                <div className="text-center space-y-4 pt-16">
                    <h1 className="font-bold text-3xl text-black">
                        Welcome back
                    </h1>
                    <p className="font-bold text-base text-black">
                        Ingresa o crea una cuenta.
                    </p>
                </div>
                <div className="flex items-center justify-center mt-8">
                    <ClerkLoaded>
                        <SignIn path="/sign-in"/>
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2 className="animate-spin text-muted-foreground"/>
                    </ClerkLoading>
                </div>
            </div>
            <div className="h-full bg-gradient-to-b from-purple-400 via-purple-200 to-white hidden lg:flex items-center justify-center">
                <Image src="/5064125-Photoroom.png" height={700} width={700} alt=""/>
            </div>
        </div>
    );
}