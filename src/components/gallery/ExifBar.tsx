import { Box, Stack, Typography } from '@mui/material';
import { Camera, Aperture, Timer, Gauge, Calendar, Focus } from 'lucide-react';
import type { ExifData } from '@/types/photo';

interface ExifBarProps {
  exif?: ExifData;
  compact?: boolean;
}

export default function ExifBar({ exif, compact = false }: ExifBarProps) {
  if (!exif) return null;

  const items: Array<{ icon: React.ReactNode; label: string }> = [];

  const cameraLabel = [exif.make, exif.model].filter(Boolean).join(' ');
  if (cameraLabel) items.push({ icon: <Camera size={14} />, label: cameraLabel });
  if (exif.lens) items.push({ icon: <Focus size={14} />, label: exif.lens });
  if (exif.focalLength) items.push({ icon: <Focus size={14} />, label: exif.focalLength });
  if (exif.aperture) items.push({ icon: <Aperture size={14} />, label: exif.aperture });
  if (exif.shutterSpeed) items.push({ icon: <Timer size={14} />, label: exif.shutterSpeed });
  if (exif.iso) items.push({ icon: <Gauge size={14} />, label: `ISO ${exif.iso}` });
  if (exif.date) items.push({ icon: <Calendar size={14} />, label: exif.date });

  if (!items.length) return null;

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      rowGap={compact ? 0.5 : 1}
      columnGap={compact ? 1.5 : 2}
      sx={{
        color: 'text.secondary',
        fontSize: compact ? 11 : 12.5,
        letterSpacing: '0.03em',
      }}
    >
      {items.map((item, idx) => (
        <Stack
          key={idx}
          direction="row"
          spacing={0.75}
          alignItems="center"
          sx={{ minHeight: compact ? 18 : 22 }}
        >
          <Box sx={{ color: 'primary.main', display: 'inline-flex' }}>{item.icon}</Box>
          <Typography
            component="span"
            variant="inherit"
            sx={{ whiteSpace: 'nowrap' }}
          >
            {item.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
