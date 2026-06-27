import SiteLayout from '@/components/SiteLayout'

export const metadata = { title: 'Terms & Conditions' }

export default function TermsPage() {
  return (
    <SiteLayout>
      <div className="pt-32 pb-20 bg-white dark:bg-[#0a0f1e]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold font-display mb-4 text-slate-800 dark:text-white">Terms & Conditions</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-10">Last updated: June 1, 2025</p>
          <div className="space-y-8 text-slate-600 dark:text-slate-400">
            {[
              { title: '1. Acceptance of Terms', content: 'By accessing and using the SARAL MIS website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.' },
              { title: '2. Services', content: 'SARAL MIS provides web development, Shopify development, UI/UX design, and related digital services. The specific scope, timeline, and deliverables for each project are detailed in separate project agreements or statements of work.' },
              { title: '3. Payment Terms', content: 'Payment terms are outlined in individual project agreements. Generally, we require a deposit before commencing work, with subsequent payments tied to project milestones. All payments are non-refundable unless otherwise specified in the project agreement. We accept bank transfers, credit cards, and PayPal.' },
              { title: '4. Intellectual Property', content: 'Upon receipt of full payment, the client receives full ownership of all custom-developed work, including design files and source code. SARAL MIS retains the right to display the project in its portfolio unless otherwise agreed in writing. Third-party assets, plugins, and themes are subject to their respective licenses.' },
              { title: '5. Client Responsibilities', content: 'Clients are responsible for: providing timely feedback and approvals; supplying necessary content, assets, and information; ensuring they have the right to use any content they provide; maintaining current backups of their existing website before we begin work; and complying with all applicable laws regarding their website and business.' },
              { title: '6. Revisions and Changes', content: 'Project agreements specify the number of revision rounds included. Additional revisions or changes outside the agreed scope will be quoted and billed separately. Significant scope changes may require a revised project agreement.' },
              { title: '7. Warranties and Disclaimers', content: 'SARAL MIS warrants that services will be performed in a professional manner consistent with industry standards. We do not warrant that the website will be error-free or that it will meet specific performance metrics unless explicitly agreed in the project agreement. We are not liable for issues arising from third-party services, hosting providers, or external platforms.' },
              { title: '8. Limitation of Liability', content: 'SARAL MIS\'s liability in connection with any project or service is limited to the total amount paid by the client for that specific project. We are not liable for any indirect, incidental, special, or consequential damages, including loss of revenue or data.' },
              { title: '9. Confidentiality', content: 'Both parties agree to keep confidential any proprietary or sensitive information shared during the course of a project. This includes business strategies, unreleased products, and financial information. This obligation survives the termination of any project agreement.' },
              { title: '10. Termination', content: 'Either party may terminate a project with 14 days written notice. Upon termination, the client will pay for all work completed to date. SARAL MIS will provide all completed work product upon receipt of final payment.' },
              { title: '11. Governing Law', content: 'These terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms or our services shall be resolved through good-faith negotiation, and if necessary, binding arbitration.' },
              { title: '12. Contact', content: 'For questions about these Terms & Conditions, contact us at legal@suprimohub.in or write to: SARAL MIS, New Delhi, India.' },
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
