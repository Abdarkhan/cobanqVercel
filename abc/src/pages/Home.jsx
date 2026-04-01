// import Layout from '@/components/layout/Layout'
// import MotionWrapper from '@/components/common/MotionWrapper'
// import Typography from '@mui/material/Typography'
// // import { Button } from '@mui/material'
// import Button from '@mui/material/Button'


// const Home = () => {

//   return (
//     <Layout>

//       <MotionWrapper>
//         <Typography variant="h1" gutterBottom>
//           Welcome
//         </Typography>


//         {/* <Typography variant="h1" sx={{ backgroundColor: 'text.primary', color: 'text.secondary' }} gutterBottom>
//           Welcome
//         </Typography> */}

//         <Button variant="contained" color="secondary">
//           Get Started
//         </Button>
//       </MotionWrapper>
//     </Layout>
//   )
// }

// export default Home


import { useState } from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { fadeUp, zoomIn } from "@/utils/animations";
import { AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import HeroCard from "@/components/common/HeroCard";
import CTASection from "@/components/common/CTASection";
import HeroSection from "@/components/common/HeroSection";
import RatesSection from "@/components/common/RatesSection";
import StepsSection from "@/components/common/StepsSection";
import MotionWrapper from "@/components/common/MotionWrapper";
import ExploreSection from "@/components/common/ExploreSection";
import FeaturesSection from "@/components/common/FeaturesSection";
import SendMoneyDestinations from "@/components/common/SendMoneyDestinations";
import CardsSection from "@/components/common/CardSection";
import BankBeyond from "@/components/common/BankBeyond";
import BodySection from "@/components/common/BodySection";


const SCROLL_THRESHOLD = 360;

export default function Home() {
  const [showCard, setShowCard] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > SCROLL_THRESHOLD && !showCard) setShowCard(true);
    if (latest <= SCROLL_THRESHOLD && showCard) setShowCard(false);
  });

  return (
    <>
      <Box
      // sx={{
      //    minHeight: { xs: "100vh", md: "140vh" } 
      // }}
      >
        <Box
          sx={{
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <motion.div
            key="hero-section"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              // position: "absolute",
              inset: 0,
              pointerEvents: "all",
            }}
          >
            <HeroSection />
          </motion.div>
        </Box>
      </Box>
      <MotionWrapper
        {...zoomIn}
      >
        <CTASection />
      </MotionWrapper>
      <MotionWrapper
        {...zoomIn}
      >
        <BodySection />
      </MotionWrapper>

      <MotionWrapper
        {...fadeUp}
      >
        <FeaturesSection />
      </MotionWrapper>
      <CardsSection />
      {/* <MotionWrapper
        {...zoomIn}
      >
        <RatesSection />
      </MotionWrapper> */}


      <SendMoneyDestinations />
      <BankBeyond />
      <ExploreSection />
      {/* <MotionWrapper
        {...zoomIn}
      >

        <StepsSection />
      </MotionWrapper> */}


    </>
  );
}
