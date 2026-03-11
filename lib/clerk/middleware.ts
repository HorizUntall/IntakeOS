import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(*)",
  "/settings(*)",
  "/voice(*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();

  // Explicitly check if it is NOT true
  const onboardingComplete =
    sessionClaims?.metadata?.onboardingComplete === true;

  if (isProtectedRoute(req)) {
    if (!onboardingComplete) {
      // If not complete, they MUST go to onboarding
      const onboardingUrl = new URL("/onboarding", req.url);
      return NextResponse.redirect(onboardingUrl);
    }
  }
});
