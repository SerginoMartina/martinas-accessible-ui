import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Avatar } from '../../atoms/Avatar';
import { AvatarGroup } from '../AvatarGroup';
import { Breadcrumbs } from '../Breadcrumbs';
import { CommandPalette } from '../CommandPalette';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { Stepper } from '../Stepper';
import { TreeView } from '../TreeView';
import { AccessibleMultiStepForm } from '../../organisms/AccessibleMultiStepForm';

describe('Stepper', () => {
  it('announces the current step and exposes completed steps as navigation buttons', () => {
    const onStepChange = vi.fn();
    render(
      <Stepper
        label="Checkout progress"
        currentStep={1}
        onStepChange={onStepChange}
        steps={[
          { id: 'cart', label: 'Cart' },
          { id: 'delivery', label: 'Delivery' },
          { id: 'payment', label: 'Payment' },
        ]}
      />,
    );

    expect(screen.getByRole('navigation', { name: 'Checkout progress' })).toBeInTheDocument();
    expect(screen.getByText('Delivery').closest('[aria-current="step"]')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Go to completed step 1: Cart' }));
    expect(onStepChange).toHaveBeenCalledWith(0);
    expect(screen.queryByRole('button', { name: /Payment/ })).not.toBeInTheDocument();
  });
});

describe('Breadcrumbs', () => {
  it('marks the current page and hides separators from assistive technology', () => {
    render(
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Library', href: '/library' },
          { label: 'Current page' },
        ]}
      />,
    );

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Library' })).toHaveAttribute('href', '/library');
    expect(screen.getByText('Current page')).toHaveAttribute('aria-current', 'page');
    expect(screen.getAllByText('/')).toHaveLength(2);
    expect(screen.getAllByText('/').every((separator) => separator.getAttribute('aria-hidden') === 'true')).toBe(true);
  });
});

describe('TreeView', () => {
  it('moves focus and expands/collapses branches using tree keyboard commands', () => {
    const onSelect = vi.fn();
    render(
      <TreeView
        label="Files"
        defaultExpandedIds={['src']}
        onSelect={onSelect}
        items={[
          { id: 'src', label: 'src', children: [{ id: 'app', label: 'App.tsx' }] },
          { id: 'readme', label: 'README.md' },
        ]}
      />,
    );

    const src = screen.getByRole('treeitem', { name: 'src' });
    const app = screen.getByRole('treeitem', { name: 'App.tsx' });
    expect(src).toHaveAttribute('aria-expanded', 'true');
    src.focus();
    fireEvent.keyDown(src, { key: 'ArrowDown' });
    expect(app).toHaveFocus();
    fireEvent.keyDown(app, { key: 'ArrowLeft' });
    expect(src).toHaveFocus();
    fireEvent.keyDown(src, { key: 'ArrowLeft' });
    expect(screen.queryByRole('treeitem', { name: 'App.tsx' })).not.toBeInTheDocument();
    fireEvent.keyDown(src, { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'src' }));
  });

  it('retains a tab stop when the selected node is hidden under a collapsed branch', () => {
    render(
      <TreeView
        label="Files"
        defaultSelectedId="hidden"
        items={[
          { id: 'branch', label: 'Branch', children: [{ id: 'hidden', label: 'Hidden child' }] },
          { id: 'visible', label: 'Visible item' },
        ]}
      />,
    );
    expect(screen.getAllByRole('treeitem').some((item) => item.getAttribute('tabindex') === '0')).toBe(true);
  });

  it('does not bubble child selection or keyboard navigation to its parent', () => {
    const onSelect = vi.fn();
    render(
      <TreeView
        label="Files"
        defaultExpandedIds={['src']}
        onSelect={onSelect}
        items={[{ id: 'src', label: 'src', children: [{ id: 'app', label: 'App.tsx' }] }]}
      />,
    );
    const src = screen.getByRole('treeitem', { name: 'src' });
    const app = screen.getByRole('treeitem', { name: 'App.tsx' });

    fireEvent.click(app);
    expect(onSelect).toHaveBeenCalledOnce();
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'app' }));
    expect(src).toHaveAttribute('aria-expanded', 'true');

    onSelect.mockClear();
    app.focus();
    fireEvent.keyDown(app, { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledOnce();
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'app' }));
  });
});

describe('CommandPalette', () => {
  it('starts on the first enabled command when opened', async () => {
    render(
      <CommandPalette
        items={[
          { id: 'first', label: 'First command', onSelect: vi.fn() },
          { id: 'second', label: 'Second command', onSelect: vi.fn() },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /Open command palette/ }));

    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'First command' })).toHaveAttribute('aria-selected', 'true');
    });
  });

  it('filters commands, skips disabled results, executes a choice, and returns focus', async () => {
    const onSelect = vi.fn();
    render(
      <CommandPalette
        items={[
          { id: 'disabled', label: 'Disabled command', onSelect: vi.fn(), disabled: true },
          { id: 'save', label: 'Save changes', keywords: ['persist'], onSelect },
          { id: 'help', label: 'Get help', onSelect: vi.fn() },
        ]}
      />,
    );
    const trigger = screen.getByRole('button', { name: /Open command palette/ });
    fireEvent.click(trigger);

    const input = await screen.findByRole('combobox', { name: 'Command palette' });
    await waitFor(() => expect(input).toHaveFocus());
    expect(screen.getByRole('option', { name: 'Save changes' })).toHaveAttribute('aria-selected', 'true');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(screen.getByRole('option', { name: 'Get help' })).toHaveAttribute('aria-selected', 'true');
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(screen.getByRole('option', { name: 'Save changes' })).toHaveAttribute('aria-selected', 'true');
    fireEvent.change(input, { target: { value: 'persist' } });
    expect(screen.getAllByRole('option')).toHaveLength(1);
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onSelect).toHaveBeenCalledOnce();
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes on Escape and restores focus to the trigger', async () => {
    render(<CommandPalette items={[]} />);
    const trigger = screen.getByRole('button', { name: /Open command palette/ });
    fireEvent.click(trigger);
    fireEvent.keyDown(await screen.findByRole('combobox'), { key: 'Escape' });

    await waitFor(() => expect(trigger).toHaveFocus());
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens from the configured platform shortcut', async () => {
    render(<CommandPalette items={[]} />);
    fireEvent.keyDown(document, { key: 'k', ctrlKey: true });
    expect(await screen.findByRole('dialog', { name: 'Command palette' })).toBeInTheDocument();
  });
});

