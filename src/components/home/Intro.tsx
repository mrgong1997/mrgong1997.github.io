import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { tokens } from '@/theme/theme';
import { variants, viewport } from '@/theme/motion';

export default function Intro() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        position: 'relative',
      }}
    >
      <Container maxWidth="md">
        <motion.div
          variants={variants.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.div variants={variants.fadeUpSm}>
            <Typography
              sx={{
                fontSize: 12,
                letterSpacing: '0.4em',
                color: tokens.primary,
                textTransform: 'uppercase',
                mb: 3,
                textAlign: 'center',
              }}
            >
              About the series
            </Typography>
          </motion.div>
          <motion.div variants={variants.fadeUp}>
            <Typography
              component="h2"
              sx={{
                fontFamily: '"Cormorant Garamond", "Noto Sans SC", serif',
                fontSize: { xs: 32, md: 48 },
                lineHeight: 1.25,
                textAlign: 'center',
                mb: 4,
              }}
            >
              我拍下那些几乎被忽略的瞬间，
              <br />
              让光为它们留一个证据。
            </Typography>
          </motion.div>
          <motion.div variants={variants.fadeUpSm}>
            <Typography
              sx={{
                fontSize: { xs: 15, md: 17 },
                lineHeight: 1.9,
                color: 'rgba(245,245,247,0.72)',
                textAlign: 'center',
                maxWidth: 680,
                mx: 'auto',
              }}
            >
              这里的每一张照片都不是一次重要事件的记录，
              更多的是走路时目光停留的半秒、城市缝隙里意外的折射，
              或是一场日落被云慢慢吃掉的全过程。
              <br />
              我喜欢把它们放在一起，像翻阅自己写得不太整齐的日记。
            </Typography>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}
