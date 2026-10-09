import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Accordion } from '../Accordion';
import { Pagination } from '../Pagination';
import { Select } from '../Select';
import { Tabs } from '../Tabs';

describe('Tabs', () => {
  it('follows tab roles and arrow-key activation', () => {
    render(
      <Tabs
        tabs={[
          { id: 'one', label: 'One', content: 'Panel one' },
          { id: 'two', label: 'Two', content: 'Panel two' },
          { id: 'three', label: 'Three', content: 'Panel three', disabled: true },
        ]}
      />,
    );

    const first = screen.getByRole('tab', { name: 'One' });
    first.focus();
    fireEvent.keyDown(first, { key: 'ArrowRight' });

    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel two');
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus();
  });
});

describe('Accordion', () => {
  it('allows multiple sections to remain open and reflects expanded state', () => {
    render(
      <Accordion
        multiple
        items={[
          { id: 'one', title: 'Section one', content: 'First body' },
          { id: 'two', title: 'Section two', content: 'Second body' },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Section one' }));
    fireEvent.click(screen.getByRole('button', { name: 'Section two' }));

    expect(screen.getByRole('button', { name: 'Section one' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Section two' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('First body')).toBeVisible();
    expect(screen.getByText('Second body')).toBeVisible();
  });
});

describe('Select', () => {
  it('filters options and exposes the empty result state', () => {
    render(
      <Select
        label="Choose a team"
        options={[
          { value: 'design', label: 'Design', description: 'Design team' },
          { value: 'engineering', label: 'Engineering', description: 'Builds products' },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole('combobox', { name: 'Choose a team' }));
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'no match' } });

    expect(screen.getByRole('status')).toHaveTextContent('No results found');
  });

  it('selects the active option with keyboard and reports its value', () => {
    const onChange = vi.fn();
    render(
      <Select
        label="Choose a team"
        onChange={onChange}
        options={[
          { value: 'design', label: 'Design' },
          { value: 'engineering', label: 'Engineering' },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole('combobox', { name: 'Choose a team' }));
    fireEvent.keyDown(screen.getByRole('searchbox'), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('option', { name: 'Design' }), { key: 'Enter' });

    expect(onChange).toHaveBeenCalledWith('design');
    expect(screen.getByRole('combobox', { name: 'Choose a team' })).toHaveTextContent('Design');
  });
});

describe('Pagination', () => {
  it('renders ellipses for distant pages and reports a selected page', () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={5} totalPages={20} onPageChange={onPageChange} />);

    expect(screen.getAllByLabelText('Pages omitted')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Go to page 6' }));
    expect(onPageChange).toHaveBeenCalledWith(6);
    expect(screen.getByRole('button', { name: 'Go to page 5' })).toHaveAttribute('aria-current', 'page');
  });
});
