export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Tredro",
            url: "https://tredro.online",
            logo: "https://tredro.online/logo.png",
            sameAs: [
              "https://www.facebook.com/tredro",
              "https://www.instagram.com/tredro",
            ],
          }),
        }}
      />
      {/* باقي محتوى الصفحة */}
    </>
  );
}
