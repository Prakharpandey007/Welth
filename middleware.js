import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

// Create Arcjet middleware
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        "GO_HTTP",
      ],
    }),
  ],
});

// Create base Clerk middleware
const clerk = clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }

  return NextResponse.next();
});

// Chain middlewares - ArcJet runs first, then Clerk
export default createMiddleware(aj, clerk);

export const config = {
  matcher: [
    '/',                 
    '/dashboard(.*)',
    '/account(.*)',
    '/transaction(.*)',
    '/((?!.*\\..*|_next|_static).*)', // Catch-all
    '/(api|trpc)(.*)',
  ],
};
