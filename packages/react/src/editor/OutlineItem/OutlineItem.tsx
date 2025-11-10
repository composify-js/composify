import type { Node } from '@composify/react/renderer';
import { ChevronDownIcon, MinusIcon } from 'lucide-react';
import { type FC, useCallback } from 'react';
import { useEditing } from '../EditingContext';
import styles from './OutlineItem.module.css';

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
        className={styles.container}
        data-selected={node.id === activeBlock?.id}
        style={{ paddingLeft: `${depth * 12}px` }}
        onClick={handleClick}
        onKeyDown={handleClick}
      >
        {node.children.length > 0 ? <ChevronDownIcon width={12} height={12} /> : <MinusIcon width={10} height={10} />}
        {node.type}
      </li>
      <ol className={styles.children}>
        {node.children.map((child) =>
          typeof child === 'string' ? null : <OutlineItem key={child.id} node={child} depth={depth + 1} />,
        )}
      </ol>
    </>
  );
};
