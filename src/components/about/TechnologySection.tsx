import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TechFeature {
  title: string;
  description: string;
  gradient: string;
  textColor: string;
}

interface TechnologySectionProps {
  icon: any;
  features: TechFeature[];
}

export const TechnologySection = ({ icon: TechIcon, features }: TechnologySectionProps) => {
  return (
    <Card className="mb-16 overflow-hidden">
      <CardHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CardTitle className="flex items-center justify-center space-x-2 text-center">
            <TechIcon className="h-6 w-6" />
            <span>Our Technology</span>
          </CardTitle>
        </motion.div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`text-center p-6 border border-border rounded-lg ${feature.gradient} hover:shadow-lg transition-all duration-300`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <h3 className={`font-semibold mb-3 ${feature.textColor}`}>
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};