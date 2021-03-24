import {Helmet} from 'react-helmet'
import defaultImage from '../assets/link-preview.png'

const metaDecorator = require('../metaDecorator.json')

interface MetaDecoratorProps {
  title: string
  description: string
  imageUrl?: string
  imageAlt?: string
}

export const MetaDecorator: React.FC<MetaDecoratorProps> = ({
  title,
  description,
  imageUrl = defaultImage,
  imageAlt = 'The image contains the logo of this website. A phone with a checkmark and the word designvote',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={metaDecorator.hostname + imageUrl} />
      <meta
        property="og:url"
        content={
          metaDecorator.hostname +
          window.location.pathname +
          window.location.search
        }
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:alt" content={imageAlt} />
      <meta name="twitter:site" content={metaDecorator.twitterUsername} />
    </Helmet>
  )
}
