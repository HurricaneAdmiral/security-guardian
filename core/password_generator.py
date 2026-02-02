"""Password Generator Module for Security Guardian.

This module provides functionality to generate strong random passwords.
"""

import random
import string
from typing import Optional


class PasswordGenerator:
    """Generates secure random passwords."""
    
    def __init__(self):
        """Initialize the PasswordGenerator."""
        self.lowercase = string.ascii_lowercase
        self.uppercase = string.ascii_uppercase
        self.digits = string.digits
        self.symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    
    def generate(
        self,
        length: int = 16,
        use_uppercase: bool = True,
        use_lowercase: bool = True,
        use_numbers: bool = True,
        use_symbols: bool = True,
        exclude_ambiguous: bool = False
    ) -> str:
        """
        Generate a random password with specified options.
        
        Args:
            length: Length of the password (minimum 4)
            use_uppercase: Include uppercase letters
            use_lowercase: Include lowercase letters
            use_numbers: Include numbers
            use_symbols: Include special symbols
            exclude_ambiguous: Exclude ambiguous characters (0, O, l, 1, I)
            
        Returns:
            Generated password string
            
        Raises:
            ValueError: If invalid parameters provided
        """
        if length < 4:
            raise ValueError("Password length must be at least 4 characters")
        
        if not any([use_uppercase, use_lowercase, use_numbers, use_symbols]):
            raise ValueError("At least one character type must be selected")
        
        # Build character pool
        char_pool = ''
        required_chars = []
        
        if use_lowercase:
            chars = self.lowercase
            if exclude_ambiguous:
                chars = chars.replace('l', '')
            char_pool += chars
            required_chars.append(random.choice(chars))
        
        if use_uppercase:
            chars = self.uppercase
            if exclude_ambiguous:
                chars = chars.replace('O', '').replace('I', '')
            char_pool += chars
            required_chars.append(random.choice(chars))
        
        if use_numbers:
            chars = self.digits
            if exclude_ambiguous:
                chars = chars.replace('0', '').replace('1', '')
            char_pool += chars
            required_chars.append(random.choice(chars))
        
        if use_symbols:
            char_pool += self.symbols
            required_chars.append(random.choice(self.symbols))
        
        if not char_pool:
            raise ValueError("No characters available for password generation")
        
        # Generate password ensuring at least one character from each selected type
        password_chars = required_chars.copy()
        remaining_length = length - len(required_chars)
        
        if remaining_length < 0:
            raise ValueError(f"Password length too short for selected options (minimum {len(required_chars)})")
        
        # Fill remaining length with random characters
        for _ in range(remaining_length):
            password_chars.append(random.choice(char_pool))
        
        # Shuffle to avoid predictable patterns
        random.shuffle(password_chars)
        
        return ''.join(password_chars)
    
    def generate_passphrase(
        self,
        word_count: int = 4,
        separator: str = '-',
        capitalize: bool = True,
        add_number: bool = True
    ) -> str:
        """
        Generate a memorable passphrase using random words.
        
        Args:
            word_count: Number of words in the passphrase
            separator: Character to separate words
            capitalize: Capitalize each word
            add_number: Add a random number at the end
            
        Returns:
            Generated passphrase string
        """
        # Common word list (in practice, you'd use a larger dictionary)
        words = [
            'alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot',
            'golf', 'hotel', 'india', 'juliet', 'kilo', 'lima',
            'mike', 'november', 'oscar', 'papa', 'quebec', 'romeo',
            'sierra', 'tango', 'uniform', 'victor', 'whiskey', 'xray',
            'yankee', 'zulu', 'mountain', 'river', 'ocean', 'forest',
            'desert', 'valley', 'canyon', 'island', 'meadow', 'prairie',
            'thunder', 'lightning', 'rainbow', 'sunset', 'sunrise', 'twilight',
            'phoenix', 'dragon', 'tiger', 'eagle', 'falcon', 'hawk'
        ]
        
        selected_words = random.sample(words, min(word_count, len(words)))
        
        if capitalize:
            selected_words = [word.capitalize() for word in selected_words]
        
        passphrase = separator.join(selected_words)
        
        if add_number:
            passphrase += separator + str(random.randint(100, 999))
        
        return passphrase
    
    def generate_multiple(self, count: int = 5, **kwargs) -> list:
        """
        Generate multiple passwords.
        
        Args:
            count: Number of passwords to generate
            **kwargs: Arguments to pass to generate()
            
        Returns:
            List of generated passwords
        """
        return [self.generate(**kwargs) for _ in range(count)]
