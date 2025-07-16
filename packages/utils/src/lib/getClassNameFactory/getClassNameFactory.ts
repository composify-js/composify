export const getClassNameFactory = (baseClass: string, styles: Record<string, string>) => (className?: string) => {
  if (!className) {
    return styles[baseClass];
  }

  return styles[`${baseClass}-${className}`];
};
