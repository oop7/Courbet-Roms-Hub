

import romData from './rom-data.json';
import { romMetadata } from './rom-metadata';

interface RomBuild {
  file_name: string;
  rom_type: string;
  android_version: string;
  version: string;
  date: string;
  download_url: string;
  status: 'Stable' | 'Beta';
  category?: 'rom' | 'port';
  root_method?: 'KernelSU' | 'KernelSU Next' | 'None' | 'APatch';
  whats_new: string[];
  note?: string;
  tips?: { label: string; url?: string }[];
}

export interface PreviousRelease {
  version: string;
  date: string;
  downloadLink: string;
  rootMethod: 'KernelSU' | 'KernelSU Next' | 'None' | 'APatch';
  whatsNew: string[];
  status: 'Stable' | 'Beta';
}

export interface RomVersion {
  androidVersion: string;
  status: 'Stable' | 'Beta';
  downloadLink: string;
  whatsNew: string[];
  tips?: { label: string; url?: string }[];
  lastUpdated: string;
  rootMethod: 'KernelSU' | 'KernelSU Next' | 'None' | 'APatch';
  previousReleases?: PreviousRelease[];
  note?: string;
}

export interface Rom {
  id: string;
  slug: string;
  category: 'rom' | 'port';
  name: string;
  description: string;
  maintainer: string;
  imageUrl: string;
  imageHint: string;
  versions: RomVersion[];
  isActive?: boolean;
}


const processedRoms: Record<string, Rom> = {};

const getRisingOsDate = (filename: string): string => {
  const match = filename.match(/RisingOS_Revived-[\d.]+-(\d{6})-/);
  if (match && match[1]) {
    const dateStr = match[1];
    const year = `20${dateStr.substring(0, 2)}`;
    const month = dateStr.substring(2, 4);
    const day = dateStr.substring(4, 6);
    return `${year}-${month}-${day}`;
  }
  return 'Unknown';
};

(romData.roms as RomBuild[]).forEach(rom => {
  if (rom.rom_type === 'RisingOS' || rom.rom_type === 'RisingOS Revived') {
    rom.date = getRisingOsDate(rom.file_name);
  }
});


// Group by rom_type
const romsByType = (romData.roms as RomBuild[]).reduce((acc, rom) => {
  if (!acc[rom.rom_type]) {
    acc[rom.rom_type] = [];
  }
  acc[rom.rom_type].push(rom);
  return acc;
}, {} as Record<string, RomBuild[]>);

const cutoffDate = new Date('2025-02-10');
const getRootMethod = (buildDate: string): 'KernelSU' | 'KernelSU Next' => {
  if (buildDate === 'Unknown' || buildDate === 'N/A') {
    return 'KernelSU Next'; // Default for unknown dates
  }
  return new Date(buildDate) < cutoffDate ? 'KernelSU' : 'KernelSU Next';
};

