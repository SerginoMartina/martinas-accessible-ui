import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Carousel,
  CheckboxCards,
  ContextMenu,
  DataList,
  Dialog,
  HoverCard,
  Popover,
  RadioCards,
  ScrollArea,
  SegmentedControl,
  Slider,
  Switch,
  TextArea,
} from '../../../src/components/molecules/InteractionPrimitives';
import { Button } from '../../../src/components/atoms/Button';

const meta: Meta = { title: 'Interaction patterns/Controls and overlays', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

function SelectionExamples() {
  const [radio, setRadio] = useState('standard');
  const [segment, setSegment] = useState('week');
  const [switchOn, setSwitchOn] = useState(false);
  const [slider, setSlider] = useState(40);
  return (
    <div className="max-w-2xl space-y-7">
      <RadioCards
        name="plan-story"
        legend="Choose a plan"
        value={radio}
        onChange={setRadio}
        options={[
          { value: 'starter', label: 'Starter', description: 'For personal projects.' },
          { value: 'standard', label: 'Standard', description: 'For small teams.' },
        ]}
      />
      <CheckboxCards
        name="topics-story"
        legend="Choose topics"
        defaultValue={['a11y']}
        options={[
          { value: 'a11y', label: 'Accessibility', description: 'Inclusive design guidance.' },
          { value: 'release', label: 'Releases', description: 'New features and fixes.' },
        ]}
      />
      <SegmentedControl label="Calendar view" value={segment} onChange={setSegment} options={[
        { value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }, { value: 'month', label: 'Month' },
      ]} />
      <Switch label="Enable notifications" checked={switchOn} onChange={setSwitchOn} />
      <Slider label="Volume" min={0} max={100} value={slider} onChange={setSlider} />
      <TextArea label="Feedback" hint="Tell us what worked well." rows={3} />
    </div>
  );
}

export const ChoiceAndValueControls: Story = { render: () => <SelectionExamples /> };

export const ContextActions: Story = {
  render: () => (
    <ContextMenu
      label="Document actions"
      items={[
        { id: 'copy', label: 'Copy title', onSelect: () => {} },
        { id: 'rename', label: 'Rename', onSelect: () => {} },
        { id: 'delete', label: 'Delete', onSelect: () => {}, disabled: true },
      ]}
    >
      <div className="rounded-lg border border-dashed border-slate-400 p-8">Right-click or press Shift+F10 here.</div>
    </ContextMenu>
  ),
};

export const DataListExample: Story = {
  render: () => <DataList items={[
    { label: 'Name', value: 'Jordan Lee' },
    { label: 'Role', value: 'Designer' },
    { label: 'Status', value: 'Active' },
  ]} />,
};

export const SupplementaryContent: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <Popover label="Account details" trigger="View details"><p>Supplementary content with an interactive link.</p><a href="#account" className="mt-2 inline-block underline">Account settings</a></Popover>
      <HoverCard trigger={<a href="#profile" className="underline">Jordan Lee</a>}><span>Product designer focused on inclusive experiences.</span></HoverCard>
    </div>
  ),
};

export const ScrollableChecklist: Story = {
  render: () => <ScrollArea label="Accessibility checklist"><ul className="list-disc space-y-3 p-5 pl-10">{['Check headings', 'Test keyboard use', 'Check zoom', 'Review contrast', 'Test screen reader output', 'Check reduced motion'].map((item) => <li key={item}>{item}</li>)}</ul></ScrollArea>,
};

export const ManualCarousel: Story = {
  render: () => <Carousel label="Accessibility principles" slides={[
    <p key="one"><strong>Perceivable.</strong> Provide meaningful alternatives.</p>,
    <p key="two"><strong>Operable.</strong> Support keyboard operation.</p>,
    <p key="three"><strong>Understandable.</strong> Keep behavior predictable.</p>,
  ]} />,
};

function DialogExample() {
  const [open, setOpen] = useState(false);
  return <><Button onClick={() => setOpen(true)}>Open dialog</Button><Dialog open={open} onOpenChange={setOpen} title="Example dialog"><p className="mb-4">Dialog content and actions.</p><Button onClick={() => setOpen(false)}>Close</Button></Dialog></>;
}

export const ModalDialog: Story = { render: () => <DialogExample /> };
