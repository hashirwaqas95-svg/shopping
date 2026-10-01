import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';

export const SeoManager: React.FC = () => {
  const { currentPath, products, getProductBySlug } = useStore();

  useEffect(() => {
    let title = "VALIANT | Premium Men's Shirts & T-Shirts Pakistan";
    let description = "Shop luxury Oxford shirts, 280 GSM heavyweight oversized T-shirts, and pique polos. Free nationwide delivery on orders above PKR 3,000 with Cash on Delivery across Pakistan.";
    let jsonLd: Record<string, any> | null = null;

    if (currentPath === '/') {
      title = "VALIANT | Premium Men's Shirts & T-Shirts Pakistan";
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "ClothingStore",
        "name": "VALIANT Menswear Pakistan",
        "description": description,
        "currenciesAccepted": "PKR",
        "paymentAccepted": "Cash on Delivery, Bank Transfer, Raast, Credit Card",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Plot 18, Block G, Gulberg III",
          "addressLocality": "Lahore",
          "addressRegion": "Punjab",
          "postalCode": "54660",
          "addressCountry": "PK"
        }
      };
    } else if (currentPath.startsWith('/product/')) {
      const slug = currentPath.replace('/product/', '').split('?')[0];
      const product = getProductBySlug(slug);
      if (product) {
        title = `${product.name} | VALIANT Pakistan`;
        description = `${product.shortDescription} Price: PKR ${product.price.toLocaleString()}. Cash on Delivery available across Pakistan.`;
        jsonLd = {
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": product.name,
          "image": product.images,
          "description": product.description,
          "brand": {
            "@type": "Brand",
            "name": "VALIANT"
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "PKR",
            "price": product.price,
            "availability": product.totalStock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "seller": {
              "@type": "Organization",
              "name": "VALIANT Menswear"
            }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating,
            "reviewCount": product.reviewCount
          }
        };
      }
    } else if (currentPath === '/shirts') {
      title = "Men's Casual & Formal Shirts Pakistan | VALIANT";
      description = "Discover our collection of tailored Oxford cotton, European flax linen, and formal sateen shirts crafted for Pakistani gentlemen.";
    } else if (currentPath === '/t-shirts') {
      title = "Heavyweight 280 GSM Oversized T-Shirts Pakistan | VALIANT";
      description = "Shop luxury 280 GSM combed cotton oversized T-shirts. Engineered drop shoulder fit, durable ribbed collar, zero transparency.";
    } else if (currentPath === '/polos') {
      title = "Men's Pique & Knitted Polo T-Shirts | VALIANT Pakistan";
      description = "Explore double-mercerized fine pique cotton polos with structured stay-flat collars and mother-of-pearl buttons.";
    } else if (currentPath.startsWith('/order-confirmation')) {
      title = "Order Confirmed | VALIANT Menswear";
    } else if (currentPath === '/cart') {
      title = "Your Shopping Bag | VALIANT Menswear";
    } else if (currentPath === '/checkout') {
      title = "Secure Checkout | VALIANT Pakistan";
    } else if (currentPath === '/about') {
      title = "Our Story & Textile Craftsmanship | VALIANT";
    } else if (currentPath === '/contact') {
      title = "Contact Concierge & Flagship Studio | VALIANT";
    } else if (currentPath === '/faq') {
      title = "Customer FAQs & Nationwide Delivery | VALIANT";
    }

    document.title = title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update OpenGraph
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Inject JSON-LD Schema
    const existingScript = document.getElementById('valiant-schema-jsonld');
    if (existingScript) {
      existingScript.remove();
    }
    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'valiant-schema-jsonld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [currentPath, products, getProductBySlug]);

  return null;
};
