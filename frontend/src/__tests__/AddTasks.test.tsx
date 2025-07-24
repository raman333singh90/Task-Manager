import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddTaskModal from '../pages/AddTask';
import axios from '../lib/axios';

// Mock axios
jest.mock('../lib/axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AddTaskModal', () => {
    test('submits task and calls onCreated and onClose', async () => {
        const mockOnClose = jest.fn();
        const mockOnCreated = jest.fn();

        mockedAxios.post.mockResolvedValue({ data: {} }); // mock success

        render(
            <AddTaskModal
                isOpen={true}
                onClose={mockOnClose}
                categoryId={1}
                onCreated={mockOnCreated}
            />
        );

        fireEvent.change(screen.getByPlaceholderText(/add task title/i), {
            target: { value: 'Test Task' },
        });

        fireEvent.change(screen.getByPlaceholderText(/add task description/i), {
            target: { value: 'Test Description' },
        });

        fireEvent.click(screen.getByTestId('taskAdd'));

        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledWith('/api/tasks', {
                title: 'Test Task',
                description: 'Test Description',
                category_id: 1,
            });

            expect(mockOnCreated).toHaveBeenCalled();
            expect(mockOnClose).toHaveBeenCalled();
        });
    });

    test('shows error alert on failure', async () => {
        jest.spyOn(window, 'alert').mockImplementation(() => { });
        mockedAxios.post.mockRejectedValue(new Error('Request failed'));

        render(
            <AddTaskModal
                isOpen={true}
                onClose={jest.fn()}
                categoryId={1}
                onCreated={jest.fn()}
            />
        );

        fireEvent.change(screen.getByPlaceholderText(/add task title/i), {
            target: { value: 'Fail Task' },
        });

        fireEvent.change(screen.getByPlaceholderText(/add task description/i), {
            target: { value: 'Fail Description' },
        });

        fireEvent.click(screen.getByTestId('taskAdd'));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Error creating task');
        });
    });
});
