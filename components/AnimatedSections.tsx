'use client';

import FadeIn from '@/components/animations/FadeIn';
import StaggerChildren, { StaggerItem } from '@/components/animations/StaggerChildren';
import { ReactNode } from 'react';

interface AnimatedSectionsProps {
    hero: ReactNode;
    products: ReactNode;
    features: ReactNode;
}

export default function AnimatedSections({ hero, products, features }: AnimatedSectionsProps) {
    return (
        <>
            <FadeIn>{hero}</FadeIn>

            <FadeIn delay={0.2}>{products}</FadeIn>

            <StaggerChildren staggerDelay={0.15}>
                {features}
            </StaggerChildren>
        </>
    );
}

export { StaggerItem };
