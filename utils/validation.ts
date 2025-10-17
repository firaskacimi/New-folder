export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export const validateField = (value: any, rules: ValidationRule): string | null => {
  if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
    return 'Ce champ est requis';
  }

  if (value && typeof value === 'string') {
    if (rules.minLength && value.length < rules.minLength) {
      return `Minimum ${rules.minLength} caractères requis`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Maximum ${rules.maxLength} caractères autorisés`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Format invalide';
    }
  }

  if (rules.custom) {
    return rules.custom(value);
  }

  return null;
};

export const validateForm = (data: Record<string, any>, rules: ValidationRules): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach(field => {
    const error = validateField(data[field], rules[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

// Common validation rules
export const commonRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) => {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Format d\'email invalide';
      }
      return null;
    }
  },
  password: {
    required: true,
    minLength: 8,
    custom: (value: string) => {
      if (value && value.length < 8) {
        return 'Le mot de passe doit contenir au moins 8 caractères';
      }
      if (value && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        return 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre';
      }
      return null;
    }
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-ZÀ-ÿ\s'-]+$/,
    custom: (value: string) => {
      if (value && !/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) {
        return 'Seules les lettres, espaces, apostrophes et tirets sont autorisés';
      }
      return null;
    }
  },
  phone: {
    pattern: /^(\+33|0)[1-9](\d{8})$/,
    custom: (value: string) => {
      if (value && !/^(\+33|0)[1-9](\d{8})$/.test(value)) {
        return 'Format de téléphone invalide (ex: +33612345678 ou 0612345678)';
      }
      return null;
    }
  }
};

// Form-specific validation rules
export const loginValidationRules: ValidationRules = {
  email: commonRules.email,
  password: { required: true }
};

export const registerValidationRules: ValidationRules = {
  firstName: commonRules.name,
  lastName: commonRules.name,
  email: commonRules.email,
  password: commonRules.password,
  confirmPassword: {
    required: true,
    custom: (value: string, formData?: Record<string, any>) => {
      if (formData && value !== formData.password) {
        return 'Les mots de passe ne correspondent pas';
      }
      return null;
    }
  },
  phone: commonRules.phone,
  acceptTerms: {
    custom: (value: boolean) => {
      if (!value) {
        return 'Vous devez accepter les conditions d\'utilisation';
      }
      return null;
    }
  }
};