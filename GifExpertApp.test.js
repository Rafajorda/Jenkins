import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GifExpertApp } from './src/GifExpertApp';
import '@testing-library/jest-dom';
import fetch from 'node-fetch';
import { act } from 'react';

// Mock de fetch
jest.mock('node-fetch', () => jest.fn());

describe('GifExpertApp Component', () => {
  beforeEach(() => {
    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        data: [
          {
            id: 'abc123',
            title: 'Test Gif',
            images: {
              downsized_medium: { url: 'https://test.com/test.gif' },
            },
          },
        ],
      }),
    });
  });

  test('should render the GifExpertApp title', () => {
    render(<GifExpertApp />);
    expect(screen.getByText('GifExpertApp')).toBeInTheDocument();
  });

  test('should add a new category when onAddCategory is called', async () => {
    render(<GifExpertApp />);
  
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'React' } });
  
    const form = screen.getByRole('form');
  
    // Asegúrate de envolver la interacción asincrónica dentro de `act()`
    await act(async () => {
      fireEvent.submit(form);
    });

    // Espera a que la categoría 'React' se haya agregado y se muestre
    await waitFor(() => {
      expect(screen.getByText('React')).toBeInTheDocument();
    });
  });
});
