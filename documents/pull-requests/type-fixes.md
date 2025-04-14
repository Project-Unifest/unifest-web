# Type Fixes Needed

## API Type Definitions

### Booth API Types

Current type in `src/widgets/add-booth/model/add-booth.ts`:

```typescript
export const addBooth = async (
  booth: Pick<
    Booth,
    "name" | "category" | "description" | "longitude" | "latitude"
  >,
) => {
  // ...
};
```

Should be updated to include all fields that the API accepts:

```typescript
export const addBooth = async (
  booth: Pick<
    Booth,
    | "name"
    | "category"
    | "description"
    | "longitude"
    | "latitude"
    | "thumbnail"
    | "festivalId"
    | "location"
    | "menus"
  >,
) => {
  // ...
};
```

### BoothList Store Types

Current issue in `src/widgets/boothList/ui/BoothList.tsx`:

- `Booth[]` is not assignable to `BoothState[]`
- `Booth.id` and `Booth.description` might be undefined but are required in `BoothState`

Need to update either:

1. The API response type to ensure these fields are always present
2. Or update the store type to handle optional fields

## Next Steps

1. Create a new branch for type fixes
2. Update API type definitions to match actual API responses
3. Update store types to properly handle optional fields
4. Add proper type guards where needed
5. Update documentation about required vs optional fields
