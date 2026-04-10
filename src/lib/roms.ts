

import romData from './rom-data.json';

interface RomBuild {
  file_name: string;
  rom_type: string;
  android_version: string;
  version: string;
  date: string;
  download_url: string;
  status: 'Stable' | 'Beta';
  category?: 'rom' | 'port';
  root_method?: 'KernelSU' | 'KernelSU Next' | 'None';
  whats_new: string[];
}

export interface PreviousRelease {
  version: string;
  date: string;
  downloadLink: string;
  rootMethod: 'KernelSU' | 'KernelSU Next' | 'None';
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
  rootMethod: 'KernelSU' | 'KernelSU Next' | 'None';
  previousReleases?: PreviousRelease[];
  note?: string;
}

export interface Rom {
  slug: string;
  category: 'rom' | 'port';
  name: string;
  description: string;
  maintainer: string;
  imageUrl: string;
  imageHint: string;
  versions: RomVersion[];
}


const romDescriptions: Record<string, string> = {
  'AlphaDroid': 'A lightweight and performance-focused ROM, aiming to provide a smooth experience with essential customizations.',
  'AxionOS': 'AxionOS focuses on minimalism and stability, delivering a clean AOSP experience with useful additions.',
  'ColorOS 15 Lite': 'A lightweight ColorOS-based port for courbet focused on daily usability and core hardware support.',
  'DerpFest': 'DerpFest delivers a feature-rich Android experience with performance and customization focused updates.',
  'EvolutionX': 'A flashable custom ROM to bring a true Pixel feel to your Android Device, with many additional configurations at your disposal.',
  'HyperOS 2.0.16.0 CN': 'A HyperOS 2 CN port for courbet with bug fixes and non-rooted stock boot image.',
  'HyperOS 3.0.1.0 EU': 'A debloated HyperOS 3 EU port for courbet with core features and UI experience preserved.',
  'Infinity-X': 'Infinity-X offers a unique blend of features and customizations for a personalized Android experience.',
  'LineageOS': 'A free and open-source operating system for various devices, based on the Android mobile platform. Successor to CyanogenMod.',
  'OxygenOS-Rev 2': 'An OxygenOS-based Android 15 port for courbet with prebuilt camera support and bundled utilities.',
  'PixelOS': 'Get the pure Pixel experience on your Courbet device. Smooth, stable, and packed with Google\'s best features.',
  'RisingOS': 'RisingOS is known for its extensive feature set and customization options, allowing you to tailor your device to your liking.',
  'The Pixel Project': 'Aims to replicate the Google Pixel software experience as closely as possible on other devices.',
  'VoltageOS': 'VoltageOS is a clean and simple ROM that focuses on providing a stable and reliable Android experience.',
  'crDroid': 'crDroid is designed to increase performance and reliability over stock Android for your device, also attempting to bring many of the best features existent today.',
  'RisingOS Revived': 'RisingOS Revived continues the legacy of RisingOS with a focus on stability and a refined user experience.',
};

const imageHints: Record<string, string> = {
    'alphadroid': 'abstract orange',
    'axionos': 'abstract purple',
  'coloros-15-lite': 'coloros abstract teal',
    'derpfest': 'abstract teal purple',
    'evolution-x': 'evolution x logo',
    'infinity-x': 'abstract black',
    'lineageos': 'abstract green',
    'oxygenos-rev-2': 'oxygen abstract red',
    'pixelos': 'abstract dark blue',
    'risingos': 'abstract red',
    'risingos-revived': 'abstract red',
    'the-pixel-project': 'abstract yellow',
    'voltageos': 'abstract indigo',
    'crdroid': 'abstract orange geometric',
}

