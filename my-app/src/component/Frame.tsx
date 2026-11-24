'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { LoaderCircle, Pause, Play, Volume2, VolumeX } from 'lucide-react';

interface FrameProps {
  id: string;
  videos?: string[];
  editName: string;
  items?: { number: string; type: string }[];
}

const sectionMeta: Record<string, { number: string; label: string; summary: string }> = {
  podcast: { number: '01', label: 'Long-form conversation', summary: 'Natural multi-camera edits that protect the conversation while keeping the visual rhythm active.' },
  simple: { number: '02', label: 'Short-form content', summary: 'Clean, direct edits designed to communicate quickly across social and digital channels.' },
  motion: { number: '03', label: 'Designed movement', summary: 'Motion systems, titles, transitions, and visual hooks that give content a recognizable identity.' },
  commercial: { number: '04', label: 'Brand storytelling', summary: 'Focused campaign edits combining product clarity, emotional pacing, and a refined visual finish.' },
};

export default function Frame({ id, videos = [], editName, items = [] }: FrameProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const focusedVideoRef = useRef(-1);
  const [playing, setPlaying] = useState<boolean[]>(() => videos.map(() => false));
  const [muted, setMuted] = useState<boolean[]>(() => videos.map(() => true));
  const [loadStates, setLoadStates] = useState<Array<'loading' | 'ready' | 'error'>>(() => videos.map(() => 'loading'));
  const meta = sectionMeta[id] ?? { number: '00', label: 'Selected edits', summary: 'A curated selection of professional video work.' };
  const capabilities = ['Fine cuts', 'Smooth transitions', 'Subtitles', ...items.map(item => item.type)];

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) video.play().catch(() => undefined);
        else video.pause();
      });
    }, { threshold: .6 });
    videoRefs.current.forEach(video => video && observer.observe(video));
    return () => observer.disconnect();
  }, [videos]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    let frameId = 0;
    let direction = 1;
    let position = gallery.scrollLeft;
    let paused = false;
    let lastTimestamp = 0;
    let slowUntil = 0;
    let sequenceSwitchAt = 0;
    const mobileViewport = window.matchMedia('(max-width: 639px)');
    let isMobile = mobileViewport.matches;
    const updateSpeed = (event: MediaQueryListEvent) => {
      isMobile = event.matches;
      focusedVideoRef.current = -1;
      sequenceSwitchAt = 0;
      if (!isMobile && videos.length <= 3) {
        position = 0;
        gallery.scrollLeft = 0;
      }
    };

    const focusFullyVisibleVideo = (timestamp: number) => {
      const galleryBounds = gallery.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const viewportCenterX = viewportWidth / 2;
      const viewportCenterY = viewportHeight / 2;
      const verticalCenterTolerance = Math.min(viewportHeight * 0.18, 150);
      let closestIndex = -1;
      let closestDistance = Number.POSITIVE_INFINITY;
      const useStaticSequence = !isMobile && videos.length <= 3;

      if (useStaticSequence) {
        const galleryCenterY = galleryBounds.top + galleryBounds.height / 2;
        const galleryIsActive = Math.abs(galleryCenterY - viewportCenterY) <= viewportHeight * 0.38;
        if (galleryIsActive && timestamp >= sequenceSwitchAt) {
          closestIndex = (focusedVideoRef.current + 1 + videos.length) % videos.length;
          sequenceSwitchAt = timestamp + 3200;
        } else if (galleryIsActive) {
          return;
        }
      } else {
        videoRefs.current.forEach((video, index) => {
          if (!video) return;
          const bounds = video.getBoundingClientRect();
          const videoCenterX = bounds.left + bounds.width / 2;
          const videoCenterY = bounds.top + bounds.height / 2;
          const fullyVisible =
            bounds.left >= Math.max(0, galleryBounds.left) &&
            bounds.right <= Math.min(viewportWidth, galleryBounds.right) &&
            bounds.top >= 0 &&
            bounds.bottom <= viewportHeight;
          const verticallyCentered = Math.abs(videoCenterY - viewportCenterY) <= verticalCenterTolerance;
          if (!fullyVisible || !verticallyCentered) return;
          const distance = Math.abs(videoCenterX - viewportCenterX);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        if (closestIndex < 0 && videos.length > 0) {
          const maxScroll = gallery.scrollWidth - gallery.clientWidth;
          const edgeIndex = gallery.scrollLeft <= 2
            ? 0
            : gallery.scrollLeft >= maxScroll - 2
              ? videos.length - 1
              : -1;
          const edgeVideo = edgeIndex >= 0 ? videoRefs.current[edgeIndex] : null;
          if (edgeVideo) {
            const bounds = edgeVideo.getBoundingClientRect();
            const videoCenterY = bounds.top + bounds.height / 2;
            const fullyVisibleVertically = bounds.top >= 0 && bounds.bottom <= viewportHeight;
            if (fullyVisibleVertically && Math.abs(videoCenterY - viewportCenterY) <= verticalCenterTolerance) {
              closestIndex = edgeIndex;
            }
          }
        }
      }

      if (closestIndex === focusedVideoRef.current) return;
      focusedVideoRef.current = closestIndex;
      if (closestIndex < 0) {
        slowUntil = timestamp;
        videoRefs.current.forEach(video => {
          if (video) video.muted = true;
        });
        setMuted(videoRefs.current.map(() => true));
        return;
      }

      slowUntil = timestamp + 2200;
      videoRefs.current.forEach((video, index) => {
        if (!video) return;
        video.muted = index !== closestIndex;
      });
      setMuted(videoRefs.current.map((video, index) => video ? index !== closestIndex : true));

      const focusedVideo = videoRefs.current[closestIndex];
      if (focusedVideo) {
        focusedVideo.muted = false;
        focusedVideo.play().catch(() => {
          focusedVideo.muted = true;
          setMuted(state => state.map((value, index) => index === closestIndex ? true : value));
          focusedVideo.play().catch(() => undefined);
        });
      }
    };

    const animateGallery = (timestamp: number) => {
      const elapsedSeconds = lastTimestamp ? Math.min((timestamp - lastTimestamp) / 1000, 0.05) : 0;
      lastTimestamp = timestamp;
      const maxScroll = gallery.scrollWidth - gallery.clientWidth;
      const shouldAutoScroll = isMobile || videos.length > 3;
      if (!paused && shouldAutoScroll && maxScroll > 1) {
        const speed = timestamp < slowUntil
          ? (isMobile ? 7 : 12)
          : (isMobile ? 105 : 170);
        position += speed * elapsedSeconds * direction;
        if (position >= maxScroll) {
          position = maxScroll;
          direction = -1;
        } else if (position <= 0) {
          position = 0;
          direction = 1;
        }
        gallery.scrollLeft = position;
      }
      focusFullyVisibleVideo(timestamp);
      frameId = requestAnimationFrame(animateGallery);
    };

    const pause = () => { paused = true; };
    const resume = () => {
      position = gallery.scrollLeft;
      lastTimestamp = performance.now();
      paused = false;
    };
    const syncPosition = () => {
      if (paused) position = gallery.scrollLeft;
    };

    gallery.addEventListener('mouseenter', pause);
    gallery.addEventListener('mouseleave', resume);
    gallery.addEventListener('focusin', pause);
    gallery.addEventListener('focusout', resume);
    gallery.addEventListener('touchstart', pause, { passive: true });
    gallery.addEventListener('touchend', resume, { passive: true });
    gallery.addEventListener('scroll', syncPosition, { passive: true });
    mobileViewport.addEventListener('change', updateSpeed);
    frameId = requestAnimationFrame(animateGallery);

    return () => {
      cancelAnimationFrame(frameId);
      focusedVideoRef.current = -1;
      gallery.removeEventListener('mouseenter', pause);
      gallery.removeEventListener('mouseleave', resume);
      gallery.removeEventListener('focusin', pause);
      gallery.removeEventListener('focusout', resume);
      gallery.removeEventListener('touchstart', pause);
      gallery.removeEventListener('touchend', resume);
      gallery.removeEventListener('scroll', syncPosition);
      mobileViewport.removeEventListener('change', updateSpeed);
    };
  }, [videos]);

  const togglePlay = async (index: number) => {
    const current = videoRefs.current[index];
    if (!current) return;
    videoRefs.current.forEach((video, videoIndex) => {
      if (video && videoIndex !== index) video.pause();
    });
    if (current.paused) await current.play().catch(() => undefined);
    else current.pause();
  };

  const toggleMute = (index: number) => {
    const current = videoRefs.current[index];
    if (!current) return;
    current.muted = !current.muted;
    setMuted(state => state.map((value, i) => i === index ? current.muted : value));
  };

  return (
    <motion.section id={id} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} viewport={{ once: true, amount: .08 }} className="scroll-mt-24 border-t border-[#E8E8EE] py-16 first:border-t-0 sm:py-20 lg:py-24">
      <div className="grid gap-8 sm:gap-10 lg:grid-cols-[18rem_1fr] lg:gap-14">
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-[#633CFF] sm:gap-3 sm:text-sm"><span>{meta.number}</span><span className="h-px w-7 bg-[#633CFF] sm:w-8" /><span>{meta.label}</span></div>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-.045em] sm:mt-5 sm:text-4xl">{editName}</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#686868] sm:mt-4 sm:text-base sm:leading-7">{meta.summary}</p>
          <ul className="-mx-5 mt-6 flex gap-2 overflow-x-auto border-t border-[#E8E8EE] px-5 pt-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-3 sm:px-0 sm:pt-6 lg:mt-8 lg:grid-cols-1">
            {capabilities.map((capability, index) => <li key={`${capability}-${index}`} className="flex shrink-0 items-center gap-2 rounded-full bg-[#F0F0F5] px-3 py-2 text-xs text-[#686868] sm:gap-3 sm:rounded-none sm:bg-transparent sm:px-0 sm:py-0 sm:text-sm"><span className="text-[10px] font-semibold text-[#633CFF] sm:text-xs">{String(index + 1).padStart(2, '0')}</span>{capability}</li>)}
          </ul>
        </aside>

        <div className="min-w-0">
          <div className="mb-4 flex items-center justify-between sm:mb-5"><p className="text-xs text-[#686868] sm:text-sm">{videos.length} selected edit{videos.length === 1 ? '' : 's'}</p><p className="text-[10px] uppercase tracking-[.12em] text-[#8A8A8A] sm:text-xs sm:tracking-[.14em]">Auto preview</p></div>
          <div ref={galleryRef} className={`video-gallery -mx-5 flex gap-3 overflow-x-auto overscroll-x-contain pb-5 [scrollbar-width:none] [will-change:scroll-position] [transform:translateZ(0)] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:gap-5 sm:pb-7 sm:[scrollbar-color:#C8BFFF_transparent] sm:[scrollbar-width:thin] ${videos.length <= 3 ? 'sm:justify-center' : ''}`}>
            {videos.map((src, index) => (
              <article key={`${id}-${index}`} className={`group relative isolate w-[74vw] max-w-[235px] shrink-0 sm:max-w-[255px] ${videos.length <= 3 ? 'sm:w-[calc((100%-40px)/3)] lg:w-[245px]' : 'sm:w-[245px]'}`}>
                <div className={`pointer-events-none absolute -inset-3 -z-10 rounded-[2.2rem] bg-[#EEE9FF] transition-all duration-500 ${muted[index] ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`} />
                <div className={`relative overflow-hidden rounded-[1.55rem] border-[5px] bg-[#151515] transition-[border-color,box-shadow,transform] duration-500 sm:rounded-[1.8rem] sm:border-[7px] ${
                  muted[index]
                    ? 'border-[#151515] shadow-[0_16px_40px_rgba(21,21,21,.14)] sm:shadow-[0_22px_55px_rgba(21,21,21,.16)]'
                    : 'scale-[1.02] border-[#633CFF] shadow-[0_20px_55px_rgba(99,60,255,.38)] sm:shadow-[0_28px_78px_rgba(99,60,255,.44)]'
                }`}>
                  <video
                    suppressHydrationWarning
                    ref={element => { videoRefs.current[index] = element; }}
                    src={src}
                    playsInline
                    muted={muted[index]}
                    loop
                    preload="auto"
                    poster={src
                      .replace('/video/upload/f_mp4,q_auto:good,h_720/', '/video/upload/so_0,q_auto,f_jpg,h_720/')
                      .replace(/\.mp4$/, '.jpg')}
                    onCanPlay={() => setLoadStates(state => state.map((value, i) => i === index ? 'ready' : value))}
                    onLoadedData={() => setLoadStates(state => state.map((value, i) => i === index ? 'ready' : value))}
                    onError={() => setLoadStates(state => state.map((value, i) => i === index ? 'error' : value))}
                    onPlay={() => setPlaying(state => state.map((_, i) => i === index))}
                    onPause={() => setPlaying(state => state.map((value, i) => i === index ? false : value))}
                    className={`relative z-[1] aspect-[9/16] w-full bg-[#EEE9FF] object-cover transition-[filter,opacity] duration-500 ${
                      loadStates[index] === 'ready' ? 'opacity-100' : 'opacity-0'
                    } ${
                      muted[index]
                        ? 'brightness-[.78] saturate-[.72] contrast-[.95]'
                        : 'brightness-100 saturate-[1.08] contrast-100'
                    }`}
                  />
                  {loadStates[index] !== 'ready' && (
                    <button
                      type="button"
                      disabled={loadStates[index] === 'loading'}
                      onClick={() => {
                        const video = videoRefs.current[index];
                        if (!video) return;
                        setLoadStates(state => state.map((value, i) => i === index ? 'loading' : value));
                        video.load();
                      }}
                      className="absolute inset-0 z-[2] flex flex-col items-center justify-center bg-gradient-to-br from-[#F4F1FF] via-[#EEE9FF] to-[#DDD5FF] px-5 text-center text-[#633CFF]"
                    >
                      {loadStates[index] === 'loading' ? <LoaderCircle className="h-7 w-7 animate-spin" /> : <Play className="h-7 w-7" />}
                      <p className="mt-3 text-xs font-semibold">{loadStates[index] === 'loading' ? 'Loading preview' : 'Tap to retry preview'}</p>
                    </button>
                  )}
                  <div className={`pointer-events-none absolute inset-0 z-[3] transition-opacity duration-500 ${muted[index] ? 'bg-slate-950/15 opacity-100' : 'opacity-0'}`} />
                  <div className={`pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[.1em] shadow-lg backdrop-blur-md transition-colors duration-300 ${
                    muted[index]
                      ? 'bg-black/55 text-white/80'
                      : 'bg-[#633CFF] text-white'
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${muted[index] ? 'bg-white/55' : 'bg-white animate-pulse'}`} />
                    {muted[index] ? 'Muted' : 'Sound on'}
                  </div>
                  {!muted[index] && (
                    <div className="sound-wave pointer-events-none absolute right-3 top-3 z-10 flex h-7 items-end gap-[3px] rounded-full bg-white/95 px-3 py-2 shadow-lg" aria-hidden="true">
                      <span /><span /><span /><span />
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-gradient-to-t from-black/80 via-black/25 to-transparent p-3 pt-14 opacity-100 transition sm:p-4 sm:pt-16 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                    <button type="button" onClick={() => togglePlay(index)} className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#151515] transition hover:scale-105 sm:h-11 sm:w-11" aria-label={playing[index] ? 'Pause video' : 'Play video'}>{playing[index] ? <Pause className="h-4 w-4 fill-current" /> : <Play className="ml-0.5 h-4 w-4 fill-current" />}</button>
                    <button type="button" onClick={() => toggleMute(index)} className="grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-black/25 text-white backdrop-blur sm:h-10 sm:w-10" aria-label={muted[index] ? 'Turn sound on' : 'Mute video'}>{muted[index] ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}</button>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between px-1 sm:mt-4"><div><p className={`text-xs font-medium transition-colors sm:text-sm ${muted[index] ? 'text-[#151515]' : 'text-[#633CFF]'}`}>{editName} cut {String(index + 1).padStart(2, '0')}</p><p className={`mt-1 text-[10px] font-medium uppercase tracking-[.1em] transition-all ${muted[index] ? 'translate-y-1 text-[#8A8A8A] opacity-0' : 'translate-y-0 text-[#633CFF] opacity-100'}`}>Active preview</p></div><span className="text-[10px] text-[#8A8A8A] sm:text-xs">9:16</span></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
