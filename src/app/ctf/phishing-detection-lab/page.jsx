// app/ctf/phishing-detection-lab/page.js
import PhishingDetectionLab from '@/components/resources/PhishingDetectionLab';

export const metadata = {
  title: 'Phishing Email Detection Lab - Cybersecurity Challenge',
  description: 'Interactive phishing email detection training. Learn to identify phishing emails and protect yourself from cyber threats with 36 realistic scenarios.',
  keywords: ['phishing', 'cybersecurity', 'email security', 'cyber threats', 'security training'],
};

export default function PhishingDetectionLabPage() {
  return <PhishingDetectionLab />;
}