#!/usr/bin/env python3
"""Demo script showcasing Security Guardian features."""

from core.password_analyzer import PasswordAnalyzer
from core.phishing_analyzer import PhishingAnalyzer
from core.password_generator import PasswordGenerator


def demo_password_analyzer():
    """Demonstrate password analysis features."""
    print("\n" + "=" * 70)
    print("DEMO 1: PASSWORD ANALYZER")
    print("=" * 70)
    
    analyzer = PasswordAnalyzer()
    
    test_passwords = [
        ('weak', 'A weak password'),
        ('Password123', 'A moderate password'),
        ('MyP@ssw0rd!2024', 'A strong password')
    ]
    
    for password, description in test_passwords:
        print(f"\n{description}: '{password}'")
        result = analyzer.analyze_strength(password)
        print(f"  Strength: {result['strength']} (Score: {result['score']}/6)")
        print(f"  Length: {result['length']} chars")
        print(f"  Uppercase: {'✓' if result['has_uppercase'] else '✗'}")
        print(f"  Lowercase: {'✓' if result['has_lowercase'] else '✗'}")
        print(f"  Numbers:   {'✓' if result['has_numbers'] else '✗'}")
        print(f"  Symbols:   {'✓' if result['has_symbols'] else '✗'}")
        if result['feedback']:
            print(f"  Feedback: {result['feedback'][0]}")


def demo_phishing_analyzer():
    """Demonstrate phishing detection features."""
    print("\n" + "=" * 70)
    print("DEMO 2: PHISHING ANALYZER")
    print("=" * 70)
    
    analyzer = PhishingAnalyzer()
    
    test_urls = [
        ('https://www.google.com', 'Safe URL'),
        ('http://example.com', 'HTTP (insecure)'),
        ('http://g00gle.com', 'Typosquatting attempt'),
        ('http://192.168.1.1', 'IP address URL')
    ]
    
    for url, description in test_urls:
        print(f"\n{description}: {url}")
        result = analyzer.analyze_url(url)
        print(f"  Safe: {'Yes ✓' if result['is_safe'] else 'No ✗'}")
        print(f"  Risk Level: {result['risk_level']}")
        print(f"  HTTPS: {'Yes ✓' if result['details']['uses_https'] else 'No ✗'}")
        if not result['is_safe']:
            print(f"  Main Issue: {result['issues'][0]}")


def demo_password_generator():
    """Demonstrate password generation features."""
    print("\n" + "=" * 70)
    print("DEMO 3: PASSWORD GENERATOR")
    print("=" * 70)
    
    generator = PasswordGenerator()
    
    print("\n1. Standard Password (16 characters):")
    print(f"   {generator.generate(length=16)}")
    
    print("\n2. Long Password (24 characters, all options):")
    print(f"   {generator.generate(length=24, use_symbols=True)}")
    
    print("\n3. Passphrase (memorable):")
    print(f"   {generator.generate_passphrase(word_count=4)}")
    
    print("\n4. Multiple Passwords:")
    passwords = generator.generate_multiple(count=3, length=12)
    for i, pwd in enumerate(passwords, 1):
        print(f"   {i}. {pwd}")
    
    print("\n5. Custom Password (only letters and numbers):")
    print(f"   {generator.generate(length=16, use_symbols=False)}")


def main():
    """Run all demos."""
    print("\n" + "█" * 70)
    print("█" + " " * 68 + "█")
    print("█" + "  SECURITY GUARDIAN - FEATURE DEMONSTRATION".center(68) + "█")
    print("█" + "  Your Personal Cybersecurity Assistant".center(68) + "█")
    print("█" + " " * 68 + "█")
    print("█" * 70)
    
    demo_password_analyzer()
    demo_phishing_analyzer()
    demo_password_generator()
    
    print("\n" + "=" * 70)
    print("DEMO COMPLETE")
    print("=" * 70)
    print("\nTo use the interactive application, run: python main.py")
    print("To run tests, run: python -m unittest discover tests\n")


if __name__ == '__main__':
    main()
