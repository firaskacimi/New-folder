# Authentication Pages - Login & Register

This project contains beautifully designed login and register pages that match your gaming/tech website aesthetic.

## Files Created

### 🔐 Authentication Pages
- `login.tsx` - Login page with form validation and authentication
- `register.tsx` - Registration page with comprehensive form validation

### 🎣 Hooks & Utilities
- `hooks/useAuth.ts` - Custom hook for authentication logic
- `utils/validation.ts` - Form validation utilities and rules

### 🎨 Styling
- `styles/animations.css` - Custom CSS animations and utility classes

## Features

### Login Page
- ✅ Email and password fields
- ✅ Password visibility toggle
- ✅ Remember me checkbox
- ✅ Forgot password link
- ✅ Social login buttons (Google, Facebook)
- ✅ Form validation with error messages
- ✅ Loading states
- ✅ Responsive design

### Register Page
- ✅ First name and last name fields
- ✅ Email validation
- ✅ Password strength validation
- ✅ Password confirmation
- ✅ Phone number (optional)
- ✅ Terms acceptance checkbox
- ✅ Newsletter subscription option
- ✅ Social registration buttons
- ✅ Comprehensive form validation
- ✅ Loading states
- ✅ Responsive design

### Design Features
- 🎨 Dark theme with gaming aesthetic
- 🌈 Gradient backgrounds and text effects
- ✨ Floating animation elements
- 🔥 Glowing hover effects
- 📱 Fully responsive design
- ♿ Accessible form controls

## Usage

### 1. Next.js App Router Structure
```
app/
├── login/
│   └── page.tsx          // Import login.tsx here
├── register/
│   └── page.tsx          // Import register.tsx here
└── globals.css           // Import animations.css here
```

### 2. Pages Router Structure
```
pages/
├── login.tsx             // Use the login.tsx file
└── register.tsx          // Use the register.tsx file
```

### 3. Import the CSS animations
Add to your global CSS file:
```css
@import './styles/animations.css';
```

### 4. Example page.tsx for App Router
```tsx
import Login from '../../login';

export default function LoginPage() {
  return <Login />;
}
```

## Authentication Flow

The authentication system includes:

1. **Form Validation**: Client-side validation with real-time error messages
2. **Loading States**: Visual feedback during authentication requests
3. **Error Handling**: User-friendly error messages
4. **Success Handling**: Automatic redirect after successful authentication
5. **Social Auth**: Ready-to-integrate social login buttons

## Customization

### Colors & Themes
The design uses CSS custom properties and Tailwind classes. Key colors:
- Primary: Cyan (#06B6D4)
- Secondary: Purple (#A855F7)
- Accent: Fuchsia (#D946EF)
- Background: Dark gradients

### Validation Rules
Modify `utils/validation.ts` to customize validation rules:
- Email format validation
- Password strength requirements
- Name format validation
- Phone number format

### Authentication Logic
Update `hooks/useAuth.ts` to integrate with your backend:
- Replace mock API calls with real endpoints
- Update token storage logic
- Customize user data structure

## Dependencies

Make sure you have these dependencies in your Next.js project:
```json
{
  "next": "^13.0.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "tailwindcss": "^3.0.0"
}
```

## Integration Notes

1. **Routing**: Update the `Link` components to match your routing structure
2. **API Integration**: Replace the mock authentication in `useAuth.ts` with your actual API calls
3. **State Management**: Consider integrating with Redux, Zustand, or your preferred state management solution
4. **Styling**: The pages use Tailwind CSS classes - ensure Tailwind is configured in your project

## Security Considerations

- Implement proper CSRF protection
- Use secure HTTP-only cookies for tokens
- Add rate limiting for authentication endpoints
- Implement proper password hashing on the backend
- Consider implementing 2FA for enhanced security

Enjoy your new authentication pages! 🚀