import { Stack, Chip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { tokens } from '@/theme/theme';

interface CategoryFilterProps {
  categories: string[];
  active: string;
  onChange: (value: string) => void;
}

export default function CategoryFilter({
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
              borderColor: isActive ? alpha(tokens.primary, 0.5) : undefined,
              background: isActive
                ? alpha(tokens.primary, 0.1)
                : undefined,
              '&:hover': {
                borderColor: alpha(tokens.primary, 0.5),
                color: tokens.primary,
              },
            }}
          />
        );
      })}
    </Stack>
  );
}
