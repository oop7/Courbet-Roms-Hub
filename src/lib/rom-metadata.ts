export interface RomMetadata {
  id: string;
  description: string;
  banner: string;
  imageHint: string;
  maintainer?: string;
  isActive?: boolean;
}

export const romMetadata: Record<string, RomMetadata> = {
  AlphaDroid: { id: 'alphadroid', description: 'A lightweight and performance-focused ROM, aiming to provide a smooth experience with essential customizations.', banner: 'alpha.webp', imageHint: 'abstract orange' },
  AxionOS: { id: 'axionos', description: 'AxionOS focuses on minimalism and stability, delivering a clean AOSP experience with useful additions.', banner: 'AXION.webp', imageHint: 'abstract purple' },
  'ColorOS-Ace3': { id: 'coloros-ace3', description: 'A ColorOS-based Android 15 port for courbet focused on daily usability and bundled privacy features.', banner: 'ColorOS_15.webp', imageHint: 'coloros abstract green', maintainer: 'Aciss' },
  'ColorOS 15 Lite': { id: 'coloros-15-lite', description: 'A lightweight ColorOS-based port for courbet focused on daily usability and core hardware support.', banner: 'colorOS_lite.webp', imageHint: 'coloros abstract teal' },
  CincauOS: { id: 'cincauos', description: 'A CincauOS Android 15 port for courbet - HYPEROS CN 2.0.6.0 ', banner: 'CincauOS.webp', imageHint: 'abstract amber', maintainer: 'Aciss' },
  'HyperOS 3 port': { id: 'hyperos-3-port', description: 'A HyperOS 3 Android 15 port for courbet based on Xiaomi.eu with modded theme and launcher tweaks.', banner: 'hyperos_3.webp', imageHint: 'abstract cyan', maintainer: 'Aciss' },
  DerpFest: { id: 'derpfest', description: 'DerpFest delivers a feature-rich Android experience with performance and customization focused updates.', banner: 'DerpFest.webp', imageHint: 'abstract teal purple', maintainer: 'omer' },
  EvolutionX: { id: 'evolutionx', description: 'A flashable custom ROM to bring a true Pixel feel to your Android Device, with many additional configurations at your disposal.', banner: 'evolution_x.webp', imageHint: 'evolution x logo' },
  'HyperOS 2.0.16.0 CN': { id: 'hyperos-2-0-16-0-cn', description: 'A HyperOS 2 CN port for courbet with bug fixes and non-rooted stock boot image.', banner: 'HyperOS_2.0.webp', imageHint: 'abstract pattern' },
  'HyperOS 3.0.1.0 EU': { id: 'hyperos-3-0-1-0-eu', description: 'A debloated HyperOS 3 EU port for courbet with core features and UI experience preserved.', banner: 'HyperOS_3.0.1.0 EU.webp', imageHint: 'abstract pattern' },
  'Infinity-X': { id: 'infinity-x', description: 'Infinity-X offers a unique blend of features and customizations for a personalized Android experience.', banner: 'ProjectInfinityX.webp', imageHint: 'abstract black' },
  'Project Infinity X (Aciss)': { id: 'project-infinity-x-aciss', description: 'Project Infinity X offers a clean and feature-rich Android experience with Aciss maintaining this courbet build.', banner: 'InfinityX.webp', imageHint: 'abstract black', maintainer: 'Aciss' },
  LineageOS: { id: 'lineageos', description: 'A free and open-source operating system for various devices, based on the Android mobile platform. Successor to CyanogenMod.', banner: 'Lineage.webp', imageHint: 'abstract green' },
  'LineageOS (Omer)': { id: 'lineageos-omer', description: 'A free and open-source operating system for various devices, based on the Android mobile platform. Successor to CyanogenMod. Unofficial build by omer.', banner: 'Lineage_omer.webp', imageHint: 'abstract green', maintainer: 'omer', isActive: true },
  'OxygenOS-Rev 2': { id: 'oxygenos-rev-2', description: 'An OxygenOS-based Android 15 port for courbet with prebuilt camera support and bundled utilities.', banner: 'oxygenOS_15.webp', imageHint: 'oxygen abstract red', maintainer: 'Aciss' },
  PixelOS: { id: 'pixelos', description: 'Get the pure Pixel experience on your Courbet device. Smooth, stable, and packed with Google\'s best features.', banner: 'pixelos.webp', imageHint: 'abstract dark blue' },
  'PixelOS (Aciss)': { id: 'pixelos-aciss', description: 'Get the pure Pixel experience on your Courbet device with Aciss maintaining this build.', banner: 'pixelos_Aciss.webp', imageHint: 'abstract dark blue', maintainer: 'Aciss' },
  RisingOS: { id: 'risingos', description: 'RisingOS is known for its extensive feature set and customization options, allowing you to tailor your device to your liking.', banner: 'RisingOS.webp', imageHint: 'abstract red' },
  'RisingOS Revived': { id: 'risingos-revived', description: 'RisingOS Revived continues the legacy of RisingOS with a focus on stability and a refined user experience.', banner: 'RisingOS_Revived.webp', imageHint: 'abstract red' },
  'The Pixel Project': { id: 'the-pixel-project', description: 'Aims to replicate the Google Pixel software experience as closely as possible on other devices.', banner: 'ThePixelProject.webp', imageHint: 'abstract yellow' },
  VoltageOS: { id: 'voltageos', description: 'VoltageOS is a clean and simple ROM that focuses on providing a stable and reliable Android experience.', banner: 'voltage.webp', imageHint: 'abstract indigo' },
  crDroid: { id: 'crdroid', description: 'crDroid is designed to increase performance and reliability over stock Android for your device, also attempting to bring many of the best features existent today.', banner: 'CrDroid.webp', imageHint: 'abstract orange geometric' },
};
