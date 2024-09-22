import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import IdeaCard from "@/components/IdeaCard";
import { Idea } from "@/types/idea";

interface AnimatedIdeaCardProps {
  idea: Idea;
  isSmallCard?: boolean;
}
const AnimatedIdeaCard: React.FC<AnimatedIdeaCardProps> = ({
  idea,
  isSmallCard,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.4 }}
    >
      <IdeaCard idea={idea} isSmallCard={isSmallCard} />
    </motion.div>
  );
};

export default AnimatedIdeaCard;
