import { compoundComponents } from '../../utils';
import { SegmentFrame } from './SegmentFrame';
import { SegmentItem } from './SegmentItem';

export const Segment = compoundComponents(SegmentFrame, {
  Item: SegmentItem,
});
