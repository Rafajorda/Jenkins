import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GifExpertApp } from './src/GifExpertApp';
import fetch from 'node-fetch';

// Mock de fetch
jest.mock('node-fetch', () => jest.fn());

describe('GifExpertApp Component', () => {
  beforeEach(() => {
    // Configurar el mock de fetch
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

  test('should add a new category when onAddCategory is called', () => {
    render(<GifExpertApp />);
    
    // Acceder al input y simular la escritura
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'React' } });
    
    // Simular el submit
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    
    // Verificar que la categoría ha sido añadida
    expect(screen.getByText('React')).toBeInTheDocument();
  });
});
