import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, TrendingUp, Shield, Info } from 'lucide-react';

const Disclaimer = () => {
  return (
    <Layout>
      <SEOHead 
        title="Disclaimer"
        description="MCKI Disclaimer - Important information about using our cryptocurrency arbitrage platform and investment risks."
        keywords={["disclaimer", "investment risks", "crypto trading", "financial disclaimer", "risk warning"]}
        noIndex={false}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <AlertTriangle className="h-16 w-16 text-warning mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Disclaimer</h1>
            <p className="text-muted-foreground">
              Important information about risks and limitations | mcki.site
            </p>
        </div>

        <div className="space-y-8">
          <Card className="border-warning">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertTriangle className="h-5 w-5" />
                Risk Warning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">
                Trading cryptocurrencies involves substantial risk of loss and is not suitable for all investors. 
                Past performance is not indicative of future results. You should carefully consider whether 
                cryptocurrency trading is appropriate for you in light of your financial condition.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                General Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>The information provided on the MCKI platform is for educational and informational purposes only. It should not be considered as financial, investment, legal, or tax advice.</p>
              
              <p>MCKI Platform ("we", "us", "our") provides cryptocurrency arbitrage intelligence tools and market analysis. We do not provide personalized investment advice or recommendations.</p>
              
              <h4>Key Points:</h4>
              <ul>
                <li>All content is provided "as is" without warranties of any kind</li>
                <li>Information may be delayed, inaccurate, or incomplete</li>
                <li>Market conditions can change rapidly</li>
                <li>Technical analysis and indicators are not guarantees of future performance</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Investment Risks
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>Cryptocurrency trading involves significant risks, including but not limited to:</p>
              
              <h4>Market Risks:</h4>
              <ul>
                <li><strong>Volatility:</strong> Cryptocurrency prices can fluctuate dramatically</li>
                <li><strong>Liquidity:</strong> Some markets may have limited liquidity</li>
                <li><strong>Market Manipulation:</strong> Smaller markets may be subject to manipulation</li>
                <li><strong>Regulatory Changes:</strong> Government regulations can impact market conditions</li>
              </ul>
              
              <h4>Technical Risks:</h4>
              <ul>
                <li><strong>Exchange Risks:</strong> Exchanges may experience downtime or security breaches</li>
                <li><strong>Network Congestion:</strong> Blockchain networks may become congested</li>
                <li><strong>Smart Contract Risks:</strong> DeFi protocols may contain bugs or vulnerabilities</li>
                <li><strong>Private Key Loss:</strong> Loss of private keys results in permanent loss of funds</li>
              </ul>
              
              <h4>Arbitrage-Specific Risks:</h4>
              <ul>
                <li><strong>Execution Risk:</strong> Price differences may disappear before trades are completed</li>
                <li><strong>Transfer Delays:</strong> Network delays may impact arbitrage opportunities</li>
                <li><strong>Fee Impact:</strong> Trading and withdrawal fees may reduce or eliminate profits</li>
                <li><strong>Exchange Risk:</strong> Counterparty risk with multiple exchanges</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>No Financial Advice</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>MCKI does not provide financial, investment, or trading advice. We are not licensed financial advisors, and nothing on our platform should be construed as:</p>
              
              <ul>
                <li>Investment recommendations</li>
                <li>Trading signals or advice</li>
                <li>Financial planning guidance</li>
                <li>Tax advice</li>
                <li>Legal counsel</li>
              </ul>
              
              <p><strong>You should consult with qualified professionals before making any investment decisions.</strong></p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Accuracy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>While we strive to provide accurate and up-to-date information, we cannot guarantee:</p>
              
              <ul>
                <li>Real-time accuracy of price data</li>
                <li>Completeness of market information</li>
                <li>Availability of arbitrage opportunities</li>
                <li>Accuracy of calculations or analytics</li>
              </ul>
              
              <p>Market data may be delayed, and prices shown may not reflect current market conditions. Always verify information independently before making trading decisions.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>To the maximum extent permitted by law, MCKI Platform shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from:</p>
              
              <ul>
                <li>Use of our platform or services</li>
                <li>Reliance on information provided</li>
                <li>Trading losses or missed opportunities</li>
                <li>Technical issues or service interruptions</li>
                <li>Third-party actions or omissions</li>
              </ul>
              
              <p>You acknowledge that you use our platform at your own risk and that you are solely responsible for your trading decisions.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regulatory Compliance</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>Cryptocurrency regulations vary by jurisdiction and may change frequently. It is your responsibility to:</p>
              
              <ul>
                <li>Understand applicable laws in your jurisdiction</li>
                <li>Comply with local regulations</li>
                <li>Report transactions as required by tax authorities</li>
                <li>Ensure you are legally permitted to trade cryptocurrencies</li>
              </ul>
              
              <p>MCKI Platform does not provide legal or regulatory advice. Consult with qualified legal professionals regarding compliance requirements.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>Our platform may integrate with or provide information about third-party services, including cryptocurrency exchanges and DeFi protocols. We are not responsible for:</p>
              
              <ul>
                <li>Third-party service availability or reliability</li>
                <li>Security breaches or hacks affecting third parties</li>
                <li>Changes to third-party terms or fees</li>
                <li>Actions or omissions of third-party providers</li>
              </ul>
              
              <p>Always review the terms and conditions of third-party services before using them.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Updates to This Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>We may update this disclaimer from time to time to reflect changes in our services, applicable laws, or industry standards. Continued use of our platform after any such changes constitutes acceptance of the updated disclaimer.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>If you have questions about this disclaimer or our services, please contact us:</p>
              <ul>
                <li>Email: <a href="mailto:legal@mcki.site">legal@mcki.site</a></li>
                <li>Subject: Disclaimer Inquiry</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Disclaimer;