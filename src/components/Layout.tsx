import * as React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import SplashScreen from "./SplashScreen";
import Noise from "./Noise";
import liveConfig from "../data/live.json";
import type { LiveConfig } from "../types/content";
import { fetchLiveStatus } from "../lib/live-status";
import Nebula from "./Nebula";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { mode, twitchChannel } = liveConfig as LiveConfig;
  const [liveStatus, setLiveStatus] = React.useState(mode === "always");

  React.useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  React.useEffect(() => {
    if (mode !== "auto") {
      setLiveStatus(mode === "always");
      return undefined;
    }

    let cancelled = false;

    const check = async () => {
      try {
        const status = await fetchLiveStatus(twitchChannel);
        if (!cancelled) setLiveStatus(status.live);
      } catch {
        if (!cancelled) setLiveStatus(false);
      }
    };

    check();
    const interval = setInterval(check, 60000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [mode, twitchChannel]);

  return (
    <div>
      <SplashScreen />
      <a
        href="#main"
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
        }}
        onFocus={(e) => {
          e.currentTarget.style.left = "1rem";
          e.currentTarget.style.top = "1rem";
          e.currentTarget.style.zIndex = "9999";
          e.currentTarget.style.background = "#1E1526";
          e.currentTarget.style.padding = "0.5rem 1rem";
          e.currentTarget.style.borderRadius = "8px";
        }}
      >
        Skip to content
      </a>
      <div
        style={{
          inset: 0,
          zIndex: 9999,
          position: "fixed",
          pointerEvents: "none",
        }}
      >
        <Noise />
      </div>
      <Nav isLive={liveStatus} />
      <main id="main">
        <Nebula />
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                isLive: liveStatus,
              } as Record<string, unknown>)
            : child,
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
