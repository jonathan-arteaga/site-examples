import { Metadata } from 'next';
import { pageSeoConfig } from '@caldridge/config/seo';

export const metadata: Metadata = {
  title: 'Synthetic Photo Gallery',
  description: pageSeoConfig.gallery.description,
  alternates: {
    canonical: '/caldridge/gallery',
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
