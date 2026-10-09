import { useId } from 'react';
import type { ImgHTMLAttributes, ReactNode, VideoHTMLAttributes, AudioHTMLAttributes } from 'react';

export interface AccessibleImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'> {
  src: string;
  alt: string;
  caption?: ReactNode;
}

export function AccessibleImage({ src, alt, caption, className = '', ...imageProps }: AccessibleImageProps) {
  return (
    <figure className="max-w-full">
      <img
        {...imageProps}
        src={src}
        alt={alt}
        loading={imageProps.loading ?? 'lazy'}
        decoding={imageProps.decoding ?? 'async'}
        className={`h-auto max-w-full rounded-lg ${className}`}
      />
      {caption && <figcaption className="mt-2 text-sm leading-6 text-slate-700">{caption}</figcaption>}
    </figure>
  );
}

export interface VideoSource {
  src: string;
  type?: string;
}

export interface CaptionTrack {
  src: string;
  label: string;
  srcLang: string;
  default?: boolean;
}

export interface VideoPlayerProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, 'src' | 'children' | 'controls'> {
  label: string;
  sources: VideoSource[];
  captions?: CaptionTrack[];
  transcriptHref?: string;
  transcriptLabel?: string;
  description?: ReactNode;
  className?: string;
}

export function VideoPlayer({
  label,
  sources,
  captions = [],
  transcriptHref,
  transcriptLabel = 'Read the video transcript',
  description,
  className = '',
  ...videoProps
}: VideoPlayerProps) {
  return (
    <figure className={className}>
      <video {...videoProps} aria-label={label} controls className="h-auto max-w-full rounded-lg">
        {sources.map((source) => <source key={`${source.src}-${source.type ?? ''}`} src={source.src} type={source.type} />)}
        {captions.map((track) => (
          <track
            key={`${track.src}-${track.srcLang}`}
            kind="captions"
            src={track.src}
            label={track.label}
            srcLang={track.srcLang}
            default={track.default}
          />
        ))}
        Your browser does not support embedded video. Use the transcript link if provided.
      </video>
      {description && <figcaption className="mt-2 text-sm leading-6 text-slate-700">{description}</figcaption>}
      {transcriptHref && (
        <p className="mt-2 text-sm">
          <a className="text-blue-800 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-700" href={transcriptHref}>
            {transcriptLabel}
          </a>
        </p>
      )}
    </figure>
  );
}

export interface AudioPlayerProps extends Omit<AudioHTMLAttributes<HTMLAudioElement>, 'src' | 'children' | 'controls'> {
  label: string;
  sources: VideoSource[];
  transcriptHref?: string;
  transcriptLabel?: string;
  description?: ReactNode;
  className?: string;
}

export function AudioPlayer({
  label,
  sources,
  transcriptHref,
  transcriptLabel = 'Read the audio transcript',
  description,
  className = '',
  ...audioProps
}: AudioPlayerProps) {
  return (
    <figure className={className}>
      {description && <figcaption className="mb-2 text-sm leading-6 text-slate-700">{description}</figcaption>}
      <audio {...audioProps} aria-label={label} controls className="w-full">
        {sources.map((source) => <source key={`${source.src}-${source.type ?? ''}`} src={source.src} type={source.type} />)}
        Your browser does not support embedded audio. Use the transcript link if provided.
      </audio>
      {transcriptHref && (
        <p className="mt-2 text-sm">
          <a className="text-blue-800 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-700" href={transcriptHref}>
            {transcriptLabel}
          </a>
        </p>
      )}
    </figure>
  );
}

export interface MediaTextProps {
  title: string;
  image: AccessibleImageProps;
  children: ReactNode;
  headingLevel?: 'h2' | 'h3' | 'h4';
  imageSide?: 'start' | 'end';
  className?: string;
}

export function MediaText({
  title,
  image,
  children,
  headingLevel: Heading = 'h2',
  imageSide = 'start',
  className = '',
}: MediaTextProps) {
  const headingId = useId();

  return (
    <section className={`grid items-center gap-6 md:grid-cols-2 ${className}`} aria-labelledby={headingId}>
      <div className={imageSide === 'end' ? 'md:order-2' : undefined}>
        <AccessibleImage {...image} />
      </div>
      <div className={imageSide === 'end' ? 'md:order-1' : undefined}>
        <Heading id={headingId} className="text-2xl font-semibold text-slate-950">{title}</Heading>
        <div className="mt-3 space-y-4 leading-7 text-slate-700">{children}</div>
      </div>
    </section>
  );
}
