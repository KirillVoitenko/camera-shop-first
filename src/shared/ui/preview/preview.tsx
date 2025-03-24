import { Classed } from '@shared/model/style-types';
import { JSX, ComponentProps, PropsWithChildren } from 'react';

type SourceProps = Omit<ComponentProps<'source'>, 'type'>;
type ImageProps = ComponentProps<'img'>;

type PreviewProps = Classed<PropsWithChildren<{
  source: SourceProps;
  image: ImageProps;
}>>;

export function Preview({image, source, className, children}: PreviewProps): JSX.Element {
  return (
    <div className={className} data-testid='preview-container'>
      <picture>
        <source type='image/webp' {...source} />
        <img {...image} />
      </picture>
      {children}
    </div>
  );
}
