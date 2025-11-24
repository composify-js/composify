import Image from 'next/image';
import { Navbar } from 'nextra-theme-docs';

export const TopNavigation = () => (
  <Navbar
    logo={<Image width={158} height={34.87} src="/brand/logo-light.svg" alt="Logo" loading="eager" priority={true} />}
    logoLink="/"
    projectLink="https://github.com/composify-js/composify"
  />
);
