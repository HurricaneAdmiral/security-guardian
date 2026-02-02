# Security Guardian

Your Personal Cybersecurity Assistant

## Overview

Security Guardian is a Python-based cybersecurity tool designed to help users assess and improve their digital security. It provides essential security features including password analysis, phishing link detection, and secure password generation.

## Features

### 1. Password Analysis Module
- **Strength Validation**: Analyzes passwords based on length, complexity, and character diversity
- **Breach Detection**: Integrates with Have I Been Pwned API to check if passwords have been compromised
- **Smart Recommendations**: Provides actionable feedback for creating stronger passwords
- **Detailed Metrics**: Shows presence of uppercase, lowercase, numbers, and symbols

### 2. Phishing Link Analysis Module
- **URL Safety Check**: Analyzes URLs for suspicious patterns and phishing indicators
- **HTTPS Verification**: Ensures links use secure HTTPS protocol
- **Typosquatting Detection**: Identifies domain names that mimic legitimate sites
- **Comprehensive Reports**: Provides detailed safety assessments with risk levels

### 3. Password Generator
- **Strong Random Passwords**: Generates cryptographically secure passwords
- **Customizable Options**: Configure length, character types, and complexity
- **Passphrase Generation**: Creates memorable passphrases using random words
- **Bulk Generation**: Generate multiple passwords at once

## Installation

1. Clone the repository:
```bash
git clone https://github.com/HurricaneAdmiral/security-guardian.git
cd security-guardian
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

Run the main application:
```bash
python main.py
```

The interactive menu will guide you through the available features:
- Password Analysis
- Phishing Link Analysis
- Password Generator

### Example Usage

#### Analyze Password Strength
```python
from core.password_analyzer import PasswordAnalyzer

analyzer = PasswordAnalyzer()
result = analyzer.analyze_strength("MyP@ssw0rd!")
print(f"Strength: {result['strength']}")
print(f"Score: {result['score']}/6")
```

#### Check for Phishing
```python
from core.phishing_analyzer import PhishingAnalyzer

analyzer = PhishingAnalyzer()
report = analyzer.get_safety_report("https://example.com")
print(report)
```

#### Generate Secure Password
```python
from core.password_generator import PasswordGenerator

generator = PasswordGenerator()
password = generator.generate(length=16, use_symbols=True)
print(f"Generated: {password}")
```

## Project Structure

```
security-guardian/
├── core/                      # Core modules
│   ├── __init__.py
│   ├── password_analyzer.py   # Password strength and breach checking
│   ├── phishing_analyzer.py   # URL phishing detection
│   └── password_generator.py  # Secure password generation
├── utils/                     # Utility functions
│   └── __init__.py
├── tests/                     # Unit tests
│   ├── __init__.py
│   ├── test_password_analyzer.py
│   ├── test_phishing_analyzer.py
│   └── test_password_generator.py
├── main.py                    # Main application entry point
├── requirements.txt           # Python dependencies
└── README.md                  # Project documentation
```

## Running Tests

Run all unit tests:
```bash
python -m unittest discover tests
```

Run specific test module:
```bash
python -m unittest tests.test_password_analyzer
python -m unittest tests.test_phishing_analyzer
python -m unittest tests.test_password_generator
```

## Security Features

- **Privacy First**: Password breach checking uses k-anonymity (only sends first 5 characters of hash)
- **No Storage**: Passwords are never stored or logged
- **Secure Generation**: Uses Python's `random` module with proper seeding
- **Best Practices**: Follows OWASP password guidelines

## Dependencies

- `requests>=2.31.0` - For API communication with Have I Been Pwned

## Future Enhancements

- Two-factor authentication verification
- Security audit reports
- Data breach monitoring
- Browser extension
- Mobile application

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is open source and available for educational and personal use.

## Disclaimer

This tool is for educational purposes. Always follow your organization's security policies and consult with security professionals for critical security decisions.

---

**Stay Safe Online!** 🔒