import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MissionVisionProps {
  mission: {
    icon: any;
    title: string;
    content: string;
  };
  vision: {
    icon: any;
    title: string;
    content: string;
  };
}

export const MissionVision = ({ mission, vision }: MissionVisionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-primary/5 border-primary/20 h-full hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-primary">
              <mission.icon className="h-6 w-6" />
              <span>{mission.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {mission.content}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="bg-success/5 border-success/20 h-full hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-success">
              <vision.icon className="h-6 w-6" />
              <span>{vision.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {vision.content}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};