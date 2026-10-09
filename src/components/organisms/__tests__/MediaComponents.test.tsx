import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AccessibleImage, AudioPlayer, MediaText, VideoPlayer } from '../MediaComponents';

describe('AccessibleImage', () => {
  it('requires a meaningful image name in markup and supports caption and loading attributes', () => {
    render(<AccessibleImage src="/photo.jpg" alt="People working together" caption="Team workshop" width={640} />);
    const image = screen.getByRole('img', { name: 'People working together' });
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('decoding', 'async');
    expect(image).toHaveAttribute('width', '640');
    expect(screen.getByText('Team workshop').tagName).toBe('FIGCAPTION');
  });

  it('allows empty alternative text for decorative imagery', () => {
    const { container } = render(<AccessibleImage src="/decoration.svg" alt="" />);
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
  });
});

describe('VideoPlayer', () => {
  it('uses native controls and exposes caption tracks and a transcript link', () => {
    const { container } = render(
      <VideoPlayer
        label="Product tour"
        sources={[{ src: '/tour.mp4', type: 'video/mp4' }]}
        captions={[{ src: '/tour-en.vtt', label: 'English captions', srcLang: 'en', default: true }]}
        transcriptHref="/tour-transcript"
      />,
    );
    const video = container.querySelector('video');
    expect(video).toHaveAttribute('aria-label', 'Product tour');
    expect(video).toHaveAttribute('controls');
    expect(container.querySelector('track')).toHaveAttribute('kind', 'captions');
    expect(container.querySelector('track')).toHaveAttribute('srclang', 'en');
    expect(screen.getByRole('link', { name: 'Read the video transcript' })).toHaveAttribute('href', '/tour-transcript');
  });
});

describe('AudioPlayer', () => {
  it('uses native controls and can link to a transcript', () => {
    const { container } = render(
      <AudioPlayer label="Interview recording" sources={[{ src: '/interview.mp3', type: 'audio/mpeg' }]} transcriptHref="/transcript" />,
    );
    expect(container.querySelector('audio')).toHaveAttribute('aria-label', 'Interview recording');
    expect(container.querySelector('audio')).toHaveAttribute('controls');
    expect(screen.getByRole('link', { name: 'Read the audio transcript' })).toHaveAttribute('href', '/transcript');
  });
});

describe('MediaText', () => {
  it('labels the section by its heading and preserves the supplied media alternative text', () => {
    render(
      <MediaText title="Shared project update" headingLevel="h3" imageSide="end" image={{ src: '/update.jpg', alt: 'Project team reviewing a plan' }}>
        <p>The image is accompanied by the same essential information in text.</p>
      </MediaText>,
    );

    expect(screen.getByRole('region', { name: 'Shared project update' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Shared project update', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Project team reviewing a plan' })).toBeInTheDocument();
  });
});
