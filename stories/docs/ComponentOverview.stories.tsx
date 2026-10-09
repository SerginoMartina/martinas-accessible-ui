import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../src/components/atoms/Badge';
import { Button } from '../../src/components/atoms/Button';
import { Checkbox } from '../../src/components/atoms/Checkbox';
import { Input } from '../../src/components/atoms/Input';
import { ProgressBar } from '../../src/components/atoms/ProgressBar';
import { Typography } from '../../src/components/atoms/Typography';
import { MultiSelect } from '../../src/components/molecules/MultiSelect';
import { Toast } from '../../src/components/molecules/Toast';
import { Modal } from '../../src/components/organisms/Modal';

const meta = {
  title: 'Overview',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const buttonVariants = ['primary', 'secondary', 'ghost', 'outline'] as const;
const buttonSizes = ['sm', 'md', 'lg'] as const;

function ComponentOverview() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="mx-auto max-w-6xl space-y-12 p-8">
      <header className="space-y-3 border-b border-gray-200 pb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Martina's Accessible UI
        </p>
        <h1 className="text-4xl font-bold text-secondary">Component overview</h1>
        <p className="max-w-3xl text-secondary">
          Browse every component and its supported variants. Use the component stories in the
          sidebar for individual controls and documentation.
        </p>
      </header>

      <section aria-labelledby="atoms-heading" className="space-y-6">
        <h2 id="atoms-heading" className="text-2xl font-bold text-secondary">Atoms</h2>

        <article className="space-y-4 rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold">Button</h3>
          <p className="text-sm text-gray-600">Variants: primary, secondary, ghost, outline. Sizes: small, medium, large.</p>
          {buttonVariants.map((variant) => (
            <div key={variant} className="flex flex-wrap items-center gap-3">
              <span className="w-24 text-sm capitalize text-gray-600">{variant}</span>
              {buttonSizes.map((size) => (
                <Button key={`${variant}-${size}`} variant={variant} size={size}>
                  {size}
                </Button>
              ))}
            </div>
          ))}
          <Button disabled>Disabled</Button>
        </article>

        <article className="space-y-4 rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold">Input</h3>
          <p className="text-sm text-gray-600">Default, error, and disabled states.</p>
          <div className="grid max-w-3xl gap-4 md:grid-cols-3">
            <Input label="Default" placeholder="Enter a value" />
            <Input label="Error" placeholder="name@example.com" error="Enter a valid email address." />
            <Input label="Disabled" placeholder="Unavailable" disabled />
          </div>
        </article>

        <article className="space-y-4 rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold">Checkbox</h3>
          <p className="text-sm text-gray-600">Unchecked, checked, and disabled states.</p>
          <div className="flex flex-wrap gap-6">
            <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
            <Checkbox label="Checked" checked onChange={() => {}} />
            <Checkbox label="Disabled" checked={false} disabled onChange={() => {}} />
          </div>
        </article>

        <article className="space-y-4 rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold">Typography</h3>
          <div className="space-y-3">
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="p">Paragraph text</Typography>
            <Typography variant="span">Inline text</Typography>
          </div>
        </article>

        <article className="space-y-4 rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold">Badge</h3>
          <p className="text-sm text-gray-600">Variants: default, success, warning, danger.</p>
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
          </div>
        </article>

        <article className="space-y-4 rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold">Progress bar</h3>
          <p className="text-sm text-gray-600">Colors: primary, success, warning, danger.</p>
          <div className="space-y-4">
            <ProgressBar progress={65} label="Primary — 65%" />
            <ProgressBar progress={100} color="success" label="Success — 100%" />
            <ProgressBar progress={45} color="warning" label="Warning — 45%" />
            <ProgressBar progress={25} color="danger" label="Danger — 25%" />
          </div>
        </article>
      </section>

      <section aria-labelledby="molecules-heading" className="space-y-6">
        <h2 id="molecules-heading" className="text-2xl font-bold text-secondary">Molecules</h2>

        <article className="space-y-4 rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold">MultiSelect</h3>
          <p className="text-sm text-gray-600">Searchable option selector; open it to browse or filter options.</p>
          <div className="max-w-md">
            <MultiSelect
              options={[
                { label: 'React', value: 'react' },
                { label: 'Vue', value: 'vue' },
                { label: 'Svelte', value: 'svelte' },
              ]}
              placeholder="Choose frameworks..."
            />
          </div>
        </article>

        <article className="space-y-4 rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold">Toast</h3>
          <p className="text-sm text-gray-600">Types: info, success, warning, danger.</p>
          <div className="grid gap-4 md:grid-cols-2">
            <Toast message="Information message" type="info" duration={0} style={{ position: 'static' }} />
            <Toast message="Changes saved" type="success" duration={0} style={{ position: 'static' }} />
            <Toast message="Review this warning" type="warning" duration={0} style={{ position: 'static' }} />
            <Toast message="Something went wrong" type="danger" duration={0} style={{ position: 'static' }} />
          </div>
        </article>
      </section>

      <section aria-labelledby="organisms-heading" className="space-y-6">
        <h2 id="organisms-heading" className="text-2xl font-bold text-secondary">Organisms</h2>
        <article className="space-y-4 rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold">Modal</h3>
          <p className="text-sm text-gray-600">Open the dialog to inspect focus handling and dismissal.</p>
          <Button onClick={() => setIsModalOpen(true)}>Open modal</Button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Example dialog"
          >
            <p className="mb-4">The modal keeps focus inside while open and returns focus when closed.</p>
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </Modal>
        </article>
      </section>
    </main>
  );
}

export const AllComponents: Story = {
  render: () => <ComponentOverview />,
};
