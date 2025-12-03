import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface KeyboardShortcutsConfig {
  onCommandPalette: () => void;
}

export function useKeyboardShortcuts({ onCommandPalette }: KeyboardShortcutsConfig) {
  const navigate = useNavigate();

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const modKey = isMac ? e.metaKey : e.ctrlKey;

    // Ignore if user is typing in an input field
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      (e.target as HTMLElement).isContentEditable
    ) {
      // Allow Cmd/Ctrl+K even in input fields
      if (modKey && e.key === 'k') {
        e.preventDefault();
        onCommandPalette();
      }
      return;
    }

    // Command Palette: Cmd/Ctrl + K
    if (modKey && e.key === 'k') {
      e.preventDefault();
      onCommandPalette();
      return;
    }

    // Quick Mood Check: Cmd/Ctrl + M
    if (modKey && e.key === 'm') {
      e.preventDefault();
      const element = document.getElementById('quick-check-in');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Journal: Cmd/Ctrl + J
    if (modKey && e.key === 'j') {
      e.preventDefault();
      navigate('/app/journaling');
      return;
    }

    // AI Companion: Cmd/Ctrl + H
    if (modKey && e.key === 'h') {
      e.preventDefault();
      navigate('/app/mini-session');
      return;
    }

    // Today's Plan: Cmd/Ctrl + T
    if (modKey && e.key === 't') {
      e.preventDefault();
      navigate('/app/dashboard');
      return;
    }

    // Progress: Cmd/Ctrl + P
    if (modKey && e.key === 'p') {
      e.preventDefault();
      navigate('/app/progress-analytics');
      return;
    }

    // Help: Cmd/Ctrl + /
    if (modKey && e.key === '/') {
      e.preventDefault();
      // Could show a shortcuts help modal
      console.log('Keyboard shortcuts help');
      return;
    }
  }, [navigate, onCommandPalette]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
}
