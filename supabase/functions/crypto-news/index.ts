import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple sentiment analysis function
function analyzeSentiment(text: string): { score: number; label: string } {
  const bullishWords = ['surge', 'soar', 'rally', 'bullish', 'breakthrough', 'adoption', 'approval', 'growth', 'gain', 'rise', 'positive', 'upgrade', 'success', 'milestone', 'record', 'high', 'partnership', 'launch', 'expansion'];
  const bearishWords = ['crash', 'plunge', 'drop', 'fall', 'bearish', 'decline', 'loss', 'hack', 'exploit', 'vulnerability', 'ban', 'regulation', 'concern', 'warning', 'low', 'risk', 'threat', 'issue', 'problem'];
  
  const lowerText = text.toLowerCase();
  let bullishCount = 0;
  let bearishCount = 0;
  
  bullishWords.forEach(word => {
    if (lowerText.includes(word)) bullishCount++;
  });
  
  bearishWords.forEach(word => {
    if (lowerText.includes(word)) bearishCount++;
  });
  
  const score = (bullishCount - bearishCount) / Math.max(bullishCount + bearishCount, 1);
  
  if (score > 0.2) return { score, label: 'bullish' };
  if (score < -0.2) return { score, label: 'bearish' };
  return { score, label: 'neutral' };
}

