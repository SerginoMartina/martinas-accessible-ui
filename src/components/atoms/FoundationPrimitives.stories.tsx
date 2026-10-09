import type { Meta, StoryObj } from '@storybook/react';
import {
  AspectRatio,
  Blockquote,
  ButtonWithIcon,
  Card,
  Code,
  Cluster,
  Container,
  Grid,
  IconButton,
  Inset,
  Link,
  LinkWithIcon,
  Quote,
  Separator,
  Spinner,
  Stack,
  ThemeControl,
  ThemeProvider,
} from './FoundationPrimitives';

const meta: Meta = { title: 'Design system/Foundation and layout', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const SemanticText: Story = {
  render: () => (
    <div className="max-w-prose space-y-5">
      <Blockquote cite="https://example.com">Inclusive products are built through deliberate, repeated attention to every user.</Blockquote>
      <p>A short <Quote>inline quotation</Quote> remains part of its sentence.</p>
      <p>Use <Code>pnpm test</Code> to run the suite.</p>
      <Link href="#guide">Read the guide</Link>
    </div>
  ),
};

export const ActionsWithIcons: Story = {
  render: () => (
    <Cluster>
      <IconButton label="Close panel" icon="×" />
      <ButtonWithIcon icon="＋">Create project</ButtonWithIcon>
      <LinkWithIcon href="#details" icon="↗">View details</LinkWithIcon>
    </Cluster>
  ),
};

export const CardAndInset: Story = {
  render: () => (
    <Card title="Account summary">
      <Inset space={5}>
        <h2 className="text-xl font-semibold">Account summary</h2>
        <p className="mt-2">Use cards to group related information.</p>
      </Inset>
    </Card>
  ),
};

export const AspectRatioFrame: Story = {
  render: () => <AspectRatio ratio={16 / 9} className="max-w-xl rounded-lg bg-slate-200"><div className="flex h-full items-center justify-center">16:9 frame</div></AspectRatio>,
};

export const ResponsiveLayout: Story = {
  render: () => (
    <Container>
      <Stack>
        <h2 className="text-xl font-semibold">Container and stack</h2>
        <Cluster><span>Cluster item</span><span>Wraps when space is limited</span></Cluster>
        <Grid minItemWidth="12rem">
          <Card className="p-4">Responsive grid item one</Card>
          <Card className="p-4">Responsive grid item two</Card>
        </Grid>
      </Stack>
    </Container>
  ),
};

export const DividersAndLoading: Story = {
  render: () => <div className="space-y-4"><p>One section</p><Separator /><p>Another section</p><Separator orientation="vertical" className="inline-block align-middle" /><Spinner label="Refreshing results" /></div>,
};

export const ThemePreference: Story = {
  render: () => <ThemeProvider><div className="rounded-xl border border-slate-300 bg-surface p-5 text-secondary"><ThemeControl /><p className="mt-4">Choose light, dark, or follow your system setting.</p></div></ThemeProvider>,
};
