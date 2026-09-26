'use client';

import { useEffect } from 'react';
import { useToast } from '../contexts/ToastContext';

export const PORTFOLIO_DISCLOSURE =
  'Portfolio demonstration — all properties, pricing, availability, and contact details are fictional.';

const actionMessages: Record<string, string> = {
  phone: 'Demo only: calling is disabled, and no phone action was started.',
  email: 'Demo only: email is disabled, and no message was created or sent.',
  map: 'Demo only: this fictional location does not open an external map.',
  portal: 'Demo only: resident services are simulated locally.',
};

function getDemoAction(element: Element): string | undefined {
  const explicitAction = element.closest<HTMLElement>('[data-demo-action]')?.dataset
    .demoAction;
  if (explicitAction) return explicitAction;

  const anchor = element.closest<HTMLAnchorElement>('a[href]');
  const href = anchor?.getAttribute('href') ?? '';
  if (href.startsWith('tel:')) return 'phone';
  if (href.startsWith('mailto:')) return 'email';
  return undefined;
}

export function DemoSafetyNotice() {
  const { addToast } = useToast();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const action = getDemoAction(event.target);
      if (!action) return;

      event.preventDefault();
      addToast(
        actionMessages[action] ?? 'Demo only: this action is simulated locally.',
        'info'
      );
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [addToast]);

  return (
    <aside
      aria-label="Portfolio demonstration disclosure"
      className="fixed bottom-24 left-3 z-[70] max-w-[calc(100vw-1.5rem)] rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-medium leading-5 text-amber-950 shadow-lg lg:bottom-4 lg:max-w-md"
    >
      {PORTFOLIO_DISCLOSURE}
    </aside>
  );
}
