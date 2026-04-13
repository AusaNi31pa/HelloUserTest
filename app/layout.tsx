import "./globals.css";
import { Inclusive_Sans } from "next/font/google";
import LayoutWrapper from "../components/LayoutWrapper";

const inclusiveSans = Inclusive_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inclusiveSans.className}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}