import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Lock, UserCheck } from 'lucide-react';

const Privacy = () => {
  return (
    <Layout>
      <SEOHead 
        title="Privacy Policy"
        description="MCKI Privacy Policy - Learn how we collect, use, and protect your personal information on our crypto arbitrage platform."
        keywords={["privacy policy", "data protection", "GDPR", "personal information", "crypto platform"]}
        noIndex={false}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: January 1, 2024
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>We collect information you provide directly to us, such as when you:</p>
              <ul>
                <li>Create an account on our platform</li>
                <li>Use our arbitrage scanning tools</li>
                <li>Contact our customer support</li>
                <li>Subscribe to our newsletter</li>
              </ul>
              
              <h4>Types of Information:</h4>
              <ul>
                <li><strong>Personal Information:</strong> Name, email address, phone number</li>
                <li><strong>Usage Data:</strong> How you interact with our platform</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
                <li><strong>Trading Data:</strong> Portfolio information, trading preferences</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Detect and prevent fraud and abuse</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>We implement appropriate technical and organizational measures to protect your personal information:</p>
              <ul>
                <li><strong>Encryption:</strong> All data is encrypted in transit and at rest</li>
                <li><strong>Access Controls:</strong> Strict access controls limit who can view your data</li>
                <li><strong>Regular Audits:</strong> We conduct regular security audits and assessments</li>
                <li><strong>Secure Infrastructure:</strong> Our platform is hosted on secure, enterprise-grade infrastructure</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information Sharing</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
              <ul>
                <li>With your explicit consent</li>
                <li>To trusted service providers who assist in operating our platform</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>You have the right to:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correct:</strong> Update or correct inaccurate information</li>
                <li><strong>Delete:</strong> Request deletion of your personal information</li>
                <li><strong>Export:</strong> Request a portable copy of your data</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              </ul>
              
              <p>To exercise these rights, contact us at <a href="mailto:privacy@mcki.site">privacy@mcki.site</a></p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>We use cookies and similar technologies to:</p>
              <ul>
                <li>Remember your preferences and settings</li>
                <li>Analyze site traffic and usage patterns</li>
                <li>Provide personalized content and features</li>
                <li>Improve site performance and security</li>
              </ul>
              
              <p>You can control cookies through your browser settings. However, disabling cookies may affect site functionality.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>International Transfers</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <ul>
                <li>Email: <a href="mailto:privacy@mcki.site">privacy@mcki.site</a></li>
                <li>Address: MCKI Platform, Privacy Office</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;