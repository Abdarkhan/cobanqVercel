import { useEffect, useRef } from 'react';
import { useInView, useAnimation } from 'framer-motion';


export function use_reveal(options = {}) {
  const ref = useRef(null);
  const in_view = useInView(ref, { once: options.once !== false, amount: options.amount ?? 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (in_view) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: options.duration ?? 0.8, ease: [0.22, 1, 0.36, 1] },
      });
    }
  }, [in_view, controls, options.duration]);

  return {
    ref,
    initial: { opacity: 0, y: options.y ?? 60 },
    animate: controls,
  };
}

/**
 * Simpler: just ref that you attach; use with motion.div and useInView for stagger.
 * Returns ref for container and inView boolean for triggering children.
 */
export function use_scroll_trigger(options = {}) {
  const ref = useRef(null);
  const in_view = useInView(ref, { once: options.once !== false, amount: options.amount ?? 0.15 });
  return { ref, in_view };
}

/**
 * Stagger reveal: attach ref to container, add .stagger-item to children,
 * and use Framer Motion in the component. This hook only returns ref + in_view.
 */
export function use_stagger_reveal(options = {}) {
  const ref = useRef(null);
  const in_view = useInView(ref, { once: options.once !== false, amount: options.amount ?? 0.12 });
  return { ref, in_view };
}

/**
 * For scale + fade reveal (e.g. cards). Returns ref and motion props.
 */
export function use_scale_reveal(options = {}) {
  const ref = useRef(null);
  const in_view = useInView(ref, { once: options.once !== false, amount: options.amount ?? 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (in_view) {
      controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: options.duration ?? 0.9, ease: [0.22, 1, 0.36, 1] },
      });
    }
  }, [in_view, controls, options.duration]);

  return {
    ref,
    initial: { opacity: 0, scale: options.scale ?? 0.92 },
    animate: controls,
  };
}
