declare module '*.module.css';

declare module 'virtual:blog' {
  export const posts: {
    authors?: string | string[];
    date?: string;
    path: string;
    title: string;
    description: string;
  }[];
}
