import { memo } from 'react';
import { Stack, Chip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { tokens } from '@/theme/theme';

interface CategoryFilterProps {
  categories: string[];
  active: string;
  onChange: (value: string) => void;
}

function CategoryFilter({
  categories,
  active,
  onChange,
}: CategoryFilterProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      flexWrap="wrap"
      useFlexGap
      sx={{ rowGap: 1 }}
    >
      {categories.map((cat) => {
        const isActive = cat === active;
        return (
          <Chip
            key={cat}
            label={cat}
            onClick={() => onChange(cat)}
            clickable
            sx={{
              px: 1.25,
              fontSize: 13,
              letterSpacing: '0.04em',
              color: isActive ? tokens.primary : 'text.secondary',
              borderColor: isActive
                ? alpha(tokens.primary, 0.55)
                : 'rgba(255,255,255,0.08)',
              background: isActive ? alpha(tokens.primary, 0.12) : 'transparent',
              '&:hover': {
                borderColor: alpha(tokens.primary, 0.55),
                color: tokens.primary,
                background: isActive
                  ? alpha(tokens.primary, 0.16)
                  : alpha('#ffffff', 0.04),
              },
              '&:focus-visible': {
                outline: 'none',
                borderColor: alpha(tokens.primary, 0.7),
                boxShadow: `0 0 0 3px ${alpha(tokens.primary, 0.25)}`,
              },
            }}
          />
        );
      })}
    </Stack>
  );
}

export default memo(CategoryFilter);
