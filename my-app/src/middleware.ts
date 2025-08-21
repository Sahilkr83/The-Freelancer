import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt";


export async function middleware(request:NextRequest){

    const token = await getToken({req:request})
    const url = request.nextUrl

    if(token && (url.pathname.startsWith('/auth/sign-in') || url.pathname.startsWith('/auth/sign-up') || url.pathname.startsWith('/auth/forget-password') || url.pathname.startsWith('/auth/reset-password'))){
        return NextResponse.redirect(new URL('/profile',request.url))
    }
    if(!token && (url.pathname.startsWith("/profile") || url.pathname.startsWith("/auth/change-password") || url.pathname.startsWith('/dashboard') )){
        return NextResponse.redirect(new URL('/auth/sign-in',request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher:[
        '/auth/sign-in',
        '/auth/sign-up',
        '/auth/forget-password',
        '/auth/reset-password',
        '/auth/change-password',
        '/profile',
        '/dashboard'
    ]
}