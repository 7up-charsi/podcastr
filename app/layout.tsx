import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ConvexClerkProvider, PlayerProvider } from '@/providers';
import { Bounce, ToastContainer } from 'react-toastify';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Podcastr',
  description: 'Generate your podcasts using AI',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-background text-foreground`}
      >
        <ConvexClerkProvider>
          <PlayerProvider>{children}</PlayerProvider>
        </ConvexClerkProvider>

        <ToastContainer
          position="bottom-right"
          autoClose={2999}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
