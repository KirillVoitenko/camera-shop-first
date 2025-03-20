import { Classed } from '@shared/model/style-types';
import { JSX, ComponentProps } from 'react';

type SourceProps = Omit<ComponentProps<'source'>, 'type'>;
type ImageProps = ComponentProps<'img'>;

type PreviewProps = Classed<{
  source: SourceProps;
  image: ImageProps;
}>;

export function Preview({image, source, className}: PreviewProps): JSX.Element {
  return (
    <div className={className} data-testid='preview-container'>
      <picture>
        <source type='image/webp' {...source} />
        <img {...image} />
      </picture>
    </div>
  );
}
