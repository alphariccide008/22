export type LegalDoc = {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: { h: string; p: string[] }[];
};

const company =
  "SabioCast (\"SabioCast\", \"we\", \"us\"), Jules Bilmeyerstraat 32, 2600 Berchem, Belgium";

export const legalDocs: LegalDoc[] = [
  {
    slug: "terms",
    title: "Terms of Use",
    updated: "2026-01-01",
    intro: `These Terms of Use govern your access to and use of the SabioCast website, platform and services operated by ${company}.`,
    sections: [
      {
        h: "1. Acceptance of terms",
        p: [
          "By accessing or using the SabioCast platform you agree to be bound by these Terms of Use and by our Privacy Policy. If you are entering into these terms on behalf of an organisation, you represent that you have authority to bind that organisation.",
        ],
      },
      {
        h: "2. Accounts and trials",
        p: [
          "A trial account is valid for 7 days by default and is intended to evaluate the SaaS platform. You must use a business email address and represent a company or organisation. You are responsible for all activity that occurs under your account and for keeping your credentials secure.",
        ],
      },
      {
        h: "3. Plans, resources and overuse",
        p: [
          "Each plan includes a defined allocation of data traffic, processing hours and, where applicable, AI hours. Resources expire at the end of the plan period and unused data traffic is not refunded.",
          "If you exceed your allocation, overuse is invoiced at the end of the plan period. As a general rule we do not stop a live stream because of overuse.",
        ],
      },
      {
        h: "4. Acceptable use",
        p: [
          "You may not use SabioCast to stream unlawful content, infringe intellectual property rights, transmit malware, or attempt to disrupt or reverse engineer the service. We may suspend accounts that breach this section.",
        ],
      },
      {
        h: "5. Content ownership",
        p: [
          "You retain all rights in the video, audio and other content you stream through SabioCast. You grant us the limited rights necessary to process, transcode, caption, translate, deliver and record that content in order to provide the service.",
        ],
      },
      {
        h: "6. Availability and support",
        p: [
          "We aim for high availability and monitor the platform 24/7, but we do not guarantee uninterrupted service unless a specific service level is agreed in writing as part of Premium Support.",
        ],
      },
      {
        h: "7. Liability",
        p: [
          "To the maximum extent permitted by law, SabioCast is not liable for indirect or consequential loss. Our total liability in connection with the service is limited to the fees paid by you in the twelve months preceding the claim.",
        ],
      },
      {
        h: "8. Changes",
        p: [
          "We may update these terms from time to time. Material changes will be notified by email or via the platform. Continued use after changes take effect constitutes acceptance.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    updated: "2026-01-01",
    intro: `This Privacy Policy explains how ${company} collects, uses and protects personal data when you use our website and platform.`,
    sections: [
      {
        h: "1. Data we collect",
        p: [
          "Account and contact data you provide (name, business email, company, country). Usage data about how the platform and player are used. Technical data such as IP address, browser and device information. Viewer analytics data in aggregated or pseudonymised form.",
        ],
      },
      {
        h: "2. How we use data",
        p: [
          "To provide and improve the service, process transcoding, captioning and translation, deliver streams, produce analytics, handle support requests, send service communications and, where you have opted in, product news.",
        ],
      },
      {
        h: "3. Legal bases",
        p: [
          "We process personal data on the basis of contract performance, our legitimate interests in operating and securing the service, your consent (for marketing and optional cookies), and compliance with legal obligations.",
        ],
      },
      {
        h: "4. Storage and security",
        p: [
          "All data is stored in ISO 27001-compliant data centres within the European Union. Hardware and software are monitored 24/7 and encryption is used for data in transit and at rest. We do not sell personal data or share it with third parties for their own marketing.",
        ],
      },
      {
        h: "5. Retention",
        p: [
          "We retain personal data for as long as your account is active and for the period required to meet legal, accounting and reporting obligations. Cloud recordings are retained according to your plan and settings.",
        ],
      },
      {
        h: "6. Your rights",
        p: [
          "Under the GDPR you have the right to access, rectify, erase, restrict and port your personal data, and to object to certain processing. To exercise these rights, contact privacy@sabiocast.com. You may also lodge a complaint with your local supervisory authority.",
        ],
      },
      {
        h: "7. Cookies",
        p: [
          "We use strictly necessary cookies to run the site and, with your consent, analytics cookies to understand usage. You can manage your preferences at any time via the cookie settings.",
        ],
      },
    ],
  },
  {
    slug: "dpa",
    title: "Data Processing Agreement",
    updated: "2026-01-01",
    intro: `This Data Processing Agreement (DPA) forms part of the agreement between the customer (the "Controller") and ${company} (the "Processor") and applies where SabioCast processes personal data on the customer's behalf.`,
    sections: [
      {
        h: "1. Subject matter and duration",
        p: [
          "The Processor processes personal data only for the purpose of providing the multilingual live streaming services, for the duration of the main agreement and any wind-down period.",
        ],
      },
      {
        h: "2. Nature and purpose of processing",
        p: [
          "Processing includes ingestion, transcoding, AI and human captioning and translation, delivery via CDN, recording, and provision of analytics. Categories of data subjects include the Controller's viewers, presenters, interpreters and staff.",
        ],
      },
      {
        h: "3. Processor obligations",
        p: [
          "The Processor processes personal data only on documented instructions from the Controller, ensures persons authorised to process data are bound by confidentiality, and implements appropriate technical and organisational measures.",
        ],
      },
      {
        h: "4. Sub-processors",
        p: [
          "The Controller authorises the use of sub-processors (including CDN and AI service providers) listed in our sub-processor register. We notify Controllers of intended changes and give an opportunity to object.",
        ],
      },
      {
        h: "5. International transfers",
        p: [
          "Personal data is stored within the EU. Where a sub-processor processes data outside the EEA, transfers are covered by an adequacy decision or Standard Contractual Clauses.",
        ],
      },
      {
        h: "6. Assistance and audits",
        p: [
          "The Processor assists the Controller with data subject requests, data protection impact assessments and breach notification, and makes available information necessary to demonstrate compliance.",
        ],
      },
      {
        h: "7. Return and deletion",
        p: [
          "On termination the Processor deletes or returns all personal data, unless retention is required by law.",
        ],
      },
    ],
  },
  {
    slug: "gdpr",
    title: "GDPR Compliance",
    updated: "2026-01-01",
    intro: `${company} is committed to full compliance with the EU General Data Protection Regulation (GDPR). This page summarises the measures we take.`,
    sections: [
      {
        h: "EU data residency",
        p: [
          "All customer and viewer data is stored in separate ISO 27001-compliant data centres located within the European Union.",
        ],
      },
      {
        h: "Security measures",
        p: [
          "24/7 monitoring of hardware and software with automated threat alerts. Encryption of data in transit and at rest. Role-based access control and least-privilege principles for staff.",
        ],
      },
      {
        h: "Data minimisation",
        p: [
          "We collect only the data required to operate the service. Viewer analytics are aggregated or pseudonymised wherever possible.",
        ],
      },
      {
        h: "Data subject rights",
        p: [
          "We support access, rectification, erasure, restriction, portability and objection requests. Contact privacy@sabiocast.com to make a request.",
        ],
      },
      {
        h: "Sub-processors and transfers",
        p: [
          "Our sub-processor register is available on request. Any processing outside the EEA is covered by an adequacy decision or Standard Contractual Clauses.",
        ],
      },
      {
        h: "Breach notification",
        p: [
          "In the event of a personal data breach we notify affected customers without undue delay and, where required, the relevant supervisory authority within 72 hours.",
        ],
      },
    ],
  },
];

export const legalBySlug = (slug: string) => legalDocs.find((d) => d.slug === slug);
