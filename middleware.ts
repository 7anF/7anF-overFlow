import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher(["/ask-question(.*)"]);
const isPublicRoute = createRouteMatcher([
  "/api/webhooks",
  "question/:id",
  "/tags",
  "/tags/:id",
  "/profile/:id",
  "/comunnity",
  "/jobs",
]);
export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
