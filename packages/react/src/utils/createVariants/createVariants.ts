export const createVariants =
  (styles: Record<string, string>) =>
  (component: string, variations: { className?: string } & Record<string, unknown>) => {
    const classNames: (string | undefined)[] = [styles[component]];

    for (const variation in variations) {
      if (variation === 'className') {
        classNames.push(variations.className);
        continue;
      }

      const value = variations[variation];

      if (!value) {
        continue;
      }

      if (typeof value === 'boolean') {
        classNames.push(styles[`${component}--${variation}`]);
      } else {
        classNames.push(styles[`${component}--${variation}-${value}`]);
      }
    }

    console.log('classNames:', classNames);

    return classNames.filter(Boolean).join(' ');
  };
