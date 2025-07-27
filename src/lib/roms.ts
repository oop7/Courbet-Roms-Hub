

import romData from './rom-data.json';

export interface PreviousRelease {
  version: string;
  date: string;
  downloadLink: string;
  rootMethod: 'KernelSU' | 'KernelSU Next';
  whatsNew: string[];
  status: 'Stable' | 'Beta';
}

export interface RomVersion {
  androidVersion: string;
  status: 'Stable' | 'Beta';
  downloadLink: string;
  whatsNew: string[];
  lastUpdated: string;
  rootMethod: 'KernelSU' | 'KernelSU Next';
  previousReleases?: PreviousRelease[];
  note?: string;
}

export interface Rom {
  slug: string;
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
  'EvolutionX': 'A flashable custom ROM to bring a true Pixel feel to your Android Device, with many additional configurations at your disposal.',
  'Infinity-X': 'Infinity-X offers a unique blend of features and customizations for a personalized Android experience.',
  'LineageOS': 'A free and open-source operating system for various devices, based on the Android mobile platform. Successor to CyanogenMod.',
  'PixelOS': 'Get the pure Pixel experience on your Courbet device. Smooth, stable, and packed with Google\'s best features.',
  'RisingOS': 'RisingOS is known for its extensive feature set and customization options, allowing you to tailor your device to your liking.',
  'The Pixel Project': 'Aims to replicate the Google Pixel software experience as closely as possible on other devices.',
  'VoltageOS': 'VoltageOS is a clean and simple ROM that focuses on providing a stable and reliable Android experience.',
  'crDroid': 'crDroid is designed to increase performance and reliability over stock Android for your device, also attempting to bring many of the best features existent today.',
};

const imageHints: Record<string, string> = {
    'alphadroid': 'abstract orange',
    'axionos': 'abstract purple',
    'evolution-x': 'evolution x logo',
    'infinity-x': 'abstract black',
    'lineageos': 'abstract green',
    'pixelos': 'abstract dark blue',
    'risingos': 'abstract red',
    'the-pixel-project': 'abstract yellow',
    'voltageos': 'abstract indigo',
    'crdroid': 'abstract orange geometric',
}