for (const romName in romsByType) {
  const allBuilds = romsByType[romName];
  const metadata = romMetadata[romName];
  const slug = metadata?.id || romName.toLowerCase().replace(/\s/g, '-').replace(/[().]/g, '');
  const category: 'rom' | 'port' = allBuilds.some(build => build.category === 'port') ? 'port' : 'rom';
  
  const rom: Rom = {
    id: slug,
    slug: slug,
    category: category,
    name: romName,
    description: metadata?.description || `A great custom ROM for your device.`,
    maintainer: metadata?.maintainer || (category === 'port' ? 'Aska' : 'melo159'),
    imageUrl: `/banners/${metadata?.banner || 'placeholder.png'}`,
    imageHint: metadata?.imageHint || 'abstract pattern',
    versions: [],
    isActive: metadata?.isActive,
  };

  // Group by android_version within each rom_type
  const buildsByAndroidVersion = allBuilds.reduce((acc, build) => {
    // Normalize Android version string
    const androidVersionNumber = build.android_version.replace('Android ', '');
    if (!acc[androidVersionNumber]) {
      acc[androidVersionNumber] = [];
    }
    acc[androidVersionNumber].push(build);
    return acc;
  }, {} as Record<string, RomBuild[]>);


  for (const androidVersion in buildsByAndroidVersion) {
    const versionBuilds = buildsByAndroidVersion[androidVersion];
    
    // Sort newest to oldest for display
    versionBuilds.sort((a, b) => {
      if (a.date === 'Unknown' && b.date === 'Unknown') return 0;
      if (a.date === 'Unknown') return 1;
      if (b.date === 'Unknown') return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    const latestBuild = versionBuilds[0];
    const previousBuilds = versionBuilds.slice(1);

    const romVersion: RomVersion = {
      androidVersion: androidVersion,
      status: latestBuild.status,
      downloadLink: latestBuild.download_url,
      whatsNew: latestBuild.whats_new,
      lastUpdated: latestBuild.date === 'Unknown' ? 'N/A' : latestBuild.date,
      rootMethod: latestBuild.root_method ?? getRootMethod(latestBuild.date),
      note: latestBuild.note,
      tips: latestBuild.tips,
      previousReleases: previousBuilds.map(pr => ({
        version: pr.version,
        date: pr.date === 'Unknown' ? 'N/A' : pr.date,
        downloadLink: pr.download_url,
        rootMethod: pr.root_method ?? getRootMethod(pr.date),
        status: pr.status,
        whatsNew: pr.whats_new,
      })),
    };

    rom.versions.push(romVersion);
  }

  // Sort versions so the newest Android version is first
  rom.versions.sort((a, b) => parseInt(b.androidVersion) - parseInt(a.androidVersion));
  processedRoms[rom.slug] = rom;
}

// Manually add/update crDroid
const crDroidSlug = romMetadata.crDroid.id;
processedRoms[crDroidSlug] = {
    id: crDroidSlug,
    slug: crDroidSlug,
  category: 'rom',
    name: 'crDroid',
    description: romMetadata.crDroid.description,
    maintainer: 'melo159',
    imageUrl: `/banners/${romMetadata.crDroid.banner}`,
    imageHint: romMetadata.crDroid.imageHint,
    versions: [
        {
            androidVersion: '16',
            status: 'Stable',
            downloadLink: 'https://crdroid.net/courbet/12',
            lastUpdated: '2026-01-20',
            rootMethod: 'KernelSU Next',
            whatsNew: [
                'Synced with latest crDroid sources',
            ],
            note: "crDroid is a VANILLA build, meaning it does NOT include Google Apps. You MUST flash a GApps package (like NikGapps) right after flashing the ROM to avoid bootloops. We don't provide a direct link for crDroid to support them. Please visit their official website.",
        },
        {
            androidVersion: '15',
            status: 'Stable',
            downloadLink: 'https://crdroid.net/courbet/11',
            lastUpdated: '2025-07-20',
            rootMethod: 'KernelSU Next',
            whatsNew: [
                'crDroid version 11.7',
                'Please visit the official crDroid changelog for detailed updates.',
            ],
            note: "crDroid is a VANILLA build, meaning it does NOT include Google Apps. You MUST flash a GApps package (like NikGapps) right after flashing the ROM to avoid bootloops. We don't provide a direct link for crDroid to support them. Please visit their official website.",
        },
    ],
};


// Sort final list to show the most recently updated ROMs first.
export const roms: Rom[] = Object.values(processedRoms).sort((a, b) => {
  const aDate = a.versions[0]?.lastUpdated || '1970-01-01';
  const bDate = b.versions[0]?.lastUpdated || '1970-01-01';
  if (aDate === 'N/A' && bDate === 'N/A') return 0;
  if (aDate === 'N/A') return 1;
  if (bDate === 'N/A') return -1;
  return new Date(bDate).getTime() - new Date(aDate).getTime();
});

export const getRomBySlug = (slug: string): Rom | undefined => {
  return roms.find(rom => rom.slug === slug);
}
