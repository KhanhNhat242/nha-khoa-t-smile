import { siteConfig } from '@/lib/site-config'

/**
 * JSON-LD @type "Dentist" (KT-11). Escape "<" theo node_modules/next/dist/docs/01-app/02-guides/json-ld.md.
 * KHÔNG đưa openingHours, priceRange, aggregateRating khi chưa có dữ liệu thật.
 */
export default function DentistJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    description: siteConfig.description,
    telephone: siteConfig.phone.e164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.maps.latitude,
      longitude: siteConfig.maps.longitude,
    },
    hasMap: siteConfig.maps.directionsHref,
    sameAs: [siteConfig.facebook.href],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  )
}
