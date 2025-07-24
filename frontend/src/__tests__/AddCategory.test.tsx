import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddCategoryModal from '../pages/AddCategory';
import axios from '../lib/axios';

// Mock axios
jest.mock('../lib/axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AddCategoryModal', () => {
    test('submits category and calls onCreated and onClose', async () => {
        const mockOnClose = jest.fn();
        const mockOnCreated = jest.fn();

        mockedAxios.post.mockResolvedValue({ data: {} });

        render(
            <AddCategoryModal
                isOpen={true}
                onClose={mockOnClose}
                onCreated={mockOnCreated}
            />
        );

        fireEvent.change(screen.getByPlaceholderText(/category name/i), {
            target: { value: 'Test Category' },
        });

        fireEvent.click(screen.getByTestId('categoryAdd'));

        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledWith('/api/categories', {
                name: 'Test Category',
            });

            expect(mockOnCreated).toHaveBeenCalled();
            expect(mockOnClose).toHaveBeenCalled();
        });
    });

    test('shows alert on error', async () => {
        jest.spyOn(window, 'alert').mockImplementation(() => { });
        mockedAxios.post.mockRejectedValue(new Error('Create failed'));

        render(
            <AddCategoryModal
                isOpen={true}
                onClose={jest.fn()}
                onCreated={jest.fn()}
            />
        );

        fireEvent.change(screen.getByPlaceholderText(/category name/i), {
            target: { value: 'Fail Category' },
        });

        fireEvent.click(screen.getByTestId('categoryAdd'));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Error creating category');
        });
    });
});
