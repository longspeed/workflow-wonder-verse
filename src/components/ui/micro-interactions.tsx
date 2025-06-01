import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useHover } from "@/hooks/useHover";

interface MicroInteractionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  whileHover?: Parameters<typeof motion.div>["0"];
  whileTap?: Parameters<typeof motion.div>["0"];
  transition?: Parameters<typeof motion.div>["0"]["transition"];
}

const MicroInteraction: React.FC<MicroInteractionProps> = ({
  children,
  className,
  whileHover,
  whileTap,
  transition,
  ...props
}) => {
  return (
    <motion.div
      className={cn(className)}
      whileHover={whileHover}
      whileTap={whileTap}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0.2, className, ...props }) => {
  return (
    <AnimatePresence>
      <motion.div
        className={cn(className)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2, delay }}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

interface HoverCardProps extends Omit<MicroInteractionProps, 'content'> {
  content: React.ReactNode;
  trigger: React.ReactNode;
}

const HoverCard: React.FC<HoverCardProps> = ({ content, trigger, ...props }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [ref, isHovering] = useHover<HTMLDivElement>();

  React.useEffect(() => {
    setIsHovered(isHovering);
  }, [isHovering]);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }} {...props}>
      {trigger}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { MicroInteraction, FadeIn, HoverCard };
