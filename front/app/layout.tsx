import ReduxProvider from "@/components/modalblock/redux-provider"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.sass";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cheese",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
		<ReduxProvider>
			<>
				{children}
			</>	
		</ReduxProvider>
      </body>
    </html>
  );
}
