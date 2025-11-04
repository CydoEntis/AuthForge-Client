import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Safari } from "@/components/ui/shadcn-io/safari";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 50);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      {/* Top radial background */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[60vw] h-[40vh] bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-from)_0%,transparent_70%)] from-primary/20 blur-3xl scale-y-150 translate-y-5" />
        </div>

        {/* Hero + Mockup Container */}
        <div
          className={`transition-all duration-700 ease-out transform ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Hero */}
          <div className="max-w-[765px] mt-32 p-8 space-y-6">
            <div className="text-6xl font-semibold">
              <h1>Self Hosted Auth.</h1>
              <h1>Made Simple.</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Ditch the complexity. AuthForge gives you full control with a secure, self-hosted authentication platform
              that’s easy to set up, manage, and scale—without vendor lock-in.
            </p>
            <div className="flex gap-4">
              <Button className="rounded-full" size="lg">
                Get Started
              </Button>
              <Button className="rounded-full" size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>

          {/* Mockup */}
          <div className="relative sm:px-24 my-16">
            <div
              className={`relative z-10 h-[24px] transition-all duration-500 ease-out ${
                scrolled ? "rotate-0 skew-y-0 left-0" : "rotate-[-20deg] skew-y-12 left-[-15%]"
              }`}
            >
              <div
                className={`relative z-10 h-[24px] transition-all duration-500 ease-out ${
                  scrolled ? "rotate-0 skew-y-0" : "rotate-[-24deg] skew-y-12"
                }`}
              >
                <div className="relative flex z-10 overflow-hidden ">
                  <div className="max-w-[1200px]">
                    <Safari
                      url="yourdomain.com"
                      className="size-full shadow-none"
                      // imageSrc="https://placehold.co/1248x765/1a1a1a/666?text=Your+Dashboard"
                    />
                  </div>

                  {/* Linear gradient overlay */}
                  <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none bg-linear-to-b from-transparent to-background" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-[900px]"></div>
    </div>
  );
}
