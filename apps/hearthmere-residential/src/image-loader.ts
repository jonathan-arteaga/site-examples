"use client";
import type { ImageLoaderProps } from 'next/image';
export default function imageLoader({ src, width }: ImageLoaderProps) {
  const prefix = '/examples/property-management';
  const local = src.startsWith(prefix + '/') ? src.slice(prefix.length) : src;
  return `${prefix}/_responsive${local}.w${width}.webp`;
}
