import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../atoms/Avatar';
import { AvatarGroup } from './AvatarGroup';
import { Breadcrumbs } from './Breadcrumbs';
import { CommandPalette } from './CommandPalette';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Stepper } from './Stepper';
import { TreeView } from './TreeView';
import { AccessibleMultiStepForm } from '../organisms/AccessibleMultiStepForm';

const meta: Meta = { title: 'Workflow patterns', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const MultiStepForm: Story = {
  render: () => <AccessibleMultiStepForm />,
};

export const TaskStepper: Story = {
  render: () => (
    <Stepper
      steps={[
        { id: 'account', label: 'Account', description: 'Set up your account' },
        { id: 'details', label: 'Details', description: 'Add your information' },
        { id: 'review', label: 'Review', description: 'Confirm and submit' },
      ]}
      currentStep={1}
      onStepChange={() => {}}
      label="Setup progress"
    />
  ),
};

export const PageBreadcrumbs: Story = {
  render: () => (
    <Breadcrumbs
      items={[
        { label: 'Home', href: '#home' },
        { label: 'Projects', href: '#projects' },
        { label: 'Accessibility audit' },
      ]}
    />
  ),
};

export const FileTree: Story = {
  render: () => (
    <TreeView
      label="Project files"
      defaultExpandedIds={['src', 'components']}
      items={[
        {
          id: 'src',
          label: 'src',
          children: [
            { id: 'components', label: 'components', children: [
              { id: 'button', label: 'Button.tsx' },
              { id: 'input', label: 'Input.tsx' },
            ] },
            { id: 'app', label: 'App.tsx' },
          ],
        },
        { id: 'readme', label: 'README.md' },
      ]}
    />
  ),
};

function CommandPaletteExample() {
  const [message, setMessage] = useState('No command selected.');
  return (
    <div className="space-y-3">
      <CommandPalette
        items={[
          { id: 'create', label: 'Create a document', description: 'Start a new document', keywords: ['new'], onSelect: () => setMessage('Create command selected.') },
          { id: 'settings', label: 'Open settings', onSelect: () => setMessage('Settings command selected.') },
          { id: 'help', label: 'Get help', onSelect: () => setMessage('Help command selected.') },
        ]}
      />
      <p role="status">{message}</p>
    </div>
  );
}

export const SearchCommands: Story = {
  render: () => <CommandPaletteExample />,
};

export const PeopleAvatars: Story = {
  render: () => (
    <div className="space-y-5">
      <Avatar alt="Jordan Lee" name="Jordan Lee" size="lg" />
      <AvatarGroup
        label="Project collaborators"
        max={3}
        avatars={[
          { alt: 'Jordan Lee', name: 'Jordan Lee' },
          { alt: 'Avery Chen', name: 'Avery Chen' },
          { alt: 'Morgan Patel', name: 'Morgan Patel' },
          { alt: 'Sam Rivera', name: 'Sam Rivera' },
        ]}
      />
    </div>
  ),
};

function LanguageSwitcherExample() {
  const [locale, setLocale] = useState('en');
  return (
    <div className="space-y-3">
      <LanguageSwitcher
        label="Language (select)"
        value={locale}
        onChange={setLocale}
        languages={[
          { tag: 'en', label: 'English' },
          { tag: 'de', label: 'Deutsch' },
          { tag: 'es', label: 'Español' },
          { tag: 'fr', label: 'Français' },
        ]}
      />
      <LanguageSwitcher
        variant="menu"
        value={locale}
        onChange={setLocale}
        languages={[
          { tag: 'en', label: 'English' },
          { tag: 'de', label: 'Deutsch' },
          { tag: 'es', label: 'Español' },
          { tag: 'fr', label: 'Français' },
        ]}
      />
      <p role="status">Selected locale: {locale}. The consumer applies translations.</p>
    </div>
  );
}

export const LocaleSelection: Story = {
  render: () => <LanguageSwitcherExample />,
};
