"use client";

import { Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type CinematicVideoProps = { src: string; alt: string; poster?: string; className?: string };

export function CinematicVideo({ src, alt, poster, className }: CinematicVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setLoaded(true); video.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); }
      else if (!video.paused) { video.pause(); setPlaying(false); }
    }, { threshold: 0.2 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => { const video = videoRef.current; if (!video) return; if (video.paused) video.play().then(() => setPlaying(true)); else { video.pause(); setPlaying(false); } };
  const toggleMute = () => { const video = videoRef.current; if (!video) return; video.muted = !video.muted; setMuted(video.muted); };
  const updateProgress = () => { const video = videoRef.current; if (video?.duration) { setDuration(video.duration); setProgress((video.currentTime / video.duration) * 100); } };
  const seek = (value: number) => { const video = videoRef.current; if (!video || !duration) return; video.currentTime = (value / 100) * duration; setProgress(value); };

  return <div className={cn("cinematic-video", className)}><video ref={videoRef} src={loaded ? src : undefined} poster={poster} aria-label={alt} autoPlay muted={muted} loop playsInline preload="none" onTimeUpdate={updateProgress} onLoadedMetadata={updateProgress} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} /><div className="video-controls"><button type="button" onClick={togglePlay} aria-label={playing ? "Pause video" : "Play video"}>{playing ? <Pause size={14} /> : <Play size={14} />}</button><button type="button" onClick={toggleMute} aria-label={muted ? "Unmute video" : "Mute video"}>{muted ? <VolumeX size={14} /> : <Volume2 size={14} />}</button><input aria-label="Video progress" type="range" min="0" max="100" value={progress} onChange={(event) => seek(Number(event.target.value))} /><button type="button" onClick={() => videoRef.current?.requestFullscreen?.()} aria-label="View video fullscreen"><Maximize2 size={14} /></button></div></div>;
}
