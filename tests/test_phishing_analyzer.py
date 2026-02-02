"""Unit tests for Phishing Analyzer module."""

import unittest
from core.phishing_analyzer import PhishingAnalyzer


class TestPhishingAnalyzer(unittest.TestCase):
    """Test cases for PhishingAnalyzer class."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.analyzer = PhishingAnalyzer()
    
    def test_analyze_url_empty(self):
        """Test analysis of empty URL."""
        result = self.analyzer.analyze_url('')
        self.assertFalse(result['is_safe'])
        self.assertIn('URL cannot be empty', result['issues'])
    
    def test_analyze_url_https_secure(self):
        """Test analysis of HTTPS URL."""
        result = self.analyzer.analyze_url('https://www.google.com')
        self.assertTrue(result['details']['uses_https'])
        self.assertLessEqual(result['risk_score'], 2)
    
    def test_analyze_url_http_insecure(self):
        """Test analysis of HTTP URL."""
        result = self.analyzer.analyze_url('http://example.com')
        self.assertFalse(result['details']['uses_https'])
        self.assertGreater(result['risk_score'], 0)
        self.assertTrue(any('HTTPS' in issue for issue in result['issues']))
    
    def test_analyze_url_ip_address(self):
        """Test detection of IP address in URL."""
        result = self.analyzer.analyze_url('http://192.168.1.1/login')
        self.assertGreater(result['risk_score'], 2)
        self.assertTrue(any('IP address' in issue for issue in result['issues']))
    
    def test_analyze_url_suspicious_tld(self):
        """Test detection of suspicious TLDs."""
        result = self.analyzer.analyze_url('http://phishing.tk')
        self.assertGreater(result['risk_score'], 0)
        self.assertTrue(any('suspicious top-level domain' in issue for issue in result['issues']))
    
    def test_analyze_url_typosquatting(self):
        """Test detection of typosquatting."""
        result = self.analyzer.analyze_url('https://g00gle.com')
        self.assertFalse(result['is_safe'])
        self.assertTrue(any('typosquatting' in issue.lower() for issue in result['issues']))
    
    def test_analyze_url_excessive_subdomains(self):
        """Test detection of excessive subdomains."""
        result = self.analyzer.analyze_url('https://login.secure.bank.verify.example.com')
        self.assertGreater(result['risk_score'], 0)
        self.assertTrue(any('excessive subdomains' in issue for issue in result['issues']))
    
    def test_analyze_url_at_symbol(self):
        """Test detection of @ symbol in URL."""
        result = self.analyzer.analyze_url('http://user@evil.com')
        self.assertGreater(result['risk_score'], 2)
        self.assertTrue(any('@' in issue for issue in result['issues']))
    
    def test_analyze_url_long_url(self):
        """Test detection of unusually long URLs."""
        long_url = 'http://example.com/' + 'a' * 100
        result = self.analyzer.analyze_url(long_url)
        self.assertTrue(any('unusually long' in issue for issue in result['issues']))
    
    def test_analyze_url_safe_domain(self):
        """Test analysis of safe domain."""
        result = self.analyzer.analyze_url('https://www.microsoft.com')
        self.assertTrue(result['details']['uses_https'])
        self.assertLessEqual(result['risk_score'], 2)
    
    def test_check_typosquatting_detected(self):
        """Test typosquatting detection method."""
        result = self.analyzer._check_typosquatting('paypa1.com')
        self.assertIsNotNone(result)
        self.assertEqual(result, 'paypal')
    
    def test_check_typosquatting_not_detected(self):
        """Test legitimate domain passes typosquatting check."""
        result = self.analyzer._check_typosquatting('legitimate.com')
        self.assertIsNone(result)
    
    def test_get_safety_report_format(self):
        """Test safety report generation."""
        report = self.analyzer.get_safety_report('https://www.example.com')
        self.assertIsInstance(report, str)
        self.assertIn('URL SAFETY REPORT', report)
        self.assertIn('Risk Level:', report)
        self.assertIn('Issues Found:', report)
        self.assertIn('Recommendation:', report)
    
    def test_risk_level_classification(self):
        """Test risk level classification."""
        # Low risk
        low_risk = self.analyzer.analyze_url('https://www.google.com')
        self.assertIn(low_risk['risk_level'], ['Low', 'Low-Medium'])
        
        # High risk
        high_risk = self.analyzer.analyze_url('http://192.168.1.1@phishing.tk')
        self.assertIn(high_risk['risk_level'], ['Medium-High', 'High'])
        self.assertFalse(high_risk['is_safe'])


if __name__ == '__main__':
    unittest.main()
