/**
 * Local architectural renders used by the cinematic loading screen's
 * cursor image trail. Order defines the cycle order the trail follows.
 *
 * Source files are pre-resized to a 640px max dimension and re-encoded as
 * quality-78 JPEGs (~25-70KB each, down from 1.3-2.6MB PNG/JPEG originals).
 * The trail only ever renders these at 125-190px, so the originals were
 * ~30-100x heavier than the display ever needed — and because these load
 * via plain `<img>`/`new Image()` (see components/ui/image-trail.tsx and
 * components/loading-screen.tsx), they bypass Next's on-request image
 * optimizer entirely, so the served bytes are whatever sits on disk here.
 * Re-resize at the same 640px/q78 settings if these are ever swapped.
 */
export const LOADING_IMAGES = [
  "/images/loading/1st.jpg",
  "/images/loading/2nd.jpg",
  "/images/loading/3rd.jpg",
  "/images/loading/4th.jpg",
  "/images/loading/5th.jpg",
  "/images/loading/6th.jpg",
  "/images/loading/7th.jpg",
  "/images/loading/8th.jpg",
  "/images/loading/9th.jpg",
  "/images/loading/10th.jpg",
  "/images/loading/11th.jpg",
  "/images/loading/12th.jpg",
  "/images/loading/13th.jpg",
] as const;
