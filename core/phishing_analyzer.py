"""Phishing Link Analysis Module for Security Guardian.

This module provides functionality to analyze URLs for potential phishing indicators.
"""

import re
from urllib.parse import urlparse
from typing import Dict, List


class PhishingAnalyzer:
    """Analyzes URLs for phishing indicators."""
    
    def __init__(self):
        """Initialize the PhishingAnalyzer."""
        self.suspicious_tlds = ['.tk', '.ml', '.ga', '.cf', '.gq']
        self.trusted_domains = ['google.com', 'microsoft.com', 'apple.com', 'amazon.com']
        
        # Common typosquatting patterns for popular domains
        self.typosquat_patterns = {
            'google': ['g00gle', 'gooogle', 'googgle', 'gogle'],
            'facebook': ['faceb00k', 'facebok', 'faceboook', 'facebk'],
            'paypal': ['paypa1', 'paypai', 'paypa11', 'payppal'],
            'amazon': ['amaz0n', 'amazom', 'amazonn', 'amzon'],
            'microsoft': ['micros0ft', 'micosoft', 'microsft', 'mickrosoft'],
            'apple': ['app1e', 'appl3', 'appie', 'aple'],
            'netflix': ['netf1ix', 'netfllx', 'netfl1x', 'nefflix'],
            'instagram': ['instgram', 'instagran', 'instagramm', 'inst4gram']
        }
    
    def analyze_url(self, url: str) -> Dict[str, any]:
        """
        Analyze a URL for phishing indicators.
        
        Args:
            url: The URL to analyze
            
        Returns:
            Dictionary containing analysis results
        """
        if not url:
            return {
                'is_safe': False,
                'risk_level': 'Unknown',
                'issues': ['URL cannot be empty'],
                'details': {}
            }
        
        issues = []
        risk_score = 0
        
        # Parse URL
        try:
            parsed = urlparse(url)
            if not parsed.scheme:
                # Add scheme if missing for proper parsing
                url = 'http://' + url
                parsed = urlparse(url)
        except Exception as e:
            return {
                'is_safe': False,
                'risk_level': 'High',
                'issues': [f'Invalid URL format: {str(e)}'],
                'details': {}
            }
        
        domain = parsed.netloc.lower()
        scheme = parsed.scheme.lower()
        path = parsed.path
        
        # Check HTTPS
        uses_https = scheme == 'https'
        if not uses_https:
            issues.append('URL does not use HTTPS (insecure connection)')
            risk_score += 2
        
        # Check for IP address as domain
        ip_pattern = r'^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$'
        if re.match(ip_pattern, domain):
            issues.append('URL uses IP address instead of domain name (suspicious)')
            risk_score += 3
        
        # Check suspicious TLDs
        for tld in self.suspicious_tlds:
            if domain.endswith(tld):
                issues.append(f'URL uses suspicious top-level domain ({tld})')
                risk_score += 2
                break
        
        # Check for typosquatting
        typosquat_detected = self._check_typosquatting(domain)
        if typosquat_detected:
            issues.append(f'Possible typosquatting detected (similar to {typosquat_detected})')
            risk_score += 3
        
        # Check for excessive subdomains
        subdomain_count = domain.count('.')
        if subdomain_count > 3:
            issues.append('URL has excessive subdomains (suspicious)')
            risk_score += 2
        
        # Check for suspicious characters in domain
        if re.search(r'[^a-z0-9\-\.]', domain):
            issues.append('Domain contains suspicious characters')
            risk_score += 2
        
        # Check URL length
        if len(url) > 75:
            issues.append('URL is unusually long (may hide true destination)')
            risk_score += 1
        
        # Check for @ symbol (can hide real domain)
        if '@' in url:
            issues.append('URL contains @ symbol (may redirect to different domain)')
            risk_score += 3
        
        # Check for double slashes in path
        if '//' in path:
            issues.append('URL contains suspicious double slashes in path')
            risk_score += 1
        
        # Determine risk level
        if risk_score == 0:
            risk_level = 'Low'
            is_safe = True
        elif risk_score <= 2:
            risk_level = 'Low-Medium'
            is_safe = True
        elif risk_score <= 4:
            risk_level = 'Medium'
            is_safe = False
        elif risk_score <= 6:
            risk_level = 'Medium-High'
            is_safe = False
        else:
            risk_level = 'High'
            is_safe = False
        
        if not issues:
            issues.append('No obvious phishing indicators detected')
        
        return {
            'is_safe': is_safe,
            'risk_level': risk_level,
            'risk_score': risk_score,
            'issues': issues,
            'details': {
                'url': url,
                'domain': domain,
                'uses_https': uses_https,
                'scheme': scheme,
                'path': path
            }
        }
    
    def _check_typosquatting(self, domain: str) -> str:
        """
        Check if domain matches known typosquatting patterns.
        
        Args:
            domain: The domain to check
            
        Returns:
            Name of legitimate domain if typosquatting detected, None otherwise
        """
        # Remove TLD for comparison
        domain_parts = domain.split('.')
        if len(domain_parts) >= 2:
            domain_name = domain_parts[-2]
        else:
            domain_name = domain
        
        for legitimate, patterns in self.typosquat_patterns.items():
            if domain_name == legitimate:
                continue
            for pattern in patterns:
                if pattern in domain_name:
                    return legitimate
        
        return None
    
    def get_safety_report(self, url: str) -> str:
        """
        Generate a human-readable safety report for a URL.
        
        Args:
            url: The URL to analyze
            
        Returns:
            Formatted safety report
        """
        analysis = self.analyze_url(url)
        
        report = [
            "=" * 60,
            "URL SAFETY REPORT",
            "=" * 60,
            f"URL: {analysis['details'].get('url', url)}",
            f"Risk Level: {analysis['risk_level']}",
            f"Safe: {'Yes' if analysis['is_safe'] else 'No'}",
            "",
            "Issues Found:",
        ]
        
        for i, issue in enumerate(analysis['issues'], 1):
            report.append(f"  {i}. {issue}")
        
        report.extend([
            "",
            "Details:",
            f"  - Domain: {analysis['details'].get('domain', 'N/A')}",
            f"  - HTTPS: {'Yes' if analysis['details'].get('uses_https') else 'No'}",
            f"  - Scheme: {analysis['details'].get('scheme', 'N/A')}",
            "",
            "Recommendation:",
        ])
        
        if analysis['is_safe']:
            report.append("  This URL appears relatively safe, but always exercise caution.")
        else:
            report.append("  CAUTION: This URL shows signs of potential phishing.")
            report.append("  Do not enter sensitive information or download files.")
        
        report.append("=" * 60)
        
        return "\n".join(report)