const bannerFileNames: Record<string, string> = {
  'AlphaDroid': 'alpha.png',
  'AxionOS': 'AXION.jpg',
  'EvolutionX': 'evolution_x.png',
  'Infinity-X': 'ProjectInfinityX.jpg',
  'LineageOS': 'Lineage.jpg',
  'PixelOS': 'pixelos.jpg',
  'RisingOS': 'RisingOS.jpg',
  'The Pixel Project': 'ThePixelProject.png',
  'VoltageOS': 'voltage.png',
  'crDroid': 'CrDroid.jpg',
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

romData.roms.forEach(rom => {
  if (rom.rom_type === 'RisingOS') {
    rom.date = getRisingOsDate(rom.file_name);
  }
});


// Group by rom_type
const romsByType = romData.roms.reduce((acc, rom) => {
  if (!acc[rom.rom_type]) {
    acc[rom.rom_type] = [];
  }
  acc[rom.rom_type].push(rom);
  return acc;
}, {} as Record<string, typeof romData.roms>);

const cutoffDate = new Date('2025-02-10');
const getRootMethod = (buildDate: string): 'KernelSU' | 'KernelSU Next' => {
  if (buildDate === 'Unknown' || buildDate === 'N/A') {
    return 'KernelSU Next'; // Default for unknown dates
  }
  return new Date(buildDate) < cutoffDate ? 'KernelSU' : 'KernelSU Next';
};


for (const romName in romsByType) {
  const allBuilds = romsByType[romName];
  const slug = romName.toLowerCase().replace(/\s/g, '-').replace('.', '');
  const bannerFileName = bannerFileNames[romName] || 'placeholder.png';
  
  const rom: Rom = {
    slug: slug,
    name: romName,
    description: romDescriptions[romName] || `A great custom ROM for your device.`,
    maintainer: 'melo159',
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
  }, {} as Record<string, typeof romData.roms>);


  for (const androidVersion in buildsByAndroidVersion) {
    const versionBuilds = buildsByAndroidVersion[androidVersion];
    
    // Sort oldest to newest to determine Beta/Stable status correctly
    versionBuilds.sort((a, b) => {
      if (a.date === 'Unknown' && b.date === 'Unknown') return 0;
      if (a.date === 'Unknown') return -1;
      if (b.date === 'Unknown') return 1;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    const buildsWithStatus = versionBuilds.map((build, index) => ({
      ...build,
      // For AxionOS Android 16, the first build is Beta. Otherwise, first is beta, rest stable.
      status: (romName === 'AxionOS' && build.android_version === '16' && build.version === '2.0') ? 'Beta' : (index === 0 ? 'Beta' : 'Stable')
    }));

    // Re-sort newest to oldest for display
    buildsWithStatus.sort((a, b) => {
      if (a.date === 'Unknown' && b.date === 'Unknown') return 0;
      if (a.date === 'Unknown') return 1;
      if (b.date === 'Unknown') return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    const latestBuild = buildsWithStatus[0];
    const previousBuilds = buildsWithStatus.slice(1);

    const getWhatsNew = (romName: string, build: any): string[] => {
      if (romName === 'AxionOS' && build.version === '2.0') {
          return ['Initial release of AxionOS v2.0'];
      }
      if (romName === 'EvolutionX' && build.date === '2025-07-09') {
        return [
          'July security patches',
          'Overall improvements',
          'Tons of rom features has been reintegrated'
        ];
      }
       if (romName === 'AlphaDroid' && build.date === '2025-06-08') {
        return [
          'June security patches',
          'Fixed vibrator intensity setting',
          'zram improvements'
        ];
      }
       if (romName === 'AxionOS' && build.date === '2025-06-08') {
        return [
          'June security patches',
          'Fixed vibration intensity setting',
          'Zram improvements',
          'For more info about rom changes see axion changelog repo'
        ];
      }
      if (romName === 'LineageOS' && build.date === '2025-06-07') {
        return ['June security patches'];
      }
      if (romName === 'Infinity-X') {
        return [`Initial release of Infinity-X v3.0`];
      }
      if (romName === 'VoltageOS') {
        return [`Initial release of ${romName} v5.0`];
      }
       if (romName === 'RisingOS' && build.date === '2025-06-14') {
        return [
          'June security patches',
          'Tons of sepolicy denials fixes',
          'For more detailed rom changelog, see RisingOS changelog repo'
        ];
      }
      if (romName === 'PixelOS' && build.date === '2025-05-08') {
          return ['June security patches'];
      }
       if (romName === 'The Pixel Project' && build.date === '2025-05-10') {
          return ['May security patches'];
      }
       if (romName === 'crDroid') {
          return [
              'crDroid version 11.7',
              'Please visit the official crDroid changelog for detailed updates.',
            ];
      }
      let versionString = `v${build.version}`;
      if (romName === 'EvolutionX') {
        if (build.android_version === '16') {
          versionString = 'v11.0';
        } else if (build.android_version === '15') {
          versionString = 'v10.x';
        }
      }
      return [
        `Initial release of ${romName} ${versionString}`,
        'General stability and performance improvements.',
        'Latest security patches included.',
      ];
    };
    
    const getPreviousWhatsNew = (romName: string, build: any): string[] => {
        if (romName === 'EvolutionX' && build.date === '2025-06-25') {
          return ['Initial release of Evolution-X v11.0'];
        }
        if (romName === 'RisingOS' && build.date === '2025-05-08') {
          return [
            'May security patches',
            'For more detailed rom changelog, see RisingOS changelog repo',
          ];
        }
        if (romName === 'RisingOS' && build.date === '2025-04-24') {
            return ['Synced with latest RisingOS sources alongside officially stable public release announcement'];
        }
        if (romName === 'RisingOS' && build.date === '2025-04-17') {
          return [
            'Partially fixed Lift to Wake (works but needs improvements)',
            'Migrate to QTI USB Gadget AIDL Hal',
            'Enable USB and skin temperature warnings',
            'Implemented DeviceAsWebcam service',
            'Audio improvements',
            'Support WiFi6',
            'Increased non-rapid charge current to 2A (2000mA)',
            'Some other minor fixes and improvements'
          ];
        }
        if (romName === 'AlphaDroid' && build.date === '2025-05-16') {
          return ['May security patches'];
        }
        if (romName === 'AlphaDroid' && build.date === '2025-04-27') {
            return [
              'Partially fixed Lift to Wake (works but needs improvements)',
              'Migrate to QTI USB Gadget AIDL Hal',
              'Enable USB and skin temperature warnings',
              'Implemented DeviceAsWebcam service',
              'Audio improvements',
              'Support WiFi6',
              'Increased non-rapid charge current to 2A (2000mA)',
              'Some other minor fixes and improvements'
            ];
          }
        if (romName === 'AxionOS' && build.date === '2025-05-08') {
            return [
                'May security patches',
                'For more info about changes see axion changelog repo'
            ];
        }
        if (romName === 'AxionOS' && build.date === '2025-04-19') {
            return ['Initial release of AxionOS v1.3'];
        }
        if (romName === 'LineageOS' && build.date === '2025-05-09') {
          return ['May security patches'];
        }
        if (romName === 'LineageOS' && build.date === '2025-04-12') {
          return [
            'April security patches',
            'Removed miuicamera due to qpr2 changes for the moment',
            'Migrate to QTI USB Gadget AIDL HAL',
            'Implemented DeviceAsWebcam service',
            'Audio improvements',
            'Support WiFi6',
            'Increased non-rapid charge current to 2A (2000mA)',
            'Some other minor fixes and improvements',
          ];
        }
        if (romName === 'PixelOS' && build.date === '2025-04-11') {
            return [
                'April security patches',
                'Partially fixed Lift to Wake (works but needs improvements)',
                'Migrate to QTI USB Gadget AIDL HAL',
                'Enable USB and skin temperature warnings',
                'Implemented DeviceAsWebcam service',
                'Audio improvements',
                'Support WiFi6',
                'Increased non-rapid charge current to 2A (2000mA)',
                'Some other minor fixes and improvements',
            ];
        }
        if (romName === 'The Pixel Project' && build.date === '2025-04-18') {
            return [
              'April security patches',
              'Partially fixed Lift to Wake (works but needs improvements)',
              'Migrate to QTI USB Gadget AIDL HAL',
              'Implemented DeviceAsWebcam service',
              'Audio improvements',
              'Support WiFi6',
              'Increased non-rapid charge current to 2A (2000mA)',
              'Some other minor fixes and improvements',
            ];
        }

        let versionString = `v${build.version}`;
        if (romName === 'EvolutionX') {
            if (build.android_version === '16') {
                versionString = 'v11.0';
            } else if (build.android_version === '15') {
                versionString = 'v10.x';
            }
        }
        return [
            `Update to version ${versionString}`,
            'Minor bugfixes and improvements.',
        ];
    };

    const romVersion: RomVersion = {
      androidVersion: androidVersion,
      status: latestBuild.status,
      downloadLink: latestBuild.download_url,
      whatsNew: getWhatsNew(romName, latestBuild),
      lastUpdated: latestBuild.date === 'Unknown' ? 'N/A' : latestBuild.date,
      rootMethod: getRootMethod(latestBuild.date),
      previousReleases: previousBuilds.map(pr => ({
        version: pr.version,
        date: pr.date === 'Unknown' ? 'N/A' : pr.date,
        downloadLink: pr.download_url,
        rootMethod: getRootMethod(pr.date),
        status: pr.status,
        whatsNew: getPreviousWhatsNew(romName, pr),
      })),
    };
    
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

// Manually add crDroid
const crDroidSlug = 'crdroid';
if (!processedRoms[crDroidSlug]) {
    processedRoms[crDroidSlug] = {
        slug: crDroidSlug,
        name: 'crDroid',
        description: romDescriptions['crDroid'],
        maintainer: 'crDroid Team',
        imageUrl: `/banners/${bannerFileNames['crDroid']}`,
        imageHint: imageHints[crDroidSlug],
        versions: [
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
                note: "We don't provide a direct link for crDroid to support them. Please visit their official website.",
            },
        ],
    };
}


// Sort final list to show Android 16 ROMs first, then alphabetically
export const roms: Rom[] = Object.values(processedRoms).sort((a, b) => {
  const aHas16 = a.versions.some(v => v.androidVersion === '16');
  const bHas16 = b.versions.some(v => v.androidVersion === '16');

  if (aHas16 && !bHas16) {
    return -1; // a comes first
  }
  if (!aHas16 && bHas16) {
    return 1; // b comes first
  }
  // If both have or don't have Android 16, sort by name
  return a.name.localeCompare(b.name);
});

export const getRomBySlug = (slug: string): Rom | undefined => {
  return roms.find(rom => rom.slug === slug);
}
