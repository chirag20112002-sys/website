import SiteLayout from '@/components/SiteLayout'

export const metadata = { title: 'Privacy Policy' }

export default function PrivacyPolicyPage() {
  return (
    <SiteLayout>
      <div className="pt-32 pb-20 bg-white dark:bg-[#0a0f1e]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold font-display mb-4 text-slate-800 dark:text-white">Privacy Policy</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-10">Last updated: June 1, 2025</p>
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-600 dark:text-slate-400">
            {[
              { title: '1. Information We Collect', content: 'We collect information you provide directly to us, such as when you contact us through our website, subscribe to our newsletter, or request a quote. This may include your name, email address, phone number, company name, and project details. We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed.' },
              { title: '2. How We Use Your Information', content: 'We use the information we collect to: respond to your inquiries and provide our services; send you newsletters and marketing communications (with your consent); improve and optimize our website; analyze usage patterns and trends; comply with legal obligations; and protect against fraudulent or unauthorized activity.' },
              { title: '3. Information Sharing', content: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business (such as email service providers, hosting providers, and analytics tools), subject to confidentiality agreements.' },
              { title: '4. Cookies', content: 'Our website uses cookies to enhance your browsing experience. We use essential cookies (required for the site to function), analytics cookies (to understand how visitors use our site), and marketing cookies (to show you relevant content and ads). You can control cookie preferences through our cookie consent banner or your browser settings.' },
              { title: '5. Data Security', content: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.' },
              { title: '6. Your Rights', content: 'Depending on your location, you may have the right to: access the personal data we hold about you; correct inaccurate data; request deletion of your data; object to or restrict processing of your data; and data portability. To exercise these rights, please contact us at privacy@saralmis.in.' },
              { title: '7. Third-Party Links', content: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these sites. We encourage you to review the privacy policies of any third-party sites you visit.' },
              { title: '8. Children\'s Privacy', content: 'Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately.' },
              { title: '9. Changes to This Policy', content: 'We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page with an updated date and, where appropriate, sending you an email notification.' },
              { title: '10. Contact Us', content: 'If you have any questions about this Privacy Policy or our privacy practices, please contact us at: privacy@saralmis.in | SARAL MIS, New Delhi, India' },
            ].map(section => (
              <div key={section.title}>
                <h2 className="text-xl font-bold font-display text-slate-800 dark:text-white mb-3">{section.title}</h2>
                <p className="leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
