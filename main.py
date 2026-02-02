"""Main application entry point for Security Guardian."""

import sys
from core.password_analyzer import PasswordAnalyzer
from core.phishing_analyzer import PhishingAnalyzer
from core.password_generator import PasswordGenerator


def print_banner():
    """Print application banner."""
    print("\n" + "=" * 60)
    print("        SECURITY GUARDIAN")
    print("   Your Personal Cybersecurity Assistant")
    print("=" * 60 + "\n")


def password_analysis_menu():
    """Handle password analysis functionality."""
    analyzer = PasswordAnalyzer()
    
    print("\n--- Password Analysis ---")
    password = input("Enter password to analyze: ")
    
    if not password:
        print("No password provided.")
        return
    
    print("\nAnalyzing password...\n")
    
    # Strength analysis
    strength = analyzer.analyze_strength(password)
    print(f"Password Strength: {strength['strength']} (Score: {strength['score']}/6)")
    print(f"Length: {strength['length']} characters")
    print(f"Contains uppercase: {'Yes' if strength['has_uppercase'] else 'No'}")
    print(f"Contains lowercase: {'Yes' if strength['has_lowercase'] else 'No'}")
    print(f"Contains numbers: {'Yes' if strength['has_numbers'] else 'No'}")
    print(f"Contains symbols: {'Yes' if strength['has_symbols'] else 'No'}")
    
    print("\nFeedback:")
    for feedback in strength['feedback']:
        print(f"  - {feedback}")
    
    # Check if pwned
    print("\nChecking against breach database...")
    pwned = analyzer.check_pwned(password)
    if pwned['is_pwned'] is None:
        print(f"Warning: {pwned['message']}")
    elif pwned['is_pwned']:
        print(f"⚠️  {pwned['message']}")
        print("   This password has been exposed in data breaches!")
    else:
        print(f"✓ {pwned['message']}")
    
    # Recommendations
    print("\nRecommendations:")
    recommendations = analyzer.get_recommendations(password)
    for i, rec in enumerate(recommendations[:5], 1):
        print(f"  {i}. {rec}")


def phishing_analysis_menu():
    """Handle phishing link analysis functionality."""
    analyzer = PhishingAnalyzer()
    
    print("\n--- Phishing Link Analysis ---")
    url = input("Enter URL to analyze: ")
    
    if not url:
        print("No URL provided.")
        return
    
    print("\nAnalyzing URL...\n")
    report = analyzer.get_safety_report(url)
    print(report)


def password_generator_menu():
    """Handle password generation functionality."""
    generator = PasswordGenerator()
    
    print("\n--- Password Generator ---")
    print("1. Generate custom password")
    print("2. Generate passphrase")
    print("3. Generate multiple passwords")
    
    choice = input("\nSelect option (1-3): ")
    
    if choice == '1':
        try:
            length = int(input("Password length (default 16): ") or "16")
            use_upper = input("Include uppercase? (Y/n): ").lower() != 'n'
            use_lower = input("Include lowercase? (Y/n): ").lower() != 'n'
            use_num = input("Include numbers? (Y/n): ").lower() != 'n'
            use_sym = input("Include symbols? (Y/n): ").lower() != 'n'
            
            password = generator.generate(
                length=length,
                use_uppercase=use_upper,
                use_lowercase=use_lower,
                use_numbers=use_num,
                use_symbols=use_sym
            )
            
            print(f"\nGenerated Password: {password}")
            
        except ValueError as e:
            print(f"Error: {e}")
    
    elif choice == '2':
        try:
            word_count = int(input("Number of words (default 4): ") or "4")
            separator = input("Separator character (default '-'): ") or "-"
            
            passphrase = generator.generate_passphrase(
                word_count=word_count,
                separator=separator
            )
            
            print(f"\nGenerated Passphrase: {passphrase}")
            
        except ValueError as e:
            print(f"Error: {e}")
    
    elif choice == '3':
        try:
            count = int(input("How many passwords (default 5): ") or "5")
            length = int(input("Password length (default 16): ") or "16")
            
            passwords = generator.generate_multiple(count=count, length=length)
            
            print(f"\nGenerated {count} Passwords:")
            for i, pwd in enumerate(passwords, 1):
                print(f"  {i}. {pwd}")
                
        except ValueError as e:
            print(f"Error: {e}")
    
    else:
        print("Invalid option selected.")


def main():
    """Main application loop."""
    print_banner()
    
    while True:
        print("\nMain Menu:")
        print("1. Password Analysis")
        print("2. Phishing Link Analysis")
        print("3. Password Generator")
        print("4. Exit")
        
        choice = input("\nSelect an option (1-4): ")
        
        if choice == '1':
            password_analysis_menu()
        elif choice == '2':
            phishing_analysis_menu()
        elif choice == '3':
            password_generator_menu()
        elif choice == '4':
            print("\nThank you for using Security Guardian!")
            print("Stay safe online! 🔒\n")
            break
        else:
            print("Invalid option. Please try again.")


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nExiting Security Guardian...")
        sys.exit(0)
