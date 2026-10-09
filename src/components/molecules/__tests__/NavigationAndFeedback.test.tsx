import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LiveRegion } from '../../atoms/LiveRegion';
import { SkipLink } from '../../atoms/SkipLink';
import { Combobox } from '../Combobox';
import { InlineAlert } from '../InlineAlert';
import { MenuButton } from '../MenuButton';
import { RadioGroup } from '../RadioGroup';

describe('RadioGroup', () => {
  it('uses a named native radio group with descriptions, required state, and selection callbacks', () => {
    const onChange = vi.fn();
    render(
      <RadioGroup
        name="plan"
        legend="Choose a plan"
        hint="You can change it later."
        required
        options={[
          { value: 'basic', label: 'Basic', description: 'For individuals' },
          { value: 'team', label: 'Team', disabled: true },
        ]}
        onChange={onChange}
      />,
    );

    const basic = screen.getByRole('radio', { name: /Basic/ });
    expect(basic).toHaveAttribute('name', 'plan');
    expect(basic).toBeRequired();
    expect(basic).toHaveAttribute('aria-describedby');
    expect(screen.getByRole('radio', { name: 'Team' })).toBeDisabled();

    fireEvent.click(basic);
    expect(onChange).toHaveBeenCalledWith('basic');
  });
});

describe('Combobox', () => {
  it('filters suggestions, skips disabled options, and selects the active option by keyboard', async () => {
    const onChange = vi.fn();
    const onInputChange = vi.fn();
    render(
      <Combobox
        label="Search a city"
        options={[
          { value: 'london', label: 'London' },
          { value: 'new-york', label: 'New York' },
          { value: 'los-angeles', label: 'Los Angeles', disabled: true },
        ]}
        onChange={onChange}
        onInputChange={onInputChange}
      />,
    );
    const input = screen.getByRole('combobox', { name: 'Search a city' });

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'o' } });
    expect(screen.getAllByRole('option')).toHaveLength(3);
    expect(onInputChange).toHaveBeenCalledWith('o');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).toHaveAttribute('aria-activedescendant');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).toHaveAttribute('aria-activedescendant', expect.stringContaining('option-1'));
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onChange).toHaveBeenCalledWith('new-york');
    expect(input).toHaveValue('New York');
    await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'false'));
  });

  it('announces async loading and empty states and optionally commits custom text', () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <Combobox label="Search a city" options={[]} loading />,
    );
    const input = screen.getByRole('combobox', { name: 'Search a city' });
    fireEvent.focus(input);
    expect(screen.getByRole('status')).toHaveTextContent('Loading suggestions');

    rerender(<Combobox label="Search a city" options={[]} noResultsText="No matching cities." />);
    expect(screen.getByRole('status')).toHaveTextContent('No matching cities.');
    fireEvent.change(input, { target: { value: 'Atlantis' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('commits a custom value only when explicitly enabled', () => {
    const onChange = vi.fn();
    render(<Combobox label="Search a city" options={[]} allowCustomValue onChange={onChange} />);
    const input = screen.getByRole('combobox', { name: 'Search a city' });
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Atlantis' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onChange).toHaveBeenCalledWith('Atlantis');
  });
});

describe('MenuButton', () => {
  it('opens with focus, skips disabled items, and returns focus after Escape', async () => {
    render(
      <MenuButton
        label="Actions"
        items={[
          { id: 'edit', label: 'Edit', onSelect: vi.fn() },
          { id: 'archive', label: 'Archive', onSelect: vi.fn(), disabled: true },
          { id: 'delete', label: 'Delete', onSelect: vi.fn() },
        ]}
      />,
    );
    const trigger = screen.getByRole('button', { name: 'Actions' });
    fireEvent.click(trigger);

    const edit = await screen.findByRole('menuitem', { name: 'Edit' });
    await waitFor(() => expect(edit).toHaveFocus());
    fireEvent.keyDown(edit, { key: 'ArrowDown' });
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();
    fireEvent.keyDown(screen.getByRole('menuitem', { name: 'Delete' }), { key: 'Escape' });

    expect(trigger).toHaveFocus();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('runs the chosen action and restores focus to the trigger', async () => {
    const onSelect = vi.fn();
    render(<MenuButton label="Actions" items={[{ id: 'edit', label: 'Edit', onSelect }]} />);
    const trigger = screen.getByRole('button', { name: 'Actions' });
    fireEvent.click(trigger);
    fireEvent.click(await screen.findByRole('menuitem', { name: 'Edit' }));

    expect(onSelect).toHaveBeenCalledOnce();
    expect(trigger).toHaveFocus();
  });
});

describe('SkipLink, InlineAlert, and LiveRegion', () => {
  it('provides a default fragment target and custom link text', () => {
    render(<SkipLink>Skip the navigation</SkipLink>);
    expect(screen.getByRole('link', { name: 'Skip the navigation' })).toHaveAttribute('href', '#main-content');
  });

  it('uses polite status for non-urgent alerts and assertive alert semantics for errors', () => {
    const { rerender } = render(<InlineAlert variant="success">Saved.</InlineAlert>);
    expect(screen.getByRole('status')).toHaveTextContent('Saved.');

    rerender(<InlineAlert variant="error">Could not save.</InlineAlert>);
    expect(screen.getByRole('alert')).toHaveTextContent('Could not save.');
  });

  it('renders polite or assertive live announcements without placing them in the tab order', () => {
    const { rerender } = render(<LiveRegion>Saved.</LiveRegion>);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByRole('status')).toHaveAttribute('aria-atomic', 'true');
    expect(screen.getByRole('status')).toHaveClass('sr-only');

    rerender(<LiveRegion politeness="assertive">Urgent update.</LiveRegion>);
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
  });
});
