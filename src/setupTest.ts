import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Ant Design relies on browser APIs that jsdom does not implement.
// Polyfill them so components render in the test environment.
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }),
});

class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
}

window.ResizeObserver = window.ResizeObserver || (ResizeObserverStub as typeof ResizeObserver);
