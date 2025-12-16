import { Playground, SourceEditor, SourceProvider, SourceRenderer } from '@app/parcel-landing';
import { Body, HStack, Segment, VStack } from '@app/ui-system';
import { type FC, useState } from 'react';

type Props = {
  id: string;
  name: string;
  source: string;
};

export const Example: FC<Props> = ({ id, name, source }) => {
  const [preview, setPreview] = useState(true);

  return (
    <VStack id={id} className={['m-24', 'max-md:m-16', 'rounded-sm', 'border', 'bg-background', 'overflow-hidden']}>
      <HStack
        alignVertical="center"
        alignHorizontal="between"
        className={['p-16', 'border-b', 'bg-background-variant']}
      >
        <Body size="md" className={['font-medium', 'text-foreground']}>
          {name}
        </Body>
        <Segment
          size="md"
          options={[
            { label: 'Renderer', value: true },
            { label: 'Editor', value: false },
          ]}
          value={preview}
          onChange={setPreview}
        />
      </HStack>
      <SourceProvider source={source}>
        {preview ? (
          <SourceRenderer />
        ) : (
          <>
            <VStack className={['flex', 'max-lg:hidden']}>
              <SourceEditor />
            </VStack>
            <VStack className={['hidden', 'max-lg:flex']}>
              <Playground plain={true} />
            </VStack>
          </>
        )}
      </SourceProvider>
    </VStack>
  );
};
