import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  }
});

export const config = {
  matcher: [
    '/',                    // 👈 Explicit match for landing page
    '/dashboard(.*)',
    '/account(.*)',
    '/transaction(.*)',
    '/((?!.*\\..*|_next|_static).*)', // Catch-all
    '/(api|trpc)(.*)',
  ],
};
