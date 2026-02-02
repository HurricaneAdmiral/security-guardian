"""Unit tests for Password Analyzer module."""

import unittest
from unittest.mock import patch, Mock
from core.password_analyzer import PasswordAnalyzer


class TestPasswordAnalyzer(unittest.TestCase):
    """Test cases for PasswordAnalyzer class."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.analyzer = PasswordAnalyzer()
    
    def test_analyze_strength_empty_password(self):
        """Test analysis of empty password."""
        result = self.analyzer.analyze_strength('')
        self.assertEqual(result['score'], 0)
        self.assertEqual(result['strength'], 'Very Weak')
        self.assertIn('Password cannot be empty', result['feedback'])
    
    def test_analyze_strength_weak_password(self):
        """Test analysis of weak password."""
        result = self.analyzer.analyze_strength('pass')
        self.assertLess(result['score'], 3)
        self.assertIn(result['strength'], ['Very Weak', 'Weak'])
    
    def test_analyze_strength_moderate_password(self):
        """Test analysis of moderate password."""
        result = self.analyzer.analyze_strength('Password123')
        self.assertGreaterEqual(result['score'], 3)
        self.assertTrue(result['has_uppercase'])
        self.assertTrue(result['has_lowercase'])
        self.assertTrue(result['has_numbers'])
    
    def test_analyze_strength_strong_password(self):
        """Test analysis of strong password."""
        result = self.analyzer.analyze_strength('MyP@ssw0rd!2024')
        self.assertGreaterEqual(result['score'], 5)
        self.assertTrue(result['has_uppercase'])
        self.assertTrue(result['has_lowercase'])
        self.assertTrue(result['has_numbers'])
        self.assertTrue(result['has_symbols'])
    
    def test_analyze_strength_length_check(self):
        """Test password length validation."""
        short = self.analyzer.analyze_strength('Pass1!')
        self.assertLess(short['length'], self.analyzer.min_length)
        
        long = self.analyzer.analyze_strength('ThisIsALongPassword123!')
        self.assertGreaterEqual(long['length'], self.analyzer.recommended_length)
    
    def test_analyze_strength_common_patterns(self):
        """Test detection of common patterns."""
        result = self.analyzer.analyze_strength('password123')
        self.assertIn('common patterns', ' '.join(result['feedback']).lower())
    
    def test_analyze_strength_repeated_characters(self):
        """Test detection of repeated characters."""
        result = self.analyzer.analyze_strength('Passsss123!')
        # Score should be reduced due to repeated characters
        self.assertLess(result['score'], 6)
    
    @patch('core.password_analyzer.requests.get')
    def test_check_pwned_compromised(self, mock_get):
        """Test checking compromised password."""
        mock_response = Mock()
        mock_response.text = "ABC:100\nDEF:200\n0018A45C4D1DEF81644B54AB7F969B88D65:3\n"
        mock_response.raise_for_status = Mock()
        mock_get.return_value = mock_response
        
        # The password 'password' has hash starting with 5BAA6...
        result = self.analyzer.check_pwned('password')
        self.assertTrue(mock_get.called)
    
    @patch('core.password_analyzer.requests.get')
    def test_check_pwned_safe(self, mock_get):
        """Test checking safe password."""
        mock_response = Mock()
        mock_response.text = "ABC:100\nDEF:200\n"
        mock_response.raise_for_status = Mock()
        mock_get.return_value = mock_response
        
        result = self.analyzer.check_pwned('MySecureP@ssw0rd!9876')
        self.assertFalse(result['is_pwned'])
        self.assertEqual(result['breach_count'], 0)
    
    @patch('core.password_analyzer.requests.get')
    def test_check_pwned_api_error(self, mock_get):
        """Test handling API errors."""
        import requests
        mock_get.side_effect = requests.RequestException("Network error")
        
        result = self.analyzer.check_pwned('testpassword')
        self.assertIsNone(result['is_pwned'])
        self.assertIn('Unable to check', result['message'])
    
    def test_get_recommendations(self):
        """Test getting password recommendations."""
        recommendations = self.analyzer.get_recommendations('weak')
        self.assertIsInstance(recommendations, list)
        self.assertGreater(len(recommendations), 0)
        
        # Should always include general recommendations
        rec_text = ' '.join(recommendations).lower()
        self.assertTrue(
            'unique' in rec_text or 
            'password manager' in rec_text or
            'two-factor' in rec_text
        )


if __name__ == '__main__':
    unittest.main()
