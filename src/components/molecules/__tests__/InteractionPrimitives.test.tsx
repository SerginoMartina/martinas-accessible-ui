import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
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
} from '../InteractionPrimitives';

describe('TextArea', () => {
  it('associates its label, hint, and error with the native textarea', () => {
    render(<TextArea label="Description" hint="At least one sentence." error="Enter a description." required />);
    const field = screen.getByRole('textbox', { name: /Description/ });
    expect(field).toBeRequired();
    expect(field).toHaveAttribute('aria-invalid', 'true');
    expect(field).toHaveAccessibleDescription('At least one sentence. Enter a description.');
  });
});

describe('choice controls', () => {
  it('renders radio cards as a labelled native radio group and reports selection', () => {
    const onChange = vi.fn();
    render(<RadioCards name="plan" legend="Choose a plan" defaultValue="basic" onChange={onChange} options={[
      { value: 'basic', label: 'Basic' }, { value: 'team', label: 'Team' },
    ]} />);
    fireEvent.click(screen.getByRole('radio', { name: 'Team' }));
    expect(onChange).toHaveBeenCalledWith('team');
    expect(screen.getByRole('radio', { name: 'Team' })).toBeChecked();
  });

  it('supports independent checkbox-card selection and callback', () => {
    const onChange = vi.fn();
    render(<CheckboxCards name="topics" legend="Topics" defaultValue={[]} onChange={onChange} options={[
      { value: 'events', label: 'Events', description: 'Workshops and talks.' },
    ]} />);
    fireEvent.click(screen.getByRole('checkbox', { name: /Events/ }));
    expect(onChange).toHaveBeenCalledWith(['events']);
    expect(screen.getByRole('checkbox', { name: /Events/ })).toBeChecked();
  });

  it('toggles a switch and reports its checked state', () => {
    render(<Switch label="Enable alerts" defaultChecked />);
    const control = screen.getByRole('switch', { name: 'Enable alerts' });
    expect(control).toHaveAttribute('aria-checked', 'true');
    fireEvent.click(control);
    expect(control).toHaveAttribute('aria-checked', 'false');
  });

  it('labels range input, exposes current output, and reports changes', () => {
    const onChange = vi.fn();
    render(<Slider label="Volume" value={25} onChange={onChange} />);
    fireEvent.change(screen.getByRole('slider', { name: 'Volume' }), { target: { value: '60' } });
    expect(onChange).toHaveBeenCalledWith(60);
  });

  it('provides a segmented mutually exclusive native radio group', () => {
    const onChange = vi.fn();
    render(<SegmentedControl label="View" defaultValue="week" onChange={onChange} options={[
      { value: 'day', label: 'Day' }, { value: 'week', label: 'Week' },
    ]} />);
    fireEvent.click(screen.getByRole('radio', { name: 'Day' }));
    expect(onChange).toHaveBeenCalledWith('day');
    expect(screen.getByRole('radio', { name: 'Day' })).toBeChecked();
  });
});

describe('content helpers', () => {
  it('renders definition list terms and values', () => {
    render(<DataList items={[{ label: 'Name', value: 'Jordan' }]} />);
    expect(screen.getByRole('term')).toHaveTextContent('Name');
    expect(screen.getByRole('definition')).toHaveTextContent('Jordan');
  });

  it('makes overflow content available in a labelled scroll region', () => {
    render(<ScrollArea label="Recent activity"><p>Latest event</p></ScrollArea>);
    expect(screen.getByRole('region', { name: 'Recent activity' })).toHaveAttribute('tabindex', '0');
  });
});

describe('overlays and navigation', () => {
  it('opens a named popover, focuses its content, and closes with Escape to trigger', async () => {
    render(<Popover label="Extra details" trigger="More details"><button type="button">Details link</button></Popover>);
    const trigger = screen.getByRole('button', { name: 'More details' });
    fireEvent.click(trigger);
    const panelButton = await screen.findByRole('button', { name: 'Details link' });
    await waitFor(() => expect(panelButton).toHaveFocus());
    fireEvent.keyDown(panelButton, { key: 'Escape' });
    expect(trigger).toHaveFocus();
    expect(screen.queryByRole('dialog', { name: 'Extra details' })).not.toBeInTheDocument();
  });

  it('shows hover-card details on keyboard focus', () => {
    render(<HoverCard trigger={<button type="button">Author profile</button>}><span>Designer of inclusive tools.</span></HoverCard>);
    const trigger = screen.getByRole('button', { name: 'Author profile' });
    fireEvent.focus(trigger);
    expect(trigger).toHaveAttribute('aria-describedby');
    expect(screen.getByRole('tooltip')).toHaveTextContent('Designer of inclusive tools.');
  });

  it('opens context actions by keyboard and supports menu selection', async () => {
    const onSelect = vi.fn();
    render(<ContextMenu label="Item actions" items={[{ id: 'open', label: 'Open item', onSelect }]}><div>Context target</div></ContextMenu>);
    const target = screen.getByLabelText(/Press Shift\+F10/);
    target.focus();
    fireEvent.keyDown(target, { key: 'F10', shiftKey: true });
    const action = await screen.findByRole('menuitem', { name: 'Open item' });
    await waitFor(() => expect(action).toHaveFocus());
    fireEvent.click(action);
    expect(onSelect).toHaveBeenCalledOnce();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(target).toHaveFocus();
  });

  it('skips disabled context actions during initial focus and arrow navigation', async () => {
    render(<ContextMenu label="Document actions" items={[
      { id: 'disabled', label: 'Disabled action', onSelect: vi.fn(), disabled: true },
      { id: 'edit', label: 'Edit document', onSelect: vi.fn() },
      { id: 'delete', label: 'Delete document', onSelect: vi.fn() },
    ]}><div>Document</div></ContextMenu>);
    const target = screen.getByLabelText(/Press Shift\+F10/);
    target.focus();
    fireEvent.keyDown(target, { key: 'F10', shiftKey: true });
    const edit = await screen.findByRole('menuitem', { name: 'Edit document' });
    await waitFor(() => expect(edit).toHaveFocus());
    fireEvent.keyDown(edit, { key: 'ArrowDown' });
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Delete document' })).toHaveFocus());
    fireEvent.keyDown(screen.getByRole('menuitem', { name: 'Delete document' }), { key: 'ArrowUp' });
    await waitFor(() => expect(edit).toHaveFocus());
    fireEvent.keyDown(edit, { key: 'End' });
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Delete document' })).toHaveFocus());
    fireEvent.keyDown(screen.getByRole('menuitem', { name: 'Delete document' }), { key: 'Home' });
    await waitFor(() => expect(edit).toHaveFocus());
  });

  it('moves between carousel slides with named controls and announces the current slide', () => {
    render(<Carousel label="Principles" slides={[<p key="a">Perceivable</p>, <p key="b">Operable</p>]} />);
    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(screen.getByText('Operable')).toBeInTheDocument();
    expect(screen.getByRole('group', { name: '2 of 2' })).toHaveAttribute('aria-roledescription', 'slide');
  });

  it('delegates controlled dialog dismissal to the caller', () => {
    const onOpenChange = vi.fn();
    render(<Dialog open onOpenChange={onOpenChange} title="Confirm">Dialog content</Dialog>);
    expect(screen.getByRole('dialog', { name: 'Confirm' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close Modal' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
