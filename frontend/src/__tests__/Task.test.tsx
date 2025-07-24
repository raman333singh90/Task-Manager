import { render, screen } from '@testing-library/react';
import SortableTask from '../pages/SortableTask';

const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
};

describe('SortableTask', () => {
    it('renders task title and description', () => {
        render(<SortableTask task={mockTask} handleDelete={jest.fn()} />);

        expect(screen.getByText(/Test Task/i)).toBeInTheDocument();
        expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
    });
});
