import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { InitialLoader } from '../components/InitialLoader';
import { ThemeProvider } from '../components/ThemeProvider';
import './globals.css';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BeadBloom — Every Bead Tells a Story',
  description:
    'Handcrafted bead jewelry — necklaces, bracelets, earrings & phone charms. Every piece, a story waiting to be worn.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fcf7fa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0812' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var t = localStorage.getItem('beadbloom-theme');
                  var theme = t || 'light';
                  if (theme === 'dark') document.documentElement.classList.add('dark');
                } catch(e){}
              })();
            `,
          }}
        />
      </head>
      <body className={`${sans.variable} ${display.variable} font-sans antialiased`}>
        <InitialLoader />
        <ThemeProvider>{children}</ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var MIN_MS = 1400;
                var start = Date.now();
                function hide(){
                  var el = document.getElementById('initial-loader');
                  if (!el) return;
                  var elapsed = Date.now() - start;
                  var wait = Math.max(0, MIN_MS - elapsed);
                  setTimeout(function(){
                    el.classList.add('is-hidden');
                    setTimeout(function(){ if (el && el.parentNode) el.parentNode.removeChild(el); }, 750);
                  }, wait);
                }
                if (document.readyState === 'complete') hide();
                else window.addEventListener('load', hide);
                setTimeout(hide, 6000);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}