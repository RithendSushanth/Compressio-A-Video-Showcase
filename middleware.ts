// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
// import { NextResponse } from 'next/server';

// const isPublicRoute = createRouteMatcher([
//     "/sign-in",
//     "/sign-up",
//     "/",
//     "/home"
// ])

// const isPublicApiRoute = createRouteMatcher([
//     "/api/videos"
// ])

// export default clerkMiddleware((auth, req) => {
//     const { userId } = auth();
//     const currentUrl = new URL(req.url)
//     const isAccessingDashboard = currentUrl.pathname === "/home";
//     const isApiRequest = currentUrl.pathname.startsWith("/api")

//     //if user logged in and accessing a public route but not the dashboard
//     if (userId && isPublicRoute(req) && !isAccessingDashboard) {
//         return NextResponse.redirect(new URL("/home", req.url))
//     }

//     //not logged in
//     if (!userId) {
//         //if user is not logged in and trying to access a protected route
//         if (!isPublicApiRoute(req) && !isPublicRoute(req)) {
//             NextResponse.redirect(new URL("/sign-in", req.url))
//         }

//         //if the req is for a protected api and the user is not logged in
//         if (isApiRequest && !isPublicApiRoute(req)) {
//             return NextResponse.redirect(new URL("/sign-in", req.url))
//         }
//     }
//     return NextResponse.next()
// })

// export const config = {
//     matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
//   };



// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// import { NextResponse } from 'next/server';

// const isPublicRoute = createRouteMatcher([
//     "/sign-in",
//     "/sign-up",
//     "/",
//     "/home",
//     // Include any other public routes here
// ]);

// const isPublicApiRoute = createRouteMatcher([
//     "/api/videos",
//     // Include any other public API routes here
// ]);

// // Add protected routes here
// const protectedRoutes = createRouteMatcher([
//     "/upload-video",
//     "/social-share",
//     // Add any other protected routes here
// ]);

// export default clerkMiddleware((auth, req) => {
//     const { userId } = auth();
//     const currentUrl = new URL(req.url);
//     const isAccessingDashboard = currentUrl.pathname === "/home";
//     const isApiRequest = currentUrl.pathname.startsWith("/api");

//     // If user is logged in and accessing a public route but not the dashboard
//     if (userId && isPublicRoute(req) && !isAccessingDashboard) {
//         return NextResponse.redirect(new URL("/home", req.url));
//     }

//     // If user is not logged in
//     if (!userId) {
//         // Redirect to sign-in for protected routes
//         if (protectedRoutes(req) || (!isPublicApiRoute(req) && !isPublicRoute(req))) {
//             return NextResponse.redirect(new URL("/sign-in", req.url));
//         }

//         // If the request is for a protected API and the user is not logged in
//         if (isApiRequest && !isPublicApiRoute(req)) {
//             return NextResponse.redirect(new URL("/sign-in", req.url));
//         }
//     }
//     return NextResponse.next();
// });

// export const config = {
//     matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };


import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
    "/sign-in",
    "/sign-up",
    "/",
    "/home",
]);

const protectedRoutes = createRouteMatcher([
    "/upload-video",
    "/social-share",
]);

const isPublicApiRoute = createRouteMatcher([
    "/api/videos",
]);

export default clerkMiddleware((auth, req) => {
    const { userId } = auth();
    const currentUrl = new URL(req.url);
    const isApiRequest = currentUrl.pathname.startsWith("/api");

    // If the user is not signed in
    if (!userId) {
        // Redirect to sign-in for protected routes
        if (protectedRoutes(req) || (!isPublicApiRoute(req) && !isPublicRoute(req))) {
            return NextResponse.redirect(new URL("/sign-in", req.url));
        }
        // Allow access to public routes
        return NextResponse.next();
    }

    // Allow signed-in users to access all routes
    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
