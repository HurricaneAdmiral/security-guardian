"""Password Analysis Module for Security Guardian.

This module provides functionality to analyze password strength,
check if passwords have been compromised, and provide recommendations.
"""

import re
import hashlib
import requests
from typing import Dict, List


class PasswordAnalyzer:
    """Analyzes password strength and security."""
    
    def __init__(self):
        """Initialize the PasswordAnalyzer."""
        self.min_length = 8
        self.recommended_length = 12
    
    def analyze_strength(self, password: str) -> Dict[str, any]:
        """
        Analyze password strength based on multiple criteria.
        
        Args:
            password: The password to analyze
            
        Returns:
            Dictionary containing strength analysis results
        """
        if not password:
            return {
                'score': 0,
                'strength': 'Very Weak',
                'feedback': ['Password cannot be empty']
            }
        
        score = 0
        feedback = []
        
        # Check length
        length = len(password)
        if length < self.min_length:
            feedback.append(f'Password is too short (minimum {self.min_length} characters)')
        elif length < self.recommended_length:
            score += 1
            feedback.append(f'Consider using at least {self.recommended_length} characters')
        else:
            score += 2
        
        # Check for uppercase letters
        has_uppercase = bool(re.search(r'[A-Z]', password))
        if has_uppercase:
            score += 1
        else:
            feedback.append('Add uppercase letters (A-Z)')
        
        # Check for lowercase letters
        has_lowercase = bool(re.search(r'[a-z]', password))
        if has_lowercase:
            score += 1
        else:
            feedback.append('Add lowercase letters (a-z)')
        
        # Check for numbers
        has_numbers = bool(re.search(r'\d', password))
        if has_numbers:
            score += 1
        else:
            feedback.append('Add numbers (0-9)')
        
        # Check for special characters
        has_symbols = bool(re.search(r'[!@#$%^&*()_+\-=\[\]{};:\'",.<>?/\\|`~]', password))
        if has_symbols:
            score += 1
        else:
            feedback.append('Add special characters (!@#$%^&*)')
        
        # Check for common patterns
        common_patterns = [
            r'(123|abc|qwerty|password)',
            r'(.)\1{2,}',  # Repeated characters
        ]
        for pattern in common_patterns:
            if re.search(pattern, password.lower()):
                score = max(0, score - 1)
                feedback.append('Avoid common patterns and repeated characters')
                break
        
        # Determine strength level
        if score <= 1:
            strength = 'Very Weak'
        elif score <= 2:
            strength = 'Weak'
        elif score <= 4:
            strength = 'Moderate'
        elif score <= 5:
            strength = 'Strong'
        else:
            strength = 'Very Strong'
        
        if not feedback:
            feedback.append('Excellent password!')
        
        return {
            'score': score,
            'strength': strength,
            'length': length,
            'has_uppercase': has_uppercase,
            'has_lowercase': has_lowercase,
            'has_numbers': has_numbers,
            'has_symbols': has_symbols,
            'feedback': feedback
        }
    
    def check_pwned(self, password: str) -> Dict[str, any]:
        """
        Check if password has been compromised using Have I Been Pwned API.
        
        Uses k-anonymity model: only first 5 characters of SHA-1 hash are sent.
        
        Args:
            password: The password to check
            
        Returns:
            Dictionary with breach information
        """
        # Create SHA-1 hash of password
        sha1_hash = hashlib.sha1(password.encode('utf-8')).hexdigest().upper()
        prefix = sha1_hash[:5]
        suffix = sha1_hash[5:]
        
        try:
            # Query HIBP API with hash prefix
            url = f'https://api.pwnedpasswords.com/range/{prefix}'
            response = requests.get(url, timeout=5)
            response.raise_for_status()
            
            # Check if suffix appears in response
            hashes = response.text.splitlines()
            for hash_line in hashes:
                hash_suffix, count = hash_line.split(':')
                if hash_suffix == suffix:
                    return {
                        'is_pwned': True,
                        'breach_count': int(count),
                        'message': f'This password has been seen {count} times in data breaches!'
                    }
            
            return {
                'is_pwned': False,
                'breach_count': 0,
                'message': 'Password not found in breach database'
            }
            
        except requests.RequestException as e:
            return {
                'is_pwned': None,
                'breach_count': None,
                'message': f'Unable to check breach database: {str(e)}'
            }
    
    def get_recommendations(self, password: str) -> List[str]:
        """
        Provide recommendations for improving password security.
        
        Args:
            password: The password to analyze
            
        Returns:
            List of recommendations
        """
        analysis = self.analyze_strength(password)
        recommendations = []
        
        if analysis['score'] < 5:
            recommendations.extend(analysis['feedback'])
        
        # Additional recommendations
        recommendations.extend([
            'Use a unique password for each account',
            'Consider using a password manager',
            'Enable two-factor authentication when available',
            'Avoid using personal information in passwords'
        ])
        
        return recommendations
