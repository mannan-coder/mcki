import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Cookie, Settings, Eye, BarChart3 } from 'lucide-react';

const Cookies = () => {
  const cookieTypes = [
    {
      icon: Settings,
      type: "Essential Cookies",
      purpose: "Required for basic site functionality",
      examples: ["Authentication", "Security", "Form submission"],
      canDisable: false,
      badge: "Always Active"
    },
    {
      icon: Eye,
      type: "Functional Cookies",
      purpose: "Remember your preferences and settings",
      examples: ["Language preferences", "Theme settings", "Layout customization"],
      canDisable: true,
      badge: "Optional"
    },
    {
      icon: BarChart3,
      type: "Analytics Cookies",
      purpose: "Help us understand how you use our site",
      examples: ["Page views", "User interactions", "Performance metrics"],
      canDisable: true,
      badge: "Optional"
    }
  ];

  return (
    <Layout>
      <SEOHead 
        title="Cookie Policy"
        description="MCKI Cookie Policy - Learn about how we use cookies and similar technologies on our cryptocurrency arbitrage platform."
        keywords={["cookie policy", "cookies", "tracking", "privacy", "data collection"]}
        noIndex={false}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Cookie className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: January 1, 2024
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>What Are Cookies?</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better browsing experience by remembering your preferences and understanding how you use our platform.</p>
              
              <p>Similar technologies like web beacons, pixels, and local storage may also be used to enhance your experience and provide analytics insights.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Use Cookies</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>We use cookies for several purposes:</p>
              <ul>
                <li><strong>Authentication:</strong> Keep you logged in securely</li>
                <li><strong>Preferences:</strong> Remember your settings and customizations</li>
                <li><strong>Analytics:</strong> Understand how our platform is used</li>
                <li><strong>Performance:</strong> Optimize loading times and functionality</li>
                <li><strong>Security:</strong> Protect against fraud and unauthorized access</li>
              </ul>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cookieTypes.map((cookie, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <cookie.icon className="h-8 w-8 text-primary" />
                    <Badge variant={cookie.canDisable ? "secondary" : "default"}>
                      {cookie.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{cookie.type}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{cookie.purpose}</p>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Examples:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {cookie.examples.map((example, i) => (
                        <li key={i}>• {example}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Cookies</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>We may allow trusted third parties to set cookies on our website for the following purposes:</p>
              
              <h4>Analytics Services:</h4>
              <ul>
                <li>Google Analytics - Website usage statistics</li>
                <li>Mixpanel - User behavior analysis</li>
              </ul>
              
              <h4>Support Services:</h4>
              <ul>
                <li>Intercom - Customer support chat</li>
                <li>Zendesk - Help desk functionality</li>
              </ul>
              
              <p>These third parties have their own privacy policies and cookie practices. We recommend reviewing their policies to understand how they handle your data.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Managing Your Cookie Preferences</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>You have several options for managing cookies:</p>
              
              <h4>Browser Settings:</h4>
              <p>Most browsers allow you to:</p>
              <ul>
                <li>View and delete existing cookies</li>
                <li>Block third-party cookies</li>
                <li>Block all cookies (may affect site functionality)</li>
                <li>Receive notifications when cookies are set</li>
              </ul>
              
              <h4>Platform Settings:</h4>
              <p>You can manage your cookie preferences directly on our platform through your account settings.</p>
              
              <div className="flex gap-4 mt-6">
                <Button>Cookie Preferences</Button>
                <Button variant="outline">Browser Help</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookie Retention</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>Different types of cookies are retained for different periods:</p>
              
              <ul>
                <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Remain for a set period (typically 30 days to 2 years)</li>
                <li><strong>Analytics Cookies:</strong> Usually retained for 26 months</li>
                <li><strong>Preference Cookies:</strong> Retained until you clear them or they expire</li>
              </ul>
              
              <p>You can delete cookies at any time through your browser settings or our cookie management tool.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Updates to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.</p>
              
              <p>When we make changes, we will update the "Last updated" date at the top of this policy and may notify you through our platform or via email.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>If you have any questions about our use of cookies or this Cookie Policy, please contact us:</p>
              <ul>
                <li>Email: <a href="mailto:privacy@mcki.online">privacy@mcki.online</a></li>
                <li>Subject: Cookie Policy Inquiry</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Cookies;