import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('Component documentation dashboard', () => {
  it('opens the sidebar dashboard as the homepage', () => {
    render(<App />);

    expect(screen.getByRole('navigation', { name: 'Component documentation' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Component documentation' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Explore Components' })).not.toBeInTheDocument();
  });

  it('provides a compact, step-by-step component menu for smaller screens', () => {
    render(<App />);

    const mobileNavigation = screen.getByRole('navigation', { name: 'Mobile component navigation' });
    const trigger = screen.getByRole('button', { name: 'Browse components' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('heading', { name: 'Choose a category' })).not.toBeInTheDocument();

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(within(mobileNavigation).getByRole('button', { name: /Molecules/ }));
    expect(within(mobileNavigation).getByRole('heading', { name: 'Molecules' })).toBeInTheDocument();

    fireEvent.click(within(mobileNavigation).getByRole('button', { name: 'Tabs' }));
    expect(screen.getByRole('heading', { name: 'Tabs' })).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveTextContent('Molecules / Tabs');

    fireEvent.click(trigger);
    expect(within(mobileNavigation).getByRole('heading', { name: 'Molecules' })).toBeInTheDocument();
    fireEvent.click(within(mobileNavigation).getByRole('button', { name: /Back/ }));
    expect(within(mobileNavigation).getByRole('heading', { name: 'Choose a category' })).toBeInTheDocument();

    fireEvent.keyDown(within(mobileNavigation).getByRole('button', { name: /Atoms/ }), { key: 'Escape' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveFocus();
  });

  it('shows component-specific usage, API, and accessibility documentation', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Input' }));

    expect(screen.getByRole('heading', { name: 'Input' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Props and API' })).toBeInTheDocument();
    expect(screen.getByText(/associates its label with the input/i)).toBeInTheDocument();
    expect(screen.getByText(/Use Input to collect a single line/i)).toBeInTheDocument();
    expect(screen.getByText(/label: optional visible label/i)).toBeInTheDocument();
  });

  it('documents reusable form fields, error summaries, and the integrated form example', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Form field' }));
    expect(screen.getByRole('heading', { name: 'Form field' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Email address/ })).toHaveAttribute('aria-invalid', 'true');

    fireEvent.click(screen.getByRole('button', { name: 'Form error summary' }));
    expect(screen.getByRole('heading', { name: 'Form error summary' })).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Full name/ })).toHaveAttribute('href', '#preview-name');

    fireEvent.click(screen.getByRole('button', { name: 'Accessible form example' }));
    fireEvent.click(screen.getByRole('button', { name: 'Send request' }));
    expect(screen.getByRole('alert')).toHaveFocus();
    expect(screen.getByRole('heading', { name: 'Accessible form example' })).toBeInTheDocument();
  });

  it('provides accessible navigation, choice, suggestion, menu, and feedback patterns', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: 'Skip to main content' })).toHaveAttribute('href', '#main-content');
    expect(document.getElementById('main-content')).toHaveAttribute('tabindex', '-1');

    fireEvent.click(screen.getByRole('button', { name: 'Radio group' }));
    expect(screen.getByRole('group', { name: /Preferred contact method/ })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Email/ })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Combobox' }));
    expect(screen.getByRole('combobox', { name: 'Search a city' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Menu button' }));
    fireEvent.click(screen.getByRole('button', { name: 'Document actions' }));
    expect(screen.getByRole('menu', { name: 'Document actions' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Inline alert' }));
    expect(screen.getAllByRole('status')).toHaveLength(3);
    expect(screen.getByRole('alert')).toHaveTextContent('Check your connection');

    fireEvent.click(screen.getByRole('button', { name: 'Live region' }));
    expect(screen.getByRole('status')).toHaveClass('sr-only');
  });

  it('documents and previews the header, sidebar, popup sidebar, footer, and content block patterns', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Header' }));
    expect(screen.getByRole('heading', { name: 'Header' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Props and API' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Sidebar' }));
    expect(screen.getByRole('navigation', { name: 'On this page' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Components' })).toHaveAttribute('aria-current', 'page');

    fireEvent.click(screen.getByRole('button', { name: 'Popup sidebar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Open site navigation' }));
    expect(screen.getByRole('dialog', { name: 'Explore' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Explore' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Footer' }));
    expect(screen.getByRole('contentinfo')).toHaveTextContent('© 2026 Inclusive Studio');
    expect(screen.queryByRole('dialog', { name: 'Explore' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Content block' }));
    expect(screen.getByRole('region', { name: 'Accessible by default' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Next steps' })).toBeInTheDocument();
  });

  it('documents the workflow, hierarchy, identity, and locale components', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Multi-step form' }));
    expect(screen.getByRole('navigation', { name: 'Request form progress' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Contact details' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Breadcrumbs' }));
    expect(screen.getByRole('navigation', { name: 'Page location' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Page location' }).querySelector('[aria-current="page"]')).toHaveTextContent('Breadcrumbs');

    fireEvent.click(screen.getByRole('button', { name: 'Tree view' }));
    expect(screen.getByRole('tree', { name: 'Project files' })).toBeInTheDocument();
    expect(screen.getByRole('treeitem', { name: 'Button.tsx' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Command palette' }));
    fireEvent.click(screen.getByRole('button', { name: /Open command palette/ }));
    expect(screen.getByRole('dialog', { name: 'Command palette' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Avatar group' }));
    expect(screen.getByRole('img', { name: '2 additional people' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Language switcher' }));
    fireEvent.change(screen.getByRole('combobox', { name: 'Language (select)' }), { target: { value: 'fr' } });
    expect(screen.getByText(/Selected locale: fr/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Language: Français' }));
    expect(screen.getByRole('menuitemradio', { name: 'Français' })).toHaveAttribute('aria-checked', 'true');
  });

  it('documents and previews the accessible content components', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Hero' }));
    expect(screen.getByRole('heading', { name: 'Build experiences everyone can use', level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Explore components' })).toHaveAttribute('href', '#components');

    fireEvent.click(screen.getByRole('button', { name: 'List' }));
    expect(screen.getByRole('heading', { name: 'List' })).toBeInTheDocument();
    expect(screen.getByRole('list', { name: 'Getting started' }).tagName).toBe('OL');

    fireEvent.click(screen.getByRole('button', { name: 'Article' }));
    expect(screen.getByRole('article', { name: 'Designing useful status messages' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Illustration of a status message in a user interface' })).toBeInTheDocument();
    expect(screen.getByText('Status messages should be clear without relying on color.')).toBeInTheDocument();
    expect(screen.getByText('October 9, 2026').closest('time')).toHaveAttribute('datetime', '2026-10-09');

    fireEvent.click(screen.getByRole('button', { name: 'Link list' }));
    expect(screen.getByRole('navigation', { name: 'Accessibility resources' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Keyboard testing guide/ })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Icon list' }));
    expect(screen.getByRole('heading', { name: 'Keyboard ready' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'CTA banner' }));
    expect(screen.getByRole('region', { name: 'Ready to improve your interface?' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Browse components' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Image' }));
    expect(screen.getByRole('img', { name: 'Blue circle above a stylized mountain landscape' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Video' }));
    expect(document.querySelector('video')).toHaveAttribute('aria-label', 'Sample flower video');
    expect(document.querySelector('track')).toHaveAttribute('kind', 'captions');

    fireEvent.click(screen.getByRole('button', { name: 'Audio' }));
    expect(document.querySelector('audio')).toHaveAttribute('aria-label', 'Sample audio recording');
    expect(screen.getByRole('link', { name: 'Read the audio transcript' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Media and text' }));
    expect(screen.getByRole('region', { name: 'Design for different ways of perceiving' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'CAPTCHA field' }));
    expect(screen.getByRole('group', { name: 'Human verification' })).toBeInTheDocument();
    expect(screen.getByText(/does not verify users/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Login form' }));
    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Email address' })).toBeRequired();
    expect(screen.getByLabelText('Password')).toBeRequired();
  });

  it('provides working progress updates and previews the additional foundation and interaction patterns', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Progress bar' }));
    expect(screen.getByRole('progressbar', { name: 'Upload progress' })).toHaveAttribute('aria-valuenow', '35');
    fireEvent.click(screen.getByRole('button', { name: 'Advance by 10%' }));
    expect(screen.getByRole('progressbar', { name: 'Upload progress' })).toHaveAttribute('aria-valuenow', '45');
    fireEvent.change(screen.getByRole('slider', { name: 'Update upload progress' }), { target: { value: '80' } });
    expect(screen.getByRole('progressbar', { name: 'Upload progress' })).toHaveAttribute('aria-valuenow', '80');
    fireEvent.click(screen.getByRole('button', { name: 'Reset progress' }));
    expect(screen.getByRole('progressbar', { name: 'Upload progress' })).toHaveAttribute('aria-valuenow', '0');

    for (const [sidebarLabel, expected] of [
      ['Blockquote', 'block quote'],
      ['Quote', 'inline quotation'],
      ['Code', 'pnpm test'],
      ['Link', 'Read the accessibility guidance'],
      ['Icon button', 'Close example'],
      ['Spinner', 'Saving your preferences'],
      ['Separator', 'Account details'],
      ['Text area', 'Additional comments'],
      ['Switch', 'Email me product updates'],
      ['Slider', 'Volume'],
      ['Radio cards', 'Choose a plan'],
      ['Checkbox cards', 'Choose updates'],
      ['Segmented control', 'Calendar view'],
      ['Context menu', 'Contextual trigger region'],
      ['Data list', 'Jordan Lee'],
      ['Popover', 'Notification details'],
      ['Hover card', 'Jordan'],
      ['Scrollable area', 'Scrollable accessibility checklist'],
      ['Carousel', 'Accessibility principles'],
      ['Dialog', 'Open dialog'],
      ['Aspect ratio', '16:9 responsive media frame'],
      ['Card', 'Accessibility review'],
      ['Inset', 'Inset content'],
      ['Layout primitives', 'Responsive layout'],
      ['Theme system', 'Color theme'],
      ['Styling guide', 'Consistent, accessible styling'],
      ['Release guide', 'Before a release'],
    ] as const) {
      fireEvent.click(screen.getByRole('button', { name: sidebarLabel }));
      if (expected === 'block quote') {
        expect(screen.getByText(/Accessibility is not a feature/)).toBeInTheDocument();
      } else if (expected === 'inline quotation') {
        expect(screen.getByText(/clear, predictable, and inclusive/)).toBeInTheDocument();
      } else if (expected === 'Contextual trigger region') {
        expect(screen.getByText(/Right-click here, or focus and press Shift\+F10/)).toBeInTheDocument();
      } else if (expected === 'Jordan') {
        expect(screen.getByRole('link', { name: 'Jordan Lee' })).toBeInTheDocument();
      } else if (sidebarLabel === 'Icon button' || sidebarLabel === 'Dialog') {
        expect(screen.getByRole('button', { name: expected })).toBeInTheDocument();
      } else if (sidebarLabel === 'Slider') {
        expect(screen.getByRole('slider', { name: expected })).toBeInTheDocument();
      } else if (sidebarLabel === 'Scrollable area' || sidebarLabel === 'Carousel') {
        expect(screen.getByRole('region', { name: expected })).toBeInTheDocument();
      } else {
        expect(screen.getByText(new RegExp(expected, 'i'))).toBeInTheDocument();
      }
    }
  });

  it('documents control semantics and examples for the full library additions', () => {
    render(<App />);

    for (const [sidebarLabel, role, name] of [
      ['Radio cards', 'group', 'Choose a plan'],
      ['Checkbox cards', 'group', 'Choose updates'],
      ['Switch', 'switch', 'Email me product updates'],
      ['Slider', 'slider', 'Volume'],
      ['Segmented control', 'group', 'Calendar view'],
      ['Scrollable area', 'region', 'Scrollable accessibility checklist'],
      ['Carousel', 'region', 'Accessibility principles'],
      ['Dialog', 'button', 'Open dialog'],
      ['CAPTCHA field', 'group', 'Human verification'],
      ['Login form', 'textbox', 'Email address'],
      ['Theme system', 'combobox', 'Color theme'],
    ] as const) {
      fireEvent.click(screen.getByRole('button', { name: sidebarLabel }));
      expect(screen.getByRole(role, { name })).toBeInTheDocument();
    }
  });
});
