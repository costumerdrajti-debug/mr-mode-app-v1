'use client';
import { useEffect } from 'react';

export default function SecurityBlocker() {
    useEffect(() => {
        // Disable right-click
        const handleContextMenu = (e: Event) => e.preventDefault();
        document.addEventListener('contextmenu', handleContextMenu);

        // Disable copy
        const handleCopy = (e: Event) => e.preventDefault();
        document.addEventListener('copy', handleCopy);

        // Disable select
        const handleSelect = (e: Event) => e.preventDefault();
        document.addEventListener('selectstart', handleSelect);

        // Disable drag for images
        document.querySelectorAll('img').forEach(img => {
            img.setAttribute('draggable', 'false');
            img.addEventListener('contextmenu', handleContextMenu);
        });

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('copy', handleCopy);
            document.removeEventListener('selectstart', handleSelect);
        };
    }, []);
    return null;
}
