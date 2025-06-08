// data/phishingChallenges.js - Comprehensive phishing email database

export const phishingChallenges = [
  // ==================== ORIGINAL 8 CHALLENGES ====================
  {
    id: 1,
    difficulty: 'easy',
    category: 'financial',
    from: "security@paypal.com",
    to: "user@example.com",
    subject: "Urgent: Verify Your PayPal Account",
    body: `Dear PayPal User,
    
We have detected suspicious activity on your account. Your account will be suspended within 24 hours unless you verify your information immediately.

Click here to verify your account: https://paypal-verification.secure-update.com/verify

If you do not verify within 24 hours, your account will be permanently suspended.

Thank you,
PayPal Security Team`,
    isPhishing: true,
    hint: "Look carefully at the sender's email and the verification link. Real PayPal emails come from @paypal.com, not suspicious domains.",
    redFlags: [
      "Suspicious domain in the verification link (not paypal.com)",
      "Creates urgency with 24-hour deadline",
      "Threatens account suspension",
      "Generic greeting 'Dear PayPal User' instead of your name",
      "Poor grammar and threatening tone"
    ]
  },
  {
    id: 2,
    difficulty: 'easy',
    category: 'entertainment',
    from: "noreply@netflix.com",
    to: "user@example.com",
    subject: "Your Netflix bill for December 2024",
    body: `Hello,

Your Netflix subscription has been renewed for another month.

Subscription: Netflix Standard
Amount: $15.49
Next billing date: January 15, 2025

You can manage your subscription and billing details in your account settings.

If you have any questions, visit our Help Center.

Best regards,
The Netflix Team`,
    isPhishing: false,
    hint: "This email appears to be from the legitimate Netflix domain and contains standard billing information without suspicious links.",
    redFlags: []
  },
  {
    id: 3,
    difficulty: 'medium',
    category: 'ecommerce',
    from: "security@amazon.com",
    to: "user@example.com",
    subject: "Amazon Account Alert - Immediate Action Required",
    body: `Dear Valued Customer,

We have detected unauthorized access attempts on your Amazon account from the following location:
- IP Address: 192.168.1.100
- Location: Unknown
- Time: Today, 3:47 AM

To secure your account, please click the link below and update your password immediately:
http://amazon-security-update.net/login

Failure to update your password within 2 hours will result in account suspension.

Amazon Security Team
Account Protection Division`,
    isPhishing: true,
    hint: "Check the domain in the security link - it's not amazon.com! Also notice the urgent 2-hour deadline.",
    redFlags: [
      "Suspicious domain 'amazon-security-update.net' instead of amazon.com",
      "Creates false urgency with 2-hour deadline",
      "Uses fear tactics about unauthorized access",
      "Generic greeting instead of your actual name",
      "Threatening account suspension"
    ]
  },
  {
    id: 4,
    difficulty: 'easy',
    category: 'workplace',
    from: "admin@yourcompany.com",
    to: "employee@yourcompany.com",
    subject: "IT Security Training Completion Required",
    body: `Hi Team,

This is a reminder that all employees must complete the mandatory cybersecurity training by Friday, December 15th.

The training covers:
- Password security best practices
- Phishing email identification
- Safe browsing habits
- Data protection policies

You can access the training portal through our company intranet at the usual location.

Please complete this training by the deadline to maintain compliance with our security policies.

Thanks,
IT Security Team`,
    isPhishing: false,
    hint: "This appears to be an internal company email about legitimate security training. No suspicious links or urgent threats.",
    redFlags: []
  },
  {
    id: 5,
    difficulty: 'medium',
    category: 'technology',
    from: "no-reply@microsoft-security-team.org",
    to: "user@example.com",
    subject: "Microsoft Security Alert: Sign-in from New Device",
    body: `Microsoft Account Security

Someone just used your Microsoft account to sign in from a new device.

Device: Windows PC
Location: Russia
Date: December 10, 2024, 2:30 AM

If this was you, you can safely ignore this email.

If this wasn't you, your account may be compromised. Secure your account now:
https://microsoft-account-security.org/secure-now

This link will expire in 1 hour for your security.

Microsoft Account Team`,
    isPhishing: true,
    hint: "The sender domain 'microsoft-security-team.org' is not Microsoft's official domain. Microsoft uses @microsoft.com.",
    redFlags: [
      "Fake domain 'microsoft-security-team.org' instead of microsoft.com",
      "Suspicious sign-in location (Russia)",
      "Creates urgency with 1-hour expiration",
      "Uses fear tactics about account compromise",
      "Suspicious security link domain"
    ]
  },
  {
    id: 6,
    difficulty: 'easy',
    category: 'development',
    from: "support@github.com",
    to: "developer@example.com",
    subject: "GitHub Security Advisory: Dependency Vulnerability",
    body: `Hello,

We've identified a security vulnerability in one of your repository dependencies.

Repository: your-project-name
Vulnerability: High severity issue in package 'example-lib'
CVSS Score: 8.1

We recommend updating to the latest version of the affected package. You can view detailed information about this vulnerability in your repository's Security tab.

To review and fix this vulnerability:
1. Go to your repository on GitHub
2. Click the Security tab
3. Review the vulnerability details
4. Update the affected dependency

GitHub Security Team`,
    isPhishing: false,
    hint: "This is a legitimate GitHub security advisory. It comes from the official domain and doesn't ask for credentials or contain suspicious links.",
    redFlags: []
  },
  {
    id: 7,
    difficulty: 'medium',
    category: 'technology',
    from: "customer-service@apple-support.info",
    to: "user@example.com",
    subject: "Your Apple ID has been locked - Verify Now",
    body: `Dear Apple Customer,

Your Apple ID has been temporarily locked due to security concerns.

Account: user@example.com
Reason: Multiple failed login attempts detected
Location: Unknown IP address

To unlock your Apple ID and restore access to your account, please verify your identity immediately:

https://appleid-unlock-verification.info/verify

You have 3 hours to complete verification before your account is permanently disabled.

Apple ID Support Team
Customer Security Division`,
    isPhishing: true,
    hint: "Apple emails come from @apple.com, not @apple-support.info. Also, the verification link doesn't go to apple.com.",
    redFlags: [
      "Fake sender domain 'apple-support.info' instead of apple.com",
      "Suspicious verification link domain",
      "Creates urgency with 3-hour deadline",
      "Threatens permanent account disabling",
      "Uses fear tactics about security concerns"
    ]
  },
  {
    id: 8,
    difficulty: 'easy',
    category: 'entertainment',
    from: "billing@spotify.com",
    to: "user@example.com",
    subject: "Payment Method Update Confirmation",
    body: `Hi there,

We wanted to confirm that you've successfully updated your payment method for your Spotify Premium subscription.

New payment method: •••• •••• •••• 4567 (Visa)
Effective date: December 10, 2024
Next billing date: January 10, 2025

If you didn't make this change, please contact our support team through your Spotify account settings.

Keep enjoying your music!

The Spotify Team`,
    isPhishing: false,
    hint: "This appears to be a legitimate confirmation email from Spotify. It comes from the official domain and contains typical account update information.",
    redFlags: []
  },

  // ==================== 28 NEW CHALLENGING SCENARIOS ====================

  // Advanced Financial Phishing
  {
    id: 9,
    difficulty: 'hard',
    category: 'financial',
    from: "alerts@chase.com",
    to: "customer@example.com",
    subject: "Fraud Alert: Unusual Activity Detected",
    body: `Dear Chase Customer,

We've detected unusual activity on your Chase Sapphire Preferred card ending in 4829.

Transaction Details:
- Amount: $2,847.50
- Merchant: AMAZON MARKETPLACE WA
- Date: Dec 10, 2024 11:47 PM EST
- Location: Seattle, WA

If you recognize this transaction, no action is needed.

If this wasn't you, please secure your account immediately:
https://chase.com/fraud-protection/verify-transaction?ref=FA2024121001

Text STOP to 75309 to stop alerts.

Chase Fraud Protection Team`,
    isPhishing: false,
    hint: "This appears legitimate - correct Chase domain, realistic transaction details, proper opt-out instructions, and doesn't ask for sensitive information.",
    redFlags: []
  },
  {
    id: 10,
    difficulty: 'hard',
    category: 'financial',
    from: "security@wellsfargo.com",
    to: "customer@example.com",
    subject: "Wells Fargo: Your Account Access Has Been Restricted",
    body: `Important Security Notice

Your Wells Fargo Online Banking access has been temporarily restricted due to multiple failed login attempts from an unrecognized device.

Device Information:
- Device: iPhone 14 Pro
- Location: Lagos, Nigeria
- Time: 2:15 AM EST

To restore access and secure your account:
1. Verify your identity using our secure verification system
2. Update your security questions
3. Review recent account activity

Begin verification process: https://wellsfargo-security.net/account-recovery

This restriction will become permanent in 12 hours if not addressed.

Wells Fargo Digital Security`,
    isPhishing: true,
    hint: "Look at the verification link domain - it's 'wellsfargo-security.net' not 'wellsfargo.com'. Real Wells Fargo would never use a different domain.",
    redFlags: [
      "Fake domain 'wellsfargo-security.net' instead of wellsfargo.com",
      "Suspicious location (Lagos, Nigeria)",
      "Creates urgency with 12-hour deadline",
      "Threatens permanent restriction",
      "Requests verification through external link"
    ]
  },
  {
    id: 11,
    difficulty: 'hard',
    category: 'cryptocurrency',
    from: "support@coinbase.com",
    to: "trader@example.com",
    subject: "Action Required: Verify Your Identity for Tax Reporting",
    body: `Important Tax Compliance Update

Due to new IRS regulations, all Coinbase users must verify their identity by December 31st to continue trading.

Your account status: Verification Required
Trading limit: $0 until verified
Affected assets: All cryptocurrencies

Required documents:
- Government-issued photo ID
- Proof of address (utility bill or bank statement)
- Social Security Number verification

Complete verification now: https://coinbase.com/verify-identity-2024-tax-compliance

Failure to verify by the deadline will result in account suspension and potential tax reporting issues.

Coinbase Compliance Team`,
    isPhishing: false,
    hint: "This is from the legitimate Coinbase domain and addresses real compliance requirements. The link goes to coinbase.com and the request is reasonable for a crypto exchange.",
    redFlags: []
  },
  {
    id: 12,
    difficulty: 'hard',
    category: 'cryptocurrency',
    from: "security@binance.org",
    to: "trader@example.com",
    subject: "Binance Security Alert: Withdraw Suspended",
    body: `URGENT SECURITY NOTICE

Your Binance account has been flagged for suspicious withdrawal patterns.

Flagged Activity:
- Attempted withdrawal: 2.5 BTC ($67,500)
- Destination: External wallet
- Risk Level: HIGH

Your account has been temporarily locked to prevent potential loss of funds.

To unlock your account and authorize legitimate withdrawals:
https://binance-security-verification.org/unlock-account

Please complete verification within 6 hours or withdrawals will be permanently disabled.

Binance Security Team
Risk Management Division`,
    isPhishing: true,
    hint: "Binance uses binance.com, not binance.org. The security link also uses a suspicious domain.",
    redFlags: [
      "Wrong domain 'binance.org' instead of binance.com",
      "Suspicious verification link domain",
      "Creates urgency with 6-hour deadline",
      "Threatens permanent disabling",
      "Uses fear tactics about fund loss"
    ]
  },

  // Sophisticated Social Engineering
  {
    id: 13,
    difficulty: 'hard',
    category: 'social',
    from: "hr@microsoft.com",
    to: "employee@company.com",
    subject: "Microsoft 365 License Audit - Action Required",
    body: `Dear IT Administrator,

As part of our annual license compliance audit, we've identified discrepancies in your organization's Microsoft 365 usage that require immediate attention.

Organization: Your Company Name
License Type: Microsoft 365 Business Premium
Detected Issues: 47 unlicensed users
Compliance Status: Non-compliant

To avoid service interruption and potential legal action:
1. Review the attached compliance report
2. Purchase additional licenses for unlicensed users
3. Submit compliance confirmation

Download compliance report and purchase licenses:
https://microsoft.com/licensing/compliance-audit-2024

This must be resolved within 48 hours to avoid automatic service suspension.

Microsoft Licensing Compliance Team`,
    isPhishing: false,
    hint: "This is from the legitimate Microsoft domain and addresses real licensing compliance. However, legitimate Microsoft wouldn't threaten immediate suspension without prior warnings.",
    redFlags: []
  },
  {
    id: 14,
    difficulty: 'hard',
    category: 'social',
    from: "legal@adobe.com",
    to: "admin@company.com",
    subject: "Adobe Copyright Infringement Notice - Legal Action Pending",
    body: `LEGAL NOTICE - COPYRIGHT INFRINGEMENT

Our monitoring systems have detected unauthorized use of Adobe software products within your organization.

Detected Violations:
- Adobe Photoshop CC 2024 (15 unlicensed copies)
- Adobe Illustrator CC 2024 (8 unlicensed copies)
- Adobe Premiere Pro CC 2024 (5 unlicensed copies)

Total Estimated Damages: $47,500

To avoid legal proceedings, you must:
1. Cease all unauthorized use immediately
2. Purchase legitimate licenses for all detected software
3. Pay the settlement amount within 72 hours

Resolve this matter immediately:
https://adobe-legal-settlement.com/case-2024-CR-8847

Failure to respond will result in federal copyright infringement charges.

Adobe Legal Department
Anti-Piracy Division`,
    isPhishing: true,
    hint: "The settlement link goes to 'adobe-legal-settlement.com' instead of adobe.com. Adobe wouldn't handle legal matters through external domains.",
    redFlags: [
      "Suspicious domain 'adobe-legal-settlement.com' instead of adobe.com",
      "Aggressive legal threats",
      "Demands immediate payment",
      "Creates fear with federal charges threat",
      "72-hour urgent deadline"
    ]
  },

  // Advanced Government/Tax Scams
  {
    id: 15,
    difficulty: 'hard',
    category: 'government',
    from: "noreply@irs.gov",
    to: "taxpayer@example.com",
    subject: "IRS Tax Refund Update - Additional Information Required",
    body: `Internal Revenue Service
Tax Year 2023 Refund Processing Update

Dear Taxpayer,

We are processing your 2023 tax return and refund claim (Ref: TAX-2023-RF-847291).

Current Status: Under Review
Refund Amount: $3,247.50
Expected Processing Time: 3-5 business days

To expedite processing, please verify the following information:
- Social Security Number
- Filing Status
- Direct Deposit Information

Verify information and track refund status:
https://irs.gov/refund-verification-portal-2024

This verification is required under new identity protection measures implemented for tax year 2023.

Internal Revenue Service
Refund Processing Division`,
    isPhishing: false,
    hint: "This is from the legitimate irs.gov domain and the link goes to irs.gov. The IRS does send refund processing emails, though they're rare.",
    redFlags: []
  },
  {
    id: 16,
    difficulty: 'hard',
    category: 'government',
    from: "notice@ssi.gov",
    to: "beneficiary@example.com",
    subject: "Social Security Administration: Benefit Suspension Notice",
    body: `OFFICIAL NOTICE - SOCIAL SECURITY ADMINISTRATION

Your Social Security benefits will be suspended effective December 31, 2024.

Reason: Failure to complete mandatory annual verification
SSN: XXX-XX-6789
Monthly Benefit: $1,847.00

To prevent suspension and continue receiving benefits:
1. Complete identity verification
2. Confirm current address and banking information
3. Submit required documentation

Complete verification immediately:
https://ssa-benefit-verification.gov/annual-review

You have 5 days to complete this process or benefits will be permanently discontinued.

Social Security Administration
Benefit Verification Department`,
    isPhishing: true,
    hint: "The SSA uses ssa.gov, not ssi.gov. Also, the verification link uses 'ssa-benefit-verification.gov' which is not the official domain.",
    redFlags: [
      "Wrong domain 'ssi.gov' instead of ssa.gov",
      "Suspicious verification link domain",
      "Threatens benefit suspension",
      "Creates urgency with 5-day deadline",
      "Requests sensitive information"
    ]
  },

  // Healthcare/Medical Scams
  {
    id: 17,
    difficulty: 'hard',
    category: 'healthcare',
    from: "benefits@bluecross.com",
    to: "member@example.com",
    subject: "Blue Cross Blue Shield: Coverage Verification Required",
    body: `Member Services Notice

Your Blue Cross Blue Shield health insurance coverage requires immediate verification to prevent lapse in benefits.

Member ID: BC847291035
Policy Status: Verification Required
Coverage End Date: December 31, 2024

Required Actions:
- Verify current employment status
- Confirm dependent information
- Update payment method

Complete verification to maintain coverage:
https://bluecross.com/member-verification-2024

Failure to verify within 7 days will result in coverage termination and loss of all benefits.

Blue Cross Blue Shield
Member Services Department`,
    isPhishing: false,
    hint: "This appears to be from the legitimate Blue Cross domain and contains typical insurance verification requests.",
    redFlags: []
  },
  {
    id: 18,
    difficulty: 'hard',
    category: 'healthcare',
    from: "alerts@medicare.gov",
    to: "beneficiary@example.com",
    subject: "Medicare Card Security Breach - Immediate Action Required",
    body: `URGENT MEDICARE SECURITY ALERT

Your Medicare card information may have been compromised in a recent data breach affecting 2.3 million beneficiaries.

Your Medicare Number: 1EG4-TE5-MK73
Risk Level: HIGH
Potential Impact: Identity theft, fraudulent claims

Immediate actions required:
1. Verify your identity
2. Request new Medicare card
3. Monitor for fraudulent activity

Secure your Medicare benefits now:
https://medicare-security-update.gov/data-breach-response

This is time-sensitive - act within 24 hours to prevent potential fraud.

Medicare Security Office
Fraud Prevention Division`,
    isPhishing: true,
    hint: "The link goes to 'medicare-security-update.gov' instead of medicare.gov. Government agencies don't use separate domains for security issues.",
    redFlags: [
      "Suspicious domain 'medicare-security-update.gov' instead of medicare.gov",
      "Creates fear with data breach claims",
      "Urgent 24-hour deadline",
      "Requests identity verification",
      "Threatens fraud consequences"
    ]
  },

  // Educational Institution Scams
  {
    id: 19,
    difficulty: 'hard',
    category: 'education',
    from: "registrar@harvard.edu",
    to: "student@university.edu",
    subject: "Harvard University: Graduate Application Status Update",
    body: `Harvard Graduate School of Arts and Sciences

Dear Prospective Student,

Congratulations! Your application for the Ph.D. program in Computer Science has been pre-approved for the Fall 2025 semester.

Application ID: HU-2025-CS-8472
Program: Computer Science Ph.D.
Status: Conditionally Accepted
Full Funding: Available

To complete your admission:
1. Pay enrollment deposit ($500)
2. Submit final transcripts
3. Complete visa documentation (if international)

Complete enrollment process:
https://harvard.edu/graduate-admissions/complete-enrollment

This offer expires in 10 days. Secure your spot now!

Harvard Graduate School Admissions
Office of Graduate Education`,
    isPhishing: false,
    hint: "This is from the legitimate harvard.edu domain and contains typical admission information. The link also goes to harvard.edu.",
    redFlags: []
  },
  {
    id: 20,
    difficulty: 'hard',
    category: 'education',
    from: "aid@federal-student-aid.gov",
    to: "student@example.com",
    subject: "Federal Student Aid: Loan Forgiveness Approval",
    body: `U.S. DEPARTMENT OF EDUCATION
Federal Student Aid Office

IMPORTANT: Your student loan forgiveness application has been APPROVED!

Borrower ID: FSA-2024-LF-847291
Total Loan Balance: $67,500.00
Forgiveness Amount: $67,500.00 (100%)
Program: Public Service Loan Forgiveness

To complete the forgiveness process:
1. Verify your identity and employment
2. Confirm loan servicer information
3. Sign electronic discharge documents

Complete loan forgiveness immediately:
https://federal-student-aid-forgiveness.gov/complete-discharge

This approval expires in 15 days. Don't miss this opportunity!

Federal Student Aid
Loan Forgiveness Department`,
    isPhishing: true,
    hint: "The link goes to 'federal-student-aid-forgiveness.gov' instead of studentaid.gov (the real FSA website). Government agencies use their official domains.",
    redFlags: [
      "Wrong domain 'federal-student-aid.gov' instead of studentaid.gov",
      "Suspicious forgiveness link domain",
      "Too good to be true (100% forgiveness)",
      "Creates urgency with 15-day expiration",
      "Requests identity verification through external link"
    ]
  },

  // Advanced Tech Support Scams
  {
    id: 21,
    difficulty: 'hard',
    category: 'technology',
    from: "security@google.com",
    to: "user@example.com",
    subject: "Google Security: Suspicious Account Activity Detected",
    body: `Google Account Security Alert

We've detected suspicious activity on your Google account from an unrecognized device.

Account: user@example.com
Suspicious Activity: Attempted access to Google Drive files
Device: Unknown Android device
Location: Romania
Time: December 10, 2024, 4:23 AM EST

Recent activity on your account:
- 47 files accessed in Google Drive
- Gmail settings modified
- 2-factor authentication disabled

If this wasn't you, secure your account immediately:
https://accounts.google.com/security-checkup

We've temporarily restricted access to your account to protect your data.

Google Account Security Team`,
    isPhishing: false,
    hint: "This is from the legitimate google.com domain and the security link goes to accounts.google.com, which is correct for Google security features.",
    redFlags: []
  },
  {
    id: 22,
    difficulty: 'hard',
    category: 'technology',
    from: "support@zoom.us",
    to: "admin@company.com",
    subject: "Zoom: Account Security Vulnerability Detected",
    body: `Zoom Security Notification

We've identified a critical security vulnerability affecting your Zoom Pro account that requires immediate attention.

Account: admin@company.com
Plan: Zoom Pro (50 licenses)
Vulnerability: CVE-2024-8847 (Critical)
Risk Level: Immediate action required

This vulnerability could allow unauthorized access to:
- Meeting recordings
- Chat history
- Contact information

Apply security patch immediately:
https://zoom-security-patch.us/apply-fix-CVE-2024-8847

Your account will be suspended in 6 hours if this vulnerability is not addressed.

Zoom Security Response Team
Critical Vulnerability Division`,
    isPhishing: true,
    hint: "The patch link goes to 'zoom-security-patch.us' instead of zoom.us. Zoom wouldn't use a separate domain for security patches.",
    redFlags: [
      "Suspicious domain 'zoom-security-patch.us' instead of zoom.us",
      "Creates urgency with 6-hour suspension threat",
      "Uses technical terms to appear legitimate (CVE number)",
      "Requests immediate action through external link",
      "Threatens account suspension"
    ]
  },

  // Investment/Trading Scams
  {
    id: 23,
    difficulty: 'hard',
    category: 'financial',
    from: "alerts@fidelity.com",
    to: "investor@example.com",
    subject: "Fidelity: Market Alert - Portfolio Rebalancing Recommended",
    body: `Fidelity Market Intelligence Alert

Based on current market conditions and your investment profile, we recommend immediate portfolio rebalancing.

Your Portfolio Performance:
- Current Value: $247,500
- YTD Return: -12.3%
- Risk Assessment: High volatility exposure

Recommended Actions:
- Reduce equity exposure by 30%
- Increase bond allocation
- Consider defensive sector ETFs

Our AI-powered analysis suggests these changes could improve returns by 8-15%.

Access personalized recommendations:
https://fidelity.com/portfolio-rebalancing/recommendations

Time-sensitive: Market conditions may change rapidly.

Fidelity Investment Advisory
Portfolio Management Team`,
    isPhishing: false,
    hint: "This is from the legitimate fidelity.com domain and contains typical investment advisory content. The link goes to fidelity.com.",
    redFlags: []
  },
  {
    id: 24,
    difficulty: 'hard',
    category: 'financial',
    from: "opportunities@schwab.com",
    to: "investor@example.com",
    subject: "Charles Schwab: Exclusive Pre-IPO Investment Opportunity",
    body: `EXCLUSIVE INVESTMENT OPPORTUNITY

You've been selected for early access to a high-return pre-IPO investment opportunity.

Company: TechStart AI Solutions
Industry: Artificial Intelligence
Expected IPO Date: Q2 2025
Minimum Investment: $25,000
Projected Returns: 400-600%

This exclusive opportunity is available to select high-net-worth clients only.

Investment Details:
- Pre-IPO share price: $12.50
- Expected IPO price: $75-100
- Limited time: 48 hours only

Secure your allocation immediately:
https://schwab-exclusive-investments.com/pre-ipo-techstart

Only 50 investment slots available. Don't miss this opportunity!

Charles Schwab Private Client Services
Exclusive Opportunities Division`,
    isPhishing: true,
    hint: "The investment link goes to 'schwab-exclusive-investments.com' instead of schwab.com. Real brokers don't use separate domains for investments.",
    redFlags: [
      "Suspicious domain 'schwab-exclusive-investments.com' instead of schwab.com",
      "Too good to be true returns (400-600%)",
      "Creates urgency with 48-hour deadline",
      "Claims exclusivity to create FOMO",
      "Requests large investment through external link"
    ]
  },

  // Advanced Workplace Phishing
  {
    id: 25,
    difficulty: 'hard',
    category: 'workplace',
    from: "ceo@yourcompany.com",
    to: "finance@yourcompany.com",
    subject: "Urgent: Confidential Wire Transfer Required",
    body: `CONFIDENTIAL - HIGH PRIORITY

I need you to process an urgent wire transfer for a confidential acquisition we're finalizing.

Details:
- Amount: $150,000
- Recipient: Meridian Capital Solutions
- Account: 847291035
- Routing: 021000021
- Purpose: Acquisition due diligence payment

This is extremely time-sensitive as we need to close by end of business today. Please process immediately and confirm once completed.

Do not discuss this with anyone else as the acquisition is confidential until announced.

I'm in back-to-back meetings but will check email for confirmation.

Best regards,
John Smith
Chief Executive Officer`,
    isPhishing: true,
    hint: "This is a classic CEO fraud/business email compromise. Check if the email actually came from your CEO and verify through a separate communication channel.",
    redFlags: [
      "Requests urgent financial transaction",
      "Claims confidentiality to prevent verification",
      "Creates time pressure (end of business)",
      "Discourages communication with others",
      "May be from spoofed or compromised email"
    ]
  },
  {
    id: 26,
    difficulty: 'hard',
    category: 'workplace',
    from: "it-security@yourcompany.com",
    to: "all-staff@yourcompany.com",
    subject: "Mandatory: Office 365 Password Reset - Security Incident",
    body: `IT SECURITY NOTICE - IMMEDIATE ACTION REQUIRED

We've detected unauthorized access attempts targeting our Office 365 environment. As a precautionary measure, all employees must reset their passwords immediately.

Security Incident Details:
- Incident ID: SEC-2024-1210-CRIT
- Affected Systems: Office 365, SharePoint, Teams
- Risk Level: Critical
- Status: Active monitoring

Required Actions (Must complete within 2 hours):
1. Change your Office 365 password
2. Enable two-factor authentication
3. Review recent email activity

Complete password reset now:
https://office365-security-reset.yourcompany.com/password-reset

Failure to complete within 2 hours will result in automatic account lockout.

IT Security Team
Incident Response Division`,
    isPhishing: true,
    hint: "The password reset link uses a suspicious subdomain. Legitimate IT departments would use internal systems or official Microsoft links, not custom subdomains.",
    redFlags: [
      "Suspicious subdomain 'office365-security-reset.yourcompany.com'",
      "Creates urgency with 2-hour deadline",
      "Threatens account lockout",
      "Requests password reset through external link",
      "Uses fear tactics about security incident"
    ]
  },

  // Sophisticated Banking Phishing
  {
    id: 27,
    difficulty: 'hard',
    category: 'financial',
    from: "fraud@bankofamerica.com",
    to: "customer@example.com",
    subject: "Bank of America: Fraud Protection Alert",
    body: `Fraud Protection Alert

We've temporarily blocked a suspicious transaction on your Bank of America account for your protection.

Blocked Transaction:
- Amount: $3,250.00
- Merchant: Apple Store Online
- Date: December 10, 2024
- Time: 11:47 PM EST
- Card: ****1847

If you authorized this transaction, please confirm it's legitimate.
If you didn't make this purchase, your card may be compromised.

Confirm or report as fraud:
https://bankofamerica.com/fraud-center/transaction-review

For your security, your card will remain blocked until you respond.

Bank of America Fraud Protection
Available 24/7: 1-800-432-1000`,
    isPhishing: false,
    hint: "This appears legitimate - correct Bank of America domain, realistic transaction details, proper phone number, and doesn't ask for sensitive information.",
    redFlags: []
  },
  {
    id: 28,
    difficulty: 'hard',
    category: 'financial',
    from: "security@usbank.com",
    to: "customer@example.com",
    subject: "U.S. Bank: Account Verification Required - Regulation Update",
    body: `Important Account Notice

Due to new federal banking regulations, all U.S. Bank customers must verify their account information by December 31, 2024.

Regulation: Federal Banking Act Amendment 2024-B
Compliance Deadline: December 31, 2024
Account Status: Verification Required

Required Verification:
- Social Security Number confirmation
- Address verification
- Income documentation upload

Non-compliance will result in:
- Account restrictions
- Limited transaction capabilities
- Potential account closure

Complete verification process:
https://usbank-compliance-portal.net/verify-2024

This is mandatory under federal law. Avoid account restrictions by verifying now.

U.S. Bank Compliance Department
Regulatory Affairs Division`,
    isPhishing: true,
    hint: "The verification link goes to 'usbank-compliance-portal.net' instead of usbank.com. Banks wouldn't use separate domains for compliance.",
    redFlags: [
      "Suspicious domain 'usbank-compliance-portal.net' instead of usbank.com",
      "Creates fear with federal law claims",
      "Requests sensitive information (SSN, income)",
      "Threatens account closure",
      "Uses official-sounding but fake regulation names"
    ]
  },

  // Advanced E-commerce Scams
  {
    id: 29,
    difficulty: 'hard',
    category: 'ecommerce',
    from: "orders@amazon.com",
    to: "customer@example.com",
    subject: "Amazon Order Confirmation - High-Value Purchase",
    body: `Order Confirmation

Thank you for your Amazon order!

Order #: 114-8472910-3847291
Order Date: December 10, 2024
Total: $2,847.50

Items Ordered:
1. MacBook Pro 16" M3 Max (Space Black) - $2,499.00
2. AppleCare+ Protection Plan - $348.50

Shipping Address:
John Smith
123 Unknown Street
Unknown City, NY 10001

Delivery Estimate: December 12, 2024

If you didn't place this order, please contact us immediately:
https://amazon.com/your-account/order-issues

Track your package: https://amazon.com/progress-tracker/114-8472910-3847291

Thank you for shopping with Amazon!`,
    isPhishing: false,
    hint: "This appears to be a legitimate Amazon order confirmation with proper formatting, realistic details, and links to amazon.com.",
    redFlags: []
  },
  {
    id: 30,
    difficulty: 'hard',
    category: 'ecommerce',
    from: "support@ebay.com",
    to: "seller@example.com",
    subject: "eBay Seller Alert: Payment Hold Resolution Required",
    body: `eBay Seller Center Notice

Your recent sale payment is being held pending additional verification.

Transaction Details:
- Item: iPhone 15 Pro Max 512GB
- Sale Price: $1,247.50
- Buyer: tech_enthusiast_2024
- Transaction ID: 8472910384729

Payment Hold Reason: New seller protection policy
Hold Amount: $1,247.50
Expected Release: After verification

To release your payment:
1. Verify seller identity
2. Confirm item authenticity
3. Provide tracking information

Release payment immediately:
https://ebay-seller-verification.net/release-payment

Funds will be returned to buyer if not verified within 48 hours.

eBay Seller Protection Team`,
    isPhishing: true,
    hint: "The verification link goes to 'ebay-seller-verification.net' instead of ebay.com. eBay wouldn't use external domains for payment releases.",
    redFlags: [
      "Suspicious domain 'ebay-seller-verification.net' instead of ebay.com",
      "Creates urgency with 48-hour deadline",
      "Threatens fund return to buyer",
      "Requests verification through external link",
      "Uses fear tactics about payment holds"
    ]
  },

  // Advanced Subscription/Service Scams
  {
    id: 31,
    difficulty: 'hard',
    category: 'subscription',
    from: "billing@adobe.com",
    to: "user@example.com",
    subject: "Adobe Creative Cloud: Subscription Renewal Failed",
    body: `Adobe Creative Cloud Billing Notice

Your Creative Cloud subscription renewal has failed due to an issue with your payment method.

Subscription: Creative Cloud All Apps
Plan: Annual (Paid Monthly)
Amount: $52.99/month
Status: Payment Failed
Retry Date: December 12, 2024

To avoid service interruption:
1. Update your payment method
2. Verify billing information
3. Retry payment

Your Creative Cloud apps will stop working in 3 days if payment is not resolved.

Update payment method:
https://adobe.com/account/billing/update-payment

Continue creating with Adobe Creative Cloud!

Adobe Creative Cloud Team`,
    isPhishing: false,
    hint: "This is from the legitimate adobe.com domain with realistic subscription details and proper Adobe branding.",
    redFlags: []
  },
  {
    id: 32,
    difficulty: 'hard',
    category: 'subscription',
    from: "support@disney-plus.com",
    to: "subscriber@example.com",
    subject: "Disney+ Account Suspended - Unusual Activity Detected",
    body: `Disney+ Security Alert

Your Disney+ account has been temporarily suspended due to unusual streaming activity.

Account: subscriber@example.com
Suspension Reason: Multiple simultaneous streams detected
Detected Locations: 
- New York, USA
- London, UK
- Tokyo, Japan

This activity violates our terms of service and suggests account compromise.

To reactivate your account:
1. Verify your identity
2. Change your password
3. Confirm authorized devices

Reactivate account immediately:
https://disneyplus-account-recovery.com/verify-activity

Your account will be permanently banned if not verified within 24 hours.

Disney+ Account Security Team`,
    isPhishing: true,
    hint: "Disney+ uses disneyplus.com, not disney-plus.com. Also, the recovery link uses a suspicious external domain.",
    redFlags: [
      "Wrong sender domain 'disney-plus.com' instead of disneyplus.com",
      "Suspicious recovery domain 'disneyplus-account-recovery.com'",
      "Threatens permanent ban",
      "Creates urgency with 24-hour deadline",
      "Uses fear tactics about account compromise"
    ]
  },

  // Advanced Job/Career Scams
  {
    id: 33,
    difficulty: 'hard',
    category: 'employment',
    from: "careers@google.com",
    to: "candidate@example.com",
    subject: "Google: Software Engineer Position - Final Interview Invitation",
    body: `Google Careers

Congratulations! You've been selected for the final interview round for the Software Engineer position at Google.

Position: Software Engineer, L4
Team: Search Infrastructure
Location: Mountain View, CA
Salary Range: $180,000 - $250,000

Interview Details:
- Date: December 15, 2024
- Time: 2:00 PM PST
- Format: Virtual (Google Meet)
- Duration: 2 hours

Please confirm your availability and complete the pre-interview assessment:
https://google.com/careers/interview-portal/software-engineer-l4

This is a unique opportunity to join one of the world's most innovative companies.

We look forward to meeting you!

Google Talent Acquisition Team`,
    isPhishing: false,
    hint: "This appears legitimate with the correct google.com domain, realistic job details, and professional tone typical of Google recruiting.",
    redFlags: []
  },
  {
    id: 34,
    difficulty: 'hard',
    category: 'employment',
    from: "hr@apple.com",
    to: "applicant@example.com",
    subject: "Apple Inc: Remote Work Opportunity - $85/hour",
    body: `Apple Inc. - Career Opportunity

You've been selected for a high-paying remote work opportunity with Apple Inc.

Position: Remote Data Entry Specialist
Pay Rate: $85.00 per hour
Schedule: Flexible, work from home
Requirements: Basic computer skills
Start Date: Immediate

This position involves:
- Processing customer data
- Quality assurance tasks
- Administrative support

To begin your employment:
1. Complete employment verification
2. Provide banking information for direct deposit
3. Purchase required software license ($199)

The software cost will be reimbursed with your first paycheck.

Start earning immediately:
https://apple-remote-employment.com/start-working

Limited positions available - apply now!

Apple Human Resources
Remote Employment Division`,
    isPhishing: true,
    hint: "The employment link goes to 'apple-remote-employment.com' instead of apple.com. Real Apple jobs wouldn't require purchasing software upfront.",
    redFlags: [
      "Suspicious domain 'apple-remote-employment.com' instead of apple.com",
      "Unrealistic pay rate ($85/hour for data entry)",
      "Requests upfront payment for software",
      "Too good to be true opportunity",
      "Promises immediate employment without proper vetting"
    ]
  },

  // Advanced Utility/Service Provider Scams
  {
    id: 35,
    difficulty: 'hard',
    category: 'utilities',
    from: "billing@pge.com",
    to: "customer@example.com",
    subject: "PG&E: Final Notice - Service Disconnection Scheduled",
    body: `FINAL NOTICE - SERVICE DISCONNECTION

Your Pacific Gas & Electric service is scheduled for disconnection due to past due balance.

Account Number: 847291035
Service Address: 123 Main Street, San Francisco, CA
Past Due Amount: $847.29
Disconnection Date: December 12, 2024 (2 days)

To avoid service interruption:
- Pay past due amount immediately
- Contact us to arrange payment plan

Pay online to prevent disconnection:
https://pge.com/pay-bill-avoid-disconnection

Customer Service: 1-800-743-5000
Available 24/7 for payment arrangements

PG&E Customer Service
Billing Department`,
    isPhishing: false,
    hint: "This appears to be from the legitimate pge.com domain with realistic utility billing information and proper customer service contact.",
    redFlags: []
  },
  {
    id: 36,
    difficulty: 'hard',
    category: 'utilities',
    from: "collections@comcast.com",
    to: "customer@example.com",
    subject: "Xfinity: Internet Service Suspension - Immediate Payment Required",
    body: `URGENT NOTICE - SERVICE SUSPENSION

Your Xfinity internet service will be suspended today due to non-payment.

Account: 847291035847
Service: Xfinity Internet (200 Mbps)
Past Due: $247.89
Suspension Time: 6:00 PM today

Avoid suspension - pay immediately:
- Credit/Debit Card: Instant restoration
- Bank Transfer: Same day processing

Your service will be suspended in 6 hours. Pay now to avoid interruption:
https://xfinity-emergency-billing.net/urgent-payment

Late fees and reconnection charges will apply after suspension.

Call 1-855-OK-BEGUN for immediate assistance.

Xfinity Collections Department
Retention Services`,
    isPhishing: true,
    hint: "The payment link goes to 'xfinity-emergency-billing.net' instead of xfinity.com or comcast.com. Also, the phone number looks suspicious.",
    redFlags: [
      "Suspicious domain 'xfinity-emergency-billing.net' instead of xfinity.com",
      "Creates extreme urgency (6 hours)",
      "Suspicious phone number format",
      "Threatens immediate service suspension",
      "Requests immediate payment through external link"
    ]
  }
];

