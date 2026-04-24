import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { LayoutGrid, CalendarRange } from 'lucide-react';

export type ViewMode = 'masonry' | 'timeline';

interface ViewModeToggleProps {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}

export default function ViewModeToggle({ value, onChange }: ViewModeToggleProps) {
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={value}
      onChange={(_, next) => {
        if (next) onChange(next as ViewMode);
      }}
      sx={{
        backdropFilter: 'blur(20px)',
        background: 'rgba(255,255,255,0.04)',
        borderRadius: 999,
        p: 0.25,
        '& .MuiToggleButton-root': {
          borderRadius: 999,
          px: 1.75,
          py: 0.5,
          gap: 0.75,
          fontSize: 12.5,
          letterSpacing: '0.06em',
          border: 'none',
        },
      }}
    >
      <ToggleButton value="masonry" aria-label="瀑布流视图">
        <LayoutGrid size={14} />
        瀑布流
      </ToggleButton>
      <ToggleButton value="timeline" aria-label="时间线视图">
        <CalendarRange size={14} />
        时间线
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
