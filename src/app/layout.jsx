import { Metadata } from "@/config/Metadata";
import { Outfit, Ovo} from "next/font/google";
import "./globals.css";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import AnalyticsWrapper from "@/components/analytics/AnalyticsWrapper";
import Providers  from "@/redux/Providers";

const outfit = Outfit({
  subsets: ["latin"], weight: ["400", "500", "600", "700"]
});

const ovo = Ovo({
  subsets: ["latin"], weight: ["400"]
});



export const metadata = Metadata;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.className} ${ovo.className} antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white`}  >
        <AnalyticsProvider/>
        <AnalyticsWrapper >
          <Providers>
            {children}
          </Providers>
        </AnalyticsWrapper>

      </body>
    </html>
  );
}
