"""Unit tests for Password Generator module."""

import unittest
from core.password_generator import PasswordGenerator


class TestPasswordGenerator(unittest.TestCase):
    """Test cases for PasswordGenerator class."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.generator = PasswordGenerator()
    
    def test_generate_default(self):
        """Test password generation with default settings."""
        password = self.generator.generate()
        self.assertEqual(len(password), 16)
        self.assertTrue(any(c.isupper() for c in password))
        self.assertTrue(any(c.islower() for c in password))
        self.assertTrue(any(c.isdigit() for c in password))
    
    def test_generate_custom_length(self):
        """Test password generation with custom length."""
        for length in [8, 12, 20, 32]:
            password = self.generator.generate(length=length)
            self.assertEqual(len(password), length)
    
    def test_generate_minimum_length(self):
        """Test minimum password length validation."""
        with self.assertRaises(ValueError):
            self.generator.generate(length=3)
    
    def test_generate_only_lowercase(self):
        """Test password with only lowercase letters."""
        password = self.generator.generate(
            length=10,
            use_uppercase=False,
            use_numbers=False,
            use_symbols=False,
            use_lowercase=True
        )
        self.assertEqual(len(password), 10)
        self.assertTrue(all(c.islower() or c.isalpha() for c in password))
        self.assertFalse(any(c.isupper() for c in password))
        self.assertFalse(any(c.isdigit() for c in password))
    
    def test_generate_only_uppercase(self):
        """Test password with only uppercase letters."""
        password = self.generator.generate(
            length=10,
            use_uppercase=True,
            use_lowercase=False,
            use_numbers=False,
            use_symbols=False
        )
        self.assertEqual(len(password), 10)
        self.assertTrue(all(c.isupper() or c.isalpha() for c in password))
        self.assertFalse(any(c.islower() for c in password))
        self.assertFalse(any(c.isdigit() for c in password))
    
    def test_generate_only_numbers(self):
        """Test password with only numbers."""
        password = self.generator.generate(
            length=10,
            use_uppercase=False,
            use_lowercase=False,
            use_numbers=True,
            use_symbols=False
        )
        self.assertEqual(len(password), 10)
        self.assertTrue(all(c.isdigit() for c in password))
    
    def test_generate_with_symbols(self):
        """Test password with symbols included."""
        password = self.generator.generate(use_symbols=True, length=20)
        self.assertTrue(any(c in self.generator.symbols for c in password))
    
    def test_generate_no_character_types(self):
        """Test error when no character types selected."""
        with self.assertRaises(ValueError):
            self.generator.generate(
                use_uppercase=False,
                use_lowercase=False,
                use_numbers=False,
                use_symbols=False
            )
    
    def test_generate_exclude_ambiguous(self):
        """Test excluding ambiguous characters."""
        # Generate many passwords to ensure ambiguous chars are excluded
        for _ in range(10):
            password = self.generator.generate(
                length=50,
                exclude_ambiguous=True
            )
            self.assertNotIn('0', password)
            self.assertNotIn('O', password)
            self.assertNotIn('l', password)
            self.assertNotIn('1', password)
            self.assertNotIn('I', password)
    
    def test_generate_has_required_characters(self):
        """Test that generated password has at least one of each required type."""
        password = self.generator.generate(
            length=16,
            use_uppercase=True,
            use_lowercase=True,
            use_numbers=True,
            use_symbols=True
        )
        self.assertTrue(any(c.isupper() for c in password))
        self.assertTrue(any(c.islower() for c in password))
        self.assertTrue(any(c.isdigit() for c in password))
        self.assertTrue(any(c in self.generator.symbols for c in password))
    
    def test_generate_passphrase_default(self):
        """Test passphrase generation with default settings."""
        passphrase = self.generator.generate_passphrase()
        parts = passphrase.split('-')
        self.assertEqual(len(parts), 5)  # 4 words + 1 number
        self.assertTrue(parts[-1].isdigit())
    
    def test_generate_passphrase_custom_separator(self):
        """Test passphrase with custom separator."""
        passphrase = self.generator.generate_passphrase(separator='_')
        self.assertIn('_', passphrase)
        self.assertNotIn('-', passphrase)
    
    def test_generate_passphrase_no_number(self):
        """Test passphrase without number."""
        passphrase = self.generator.generate_passphrase(add_number=False)
        parts = passphrase.split('-')
        # Should not end with a number
        self.assertFalse(parts[-1].isdigit())
    
    def test_generate_passphrase_capitalization(self):
        """Test passphrase capitalization."""
        passphrase = self.generator.generate_passphrase(capitalize=True)
        parts = passphrase.split('-')
        # Check that words are capitalized (except possible number at end)
        for part in parts[:-1]:
            if part.isalpha():
                self.assertTrue(part[0].isupper())
    
    def test_generate_passphrase_word_count(self):
        """Test passphrase with custom word count."""
        for count in [2, 3, 5, 6]:
            passphrase = self.generator.generate_passphrase(
                word_count=count,
                add_number=False
            )
            parts = passphrase.split('-')
            self.assertEqual(len(parts), count)
    
    def test_generate_multiple(self):
        """Test generating multiple passwords."""
        count = 5
        passwords = self.generator.generate_multiple(count=count, length=12)
        self.assertEqual(len(passwords), count)
        self.assertTrue(all(len(pwd) == 12 for pwd in passwords))
        # Check that passwords are different
        self.assertEqual(len(set(passwords)), count)
    
    def test_generate_randomness(self):
        """Test that generated passwords are random."""
        passwords = [self.generator.generate(length=16) for _ in range(10)]
        # All passwords should be unique
        self.assertEqual(len(set(passwords)), 10)


if __name__ == '__main__':
    unittest.main()
