import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  noIndex?: boolean;
  structuredData?: object;
}

const defaultMeta = {
  title: 'Expert Mental Health Counseling & Therapy Services | ThriveMT',
  description: 'Find compassionate and effective online and in-person therapy services for anxiety, stress, and well-being. Start your personalized journey to mental wellness today with ThriveMT.',
  keywords: 'online therapy, mental health counseling, anxiety treatment, stress management, wellness coaching, licensed therapists, mental health services, CBT therapy, telehealth therapy, mental wellness',
  ogImage: 'https://thrive-mental.com/og-image-v4.png',
  siteUrl: 'https://thrive-mental.com',
};

const SEOHead = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  noIndex = false,
  structuredData,
}: SEOHeadProps) => {
  const pageTitle = title 
    ? `${title} | ThriveMT` 
    : defaultMeta.title;
  const pageDescription = description || defaultMeta.description;
  const pageKeywords = keywords || defaultMeta.keywords;
  const pageImage = ogImage || defaultMeta.ogImage;
  const pageUrl = canonicalUrl || defaultMeta.siteUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:site_name" content="ThriveMT" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
