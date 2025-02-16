## Refactor: Remove useAuthFetch Hook

This PR removes the `useAuthFetch` hook and refactors all its usages across the codebase to use direct API calls.

## Type of Change

- [x] Code refactoring (code improvements, no functional changes)
- [x] Documentation update

## Changes Made

1. Removed `useAuthFetch` hook from the codebase
2. Refactored API calls in the following features:
   - Booth operations
     - Basic booth operations
     - Booth list and settings
     - Feature toggles
   - Queue operations
   - Menu operations
   - Megaphone functionality

## Testing

- [x] Manual Testing

### Test Cases

1. Booth Operations
   - Verify booth creation works without useAuthFetch
   - Confirm booth list fetching functions correctly
   - Test booth settings and feature toggles
2. Queue Management
   - Verify queue operations work as expected
   - Test queue status updates
3. Menu Operations
   - Test menu item creation and updates
   - Verify menu status changes
4. Megaphone Feature
   - Confirm megaphone functionality works without useAuthFetch

## Additional Notes

This refactoring is part of the ongoing effort to simplify our authentication handling and API calls. The removal of `useAuthFetch` helps reduce complexity and makes the codebase more maintainable by:

- Eliminating an unnecessary abstraction layer
- Making API calls more direct and easier to understand
- Reducing the number of custom hooks in the codebase

## Checklist

- [x] My code follows the style guidelines of this project
- [x] I have performed a self-review of my code
- [x] All features continue to work as expected after refactoring
- [x] No new warnings or errors were introduced
- [x] The changes maintain existing functionality