function getNewsImage(category: string): string {
  const categoryImages: { [key: string]: string } = {
    'bitcoin': 'https://images.unsplash.com/photo-1518544866330-4e4815fbbcc3?w=800&h=400&fit=crop',
    'ethereum': 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=400&fit=crop',
    'regulation': 'https://images.unsplash.com/photo-1559526324-593bc54d86b4?w=800&h=400&fit=crop',
    'defi': 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
    'nft': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=400&fit=crop',
    'blockchain': 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=400&fit=crop',
    'default': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop'
  };
  
  const key = category.toLowerCase();
  return categoryImages[key] || categoryImages['default'];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching crypto news from NewsData.io...');
    
    // First try to fetch from NewsData.io API
    let news = [];
    
    try {
      const newsApiKey = Deno.env.get('NEWSDATA_API_KEY');
      
      if (newsApiKey) {
        const newsResponse = await fetch(
          `https://newsdata.io/api/1/crypto?apikey=${newsApiKey}&language=en&size=20`,
          {
            headers: {
              'Accept': 'application/json',
            },
          }
        );

        if (newsResponse.ok) {
          const newsData = await newsResponse.json();
          console.log(`Fetched ${newsData.results?.length || 0} articles from NewsData.io`);
          
          news = newsData.results?.map((article: any, index: number) => {
            const sentiment = analyzeSentiment(`${article.title} ${article.description || ''}`);
            const category = article.category?.[0] || 'Crypto';
            
            return {
              id: index + 1,
              title: article.title,
              summary: article.description || article.title,
              content: article.content || article.description || `Full article content for: ${article.title}. This article provides comprehensive coverage of the latest developments in the cryptocurrency space. Stay informed with the latest trends, market movements, and regulatory updates that shape the digital asset landscape.`,
              category: category.charAt(0).toUpperCase() + category.slice(1),
              time: article.pubDate,
              impact: sentiment.label,
              sentiment: sentiment.score,
              source: article.source_id || 'CryptoNews',
              author: article.creator?.[0] || 'Crypto Reporter',
              readTime: `${Math.max(2, Math.floor(Math.random() * 8) + 1)} min read`,
              tags: article.keywords || ['crypto', 'blockchain', 'news'],
              url: article.link,
              image: article.image_url || getNewsImage(category),
              views: Math.floor(Math.random() * 10000) + 500,
              featured: index < 3
            };
          }) || [];
        }
      }
    } catch (apiError) {
      console.log('NewsData.io API error, using fallback news:', apiError.message);
    }
    
    // Fallback to static news if API fails or no API key
    if (news.length === 0) {
      console.log('Using fallback news data');
      news = [
      {
        id: 1,
        title: "Bitcoin ETF Approval Drives Institutional Adoption to New Heights",
        summary: "Major financial institutions are rushing to offer Bitcoin ETF products following regulatory approvals, with over $2B in inflows recorded this week alone.",
        category: "Regulation",
        time: "2 hours ago",
        impact: "bullish",
        source: "Financial Times",
        url: "https://example.com/news1",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop&auto=format",
        author: "Sarah Johnson",
        readTime: "5 min read",
        tags: ["Bitcoin", "ETF", "Institutional", "Regulation"],
        content: `The cryptocurrency market experienced a seismic shift today as the Securities and Exchange Commission approved multiple Bitcoin Exchange-Traded Funds (ETFs), marking a historic moment for institutional adoption.

**Market Impact**
The approval triggered an immediate surge in Bitcoin's price, jumping 12% within hours of the announcement. Trading volumes exploded by 340% compared to previous daily averages, signaling massive institutional interest.

**Key Statistics:**
- Bitcoin price increase: +12.4% in 24 hours
- Trading volume surge: +340%
- Total ETF inflows: $2.8 billion in first day
- Institutional participants: 47 major firms

**Institutional Response**
Major investment firms including BlackRock, Fidelity, and VanEck reported substantial inflows into their newly approved Bitcoin ETF products. The enthusiasm from traditional finance has been overwhelming, with some funds reaching capacity limits within hours of launch.

"This represents a paradigm shift in how institutional investors view Bitcoin. We're seeing pension funds, endowments, and family offices all expressing serious interest." - Michael Novogratz, Galaxy Digital CEO

**Technical Analysis**
From a technical perspective, Bitcoin has broken through several key resistance levels, establishing new support at $68,000. The RSI indicates continued bullish momentum, though analysts warn of potential short-term profit-taking.

**Market Outlook**
With institutional adoption accelerating and regulatory clarity improving, many analysts are revising their Bitcoin price targets upward. The combination of limited supply and increasing demand from ETFs could create a sustained bull market.`
      },
      {
        id: 2,
        title: "DeFi Protocol Launches Revolutionary Yield Farming Mechanism",
        summary: "A new decentralized finance protocol introduces an innovative approach to yield farming that could potentially double investor returns while maintaining security standards.",
        category: "DeFi",
        time: "4 hours ago",
        impact: "bullish",
        source: "CoinDesk",
        url: "https://example.com/news2",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop&auto=format",
        author: "Alex Chen",
        readTime: "6 min read",
        tags: ["DeFi", "Yield Farming", "Innovation", "Security"],
        content: `A groundbreaking DeFi protocol has launched with a revolutionary yield farming mechanism that promises to transform how investors earn passive income from their cryptocurrency holdings.

**Innovation Overview**
The new protocol introduces dynamic yield optimization that automatically adjusts farming strategies based on market conditions, potentially doubling returns while maintaining strict security protocols.

**Key Features:**
- Dynamic yield optimization
- Automated risk management
- Cross-chain compatibility
- Enhanced security measures

**Security Measures**
The protocol underwent extensive security audits by leading firms including Trail of Bits and Consensys Diligence. All smart contracts are open source and have been tested through bug bounty programs.

**Market Response**
Early adopters have reported yields ranging from 15-30% APY, significantly higher than traditional DeFi protocols. The total value locked (TVL) reached $500 million within the first week of launch.

**Technical Implementation**
The protocol uses advanced algorithms to monitor market conditions and automatically rebalance portfolios for optimal yield generation. Machine learning models predict market movements and adjust strategies accordingly.

**Future Roadmap**
The development team plans to introduce additional features including governance tokens, insurance mechanisms, and integration with major DeFi protocols to create a comprehensive yield farming ecosystem.`
      },
      {
        id: 3,
        title: "Central Bank Digital Currency (CBDC) Pilot Program Shows Promising Results",
        summary: "Initial testing of the digital currency infrastructure demonstrates significant improvements in transaction speed and cost reduction compared to traditional banking systems.",
        category: "Government",
        time: "6 hours ago",
        impact: "neutral",
        source: "Reuters",
        url: "https://example.com/news3",
        image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=300&fit=crop&auto=format",
        author: "Maria Rodriguez",
        readTime: "4 min read",
        tags: ["CBDC", "Government", "Banking", "Innovation"],
        content: `The Federal Reserve's pilot program for a Central Bank Digital Currency (CBDC) has completed its initial testing phase, revealing significant improvements in transaction efficiency and cost reduction.

**Pilot Program Results**
The six-month pilot program involved 50 financial institutions and processed over 10 million transactions, demonstrating the viability of a digital dollar infrastructure.

**Performance Metrics:**
- Transaction speed: 2-3 seconds average
- Cost reduction: 85% compared to traditional wire transfers
- Uptime: 99.9% system availability
- Security incidents: Zero reported breaches

**Benefits Observed**
The CBDC infrastructure showed remarkable improvements in cross-border payments, reducing settlement times from days to minutes while maintaining full regulatory compliance.

**Industry Impact**
Financial institutions participating in the pilot reported significant operational savings and improved customer satisfaction due to faster transaction processing and lower fees.

**Privacy Considerations**
The Fed addressed privacy concerns by implementing advanced encryption and limiting data collection to essential transaction information required for regulatory compliance.

**Next Steps**
Based on the successful pilot results, the Fed will expand testing to include 200 additional institutions and explore consumer-facing applications of the digital currency.`
      },
      {
        id: 4,
        title: "NFT Marketplace Integration Brings Utility to Digital Art Collections",
        summary: "Leading NFT platforms are integrating new features that allow digital art collectors to earn passive income through their collections via innovative staking mechanisms.",
        category: "NFT",
        time: "8 hours ago",
        impact: "bullish",
        source: "Decrypt",
        url: "https://example.com/news4",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=300&fit=crop&auto=format",
        author: "David Kim",
        readTime: "5 min read",
        tags: ["NFT", "Digital Art", "Staking", "Utility"],
        content: `Major NFT marketplaces are revolutionizing digital art ownership by introducing staking mechanisms that allow collectors to earn passive income from their collections.

**New Utility Features**
The integration enables NFT holders to stake their digital assets to earn platform tokens, governance rights, and exclusive access to new drops, fundamentally changing the value proposition of NFT ownership.

**Earning Mechanisms:**
- Staking rewards: 5-15% APY in platform tokens
- Governance participation: Voting rights on platform decisions
- Exclusive access: Early access to premium collections
- Fractionalization: Ability to split high-value NFTs

**Market Response**
The announcement triggered a 40% surge in NFT trading volumes, with floor prices of major collections increasing by 20-30% as holders began staking their assets.

**Technical Implementation**
The staking mechanism uses smart contracts to securely lock NFTs while maintaining ownership rights. Rewards are distributed automatically based on staking duration and collection rarity.

**Creator Benefits**
Artists and creators benefit from increased demand for their work as staking utility adds long-term value beyond initial sales. Secondary market royalties also increase with higher trading volumes.

**Future Developments**
Platforms are exploring additional utility features including virtual world integration, metaverse experiences, and cross-platform compatibility to further enhance NFT value propositions.`
      },
      {
        id: 5,
        title: "Layer 2 Scaling Solutions Reduce Transaction Costs by 95%",
        summary: "New layer 2 implementations on Ethereum are showing remarkable efficiency gains, with transaction costs dropping to under $0.01 while maintaining security guarantees.",
        category: "Technology",
        time: "10 hours ago",
        impact: "bullish",
        source: "The Block",
        url: "https://example.com/news5",
        image: "https://images.unsplash.com/photo-1518546305-2d1e60d30d15?w=400&h=300&fit=crop&auto=format",
        author: "Emily Zhang",
        readTime: "7 min read",
        tags: ["Layer 2", "Ethereum", "Scaling", "Technology"],
        content: `Revolutionary Layer 2 scaling solutions are transforming Ethereum's efficiency, reducing transaction costs by 95% while maintaining the network's security guarantees.

**Technical Breakthrough**
The latest implementations use optimistic rollups and zero-knowledge proofs to process thousands of transactions off-chain before settling on the main Ethereum network.

**Performance Improvements:**
- Transaction costs: Reduced from $20 to under $0.01
- Processing speed: 2,000+ transactions per second
- Finality time: 1-2 seconds for instant confirmation
- Security: Full Ethereum mainnet security inherited

**Adoption Metrics**
Major DeFi protocols have migrated to Layer 2 solutions, with over $5 billion in total value locked across various L2 networks, representing a 300% increase from the previous quarter.

**User Experience**
The dramatic cost reduction has enabled micro-transactions and new use cases previously impossible on Ethereum, from gaming applications to social media platforms.

**Developer Ecosystem**
Over 500 decentralized applications have launched on Layer 2 networks, with development activity increasing by 250% as builders take advantage of lower costs and faster speeds.

**Network Effects**
The efficiency gains are creating a positive feedback loop, attracting more users and developers to the Ethereum ecosystem, further driving innovation and adoption.

**Future Roadmap**
Upcoming upgrades will introduce additional optimizations, including improved interoperability between different Layer 2 solutions and enhanced developer tools for seamless application deployment.`
      },
      {
        id: 6,
        title: "Cryptocurrency Adoption in Emerging Markets Reaches All-Time High",
        summary: "Developing countries are leading global cryptocurrency adoption, with mobile-first solutions enabling financial inclusion for millions of unbanked individuals.",
        category: "Adoption",
        time: "12 hours ago",
        impact: "bullish",
        source: "Bloomberg",
        url: "https://example.com/news6",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&auto=format",
        author: "Roberto Silva",
        readTime: "6 min read",
        tags: ["Adoption", "Emerging Markets", "Financial Inclusion", "Mobile"],
        content: `Cryptocurrency adoption in emerging markets has reached unprecedented levels, with mobile-first solutions providing financial services to millions of previously unbanked individuals.

**Global Adoption Statistics**
Recent studies show that developing countries account for 70% of global cryptocurrency usage, with mobile wallet applications leading the charge in financial inclusion.

**Regional Highlights:**
- Africa: 40% increase in crypto wallet adoption
- Latin America: 60% growth in remittance transactions
- Southeast Asia: 80% of users are first-time digital payment adopters
- Eastern Europe: 35% rise in crypto-based savings accounts

**Use Case Evolution**
Beyond speculation, cryptocurrencies are being used for everyday transactions, remittances, and as a store of value in countries with unstable local currencies.

**Mobile-First Innovation**
Smartphone applications have made cryptocurrency accessible to users without traditional banking infrastructure, enabling peer-to-peer transactions and micro-investments.

**Economic Impact**
The adoption has generated significant economic activity, with crypto-related businesses creating over 2 million jobs globally and contributing $12 billion to emerging market economies.

**Regulatory Response**
Governments are adapting regulatory frameworks to balance innovation with consumer protection, with several countries introducing comprehensive cryptocurrency legislation.

**Future Projections**
Analysts predict continued growth, with mobile cryptocurrency adoption expected to reach 1 billion users in emerging markets within the next three years.`
      },
      {
        id: 7,
        title: "Ethereum Shanghai Upgrade Completed Successfully",
        summary: "The network upgrade has been implemented without issues, enabling staking withdrawals and improving scalability for millions of users worldwide.",
        category: "Technology",
        time: "1 day ago",
        impact: "bullish",
        source: "Ethereum Foundation",
        url: "https://example.com/news7",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&auto=format",
        author: "Vitalik Buterin",
        readTime: "8 min read",
        tags: ["Ethereum", "Shanghai", "Staking", "Upgrade"],
        content: `The Ethereum network has successfully completed its highly anticipated Shanghai upgrade, marking another milestone in the blockchain's evolution toward greater efficiency and user accessibility.

**Upgrade Highlights**
The Shanghai upgrade introduces several critical improvements to the Ethereum network, with staking withdrawals being the most significant feature for users and validators.

**Key Features:**
- Staking withdrawals: Validators can now withdraw staked ETH
- Gas optimizations: Reduced transaction costs for smart contracts
- Validator improvements: Enhanced validator experience and rewards
- Network stability: Improved overall network performance

**Impact on Staking**
The ability to withdraw staked ETH has removed the final barrier for institutional investors who were hesitant to lock up their ETH indefinitely.

**Network Statistics Post-Upgrade:**
- Successful validator withdrawals: 95% completion rate
- Network stability: 100% uptime during upgrade
- Transaction processing: 15% improvement in throughput
- Gas fee reduction: 10% average decrease

**Validator Response**
Over 50,000 validators have already initiated withdrawal processes, with the majority choosing to restake their rewards to continue earning yield.

**Technical Implementation**
The upgrade was executed flawlessly across all network participants, demonstrating the maturity of Ethereum's governance and development processes.

**Future Roadmap**
The successful Shanghai upgrade paves the way for future enhancements, including proto-danksharding and further scalability improvements planned for the coming year.`
      },
      {
        id: 8,
        title: "Major Corporation Announces $500M Bitcoin Treasury Allocation",
        summary: "A Fortune 500 company has allocated $500 million of its treasury reserves to Bitcoin, following the corporate adoption trend started by Tesla and MicroStrategy.",
        category: "Adoption",
        time: "1 day ago",
        impact: "bullish",
        source: "Wall Street Journal",
        url: "https://example.com/news8",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop&auto=format",
        author: "Michael Thompson",
        readTime: "4 min read",
        tags: ["Corporate", "Bitcoin", "Treasury", "Adoption"],
        content: `A major Fortune 500 corporation has announced a $500 million allocation to Bitcoin as part of its treasury management strategy, joining the growing trend of corporate Bitcoin adoption.

**Strategic Decision**
The company cited Bitcoin's store of value properties and hedge against inflation as primary reasons for the allocation, following extensive board discussions and risk assessments.

**Market Impact**
The announcement triggered a 5% surge in Bitcoin price and renewed interest from other corporations considering similar treasury strategies.

**Corporate Adoption Trend:**
- Total corporate Bitcoin holdings: Over $100 billion
- Number of public companies holding Bitcoin: 50+
- Average allocation percentage: 5-10% of treasury
- Year-over-year growth: 400% increase in corporate adoption

**Risk Management**
The company implemented comprehensive risk management protocols, including custody solutions, insurance coverage, and regular portfolio rebalancing strategies.

**Shareholder Response**
Initial shareholder reaction has been positive, with institutional investors praising the forward-thinking approach to treasury management and inflation hedging.

**Implementation Timeline**
The Bitcoin acquisition will be completed over six months through dollar-cost averaging to minimize market impact and price volatility exposure.

**Future Considerations**
The company is exploring additional cryptocurrency investments and blockchain technology implementations across its business operations.`
      },
      {
        id: 9,
        title: "Decentralized Exchange Volume Hits Record $2.5 Trillion",
        summary: "Decentralized exchanges have processed over $2.5 trillion in trading volume this year, demonstrating the growing preference for non-custodial trading platforms.",
        category: "DeFi",
        time: "2 days ago",
        impact: "bullish",
        source: "DeFi Pulse",
        url: "https://example.com/news9",
        image: "https://images.unsplash.com/photo-1642790551116-18e150f248e3?w=400&h=300&fit=crop&auto=format",
        author: "Lisa Park",
        readTime: "5 min read",
        tags: ["DEX", "Trading", "Volume", "DeFi"],
        content: `Decentralized exchanges have achieved a historic milestone, processing over $2.5 trillion in trading volume this year, highlighting the explosive growth of non-custodial trading platforms.

**Volume Breakdown**
The record-breaking volume represents a 180% increase from the previous year, with major DEXs like Uniswap, SushiSwap, and Curve leading the charge.

**Platform Statistics:**
- Uniswap: $1.2 trillion (48% market share)
- SushiSwap: $400 billion (16% market share)
- Curve: $350 billion (14% market share)
- Other platforms: $550 billion (22% market share)

**User Growth**
The number of unique DEX users has grown to 8.5 million, with daily active users averaging 500,000 across all platforms.

**Innovation Drivers**
Advanced features like concentrated liquidity, yield farming, and cross-chain compatibility have attracted both retail and institutional traders to DEX platforms.

**Liquidity Improvements**
Total value locked in DEX protocols has reached $50 billion, providing deep liquidity and competitive pricing for large trades.

**Security Advantages**
The non-custodial nature of DEXs has proven attractive to users concerned about exchange hacks and regulatory risks, with zero major security incidents reported.

**Future Projections**
Industry analysts predict DEX volume could reach $5 trillion next year as more traditional finance institutions integrate with decentralized trading infrastructure.`
      },
      {
        id: 10,
        title: "Regulatory Clarity Emerges as Multiple Countries Adopt Crypto Frameworks",
        summary: "Several major economies have introduced comprehensive cryptocurrency regulatory frameworks, providing much-needed clarity for businesses and investors.",
        category: "Regulation",
        time: "2 days ago",
        impact: "bullish",
        source: "Reuters",
        url: "https://example.com/news10",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&auto=format",
        author: "James Wilson",
        readTime: "6 min read",
        tags: ["Regulation", "Framework", "Compliance", "Global"],
        content: `Major economies worldwide are implementing comprehensive cryptocurrency regulatory frameworks, marking a significant shift toward mainstream acceptance and institutional adoption.

**Global Regulatory Developments**
The coordinated approach across multiple jurisdictions provides unprecedented clarity for cryptocurrency businesses and investors seeking regulatory compliance.

**Key Jurisdictions:**
- United States: SEC clarity on digital asset classifications
- European Union: MiCA regulation implementation
- United Kingdom: FCA comprehensive crypto framework
- Japan: Enhanced digital asset licensing requirements
- Singapore: Expanded crypto service provider regulations

**Business Impact**
The regulatory clarity has unlocked billions in institutional investment and enabled traditional financial institutions to offer cryptocurrency services to their clients.

**Compliance Requirements**
New frameworks establish clear guidelines for anti-money laundering, customer protection, and operational requirements for cryptocurrency businesses.

**Market Response**
Cryptocurrency markets have responded positively to regulatory clarity, with increased trading volumes and institutional participation across all major digital assets.

**Innovation Support**
The frameworks balance consumer protection with innovation support, creating regulatory sandboxes for experimental blockchain technologies and services.

**Future Outlook**
Additional countries are expected to announce comprehensive cryptocurrency regulations in the coming months, furthering global harmonization of digital asset oversight.`
      }
    ];
    }

    return new Response(JSON.stringify({ news }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in crypto-news function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});