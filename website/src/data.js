import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  showRssFeed: false,
  links: [
    {
      text: 'Features',
      href: '/#features',
    },
    {
      text: 'How it works',
      href: '/#how-it-works',
    },
    {
      text: 'Benefits',
      href: '/#benefits',
    },
    {
      text: 'FAQ',
      href: '/#faq',
    },
    {
      text: 'Docs',
      href: '/docs',
    },
  ],
  actions: [
    { type: 'button', text: 'Preorder', 
    href: '#',
    // href: 'https://scrshot.lemonsqueezy.com/checkout/buy/19711312-9868-4e9d-8401-e1012bdfc7b6' 
  }
  ],
};
  
export const footerData = {
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  footNote: `
    All rights reserved. <br /> <br />
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 float-left rounded-sm bg-[url(https://onwidget.com/favicon/favicon-32x32.png)]"></span>
    Template made by <a class="text-blue-600 hover:underline dark:text-gray-200" href="https://onwidget.com/"> onWidget</a> · Illustrations by <a class="text-blue-600 hover:underline dark:text-gray-200" href="https://popsy.co/">popsy.co</a>
  `,
};
