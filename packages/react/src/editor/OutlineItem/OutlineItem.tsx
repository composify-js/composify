import { getClassNameFactory } from '@composify/utils';
import { FC, useCallback } from 'react';
import { Node } from '../../renderer';
import { useEditing } from '../EditingContext';
import styles from './OutlineItem.module.css';

const getClassName = getClassNameFactory('OutlineItem', styles);

type Props = {
  node: Node;
  depth: number;
};

export const OutlineItem: FC<Props> = ({ node, depth }) => {
  const { activeBlock, selectBlock } = useEditing();

  const handleClick = useCallback(() => {
    if (node.id) {
      selectBlock(node.id);
    }
  }, [node.id, selectBlock]);

  return (
    <>
      <li
        role="button"
        className={getClassName({ selected: node.id === activeBlock?.id })}
        style={{ paddingLeft: `${depth * 0.75}rem` }}
        onClick={handleClick}
      >
        {node.children.length > 0 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={10}
            height={10}
            viewBox="0 0 640 640"
            className={getClassName('Icon')}
          >
            <path d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={10}
            height={10}
            viewBox="0 0 640 640"
            className={getClassName('Icon')}
          >
            <path d="M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z" />
          </svg>
        )}
        {node.type}
      </li>
      <ol className={getClassName('Children')}>
        {node.children.map(child =>
          typeof child === 'string' ? null : <OutlineItem key={child.id} node={child} depth={depth + 1} />
        )}
      </ol>
    </>
  );
};
