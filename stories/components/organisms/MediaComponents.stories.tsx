import type { Meta, StoryObj } from '@storybook/react';
import { AccessibleImage, AudioPlayer, MediaText, VideoPlayer } from '../../../src/components/organisms/MediaComponents';

const meta: Meta = { title: 'Media patterns', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

const illustration = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 360%22%3E%3Crect width=%22640%22 height=%22360%22 fill=%22%23dbeafe%22/%3E%3Ccircle cx=%22320%22 cy=%22150%22 r=%2270%22 fill=%22%232563eb%22/%3E%3Cpath d=%22M80 300 220 190l90 75 90-100 160 135z%22 fill=%22%231e3a8a%22/%3E%3C/svg%3E';

export const MeaningfulImage: Story = {
  render: () => (
    <AccessibleImage
      src={illustration}
      alt="Blue circle above a stylized mountain landscape"
      caption="A caption adds visible context or attribution."
      width={640}
      height={360}
      className="w-full max-w-xl"
    />
  ),
};

export const CaptionedVideo: Story = {
  render: () => (
    <VideoPlayer
      label="Sample flower video"
      sources={[{ src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', type: 'video/mp4' }]}
      captions={[{ src: '/media/flower-captions.vtt', label: 'English captions', srcLang: 'en' }]}
      description="Replace this example caption track with accurate captions for your video."
      transcriptHref="#video-transcript"
    />
  ),
};

export const AudioWithTranscript: Story = {
  render: () => (
    <AudioPlayer
      label="Sample audio recording"
      sources={[{ src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', type: 'audio/mpeg' }]}
      description="A short sample recording with a text alternative."
      transcriptHref="#audio-transcript"
    />
  ),
};

export const MediaAndText: Story = {
  render: () => (
    <MediaText
      title="Design for different ways of perceiving"
      imageSide="start"
      image={{
        src: illustration,
        alt: 'Blue circle above a stylized mountain landscape',
        caption: 'Meaningful visuals support, but do not replace, text.',
      }}
    >
      <p>Pair media with text that explains its purpose and important details.</p>
      <p>Keep instructions understandable without relying on an image alone.</p>
    </MediaText>
  ),
};