// ==================== CHALLENGE SELECTION SYSTEM ====================

/**
 * Randomly selects 8 challenges from the pool
 * @param {string} difficulty - 'easy', 'medium', 'hard', or 'mixed'
 * @returns {Array} Array of 8 randomly selected challenges
 */
export const getRandomChallenges = (difficulty = 'mixed') => {
  let availableChallenges = [...phishingChallenges];
  
  // Filter by difficulty if specified
  if (difficulty !== 'mixed') {
    availableChallenges = phishingChallenges.filter(challenge => 
      challenge.difficulty === difficulty
    );
  }
  
  // Ensure we have enough challenges
  if (availableChallenges.length < 8) {
    console.warn(`Not enough ${difficulty} challenges available. Falling back to mixed selection.`);
    availableChallenges = [...phishingChallenges];
  }
  
  // Shuffle and select 8 challenges
  const shuffled = availableChallenges.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 8);
};

/**
 * Gets challenges by category
 * @param {string} category - Category to filter by
 * @param {number} count - Number of challenges to return
 * @returns {Array} Array of challenges from specified category
 */
export const getChallengesByCategory = (category, count = 8) => {
  const categoryFiltered = phishingChallenges.filter(challenge => 
    challenge.category === category
  );
  
  const shuffled = categoryFiltered.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

/**
 * Gets a balanced mix of challenges
 * @returns {Array} Array of 8 challenges with balanced difficulty and categories
 */
export const getBalancedChallenges = () => {
  const easy = phishingChallenges.filter(c => c.difficulty === 'easy');
  const medium = phishingChallenges.filter(c => c.difficulty === 'medium');
  const hard = phishingChallenges.filter(c => c.difficulty === 'hard');
  
  // Get 2-3 from each difficulty level
  const selectedEasy = easy.sort(() => 0.5 - Math.random()).slice(0, 2);
  const selectedMedium = medium.sort(() => 0.5 - Math.random()).slice(0, 3);
  const selectedHard = hard.sort(() => 0.5 - Math.random()).slice(0, 3);
  
  // Combine and shuffle
  const combined = [...selectedEasy, ...selectedMedium, ...selectedHard];
  return combined.sort(() => 0.5 - Math.random());
};

// ==================== CHALLENGE STATISTICS ====================

export const getChallengeStats = () => {
  const stats = {
    total: phishingChallenges.length,
    byDifficulty: {},
    byCategory: {},
    phishingCount: 0,
    legitimateCount: 0
  };
  
  phishingChallenges.forEach(challenge => {
    // Difficulty stats
    stats.byDifficulty[challenge.difficulty] = 
      (stats.byDifficulty[challenge.difficulty] || 0) + 1;
    
    // Category stats
    stats.byCategory[challenge.category] = 
      (stats.byCategory[challenge.category] || 0) + 1;
    
    // Phishing vs legitimate
    if (challenge.isPhishing) {
      stats.phishingCount++;
    } else {
      stats.legitimateCount++;
    }
  });
  
  return stats;
};