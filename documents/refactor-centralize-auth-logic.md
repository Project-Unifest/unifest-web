## Refactor: Replace Fetch API with Ky Client

This PR replaces raw `fetch()` calls with the Ky HTTP client to improve API communication and centralize auth logic.

## Changes

### API Client

- Replaced raw `fetch()` with Ky client
- Centralized request/response handling
- Added consistent error handling
- Improved request interceptors for auth

### Auth Integration

- Centralized auth token management
- Added proper error handling for auth failures
- Improved auth state persistence with localStorage
- Removed auth-related devtools from production

### API Refactoring

- Booth operations (list, create, delete)
- Menu operations
- Queue operations
- Megaphone functionality
- Sign-in related APIs

### Type System Updates

- Added temporary type assertions for booth initialization
- Fixed type compatibility issues between API responses and store states
- Added type bypasses for interim compatibility
- TODO: Properly align types between API responses and store states

## Testing Done

- [x] All API endpoints work with new Ky client
- [x] Auth token handling works correctly
- [x] Error handling for failed requests
- [x] State persistence across page reloads
- [x] Type assertions working as expected

## Notes

This change improves our API layer by:

- Centralizing HTTP client configuration
- Providing better error handling
- Simplifying auth token management
- Making API calls more consistent

Known Technical Debt:

- Type assertions need to be replaced with proper type definitions
- API response types need alignment with store state types

No special migration steps needed as changes are internal.

## Type of Change

- [x] Code refactoring (code improvements, no functional changes)
- [x] Feature enhancement (improved API integration)
- [x] Technical debt (temporary type solutions)

## Changes Made

1. Authentication Store Improvements

   - Removed devtools from production environment
   - Enhanced auth store with better state management
   - Added hydration support for localStorage

2. API Integration

   - Integrated authentication with booth-related APIs
   - Added proper error handling for API responses
   - Implemented booth list fetching with auth
   - Added delete booth API integration

3. Store Management

   - Split booth store into more focused stores:
     - `booth-draft-store` for booth creation
     - `booth-list-store` for managing booth lists
   - Improved state persistence and management
   - Added temporary type assertions for store compatibility

4. Component Updates
   - Updated booth list components to use new auth system
   - Enhanced booth management UI components
   - Added proper auth checks in booth operations
   - Implemented type bypasses for smooth integration

## Testing

- [x] Manual Testing
- [x] Integration Testing

### Test Cases

1. Authentication Flow

   - Verify auth store hydration from localStorage
   - Test auth state persistence
   - Confirm proper error handling

2. Booth Operations

   - Test booth list fetching with auth
   - Verify booth deletion with auth
   - Confirm booth creation flow
   - Verify type assertions work correctly

3. State Management
   - Verify store splitting works correctly
   - Test state persistence across page navigation
   - Confirm proper state updates
   - Check type compatibility at runtime

## Additional Notes

This refactoring improves our authentication system by:

- Properly integrating auth with our API layer
- Improving state management and persistence
- Splitting stores for better separation of concerns
- Removing development tools from production

## Migration Notes

The changes are mostly internal improvements and shouldn't require any special migration steps.
Note: Type assertions are temporary and will need to be replaced with proper type definitions in future updates.

## Checklist

- [x] My code follows the style guidelines of this project
- [x] I have performed a self-review of my code
- [x] Authentication works consistently across all features
- [x] Development tools are properly configured for production
- [x] All tests pass with the new authentication system
- [x] Type assertions are documented and marked for future improvement
