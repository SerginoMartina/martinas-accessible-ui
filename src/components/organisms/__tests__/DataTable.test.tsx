import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DataTable } from '../DataTable';

const data = [
  { id: '1', name: 'Zoe', score: 3 },
  { id: '2', name: 'Alex', score: 10 },
  { id: '3', name: 'Morgan', score: 7 },
  { id: '4', name: 'Casey', score: 5 },
];

const columns = [
  { id: 'name', header: 'Name', accessor: 'name' as const, width: 160, minWidth: 100 },
  { id: 'score', header: 'Score', accessor: 'score' as const },
];

describe('DataTable', () => {
  it('sorts values, filters rows, and paginates the result set', () => {
    render(
      <DataTable
        caption="People"
        data={data}
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={2}
      />,
    );
    const table = screen.getByRole('table', { name: 'People' });

    fireEvent.click(within(table).getByRole('button', { name: /Score/ }));
    fireEvent.click(within(table).getByRole('button', { name: /Score/ }));
    expect(within(table).getAllByRole('row')[1]).toHaveTextContent('Alex');

    fireEvent.click(screen.getByRole('button', { name: 'Go to page 2' }));
    expect(within(table).getAllByRole('row')[1]).toHaveTextContent('Casey');

    fireEvent.change(screen.getByRole('searchbox', { name: 'Filter rows' }), {
      target: { value: 'Morgan' },
    });
    expect(within(table).getAllByRole('row')).toHaveLength(2);
    expect(within(table).getAllByRole('row')[1]).toHaveTextContent('Morgan');
  });

  it('exposes resizable columns and supports keyboard width adjustment', () => {
    render(<DataTable caption="People" data={data} columns={columns} getRowId={(row) => row.id} />);
    const separator = screen.getByRole('separator', { name: 'Resize Name column' });
    const initialWidth = Number(separator.getAttribute('aria-valuenow'));

    fireEvent.keyDown(separator, { key: 'ArrowRight' });

    expect(Number(separator.getAttribute('aria-valuenow'))).toBe(initialWidth + 16);
  });
});
