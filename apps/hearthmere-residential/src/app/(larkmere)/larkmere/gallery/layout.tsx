import { Metadata } from 'next';
import { pageSeoConfig } from '@larkmere/config/seo';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description: pageSeoConfig.gallery.description,
  alternates: {
    canonical: '/larkmere/gallery',
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