describe('Avatar and AvatarGroup', () => {
  it('renders initials as an accessible fallback and hides decorative fallback content', () => {
    render(
      <>
        <Avatar alt="Jordan Lee" name="Jordan Lee" />
        <Avatar alt="" name="Decorative User" />
      </>,
    );
    expect(screen.getByRole('img', { name: 'Jordan Lee' })).toHaveTextContent('JL');
    expect(screen.getByText('DU')).toHaveAttribute('aria-hidden', 'true');
  });

  it('falls back to named initials when the supplied image fails', () => {
    render(<Avatar src="/broken-avatar.png" alt="Morgan Patel" name="Morgan Patel" />);
    fireEvent.error(screen.getByRole('img', { name: 'Morgan Patel' }));
    expect(screen.getByRole('img', { name: 'Morgan Patel' })).toHaveTextContent('MP');
  });

  it('limits visible avatars and names the overflow count', () => {
    render(
      <AvatarGroup
        label="Team members"
        max={2}
        avatars={[
          { alt: 'Alex One', name: 'Alex One' },
          { alt: 'Blair Two', name: 'Blair Two' },
          { alt: 'Casey Three', name: 'Casey Three' },
        ]}
      />,
    );
    expect(screen.getByRole('img', { name: '1 additional person' })).toHaveTextContent('+1');
    expect(screen.getByRole('img', { name: 'Alex One' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Blair Two' })).toBeInTheDocument();
  });
});

describe('LanguageSwitcher', () => {
  it('reports selected locale tags and updates its uncontrolled selection', () => {
    const onChange = vi.fn();
    render(
      <LanguageSwitcher
        defaultValue="en"
        onChange={onChange}
        languages={[
          { tag: 'en', label: 'English' },
          { tag: 'fr-CA', label: 'Français (Canada)' },
        ]}
      />,
    );
    const select = screen.getByRole('combobox', { name: 'Language' });
    fireEvent.change(select, { target: { value: 'fr-CA' } });

    expect(onChange).toHaveBeenCalledWith('fr-CA');
    expect(select).toHaveValue('fr-CA');
  });

  it('supports an accessible menu-button variant with checked options and keyboard navigation', async () => {
    const onChange = vi.fn();
    render(
      <LanguageSwitcher
        variant="menu"
        defaultValue="en"
        onChange={onChange}
        languages={[
          { tag: 'en', label: 'English' },
          { tag: 'fr-CA', label: 'Français (Canada)' },
          { tag: 'de', label: 'Deutsch' },
        ]}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Language: English' });
    fireEvent.click(trigger);
    const english = screen.getByRole('menuitemradio', { name: 'English' });
    expect(english).toHaveAttribute('aria-checked', 'true');
    await waitFor(() => expect(english).toHaveFocus());

    fireEvent.keyDown(english, { key: 'ArrowDown' });
    const french = screen.getByRole('menuitemradio', { name: 'Français (Canada)' });
    await waitFor(() => expect(french).toHaveFocus());
    fireEvent.click(french);

    expect(onChange).toHaveBeenCalledWith('fr-CA');
    expect(screen.getByRole('button', { name: 'Language: Français (Canada)' })).toHaveFocus();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes the menu on Escape and restores trigger focus', async () => {
    render(
      <LanguageSwitcher
        variant="menu"
        defaultValue="en"
        languages={[
          { tag: 'en', label: 'English' },
          { tag: 'fr', label: 'Français' },
        ]}
      />,
    );
    const trigger = screen.getByRole('button', { name: 'Language: English' });
    fireEvent.click(trigger);
    const option = await screen.findByRole('menuitemradio', { name: 'English' });
    fireEvent.keyDown(option, { key: 'Escape' });

    expect(trigger).toHaveFocus();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});

describe('AccessibleMultiStepForm', () => {
  it('validates before advancing, preserves data, focuses steps, and submits from review', async () => {
    render(<AccessibleMultiStepForm />);
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Enter your full name');

    fireEvent.change(screen.getByLabelText(/Full name/), { target: { value: 'Alex Example' } });
    fireEvent.change(screen.getByLabelText(/Email address/), { target: { value: 'alex@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    const preferencesHeading = screen.getByRole('heading', { name: 'Preferences' });
    await waitFor(() => expect(preferencesHeading).toHaveFocus());

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(screen.getByText('Alex Example')).toBeInTheDocument();
    expect(screen.getByText('alex@example.com')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Submit request' }));
    expect(screen.getByRole('status')).toHaveTextContent('No information was sent to a server');
  });
});
