"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button"
// import { Metadata } from "next"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react";
import { redirect, useSearchParams } from 'next/navigation'

// export const metadata: Metadata = {
//     title: "Authentication",
//     description: "Authentication forms built using the components.",
// }

export default function AuthenticationPage() {
    const searchParams = useSearchParams();
    const cbUrl = searchParams.get('callbackUrl')
    const session = useSession();
    if(session?.data?.user){
        redirect(cbUrl ?? "/")
    }
    
    const handleClick = () => {
        signIn("google", { callbackUrl: cbUrl ?? "/" })
    }
    return (
        <>
            <div className="container relative hidden h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-loginImg bg-no-repeat bg-cover bg-center" />
                    <div className="relative z-20 flex items-center text-lg font-bold text-primary">
                        <Link
                            href="/"
                            className="hover:text-primary"
                        >
                            TagMather
                        </Link>{" "}
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;This library has saved me countless hours of work and
                                helped me deliver stunning designs to my clients faster than
                                ever before.&rdquo;
                            </p>
                            <footer className="text-sm">Sofia Davis</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <Button variant="outline" type="button" onClick={handleClick}>
                                <Icons.google className="mr-2 h-4 w-4" />
                                Google
                            </Button>

                        </div>
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}