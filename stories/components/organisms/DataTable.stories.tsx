import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from '../../../src/components/organisms/DataTable';

interface Person {
  name: string;
  team: string;
  role: string;
}

const people: Person[] = [
  { name: 'Avery Chen', team: 'Design', role: 'Designer' },
  { name: 'Morgan Patel', team: 'Engineering', role: 'Engineer' },
  { name: 'Jordan Lee', team: 'Research', role: 'Researcher' },
  { name: 'Sam Rivera', team: 'Engineering', role: 'Accessibility engineer' },
  { name: 'Taylor Kim', team: 'Design', role: 'Content designer' },
  { name: 'Riley Brooks', team: 'Operations', role: 'Program manager' },
];

const meta: Meta<typeof DataTable<Person>> = {
  title: 'Organisms/DataTable',
  component: DataTable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TeamDirectory: Story = {
  args: {
    caption: 'Team directory',
    data: people,
    getRowId: (person) => person.name,
    pageSize: 4,
    columns: [
      { id: 'name', header: 'Name', accessor: 'name', width: 180 },
      { id: 'team', header: 'Team', accessor: 'team', width: 160 },
      { id: 'role', header: 'Role', accessor: 'role', width: 220 },
    ],
  },
};