const bannerFileNames: Record<string, string> = {
  'AlphaDroid': 'alpha.webp',
  'AxionOS': 'AXION.webp',
  'ColorOS 15 Lite': 'colorOS_lite.webp',
  'DerpFest': 'DerpFest.webp',
  'EvolutionX': 'evolution_x.webp',
  'HyperOS 2.0.16.0 CN': 'HyperOS_2.0.webp',
  'HyperOS 3.0.1.0 EU': 'HyperOS_3.0.1.0 EU.webp',
  'Infinity-X': 'ProjectInfinityX.webp',
  'LineageOS': 'Lineage.webp',
  'OxygenOS-Rev 2': 'oxygenOS_15.webp',
  'PixelOS': 'pixelos.webp',
  'RisingOS': 'RisingOS.webp',
  'RisingOS Revived': 'RisingOS_Revived.webp',
  'The Pixel Project': 'ThePixelProject.webp',
  'VoltageOS': 'voltage.webp',
  'crDroid': 'CrDroid.webp',
};

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

const getMaintainerFromAcknowledgements = (romName: string, category: 'rom' | 'port'): string => {
  if (romName === 'DerpFest') {
    return 'omer';
  }

  if (romName === 'OxygenOS-Rev 2') {
    return 'EsTeh';
  }

  if (category === 'port') {
    return 'Aska';
  }

  return 'melo159';
};


for (const romName in romsByType) {
  const allBuilds = romsByType[romName];
  const slug = romName.toLowerCase().replace(/\s/g, '-').replace('.', '');
  const bannerFileName = bannerFileNames[romName] || 'placeholder.png';
  const category: 'rom' | 'port' = allBuilds.some(build => build.category === 'port') ? 'port' : 'rom';
  
  const rom: Rom = {
    slug: slug,
    category: category,
    name: romName,
    description: romDescriptions[romName] || `A great custom ROM for your device.`,
    maintainer: getMaintainerFromAcknowledgements(romName, category),
    imageUrl: `/banners/${bannerFileName}`,
    imageHint: imageHints[slug] || 'abstract pattern',
    versions: [],
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
      previousReleases: previousBuilds.map(pr => ({
        version: pr.version,
        date: pr.date === 'Unknown' ? 'N/A' : pr.date,
        downloadLink: pr.download_url,
        rootMethod: pr.root_method ?? getRootMethod(pr.date),
        status: pr.status,
        whatsNew: pr.whats_new,
      })),
    };

    if (romName === 'ColorOS 15 Lite' && androidVersion === '15') {
      romVersion.tips = [
        {
          label: 'If you want a blurred Control Center, use Lucky Tool',
          url: 'https://github.com/Xposed-Modules-Repo/com.luckyzyx.luckytool',
        },
        {
          label: 'Camera app',
          url: 'https://t.me/askastorage/58',
        },
      ];
    }

    if (romName === 'HyperOS 3.0.1.0 EU' && androidVersion === '15') {
      romVersion.tips = [
        {
          label: 'The ROM may take time to settle, so some lag is expected on first boot',
        },
        {
          label: 'For better performance, do not enable advanced texture in settings',
        },
        {
          label: 'This ROM is a debloated version of Marble HyperOS 3 EU',
        },
      ];
    }

    if (romName === 'DerpFest' && androidVersion === '16') {
      romVersion.note = 'The recovery.img located inside the ROM zip is highly recommended to use as recovery.';
    }
    
    // Add note for crDroid
    if (romName === 'crDroid') {
      romVersion.note = "We don't provide a direct download link for crDroid to support them. Please visit their website.";
    }

    rom.versions.push(romVersion);
  }

  // Sort versions so the newest Android version is first
  rom.versions.sort((a, b) => parseInt(b.androidVersion) - parseInt(a.androidVersion));
  processedRoms[rom.slug] = rom;
}

// Manually add/update crDroid
const crDroidSlug = 'crdroid';
processedRoms[crDroidSlug] = {
    slug: crDroidSlug,
  category: 'rom',
    name: 'crDroid',
    description: romDescriptions['crDroid'],
    maintainer: 'melo159',
    imageUrl: `/banners/${bannerFileNames['crDroid']}`,
    imageHint: imageHints[crDroidSlug],
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
