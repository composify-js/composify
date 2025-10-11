export const getClassNameFactory =
  (baseClass: string, styles: Record<string, string>) =>
  (
    modifiersOrClassName?: string | Record<string, boolean>,
    modifiers?: Record<string, boolean>,
  ) => {
    const subclassName =
      typeof modifiersOrClassName === 'string' ? modifiersOrClassName : undefined;
    const componentModifiers =
      typeof modifiersOrClassName === 'object' ? modifiersOrClassName : (modifiers ?? {});
    const componentName = subclassName ? `${baseClass}-${subclassName}` : baseClass;

    const classNames = [styles[componentName]];

    for (const modifier in componentModifiers) {
      if (componentModifiers[modifier]) {
        classNames.push(styles[`${componentName}--${modifier}`]);
      }
    }

    return classNames.filter(Boolean).join(' ');
  };
