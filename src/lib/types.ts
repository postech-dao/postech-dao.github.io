export type SocialPlatform = 'x' | 'linkedin' | 'github' | 'telegram';

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
  label: string;
}

export interface ProfileMember {
  name: string;
  alias?: string;
  tag: string;
  image: string;
  socials: SocialLink[];
  bio: string[];
}

export interface ProfileSectionData {
  id: string;
  title: string;
  members: ProfileMember[];
}

export interface TimelineEvent {
  month: string;
  title: string;
}

export interface TimelineYear {
  year: string;
  events: TimelineEvent[];
}

export interface AssetItem {
  title: string;
  image: string;
}

export interface LogoItem {
  tag: string;
  title: string;
  image: string;
  alt: string;
}

export interface MediumPost {
  id: string;
  title: string;
  author?: string;
  url: string;
  summary?: string;
  publishedAt?: string;
  thumbnail?: string | null;
}

export interface ArchiveContribution {
  role: string;
  description: string;
}

export interface ArchiveEntry {
  name: string;
  handle: string;
  roles: string[];
  contributions: ArchiveContribution[];
}

export interface ArchiveEra {
  name: string;
  entries: ArchiveEntry[];
}
