import { useLocale } from "@/lib/i18n";
import { Reveal } from "./reveal";

/**
 * Product video section. The source footage is portrait (720×1280), so the
 * player keeps that aspect ratio instead of the generic 16:9 — a 16:9 frame
 * would letterbox ~75% of the box away.
 *
 * Playback: native <video>, never autoplays, metadata-only preload so the
 * ~16 MB file is not fetched until the user presses play. An H.264 copy sits
 * behind the HEVC original for browsers without HEVC decoding.
 *
 * Animation: the section fades in as a container only — the video element
 * itself is never delayed, loaded, or played for the sake of the effect.
 */
export function ProductVideo() {
  const { t } = useLocale();

  return (
    <section className="bg-white px-6">
      <div className="mx-auto max-w-[1248px] py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
          {/* Copy */}
          <Reveal as="div">
            <h3 className="text-3xl font-semibold leading-tight md:text-[40px]">
              {t("video.title")}
            </h3>
            <p className="mt-5 max-w-[560px] text-base leading-relaxed text-muted md:text-lg">
              {t("video.description")}
            </p>
          </Reveal>

          {/* Player */}
          <Reveal
            direction="scale"
            delay={120}
            className="mx-auto w-full max-w-[360px]"
          >
            <div className="relative aspect-[720/1280] overflow-hidden rounded-3xl bg-coal ring-1 ring-line">
              <video
                controls
                playsInline
                preload="metadata"
                poster="/videos/video-poster.jpg"
                aria-label={t("video.videoLabel")}
                className="h-full w-full object-cover"
              >
                <source src="/videos/video.mp4" type='video/mp4; codecs="hvc1"' />
                <source src="/videos/video-h264.mp4" type="video/mp4" />
              </video>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
