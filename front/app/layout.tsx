import ReduxProvider from "@/components/modalblock/redux-provider"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../styles/globals.sass"
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Cheese",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ReduxProvider>
					{children}
					<Toaster position="top-right" reverseOrder={false} />
				</ReduxProvider>
			</body>
		</html>
	)
}
