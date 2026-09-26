import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Format square footage
 */
export function formatSqft(sqft: { min: number; max: number }): string {
  if (sqft.min === sqft.max) {
    return `${sqft.min.toLocaleString()} SF`;
  }
  return `${sqft.min.toLocaleString()} - ${sqft.max.toLocaleString()} SF`;
}
