import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import * as styles from "./SplashScreen.module.css";
import Brandmark from "../images//dokidokiboii-magical-splash.inline.svg";
import { StaticImage } from "gatsby-plugin-image";
import { site } from "../data/site";

const SESSION_KEY = "ddb_splash_seen";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export const SplashScreen: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [hiding, setHiding] = React.useState(false);
  const reduceMotion = useReducedMotion();
  const dismissTimer = React.useRef<ReturnType<typeof setTimeout>>();
  const unmountTimer = React.useRef<ReturnType<typeof setTimeout>>();

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;
    let alreadySeen = false;
    try {
      alreadySeen = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // sessionStorage unavailable
    }
    if (alreadySeen) return;

    setVisible(true);
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const holdTime = prefersReducedMotion ? 700 : 2200;

    dismissTimer.current = setTimeout(() => setHiding(true), holdTime);
    return () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
      if (unmountTimer.current) clearTimeout(unmountTimer.current);
    };
  }, []);

  const dismissNow = React.useCallback(() => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    setHiding(true);
  }, []);

  React.useEffect(() => {
    if (!hiding) return;
    unmountTimer.current = setTimeout(() => setVisible(false), 500);
    return () => {
      if (unmountTimer.current) clearTimeout(unmountTimer.current);
    };
  }, [hiding]);

  const totalParticles = 30;
  const totalGlitters = 12;

  const layers = React.useMemo(() => {
    const floating = Array.from({ length: totalParticles }).map((_, index) => {
      const i = index + 1;
      const size = `${Math.floor(Math.random() * 5) + 5}px`;
      const opacity = Math.random();
      const startX = `${Math.floor(Math.random() * 90)}vw`;
      const startY = `${Math.floor(Math.random() * 90)}vh`;
      const driftX = `${(Math.random() - 0.5) * 32}vw`;
      const driftY = `${(Math.random() - 0.5) * 28}vh`;
      const delay = `${-i * 0.2}s`;
      const bg = `white`;

      return {
        id: `p-${i}`,
        style: {
          "--size": size,
          "--opacity": opacity,
          "--delay": delay,
          "--bg": bg,
          "--start-x": startX,
          "--start-y": startY,
          "--drift-x": driftX,
          "--drift-y": driftY,
        } as React.CSSProperties & { [key: `--${string}`]: string | number },
      };
    });

    const glitters = Array.from({ length: totalGlitters }).map((_, index) => {
      const i = index + 1;

      const sizeNum = Math.floor(Math.random() * 150) + 100;
      const size = `${sizeNum}px`;

      let blurRadius = 0;
      if (sizeNum > 130) {
        blurRadius = parseFloat(((sizeNum - 150) * 0.2).toFixed(1));
      }
      const blur = `${blurRadius}px`;

      const delay = `${-(Math.random() * 6)}s`;
      const duration = `${3 + Math.random() * 3}s`;
      const x = `${Math.floor(Math.random() * 100)}vw`;
      const y = `${Math.floor(Math.random() * 100)}vh`;

      return {
        id: `g-${i}`,
        style: {
          "--size": size,
          "--blur": blur,
          "--delay": delay,
          "--duration": duration,
          "--x": x,
          "--y": y,
        } as React.CSSProperties & { [key: `--${string}`]: string | number },
      };
    });

    return { floating, glitters };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`${styles.overlay} ${hiding ? styles.hide : ""}`}
          onClick={dismissNow}
          role="presentation"
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: hiding ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {layers.glitters.map((glitter) => (
            <motion.div
              key={glitter.id}
              className={styles.glitter}
              style={{
                ...glitter.style,
                left: glitter.style["--x"],
                top: glitter.style["--y"],
              }}
              initial={reduceMotion ? false : { opacity: 0.15, scale: 0.3 }}
              animate={
                reduceMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: [0.12, 0.95, 0.12], scale: [0.3, 1.12, 0.3] }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration:
                        Number.parseFloat(
                          glitter.style["--duration"] as string,
                        ) || 4,
                      delay:
                        Number.parseFloat(glitter.style["--delay"] as string) ||
                        0,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            >
              <StaticImage
                draggable="false"
                src="../images/doki-sparkle.png"
                alt={`${site.name}`}
                loading="eager"
                placeholder="blurred"
              />
            </motion.div>
          ))}

          {layers.floating.map((particle) => (
            <motion.div
              key={particle.id}
              className={styles.particle}
              style={{
                ...particle.style,
                left: particle.style["--start-x"],
                top: particle.style["--start-y"],
              }}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: particle.style["--opacity"] as number,
                      scale: 0.8,
                    }
              }
              animate={
                reduceMotion
                  ? { opacity: 1, scale: 1 }
                  : {
                      x: [0, particle.style["--drift-x"], 0],
                      y: [0, particle.style["--drift-y"], 0],
                      opacity: [
                        particle.style["--opacity"] as number,
                        0.7,
                        particle.style["--opacity"] as number,
                      ],
                      scale: [0.8, 1.06, 0.8],
                    }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 60,
                      ease: "linear",
                      delay:
                        Number.parseFloat(
                          particle.style["--delay"] as string,
                        ) || 0,
                      repeat: Infinity,
                    }
              }
            />
          ))}

          <motion.div
            className={styles.content}
            initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.94 }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              className={`${styles.wordmark} ${hiding ? styles.hidingBrandmark : ""}`}
              animate={
                reduceMotion
                  ? { opacity: 1, scale: 1 }
                  : hiding
                    ? {
                        scale: [1, 1.15, 2.5, 18],
                        opacity: [1, 1, 1, 0],
                        filter: [
                          "brightness(1)",
                          "brightness(1.8)",
                          "brightness(3)",
                          "brightness(5)",
                        ],
                      }
                    : { scale: [1, 1.03, 1], opacity: [0.85, 1, 0.9] }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: hiding ? 1.2 : 1.6,
                      ease: [0.22, 1, 0.36, 1],
                      repeat: hiding ? 0 : Infinity,
                      repeatType: "mirror",
                    }
              }
            >
              <Brandmark />
            </motion.div>
          </motion.div>

          <motion.span
            className={styles.skip}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            tap to skip
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
