// InvestorGradify Behavioural Finance (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Rational investors and their limits
LV: Introductory · Foundation
S: Traditional finance assumes investors are rational, use all available information and maximise expected utility. This lesson explains that assumption, Herbert Simon's idea of bounded rationality, and how behavioural finance studies the predictable ways real investors depart from it.
O: Describe the rational investor assumed in traditional finance
O: Explain bounded rationality, heuristics and biases
O: Evaluate why behavioural finance matters for private investors
H: The rational investor
P: Much of finance theory, from modern portfolio theory to the efficient market hypothesis, assumes a **rational investor**: someone who weighs all relevant information, updates beliefs correctly when news arrives, has stable preferences and chooses the option with the highest **expected utility**. Such an investor diversifies, ignores sunk costs and does not trade on emotion. **Behavioural finance** combines psychology with economics to study how real people actually decide. Herbert Simon (1955) argued that people have **bounded rationality**: limited time, information and mental capacity mean they use **heuristics**, or mental short cuts, that are usually good enough but can go wrong. Daniel Kahneman and Amos Tversky showed that these errors are systematic, not random, so they can be studied and anticipated.
H: Heuristics and biases
- A **heuristic** is a rule of thumb that speeds up decisions, such as judging likelihood by how easily examples come to mind.
- A **bias** is a systematic error that results when a heuristic is applied in the wrong setting.
- **Cognitive biases** arise from how we process information, such as anchoring or confirmation bias.
- **Emotional biases** arise from feelings, such as fear, regret and loss aversion.
- Kahneman described fast, intuitive **System 1** thinking and slow, deliberate **System 2** thinking.
H: Why it matters
- Biases can lead investors to trade too much, sell in panics and chase recent winners.
- Studies of fund flows show many investors earn less than the funds they hold, because of poor timing.
- Biases may also affect market prices, contributing to bubbles and anomalies.
- Knowing about a bias does not make you immune to it; systems and rules help more than willpower.
- UK regulators, including the FCA, use behavioural research in designing disclosure and consumer protection.
X: Two investors, one market fall (illustrative example).
> The stock market falls 20% in two months.
> A textbook rational investor checks that her plan, time horizon and diversification still fit, and rebalances by buying shares.
> A real investor, Ben, reads alarming headlines, feels the pain of the loss and sells to 'stop it getting worse'.
> When the market recovers, Ben has locked in his loss and must decide when to get back in.
K: Traditional finance assumes rational investors, but people have bounded rationality and use heuristics that create systematic biases, which behavioural finance studies and investors can guard against.
!: Assuming that being clever or well informed removes bias. Biases are features of how all people think, including experts; good processes help more than intelligence.
EV: established | Kahneman and Tversky's research showed that judgement under uncertainty departs from rational models in systematic, predictable ways.
EV: contested | How much individual investor biases affect overall market prices, rather than just individual returns, is debated.
T: Bounded rationality | Rational decision-making limited by time, information and mental capacity
T: Heuristic | A mental short cut or rule of thumb used to make decisions quickly
T: Behavioural finance | The study of how psychological factors affect financial decisions and markets
SUM: Traditional finance assumes rational investors.
SUM: Heuristics cause systematic biases.
SUM: Systems help more than willpower.
SRC: Simon H. A., A behavioral model of rational choice, Quarterly Journal of Economics 69(1) | primary | 1955
SRC: Tversky A. and Kahneman D., Judgment under uncertainty: heuristics and biases, Science 185(4157) | primary | 1974
SRC: Kahneman D., Thinking, Fast and Slow, Farrar, Straus and Giroux | secondary | 2011
Q: What is bounded rationality? | The idea that people make decisions with limited time, information and mental capacity, so they use short cuts.
Q: What is the difference between a heuristic and a bias? | A heuristic is a mental short cut; a bias is the systematic error that results when it misleads.
M1#investing-u09-01-q1@1: Which statement describes the rational investor of traditional finance? | Uses all relevant information and chooses the highest expected utility | Relies on gut feeling and the views of friends when investing | Trades often to take advantage of every price movement | Avoids all risk by keeping savings only in cash | The rational investor weighs all information, updates correctly and maximises expected utility.
M2#investing-u09-01-q2@2: Which is an example of an emotional bias rather than a cognitive bias? | Selling in a panic because a loss feels unbearable | Estimating a value by starting from a recent price | Overweighting information that is easy to recall | Misjudging probability from a small sample of data | Emotional biases arise from feelings such as fear and regret; the others are information-processing errors.
TF1#investing-u09-01-q3@3: Investors who have learned about behavioural biases are no longer affected by them. | false | Knowing about a bias does not remove it; research suggests rules, automation and checklists are more effective than awareness alone.
M3#investing-u09-01-q4@3: Why does it matter that investor biases are systematic rather than random? | Systematic errors can be anticipated, and designed against, by investors and regulators | Random errors are more expensive for investors than systematic ones | Systematic errors always cancel out across many investors | Random errors only affect professional fund managers | Predictable errors can be anticipated, so they can be guarded against with rules and design.
SA2#investing-u09-01-q5@2,3: Explain why behavioural finance is useful to a private investor. | Behavioural finance shows that people use heuristics that lead to predictable errors, such as panic selling, overtrading and chasing past winners. These errors can cost investors a large share of the returns their investments actually earn. Because the errors are systematic, investors can protect themselves with plans, automatic investing, diversification and rules made in calm conditions. Understanding biases also helps investors judge market moods and news more critically. | Predictable errors ; Cost to returns ; Protective systems ; Critical view of markets

## Loss aversion and prospect theory
LV: Introductory · Application
S: Prospect theory describes how people actually value gains and losses. This lesson explains loss aversion, reference points and the different attitudes to risk for gains and losses, and how they affect investment decisions.
O: Explain the main features of prospect theory
O: Calculate the effect of loss aversion on a simple gamble
O: Evaluate how loss aversion affects investor behaviour
H: Prospect theory
P: Kahneman and Tversky's **prospect theory** (1979) replaced the rational model with a description of real choices. People judge outcomes as **gains or losses** relative to a **reference point**, such as the price they paid, rather than by their total wealth. Losses hurt more than equal gains please: this is **loss aversion**, and later estimates suggest losses weigh roughly twice as heavily as gains (Tversky and Kahneman, 1992). The **value function** is concave for gains, so people tend to be **risk-averse** when facing gains, and convex for losses, so they tend to be **risk-seeking** when trying to avoid a sure loss. People also overweight small probabilities, which helps explain the appeal of lotteries and of insurance.
H: Key features
- **Reference dependence**: outcomes are judged against a starting point, often the purchase price.
- **Loss aversion**: a loss of £100 feels about as bad as a gain of about £200 feels good.
- **Risk aversion for gains**: people prefer a sure gain to a gamble with a slightly higher expected value.
- **Risk seeking for losses**: people gamble to avoid locking in a loss.
- **Probability weighting**: small chances of big outcomes are overweighted.
H: Effects on investing
- Loss aversion makes volatile assets feel worse than their long-run returns justify.
- **Myopic loss aversion**: checking a portfolio often reveals more losses, making shares feel riskier (Benartzi and Thaler, 1995).
- Investors may hold losing shares to avoid realising a loss, and sell winners too soon.
- Fear of loss can keep people in cash for too long, at the cost of real returns.
- Framing a portfolio over a long horizon, and checking it less often, reduces the pain.
X: A gamble through loss-averse eyes (illustrative figures).
> A coin is tossed: heads you win £300, tails you lose £100.
> Expected value = 0.5 × £300 − 0.5 × £100 = £100, so a rational investor accepts.
> With losses weighted twice as heavily, the felt value is 0.5 × 300 − 0.5 × 2 × 100 = 50, still positive.
> But if the win were only £150, the felt value would be 75 − 100 = −25, and most people would refuse a bet with a positive expected value.
K: Prospect theory shows people judge outcomes against a reference point, feel losses about twice as strongly as gains, avoid risk for gains and seek it to escape losses, which shapes many investment mistakes.
!: Judging an investment by whether it is above or below the price you paid. The purchase price is irrelevant to future returns; what matters is the investment's prospects from today.
EV: established | Experiments repeatedly find that people weigh losses more heavily than equal gains, with typical estimates of loss aversion around two.
EV: contested | Some researchers argue that loss aversion is smaller, or depends on the size and context of the stakes, than early studies suggested.
T: Prospect theory | A model of decision-making in which outcomes are valued as gains or losses relative to a reference point
T: Loss aversion | The tendency for losses to feel more painful than equal gains feel pleasant
T: Reference point | The starting point, such as a purchase price, against which gains and losses are judged
SUM: Outcomes are judged against a reference point.
SUM: Losses weigh about twice as much as gains.
SUM: Checking often makes shares feel riskier.
SRC: Kahneman D. and Tversky A., Prospect theory: an analysis of decision under risk, Econometrica 47(2) | primary | 1979
SRC: Tversky A. and Kahneman D., Advances in prospect theory: cumulative representation of uncertainty, Journal of Risk and Uncertainty 5(4) | primary | 1992
SRC: Benartzi S. and Thaler R. H., Myopic loss aversion and the equity premium puzzle, Quarterly Journal of Economics 110(1) | primary | 1995
Q: What is loss aversion? | The tendency for losses to hurt more than equal gains please, by roughly two to one.
Q: What is myopic loss aversion? | Loss aversion made worse by checking investments often, so more losses are seen.
M1#investing-u09-02-q1@1: In prospect theory, against what are gains and losses judged? | A reference point such as the purchase price | The investor's total lifetime wealth | The average return of the stock market | The rate of inflation in the economy | Prospect theory says people judge outcomes relative to a reference point, not by final wealth.
NUM2#investing-u09-02-q2@2: A bet pays £300 on heads and loses £100 on tails. Assuming losses feel twice as bad as gains, what is the 'felt' value of the bet in pounds? | 50 | 0.01 | £ | Felt value = 0.5 × 300 − 0.5 × 2 × 100 = 150 − 100 = 50, compared with an expected value of £100.
M2#investing-u09-02-q3@2: Why might an investor who checks their portfolio daily feel shares are riskier than one who checks yearly? | Daily checks reveal many more small losses, which loss aversion amplifies | Shares are genuinely more volatile for investors who check daily | Daily checking increases the fees taken from the portfolio | Yearly checkers receive higher dividends from the same shares | Over short periods shares fall often, so frequent checking magnifies the pain of losses.
M3#investing-u09-02-q4@3: An investor's shares have fallen 30% and she says she will sell 'once they get back to what I paid'. What is the main bias, and the better question to ask? | Reference dependence; she should ask whether she would buy them today | Overconfidence; she should ask how many shares her friends own | Herding; she should ask what the newspapers recommend | Recency; she should ask what the shares did last week | The purchase price is a reference point; the relevant question is the shares' future prospects.
SA2#investing-u09-02-q5@2,3: Explain how loss aversion can harm a long-term investor, and suggest ways to reduce its effects. | Loss aversion makes losses feel about twice as painful as gains, so investors may avoid shares despite their long-run returns, panic-sell in falls and hold losers to avoid realising losses. Checking portfolios often magnifies this by revealing more short-term losses. The investor can set a long-term plan, check less often, judge performance over long periods, hold a diversified portfolio and automate contributions. Framing investments by long-term goals rather than daily values reduces the pain of short-term falls. | Effect of loss aversion ; Myopic checking ; Practical remedies ; Long-term framing

## Overconfidence
LV: Introductory · Application
S: Overconfidence leads people to overrate their knowledge, skill and control. This lesson explains the forms of overconfidence, the evidence that it causes excessive trading, and how investors can check it.
O: Describe the main forms of overconfidence
O: Explain the evidence linking overconfidence and excessive trading
O: Evaluate ways to guard against overconfidence
H: Forms of overconfidence
P: **Overconfidence** is one of the most robust findings in psychology. It takes several forms. **Miscalibration** means people's estimates are too precise: when asked for a range they are 90% sure contains the answer, they are right far less often. The **better-than-average effect** means most people rate themselves above average, for example as drivers or investors. The **illusion of control** is the belief that we can influence outcomes that are largely due to chance. **Self-attribution bias** means we credit successes to our skill and blame failures on bad luck, so we learn too little from mistakes. In a rising market, gains can feel like proof of skill, which feeds further overconfidence.
H: Evidence from investors
- Barber and Odean (2000) found that US households that traded most earned the lowest net returns.
- Barber and Odean (2001) found men traded about 45% more than women and reduced their net returns more.
- Overconfident investors hold too few shares, so they are poorly diversified.
- Online trading and apps can increase trading by making it fast and game-like.
- Professionals are also affected; most active fund managers fail to beat their benchmarks.
H: Guarding against overconfidence
- Keep a record of predictions and decisions, and check how often you were right.
- Assume your forecasts are less precise than they feel, and widen your ranges.
- Diversify instead of concentrating on a few high-conviction picks.
- Compare your results honestly with a simple tracker benchmark.
- Add friction before trading, such as a waiting period or a written reason.
X: The cost of trading more (illustrative figures).
> Hannah trades her £20,000 share portfolio heavily, turning it over twice a year.
> Each round trip costs about 1% in dealing charges, spreads and stamp duty.
> Two round trips cost about 2% a year, or £400.
> To match a buy-and-hold investor in the same shares, her trades must add more than 2% a year, which few investors achieve.
K: Overconfidence, through miscalibration, the better-than-average effect, illusion of control and self-attribution, leads investors to trade too much and diversify too little, lowering returns.
!: Treating a run of good results as proof of skill. In a rising market most portfolios gain; compare your returns with a tracker before concluding you have an edge.
EV: established | Barber and Odean (2000) found that the households that traded most earned the lowest net returns, consistent with overconfidence.
EV: contested | Whether differences in trading between men and women reflect overconfidence or other factors, such as attitudes to risk, is debated.
T: Overconfidence | Overestimating one's knowledge, skill or the precision of one's forecasts
T: Illusion of control | Believing one can influence outcomes that are mainly due to chance
T: Self-attribution bias | Crediting successes to skill and blaming failures on bad luck
SUM: Overconfidence takes several forms.
SUM: It leads to overtrading and poor diversification.
SUM: Records and benchmarks keep it in check.
SRC: Barber B. M. and Odean T., Boys will be boys: gender, overconfidence, and common stock investment, Quarterly Journal of Economics 116(1) | primary | 2001
SRC: Odean T., Volume, volatility, price, and profit when all traders are above average, Journal of Finance 53(6) | primary | 1998
SRC: Kahneman D., Thinking, Fast and Slow, Farrar, Straus and Giroux | secondary | 2011
Q: What is miscalibration? | Being too precise in estimates, so that confidence ranges are too narrow.
Q: What did Barber and Odean (2001) find about men and women investors? | Men traded about 45% more than women and reduced their net returns by more.
M1#investing-u09-03-q1@1: Which describes the better-than-average effect? | Most people rate their own skill as above average | Most investors beat the average return of the market | Average investors earn better returns than experts | Average shares perform better than the best shares | Rating oneself above average is a common form of overconfidence.
M2#investing-u09-03-q2@2: An investor says her winning shares show her skill, but her losing shares were 'just bad luck'. Which bias is this? | Self-attribution bias | Anchoring bias | Herding behaviour | Mental accounting | Taking credit for success and blaming luck for failure is self-attribution bias.
NUM2#investing-u09-03-q3@2: An investor turns over a £20,000 portfolio twice a year, and each round trip costs 1%. What is the yearly trading cost in pounds? | 400 | 0.5 | £ | Two round trips at 1% each cost about 2% a year, and 2% of £20,000 is £400.
M3#investing-u09-03-q4@3: Which is the most effective way for an investor to test whether they really have stock-picking skill? | Record every decision and compare results with a tracker over years | Count how many of their shares have risen since they bought them | Ask friends whether they think the investor is skilled at picking | Look only at their best single investment over the past year | A full record against a fair benchmark over a long period avoids selective memory and luck.
SA2#investing-u09-03-q5@1,3: Explain how overconfidence can reduce an investor's returns and how it can be checked. | Overconfidence leads investors to overrate their skill and the precision of their forecasts, so they trade too often, paying dealing costs, spreads and stamp duty, and concentrate on a few shares, losing diversification. Self-attribution means they learn little from mistakes. Evidence from Barber and Odean shows the most active traders earned the lowest returns. Investors can keep a record of decisions, compare with a tracker, diversify and add friction such as waiting periods before trading. | Forms of overconfidence ; Overtrading and concentration ; Evidence ; Practical checks

## Anchoring and investment decisions
LV: Introductory · Application
S: Anchoring is the tendency to rely too heavily on a first number when making estimates. This lesson explains the anchoring effect, how it shows up in investing, and how to reduce it.
O: Define anchoring and adjustment
O: Identify anchors commonly used by investors
O: Evaluate strategies to reduce the effect of anchors
H: Anchoring and adjustment
P: Tversky and Kahneman (1974) showed that people asked to estimate a quantity start from an initial number, the **anchor**, and adjust from it, but usually **adjust too little**. Remarkably, even obviously irrelevant anchors, such as a number from a spinning wheel, influenced people's estimates. In investing, natural anchors include the **purchase price**, a share's **52-week high**, a round number on an index, or an analyst's target. Anchoring can make investors slow to react to genuine news: if a company's prospects have permanently worsened, the old price may no longer be a guide to value, yet it still shapes expectations.
H: Anchors in investing
- **Purchase price**: treating the price you paid as what the share is 'really' worth.
- **Past highs**: assuming a share that has fallen from 800p to 400p must be cheap.
- **Round numbers**: such as 'the FTSE 100 will reach 10,000'.
- **Analysts' targets and forecasts**, which can themselves be anchored to the current price.
- **Past returns**: expecting future returns to resemble the last few years.
H: Reducing anchoring
- Value an investment from its fundamentals before looking at its price history.
- Ask whether you would buy the investment today at today's price.
- Consider several reference points, including a range of valuations.
- Seek views that start from different assumptions.
- Write down your reasoning so you can see whether a number has crept in from elsewhere.
X: An anchored decision (illustrative example).
> A retailer's shares peaked at 900p two years ago and now trade at 300p after it lost market share online.
> Joe thinks: 'They were 900p, so 300p must be a bargain.'
> Analysis of current cash flows suggests a value of about 250p to 350p.
> The 900p anchor has no bearing on today's value; the shares may be fairly priced or even expensive.
K: Anchoring makes investors rely too much on initial numbers, such as purchase prices and past highs, and adjust too little to new information; valuing from fundamentals and asking whether you would buy today reduces it.
!: Believing a share must be cheap because it is far below its previous high. Past prices reflect past expectations; what matters is the value of future cash flows.
EV: established | Experiments by Tversky and Kahneman (1974) and many later studies show that estimates are pulled towards initial anchors, even irrelevant ones.
EV: contested | George and Hwang (2004) found that shares near their 52-week highs earned higher subsequent returns, which some attribute to investors anchoring on the high and under-reacting to news.
T: Anchoring | Relying too heavily on an initial number when making an estimate
T: Adjustment | Moving an estimate away from the anchor, usually by too little
T: 52-week high | The highest price a share has reached over the past year
SUM: Estimates start from an anchor.
SUM: People adjust too little.
SUM: Ask whether you would buy at today's price.
SRC: Tversky A. and Kahneman D., Judgment under uncertainty: heuristics and biases, Science 185(4157) | primary | 1974
SRC: George T. J. and Hwang C., The 52-week high and momentum investing, Journal of Finance 59(5) | primary | 2004
SRC: Montier J., Behavioural Investing: A Practitioner's Guide to Applying Behavioural Finance, Wiley | secondary | 2007
Q: What is anchoring? | Relying too heavily on a first number when making an estimate and adjusting too little from it.
Q: Name two common anchors for investors. | The purchase price and a share's past high (also round index numbers and analysts' targets).
M1#investing-u09-04-q1@1: In anchoring, what usually happens to the adjustment from the anchor? | It is too small | It is too large | It is random | It is exactly right | Tversky and Kahneman found that people adjust insufficiently from their starting point.
MATCH2#investing-u09-04-q2@2: Match each investor statement to the anchor involved. | 'I'll sell when I'm back to break-even' = Purchase price ; 'It was 900p last year, so it's cheap' = Past high ; 'The index must hit 10,000 soon' = Round number ; 'The broker says it's worth 500p' = Analyst target | Each statement uses a reference number that may have nothing to do with future value.
M2#investing-u09-04-q3@2: Why can even irrelevant anchors affect estimates? | Estimates begin from whatever number is in mind and adjust too little | People always know that irrelevant numbers are useless and ignore them | Irrelevant numbers are banned from financial documents in the UK | Anchors only affect people who have never invested before | Experiments with random numbers showed anchors pull estimates towards them regardless of relevance.
M3#investing-u09-04-q4@3: Which approach best reduces anchoring when deciding whether to keep a share? | Value it afresh and ask whether you would buy it today at today's price | Wait until it returns to the price you paid before deciding anything | Compare it only with its highest price over the last five years | Follow the latest analyst target price without further thought | A fresh valuation focuses on future prospects rather than historical reference points.
SA2#investing-u09-04-q5@1,3: Explain how anchoring can affect an investor holding a share that has fallen sharply, and how they could decide more rationally. | The investor may anchor on the purchase price or the share's past high, believing it is now cheap or waiting to sell until it returns to that level. These numbers reflect past expectations and say nothing about future value. A more rational approach is to value the business from its current prospects, consider a range of outcomes, and ask whether they would buy the share today. If not, holding it simply because of the anchor is hard to justify. | Anchors involved ; Irrelevance of past prices ; Fresh valuation ; Would you buy today

## Herding
LV: Introductory · Application
S: Herding is the tendency to follow what others are doing. This lesson explains why investors herd, the difference between rational and irrational herding, and how herding can push prices away from value.
O: Explain why investors follow the crowd
O: Distinguish informational cascades from emotional herding
O: Evaluate the effects of herding on markets and individual returns
H: Following the crowd
P: **Herding** occurs when investors copy others rather than relying on their own information and analysis. It can feel safe: if everyone is buying, it must be right, and if you are wrong, you are wrong together. Some herding is **rational**: if others seem to know something, it can make sense to follow them. But this can create an **information cascade** (Bikhchandani, Hirshleifer and Welch, 1992), in which people ignore their own information and copy earlier choosers, so a chain of decisions rests on very little real information. Professional fund managers may also herd because of **career risk**: losing money in a popular share is easier to explain than losing money on an unusual bet.
H: Signs and causes of herding
- Rapid inflows into funds or sectors that have recently done well.
- Popular 'must-own' shares discussed widely in the media and online.
- Social proof: the belief that the crowd's behaviour shows what is correct.
- **Fear of missing out (FOMO)** when others appear to be getting rich.
- Benchmark-hugging by fund managers worried about underperforming peers.
H: Effects
- Herding can push prices well above or below fundamental value.
- It contributes to bubbles, as in the dot-com boom of the late 1990s, and to crashes.
- Investors who herd tend to buy after prices have risen and sell after they have fallen.
- Contrarian investors try to profit by going against the crowd, which is hard to time.
- Crowds are not always wrong; the problem is following without independent judgement.
X: A cascade in action (illustrative example).
> Two friends say they have bought a new electric car maker's shares, and online forums are full of praise.
> Maya has doubts about the company's losses, but assumes others know more and buys.
> Others see Maya and her friends buying, and do the same.
> The share price rises far above any reasonable valuation, resting on very little independent analysis.
K: Herding is following others rather than one's own analysis; information cascades and career risk make it common, and it can drive prices away from value and lead investors to buy high and sell low.
!: Treating popularity as evidence of value. A share being widely bought means its price already reflects that enthusiasm; it says nothing about whether it is cheap.
EV: established | Bikhchandani, Hirshleifer and Welch (1992) showed how information cascades can lead people to ignore their own information and follow others.
EV: contested | How much herding by professional investors moves market prices, rather than reflecting shared information, is debated.
T: Herding | Following the actions of other investors rather than one's own analysis
T: Information cascade | A sequence in which people copy earlier decisions and ignore their own information
T: Career risk | The risk to a professional's job from performing differently from peers
SUM: Herding feels safe but can mislead.
SUM: Cascades rest on little real information.
SUM: Popularity is not value.
SRC: Bikhchandani S., Hirshleifer D. and Welch I., A theory of fads, fashion, custom, and cultural change as informational cascades, Journal of Political Economy 100(5) | primary | 1992
SRC: Shiller R. J., Irrational Exuberance, Princeton University Press | secondary | 2000
SRC: Scharfstein D. S. and Stein J. C., Herd behavior and investment, American Economic Review 80(3) | primary | 1990
Q: What is an information cascade? | A chain of decisions in which people copy earlier choices and ignore their own information.
Q: Why might professional fund managers herd? | Career risk: losing money in a popular holding is easier to defend than losing on an unusual bet.
M1#investing-u09-05-q1@1: What is herding in investing? | Copying other investors rather than using your own analysis | Spreading money across many different investments | Selling shares to lock in a guaranteed profit | Buying shares only from companies in your own country | Herding means following the crowd's decisions.
M2#investing-u09-05-q2@2: Why can an information cascade lead to mispricing? | Each person copies others, so prices rest on little independent information | Each investor carries out detailed research before buying | Regulators require investors to copy each other's trades | Cascades only happen in markets where no trading is allowed | When people ignore their own information, the crowd's decision can be based on very few real signals.
TF2#investing-u09-05-q3@3: Herding always leads investors to the wrong decision. | false | Crowds are sometimes right; the problem is following without independent judgement, which can push prices far from value and lead to buying high and selling low.
M3#investing-u09-05-q4@3: A fund manager holds the same large shares as the index, though she thinks several are overvalued. Which explanation fits best? | Career risk makes it safer to match peers than to be wrong alone | She is required by law to hold every share in the index | She has an information advantage over every other manager | Large shares are always undervalued compared with small ones | Being wrong with the crowd is less damaging to a career than being wrong alone, so managers may herd.
SA2#investing-u09-05-q5@2,3: Explain why herding can harm private investors and how they can avoid it. | Herding leads investors to buy what is popular after prices have already risen and to sell after falls, so they buy high and sell low. Information cascades mean the crowd may be acting on very little real information, and popular shares can become overvalued, as in the dot-com boom. Investors can avoid herding by following a written plan, diversifying, doing their own analysis or using index funds, and being wary of FOMO and of social media enthusiasm. Pausing before acting on popular tips also helps. | Buy high, sell low ; Cascades and overvaluation ; Written plan and diversification ; Caution about FOMO and tips

## Recency and availability in markets
LV: Introductory · Application
S: Recency bias and the availability heuristic lead people to give too much weight to recent and memorable events. This lesson explains both, how they affect expectations of returns and risk, and how to take a longer view.
O: Define recency bias and the availability heuristic
O: Explain how they affect investors' expectations
O: Evaluate ways to counter them with long-run evidence
H: What comes to mind easily
P: Tversky and Kahneman described the **availability heuristic**: people judge how likely something is by how easily examples come to mind. Vivid, recent or widely reported events, such as a crash or a spectacular winner, are easy to recall, so they are judged more likely than they really are. **Recency bias** is the related tendency to give too much weight to recent events and assume recent trends will continue. In investing, this leads people to expect high returns after a strong run and low returns after a fall, so they buy after markets have risen and sell after they have fallen, the opposite of what long-run valuation evidence suggests.
H: Effects on investors
- After a strong year, investors expect more of the same and pile in.
- After a crash, shares feel much riskier, and many stay out during the recovery.
- Funds that top recent performance tables attract large inflows, though performance rarely persists.
- Vivid stories of individual winners make big gains seem common.
- Rare events that have not happened recently, such as high inflation, may be underestimated.
H: Taking the long view
- Look at long-run data, such as decades of returns on shares, bonds and cash.
- Remember that average returns include bad years: in many decades shares have fallen sharply at least once.
- Judge funds over at least five to ten years and through different market conditions.
- Base expectations on valuation and long-run averages, not the last few years.
- Write down your plan in calm times, so recent events do not drive decisions.
X: Recency and fund flows (illustrative figures).
> A technology fund returned 45% last year, and it tops the performance tables.
> Investors put in large sums, expecting similar returns to continue.
> Over the following two years the sector falls 30% as valuations reset.
> Investors who arrived late lose money, while the fund's long-term figures still look good.
K: The availability heuristic and recency bias make recent and vivid events seem more likely to continue, leading investors to chase recent winners and flee after falls; long-run evidence and a written plan counter them.
!: Expecting next year's returns to look like last year's. Short-run returns are highly variable and tell you little about the next period.
EV: established | Studies of fund flows find that investors put money into funds after strong recent performance, although performance shows little persistence.
EV: established | Greenwood and Shleifer (2014) found that surveys of investor expectations track recent past returns and are negatively related to subsequent returns.
T: Availability heuristic | Judging likelihood by how easily examples come to mind
T: Recency bias | Giving too much weight to recent events and expecting trends to continue
T: Performance chasing | Buying investments because of strong recent returns
SUM: Easy-to-recall events seem more likely.
SUM: Recent trends are over-extrapolated.
SUM: Use long-run data and a written plan.
SRC: Tversky A. and Kahneman D., Availability: a heuristic for judging frequency and probability, Cognitive Psychology 5(2) | primary | 1973
SRC: Greenwood R. and Shleifer A., Expectations of returns and expected returns, Review of Financial Studies 27(3) | primary | 2014
SRC: Dimson E., Marsh P. and Staunton M., Triumph of the Optimists: 101 Years of Global Investment Returns, Princeton University Press | data | 2002
Q: What is the availability heuristic? | Judging how likely something is by how easily examples come to mind.
Q: What did Greenwood and Shleifer (2014) find about investor expectations? | They follow recent returns and are negatively related to subsequent returns.
M1#investing-u09-06-q1@1: Which describes recency bias? | Giving too much weight to recent events | Preferring investments with a long record | Ignoring news until it is a year old | Basing decisions on long-run averages | Recency bias overweights the latest events and assumes they will continue.
M2#investing-u09-06-q2@2: After a major crash, many investors judge shares to be much riskier and stay in cash. Which heuristic is most involved? | Availability, because the vivid crash is easy to recall | Anchoring, because the index has a round number | Mental accounting, because cash is in a separate pot | Confirmation, because they read only good news | The vivid memory of the crash makes another one seem more likely than it is.
TF1#investing-u09-06-q3@2: Funds at the top of last year's performance tables usually remain at the top the following year. | false | Research shows little persistence among top performers, yet recency bias draws investors into last year's winners.
M3#investing-u09-06-q4@3: Which practice best counters recency bias when setting expected returns? | Using long-run data and current valuations instead of the last few years | Assuming next year's return will equal the average of the last two years | Increasing expected returns after every strong year in the market | Consulting the most-read investment headlines that week | Long-run evidence and valuations give a steadier base than recent performance.
SA2#investing-u09-06-q5@2,3: Explain how recency bias and availability can lead investors to buy high and sell low. | Recency bias makes investors expect recent trends to continue, so after strong rises they expect more gains and buy, often when valuations are high. Availability means vivid recent events, such as a crash, seem more likely, so after falls they fear further losses and sell, often near the bottom. Together these lead to buying after rises and selling after falls. Investors can counter this with long-run data, a written plan and automatic investing that removes timing decisions. | Recency after rises ; Availability after falls ; Buy high, sell low ; Remedies

## The disposition effect
LV: Intermediate · Application
S: The disposition effect is the tendency to sell winning investments too soon and hold losing ones too long. This lesson explains its causes in prospect theory and regret, the evidence, and its costs, including tax effects for UK investors.
O: Define the disposition effect
O: Explain the causes of the disposition effect
O: Evaluate the costs of the disposition effect and how to avoid it
H: Selling winners, holding losers
P: Shefrin and Statman (1985) named the **disposition effect**: investors are more willing to sell shares that have risen than shares that have fallen. Terrance Odean (1998) studied 10,000 US brokerage accounts and confirmed that investors realised gains far more readily than losses, even though the winners they sold went on to outperform the losers they kept. Prospect theory explains this: relative to the purchase price, investors are **risk-averse in gains**, so they lock in a sure profit, and **risk-seeking in losses**, so they hold on hoping to get back to break-even. **Regret aversion** adds to it: selling a loser means admitting a mistake, while selling a winner brings the **pride** of a confirmed success.
H: Why it is costly
- Winners sold too early may continue to rise, as momentum research suggests.
- Losers held too long may keep falling, especially if the business has deteriorated.
- The portfolio drifts towards the investor's worst ideas.
- Outside an ISA or pension, realising gains triggers Capital Gains Tax once the annual exempt amount is used, while losses can offset gains.
- The UK CGT annual exempt amount has been £3,000 since 6 April 2024 (HMRC).
H: Avoiding it
- Judge each holding on its future prospects, not on whether it shows a gain or loss.
- Set rules in advance for when to review or sell, such as a change in your original reason for buying.
- Rebalance to target weights, which sells what has grown and buys what has shrunk according to a plan.
- Use index funds or diversified funds, which remove the temptation to sell individual winners.
- Outside tax wrappers, consider realising losses to offset gains, within HMRC rules.
X: Which to sell? (illustrative figures).
> Zara needs £5,000 and owns two shares, each worth £5,000.
> Share A cost £3,000 (a £2,000 gain); Share B cost £7,000 (a £2,000 loss), and its outlook has worsened.
> The disposition effect pushes her to sell A to 'bank the profit'.
> Outside an ISA, selling B instead realises a £2,000 loss she can set against other gains, and removes the weaker holding.
K: The disposition effect leads investors to sell winners too soon and hold losers too long, driven by loss aversion and regret, which can lower returns and increase tax.
!: Selling winners to 'lock in profits' while holding losers 'until they come back'. The decision should depend on each holding's prospects, not on the purchase price.
EV: established | Odean (1998) found that investors realised gains much more readily than losses, and that the winners they sold outperformed the losers they kept.
EV: contested | Whether the disposition effect is best explained by prospect theory, regret, or a mistaken belief that prices mean-revert is debated.
T: Disposition effect | The tendency to sell winning investments too early and hold losing ones too long
T: Regret aversion | Avoiding actions that would mean admitting a mistake
T: Annual exempt amount | The amount of capital gains an individual can make each tax year free of CGT
SUM: Investors sell winners and keep losers.
SUM: Loss aversion and regret drive it.
SUM: Judge holdings on prospects, not purchase price.
SRC: Shefrin H. and Statman M., The disposition to sell winners too early and ride losers too long: theory and evidence, Journal of Finance 40(3) | primary | 1985
SRC: Odean T., Are investors reluctant to realize their losses?, Journal of Finance 53(5) | primary | 1998
SRC: HM Revenue and Customs, Capital Gains Tax: what you pay it on, rates and allowances, gov.uk | guidance | 2025 | https://www.gov.uk/capital-gains-tax
Q: What is the disposition effect? | The tendency to sell winning investments too soon and hold losing ones too long.
Q: What was the UK CGT annual exempt amount from 6 April 2024? | £3,000.
M1#investing-u09-07-q1@1: Which behaviour shows the disposition effect? | Selling shares that have risen while holding those that have fallen | Buying more shares after a fall to lower the average cost | Spreading money equally across many funds in a portfolio | Holding all shares for the long term regardless of price | The disposition effect is a reluctance to realise losses combined with eagerness to realise gains.
M2#investing-u09-07-q2@2: How does prospect theory explain the disposition effect? | Investors are risk-averse for gains and risk-seeking for losses | Investors are risk-seeking for gains and risk-averse for losses | Investors weigh gains twice as heavily as equal losses | Investors ignore the price they paid when deciding to sell | Locking in gains avoids risk; holding losers is a gamble to escape a sure loss.
NUM2#investing-u09-07-q3@3: Outside an ISA, an investor realises a £5,000 gain on one share and a £2,000 loss on another in the same tax year, and has no other gains. Using the £3,000 annual exempt amount, how much of the gain is taxable, in pounds? | 0 | 0.01 | £ | Net gain = £5,000 − £2,000 = £3,000, and the £3,000 annual exempt amount covers it, so 0 pounds is taxable.
M3#investing-u09-07-q4@3: An investor holds a share at a loss because selling would 'make the loss real'. What is the best advice? | The loss already exists; decide on the share's prospects from today | Hold until the price returns to the purchase price, then sell | Buy more of the share so that the average cost is lower | Sell all the winning shares to balance the portfolio | The price paid is a sunk cost; only future prospects should drive the decision.
SA3#investing-u09-07-q5@1,3: Evaluate the costs of the disposition effect for a private investor and suggest how to avoid it. | The disposition effect leads investors to sell winners and hold losers, so portfolios drift towards weaker holdings; Odean found the winners sold later outperformed the losers kept. Outside tax wrappers, it can also mean paying more Capital Gains Tax, as gains are realised and losses that could offset them are not. However, selling winners can sometimes be sensible rebalancing. Investors can avoid the bias by judging each holding on its prospects, setting sell rules in advance, rebalancing to targets and using diversified funds. | Portfolio drift and evidence ; Tax costs ; Distinguish from rebalancing ; Remedies

## Mental accounting
LV: Introductory · Application
S: Mental accounting is the habit of treating money differently depending on where it came from or which mental 'pot' it is in. This lesson explains Richard Thaler's idea, how it helps and harms investors, and how to look at finances as a whole.
O: Define mental accounting
O: Identify examples of mental accounting in personal finance and investing
O: Evaluate when mental accounting is helpful or harmful
H: Money in labelled pots
P: Richard Thaler (1985, 1999) described **mental accounting**: people sort money into separate mental accounts, such as 'holiday money', 'bills money' or 'house deposit', and treat each pot by different rules, even though money is **fungible**, meaning any pound can be used for anything. People may spend a tax refund or bonus freely as 'found money' while carefully guarding their salary. Investors may treat dividends as spendable income but would never sell shares to raise the same cash, or keep a high-interest debt while holding low-interest savings. They also tend to judge each investment separately, rather than looking at the portfolio as a whole, a habit known as **narrow framing**.
H: Common examples
- Keeping savings at 4% while paying 20% or more on a credit card balance.
- Gambling with 'house money', taking more risk with recent gains than with original capital.
- Spending dividends but refusing to sell shares, even when total return is what matters.
- Judging each holding alone, so a portfolio's diversification benefits are overlooked.
- Treating a bonus or inheritance differently from earned income.
H: When pots help and when they harm
- Labelled goals, such as an emergency fund or a pension, can improve saving discipline.
- Separate pots can stop savings being spent impulsively.
- Pots harm when they lead to paying more interest than you earn, or to poor diversification.
- Narrow framing can make investors over-react to losses in one holding.
- Review your whole balance sheet, assets and debts, at least once a year.
X: Savings versus a credit card (illustrative figures).
> Lena has £2,000 in a 'holiday fund' earning 4% and a £2,000 credit card balance charging 20%.
> Over a year, her savings earn £80, while the card costs £400 in interest.
> Using the savings to clear the card would save a net £320 a year.
> She can rebuild the holiday fund from the money no longer spent on interest.
K: Mental accounting treats money differently by source or label, which can support saving goals but can also lead to costly debt, 'house money' risk-taking and narrow framing of investments.
!: Keeping cash savings in a labelled pot while paying a much higher rate on debt. Money is fungible; clearing expensive debt is usually the best risk-free return available.
EV: established | Thaler's research on mental accounting showed that people do not treat money as fully fungible, contrary to standard economic theory.
EV: established | Benartzi and Thaler (1995) linked narrow framing and loss aversion to investors' reluctance to hold shares.
T: Mental accounting | Treating money differently depending on its source or intended use
T: Fungible | Interchangeable, so that any pound can be used for any purpose
T: Narrow framing | Judging each decision or holding separately rather than as part of a whole
SUM: People sort money into mental pots.
SUM: Pots can help saving but cause costly mistakes.
SUM: Look at the whole balance sheet.
SRC: Thaler R. H., Mental accounting and consumer choice, Marketing Science 4(3) | primary | 1985
SRC: Thaler R. H., Mental accounting matters, Journal of Behavioral Decision Making 12(3) | primary | 1999
SRC: Money and Pensions Service, MoneyHelper: how to prioritise debts, moneyhelper.org.uk | guidance | 2025 | https://www.moneyhelper.org.uk
Q: What does it mean that money is fungible? | Any pound is interchangeable with any other and can be used for any purpose.
Q: What is the 'house money' effect? | Taking more risk with recent gains than with original capital.
M1#investing-u09-08-q1@1: Which is an example of mental accounting? | Treating a tax refund as 'free money' to spend | Diversifying a portfolio across many countries | Comparing a fund's returns with its benchmark | Calculating the after-tax return on a bond | Treating money differently because of its source is mental accounting.
NUM2#investing-u09-08-q2@2: Lena has £2,000 of savings earning 4% a year and a £2,000 credit card balance at 20% a year. How much a year, in pounds, would she save overall by using the savings to clear the card? | 320 | 0.5 | £ | The card costs £2,000 × 20% = £400 and the savings earn £2,000 × 4% = £80, so the net saving is £400 − £80 = £320.
M2#investing-u09-08-q3@2: An investor spends all his dividends but refuses to sell any shares to fund spending. What does this suggest? | He treats income and capital as separate pots, though total return matters | He has correctly maximised his total return after tax | He is avoiding all tax by spending only dividends | He holds only bonds, which do not pay dividends | Dividends and capital gains are both parts of total return; separating them is mental accounting.
M3#investing-u09-08-q4@3: When can mental accounting be helpful? | When labelled pots, such as an emergency fund, protect savings from impulse spending | When it leads an investor to keep a large overdraft alongside savings | When it encourages bigger risks with recent investment gains | When it leads to judging each share separately from the portfolio | Labelled goals can support discipline, even though money is fungible.
SA2#investing-u09-08-q5@2,3: Explain how mental accounting can cause investment mistakes and how an investor can avoid them. | Mental accounting leads people to treat money differently by label, so they may keep low-interest savings while paying high-interest debt, take more risk with 'house money' gains, or spend dividends while refusing to sell shares. Narrow framing means each holding is judged alone, so investors over-react to losses and overlook diversification. Investors can avoid these errors by reviewing their whole balance sheet, clearing expensive debt first, and judging the portfolio by its total return and risk. Labelled pots can still be kept for genuine goals. | Debt and savings ; House money and dividends ; Narrow framing ; Whole-portfolio view

## Confirmation bias
LV: Introductory · Application
S: Confirmation bias is the tendency to seek and favour information that supports what we already believe. This lesson explains how it affects investors, the role of echo chambers, and techniques to test views.
O: Define confirmation bias
O: Explain how confirmation bias affects investment research and decisions
O: Evaluate techniques that reduce confirmation bias
H: Seeing what we expect
P: **Confirmation bias** is the tendency to look for, interpret and remember information in ways that confirm existing beliefs, while discounting evidence against them (Nickerson, 1998). Once an investor has bought a share, they tend to read positive news about it, dismiss warnings as 'noise' and remember the times they were right. This makes beliefs stick even when the facts change. Online, algorithms show more of what you already engage with, and forums gather people who share a view, creating **echo chambers** that reinforce confirmation bias. The danger is not having a view but failing to test it.
H: Confirmation bias in investing
- Searching only for reasons why a share will rise after buying it.
- Interpreting mixed results as good news.
- Following commentators who agree with you and ignoring those who do not.
- Dismissing a falling share price as the market 'not understanding'.
- Holding on to an investment case long after its key assumptions have failed.
H: Testing your views
- Write down your **investment thesis** and what would prove it wrong before you buy.
- Actively seek the strongest **opposing case** (the 'bear case' for a share you like).
- Use a **pre-mortem**: imagine the investment has failed and ask why.
- Review decisions against your written reasons, not your memory.
- Diversify so that no single belief can do too much damage.
X: A thesis with a test (illustrative example).
> Priti buys shares in a supermarket because she expects its online sales to grow 15% a year.
> She writes: 'I will review if online growth is below 5% for two years running.'
> Two years later growth is 3% and 2%, but she has been reading upbeat articles about the brand.
> Her written test forces a review that her confirmation bias would otherwise have avoided.
K: Confirmation bias makes investors favour supporting evidence and ignore warnings, reinforced by echo chambers; a written thesis, a deliberate opposing case and pre-mortems help keep views honest.
!: Doing 'research' that only gathers support for a decision already made. Good research looks hardest for evidence that would prove you wrong.
EV: established | Nickerson's (1998) review found confirmation bias to be widespread across many domains of reasoning.
EV: contested | How strongly social media algorithms create echo chambers for financial information is still being studied.
T: Confirmation bias | Favouring information that supports existing beliefs and discounting evidence against them
T: Echo chamber | An environment where people mainly encounter views that match their own
T: Pre-mortem | Imagining a decision has failed and working out the likely reasons in advance
SUM: We favour evidence that agrees with us.
SUM: Echo chambers strengthen the bias.
SUM: Write a thesis and seek the opposing case.
SRC: Nickerson R. S., Confirmation bias: a ubiquitous phenomenon in many guises, Review of General Psychology 2(2) | primary | 1998
SRC: Klein G., Performing a project premortem, Harvard Business Review 85(9) | secondary | 2007
SRC: Montier J., Behavioural Investing: A Practitioner's Guide to Applying Behavioural Finance, Wiley | secondary | 2007
Q: What is confirmation bias? | Seeking and favouring information that supports existing beliefs while discounting contrary evidence.
Q: What is a pre-mortem? | Imagining that a decision has failed and asking why, before making it.
M1#investing-u09-09-q1@1: Which behaviour shows confirmation bias? | Reading only positive articles about a share you own | Selling a share after its business has deteriorated | Comparing a fund's results with a cheap tracker | Spreading investments across several asset classes | Seeking out supporting news while avoiding contrary views is confirmation bias.
SEQ2#investing-u09-09-q2@2: Put these steps for testing an investment idea in a sensible order. | Write down the investment thesis ; State what evidence would prove it wrong ; Seek out the strongest opposing case ; Review the thesis later against the written tests | Writing the thesis and its tests first lets you check later decisions against them rather than memory.
M2#investing-u09-09-q3@2: Why can online forums make confirmation bias worse? | They gather like-minded people and reinforce shared views | They are regulated to show only balanced views of shares | They prevent investors from buying shares they discuss | They always contain more negative than positive opinions | Echo chambers repeat agreeing views, so contrary evidence is rarely met.
M3#investing-u09-09-q4@3: Which is the most effective defence against confirmation bias? | Stating in advance what would prove your view wrong, then checking | Reading as many articles as possible that agree with your view | Asking only friends who already own the same investment | Relying on memory of why you made each past decision | Pre-set tests make it harder to explain away contrary evidence.
SA2#investing-u09-09-q5@1,3: Explain how confirmation bias can lead an investor to hold a poor investment and suggest ways to prevent this. | After buying, an investor may seek out positive news, interpret mixed results favourably and dismiss warnings, so they keep holding even when the reasons for buying no longer apply. Echo chambers online can reinforce this. To prevent it, the investor can write down the thesis and what would disprove it, seek the strongest opposing case, run a pre-mortem and review decisions against written notes. Diversification limits the damage if one belief proves wrong. | How the bias keeps poor holdings ; Echo chambers ; Written thesis and tests ; Opposing case and diversification

## Investor psychology in bubbles
LV: Intermediate · Evaluation
S: Bubbles are periods when prices rise far above fundamental value, driven largely by investor psychology. This lesson explains how biases combine in bubbles, the stages described by Minsky and Kindleberger, and what investors can learn.
O: Explain how behavioural biases combine to create bubbles
O: Describe the typical stages of a speculative bubble
O: Evaluate how a private investor can respond to a suspected bubble
H: How bubbles form
P: A **bubble** occurs when prices rise far above any reasonable estimate of value, sustained by expectations of further rises. Robert Shiller describes a **feedback loop**: rising prices attract attention, stories spread, new buyers arrive and prices rise further. Several biases combine: **recency** and **extrapolation** (prices rose, so they will keep rising), **herding** and **fear of missing out**, **overconfidence** among those who have already profited, and **confirmation bias** in favour of the 'new era' story. Charles Kindleberger, drawing on Hyman Minsky, described bubbles as following stages from a genuine new opportunity to euphoria and collapse. Bubbles usually start from something real, such as railways in the 1840s, the internet in the 1990s or US housing in the 2000s.
H: Typical stages
- **Displacement**: a genuine innovation or change creates new opportunities.
- **Boom**: prices rise, credit expands and media attention grows.
- **Euphoria**: valuations lose contact with fundamentals and 'this time is different' arguments spread.
- **Distress**: insiders and early investors begin to sell, and price rises stall.
- **Revulsion** (or panic): prices fall sharply as buyers disappear and credit tightens.
H: What investors can do
- Check valuations: very high price-to-earnings ratios or CAPE readings are a warning, not a timing signal.
- Be wary when friends with no interest in investing start recommending a hot asset.
- Keep to your asset allocation and rebalance, which trims assets that have risen strongly.
- Avoid borrowing to invest in rising assets.
- Accept that bubbles are hard to time: prices can rise for years before they fall.
X: The dot-com bubble (historical example).
> In the late 1990s internet companies with little or no profit reached very high valuations.
> The US Nasdaq Composite index rose more than sixfold from the start of 1995 to its peak in March 2000.
> It then fell by nearly 80% by October 2002.
> The internet did transform the economy, but most investors who bought at the peak lost heavily.
K: Bubbles arise when recency, herding, overconfidence and confirmation bias reinforce rising prices in a feedback loop; they tend to pass through displacement, boom, euphoria, distress and revulsion, and are hard to time.
!: Assuming a real innovation justifies any price. Many bubbles began with genuine breakthroughs; the error is paying a price that assumes unrealistic profits.
EV: established | The Nasdaq Composite fell by nearly 80% from its March 2000 peak to its low in October 2002.
EV: contested | Whether bubbles can be reliably identified in advance, as Shiller argues, or only in hindsight, as Fama has suggested, is debated.
T: Bubble | A period when prices rise far above fundamental value, sustained by expectations of further rises
T: Feedback loop | A process in which rising prices attract buyers who push prices higher still
T: Displacement | The initial change or innovation that starts a speculative boom
SUM: Biases reinforce rising prices.
SUM: Bubbles pass through recognisable stages.
SUM: Stick to an allocation; bubbles are hard to time.
SRC: Kindleberger C. P. and Aliber R. Z., Manias, Panics, and Crashes: A History of Financial Crises, 7th edition, Palgrave Macmillan | secondary | 2015
SRC: Shiller R. J., Irrational Exuberance, Princeton University Press | secondary | 2000
SRC: Minsky H. P., Stabilizing an Unstable Economy, Yale University Press | primary | 1986
Q: What is the first stage of a bubble in the Kindleberger-Minsky model? | Displacement: a genuine innovation or change creates new opportunities.
Q: How far did the Nasdaq Composite fall after the dot-com peak? | Nearly 80%, from March 2000 to October 2002.
M1#investing-u09-10-q1@1: What is a speculative bubble? | Prices far above value, sustained by expectations of further rises | A steady rise in prices fully explained by higher company profits | A fall in prices caused by a sudden rise in interest rates | A period when markets close because of very low trading volumes | A bubble is a large, sustained gap between price and fundamental value.
SEQ2#investing-u09-10-q2@2: Put the stages of a bubble in the order described by Kindleberger and Minsky. | Displacement ; Boom ; Euphoria ; Distress ; Revulsion | A real change starts the boom, euphoria follows, early sellers cause distress and the collapse ends in revulsion.
M2#investing-u09-10-q3@2: Which combination of biases best explains the euphoria stage of a bubble? | Extrapolation, herding and overconfidence reinforcing each other | Loss aversion and the disposition effect causing heavy selling | Anchoring on low past prices and fear of high valuations | Mental accounting of dividends and narrow framing of losses | Euphoria is driven by expecting rises to continue, following the crowd and overrating one's judgement.
M3#investing-u09-10-q4@3: An investor believes a popular sector is in a bubble. What is the most sensible response for a long-term investor? | Rebalance to target weights and avoid borrowing, without betting on timing | Sell all shares and wait in cash until the bubble has definitely burst | Borrow heavily to buy more, because prices always keep rising | Short the sector with all savings, as bubbles always burst within months | Bubbles are hard to time; rebalancing limits exposure without needing to predict the top.
SA3#investing-u09-10-q5@1,3: Evaluate the claim that investors can protect themselves from bubbles by recognising them early. | Bubbles often show warning signs, such as very high valuations, rapid credit growth, 'this time is different' stories and widespread participation by inexperienced investors, and Shiller argues they can be identified. However, prices can stay high for years, and many apparent bubbles are justified by later growth, so calling the top is very hard. Investors who sell too early can miss large gains. A better defence is to keep a diversified allocation, rebalance, avoid borrowing and watch valuations, rather than relying on precise timing. | Warning signs ; Difficulty of timing ; Cost of selling too early ; Diversification and rebalancing as defence

## Market timing
LV: Intermediate · Evaluation
S: Market timing means moving money in and out of markets to avoid falls and catch rises. This lesson explains why timing is so difficult, the cost of missing the best days, and the evidence on the 'behaviour gap' between fund returns and investor returns.
O: Explain what market timing involves and why it is hard
O: Calculate the effect of a lower return caused by poor timing
O: Evaluate the evidence on the behaviour gap
H: Two decisions, both hard
P: **Market timing** tries to sell before markets fall and buy before they rise. To succeed, a timer must get two decisions right: when to get out and when to get back in. William Sharpe (1975) estimated that a timer would need to be right about 74% of the time just to match a buy-and-hold investor, once the costs of being out of the market in good years were counted. The best and worst days often come close together, during periods of high volatility, so investors who sell in a panic frequently miss the sharp rebounds that follow. Emotion makes timing worse: fear peaks near market lows and greed near highs.
H: The behaviour gap
- Investors' actual returns often fall short of the returns of the funds they hold.
- This **behaviour gap** arises because money flows in after rises and out after falls.
- Morningstar's annual 'Mind the Gap' studies have found average gaps of around one percentage point or more a year for US investors.
- Gaps tend to be largest for volatile and specialist funds.
- Gaps are smaller in funds bought through regular automatic contributions, such as workplace pensions.
H: Better alternatives
- Stay invested in a diversified portfolio that matches your risk tolerance.
- Hold enough cash for emergencies so you are never forced to sell in a fall.
- Rebalance to target weights on a fixed schedule.
- Use automatic monthly investing, which removes timing decisions.
- If you must act, change your asset allocation gradually and for reasons linked to your goals, not headlines.
X: The cost of a timing gap (illustrative figures).
> A fund returns 7% a year for 20 years; £10,000 grows to £10,000 × 1.07^20 = £38,697.
> An investor who moves in and out at the wrong times earns 5% a year instead.
> Their £10,000 grows to £10,000 × 1.05^20 = £26,533.
> A two-point behaviour gap costs about £12,164, nearly a third of the fund's result.
K: Market timing requires two correct decisions and is defeated by costs and emotion; the behaviour gap shows that poorly timed flows cost many investors much of their funds' returns.
!: Selling after a sharp fall 'to wait until things settle down'. The strongest rebounds often come soon after the worst days, so investors who leave often miss them.
EV: established | Morningstar's 'Mind the Gap' studies have consistently found that average investor returns trail the total returns of the funds they hold.
EV: contested | Whether valuation-based tactical changes to asset allocation can add value over long periods, as opposed to short-term timing, is debated.
T: Market timing | Moving money in and out of markets to try to avoid falls and catch rises
T: Behaviour gap | The difference between a fund's return and the average return its investors earn
T: Buy and hold | Keeping a diversified portfolio invested through market ups and downs
SUM: Timing needs two right calls.
SUM: Best and worst days cluster together.
SUM: Poor timing creates a behaviour gap.
SRC: Sharpe W. F., Likely gains from market timing, Financial Analysts Journal 31(2) | primary | 1975
SRC: Morningstar, Mind the Gap: a report on investor returns | data | 2024 | https://www.morningstar.com
SRC: Dichev I. D., What are stock investors' actual historical returns? Evidence from dollar-weighted returns, American Economic Review 97(1) | primary | 2007
Q: What is the behaviour gap? | The shortfall between a fund's return and the average return its investors actually earn.
Q: Why must a market timer make two correct decisions? | They must decide both when to get out and when to get back in.
M1#investing-u09-11-q1@1: Why is it hard to profit from market timing? | It requires correctly timing both the exit and the re-entry | Regulators forbid investors from selling during market falls | Markets only move on days when exchanges are closed | Timing is easy but platforms charge high fees to prevent it | Getting both decisions right repeatedly, after costs, is very difficult.
NUM2#investing-u09-11-q2@2: A fund returns 7% a year for 20 years, but an investor's poor timing means they earn 5% a year instead. For £10,000, how much less do they end with, to the nearest pound? | 12164 | 0.1% | £ | £10,000 × 1.07^20 = £38,697 and £10,000 × 1.05^20 = £26,533, a shortfall of about 12,164 pounds.
M2#investing-u09-11-q3@2: Why do investors who sell in a panic often miss the strongest market days? | The best days tend to occur close to the worst, during volatile periods | The strongest days only occur after markets have been calm for years | Sellers are barred from buying again for at least twelve months | The best days happen only in markets that the investor cannot access | Large rebounds cluster with large falls, so those who leave in a panic often miss them.
M3#investing-u09-11-q4@3: What does the behaviour gap suggest about how investors should hold volatile funds? | Regular automatic contributions and staying invested can reduce the gap | Investors should trade volatile funds more often to capture swings | The gap shows volatile funds always earn less than cash for everyone | It means fund managers are hiding their true returns from investors | Gaps are smaller when contributions are automatic and investors do not chase performance.
SA3#investing-u09-11-q5@2,3: Evaluate market timing as a strategy for private investors. | Market timing aims to avoid falls and catch rises, and if done well it could improve returns and reduce losses. However, it requires two correct decisions, the best and worst days cluster together, costs and taxes add up, and emotions push investors to sell near lows and buy near highs. Evidence on the behaviour gap shows many investors earn less than the funds they hold because of poorly timed flows. For most private investors, staying invested, rebalancing and investing automatically are more reliable. | Potential appeal ; Two decisions and clustering of days ; Behaviour gap evidence ; Better alternatives

## News, noise and social media
LV: Introductory · Application
S: Investors face a constant stream of news, opinions and social media posts. This lesson distinguishes information from noise, explains attention-driven trading and the risks of finfluencers, and sets out the FCA's rules on financial promotions.
O: Distinguish useful information from market noise
O: Explain how attention and social media affect trading
O: Evaluate the reliability of investment information from social media
H: Information and noise
P: Fischer Black (1986) used **noise** to describe trading based on information that is not really relevant to value. Most daily market news explains price moves after they happen, rather than predicting them. Barber and Odean (2008) found that private investors tend to buy shares that **grab attention**, such as those in the news or with unusual price moves, and these purchases often go on to underperform. Social media has made this stronger: posts spread quickly, 'meme stocks' such as GameStop in January 2021 can surge on online enthusiasm, and short-term excitement can overwhelm long-term analysis. For most long-term investors, very little daily news changes what they should do.
H: Finfluencers and the FCA
- **Finfluencers** are social media personalities who discuss investments, sometimes paid by firms.
- Under UK law, communicating a **financial promotion** without approval by an authorised firm can be a criminal offence.
- The FCA's guidance on financial promotions on social media (FG24/1, 2024) sets out its expectations.
- Promoters of high-risk investments, including crypto-assets, must include risk warnings.
- Check any firm on the FCA Register and the FCA Warning List before investing.
H: Using information well
- Ask whether a piece of news changes the long-term value of an investment or just its short-term price.
- Be sceptical of urgency, guaranteed returns and 'secret' opportunities, which are hallmarks of scams.
- Prefer primary sources, such as company reports and regulatory announcements.
- Limit how often you check prices and news.
- Remember that a confident tone is not evidence.
X: A meme-share frenzy (illustrative example).
> A struggling company's shares are promoted heavily on a social media forum.
> Within a week the price rises 300%, and posts urge people to buy 'before it's too late'.
> Sam buys near the top after seeing the gains in his feed.
> A month later, as attention moves on, the price has fallen 70% and Sam has lost most of his stake.
K: Much financial news is noise; attention-grabbing shares and social media hype can drive short-term prices and poor decisions, and finfluencer promotions are regulated, so check sources and firms with the FCA.
!: Treating a viral social media post as research. Popularity and confidence are not evidence, and some promoters are paid or are running scams.
EV: established | Barber and Odean (2008) found that individual investors are net buyers of attention-grabbing shares, which tend to underperform afterwards.
EV: contested | Whether social media enthusiasm, as in the 2021 meme-share episodes, has lasting effects on prices or only short-term ones is debated.
T: Noise | Information or trading not related to fundamental value
T: Finfluencer | A social media personality who discusses or promotes financial products
T: Financial promotion | A communication that invites or induces someone to engage in investment activity
SUM: Much daily news is noise.
SUM: Attention drives poor trading.
SUM: Check promotions and firms with the FCA.
SRC: Barber B. M. and Odean T., All that glitters: the effect of attention and news on the buying behavior of individual and institutional investors, Review of Financial Studies 21(2) | primary | 2008
SRC: Financial Conduct Authority, FG24/1 Finalised guidance on financial promotions on social media | guidance | 2024 | https://www.fca.org.uk/publication/finalised-guidance/fg24-1.pdf
SRC: Black F., Noise, Journal of Finance 41(3) | primary | 1986
Q: What did Barber and Odean (2008) find about attention-grabbing shares? | Individual investors tend to buy them, and they tend to underperform afterwards.
Q: Where can you check whether a firm is authorised? | On the FCA Register (and check the FCA Warning List).
M1#investing-u09-12-q1@1: What does 'noise' mean in markets? | Information or trading unrelated to fundamental value | Official announcements made by listed companies | Long-run data on returns from shares and bonds | The regulated disclosures in a fund factsheet | Fischer Black used noise for information not relevant to value.
M2#investing-u09-12-q2@2: An online post promises 'guaranteed 30% returns, but only if you invest today'. What is the most likely conclusion? | It shows classic signs of a scam or illegal promotion | It is a genuine opportunity because returns are guaranteed | It must be approved because it appeared on a large platform | It is safe as long as many other people are investing too | Urgency and guaranteed high returns are warning signs; check the firm on the FCA Register and Warning List.
TF1#investing-u09-12-q3@2: In the UK, a social media influencer can be committing a criminal offence by promoting an investment without the promotion being approved by an authorised firm. | true | Communicating an unapproved financial promotion can breach section 21 of the Financial Services and Markets Act 2000, and the FCA has prosecuted finfluencers.
M3#investing-u09-12-q4@3: Which question best helps a long-term investor deal with daily market news? | Does this change the long-term value of what I own, or just today's price? | How quickly can I trade on this before others hear about it? | How many people online are discussing this story today? | Which share in my portfolio rose most since yesterday? | Most news affects short-term prices, not long-term value, so it should rarely change a plan.
SA2#investing-u09-12-q5@2,3: Evaluate social media as a source of investment information for private investors. | Social media can spread information quickly, give access to a range of views and help investors learn. However, much of it is noise, attention-driven hype can push prices far from value, as in meme-share surges, and some finfluencers are paid or promote unsuitable or illegal products. Echo chambers can reinforce biases. Investors should treat social media as a prompt for research, check primary sources, verify firms on the FCA Register and Warning List, and be wary of urgency and guaranteed returns. | Benefits ; Noise and hype ; Paid promotion and scams ; Verification steps

## Pound-cost averaging and automatic investing
LV: Introductory · Application
S: Pound-cost averaging means investing a fixed sum at regular intervals. This lesson calculates how it buys more units when prices are low, compares it with investing a lump sum, and explains the behavioural benefits of automatic investing.
O: Explain pound-cost averaging
O: Calculate the average cost per unit from regular investing
O: Evaluate regular investing against lump-sum investing
H: Investing a fixed sum regularly
P: **Pound-cost averaging** (called dollar-cost averaging in the US) means investing a fixed amount, such as £100, at regular intervals, regardless of price. When prices are low, the fixed sum buys more units; when high, fewer. As a result, the **average cost per unit** is lower than the average of the prices paid. For most people, regular investing is simply the natural way to invest from monthly income, as in workplace pensions. Its biggest benefit is behavioural: it is **automatic**, so it removes the temptation to time the market, and it turns market falls into a chance to buy more units cheaply rather than a reason to panic.
H: Lump sum or drip-feed?
- If you already have a lump sum, investing it all at once has historically beaten drip-feeding it about two-thirds of the time (Vanguard, 2012).
- This is because markets have risen more often than they have fallen, so money held back in cash usually misses growth.
- Drip-feeding reduces the regret of investing just before a fall.
- For a nervous investor, phasing in over a few months may be a reasonable compromise.
- The decision matters less than staying invested afterwards.
H: Automatic investing in practice
- Most UK platforms offer regular investment plans from around £25 a month, often with low or no dealing charges.
- Workplace pensions use **automatic enrolment**, introduced under the Pensions Act 2008 from 2012, which has greatly increased pension saving.
- Thaler and Benartzi's 'Save More Tomorrow' scheme showed that pre-committing to higher future contributions raises saving.
- Automatic increases, such as raising contributions with each pay rise, harness **inertia** for good.
- Review the plan once a year, not every month.
X: Averaging the cost (illustrative figures).
> Ollie invests £100 a month in a fund for three months; the unit prices are £10, £5 and £8.
> He buys 10, 20 and 12.5 units: 42.5 units for £300.
> His average cost per unit is £300 ÷ 42.5 = £7.06.
> The average of the three prices is £7.67, so his fixed sum bought more units when prices were low.
K: Pound-cost averaging invests a fixed sum regularly, buying more units when prices are low; lump sums usually do better on average, but automatic regular investing helps investors avoid timing mistakes.
!: Believing pound-cost averaging guarantees a profit or beats investing a lump sum. It lowers the average cost relative to the average price, but if prices fall steadily you still lose, and lump sums have usually done better.
EV: established | Vanguard research (2012) found that investing a lump sum immediately outperformed phasing it in over 12 months in about two-thirds of historical periods in the US, UK and Australia.
EV: established | Automatic enrolment substantially increased the proportion of eligible UK employees saving in a workplace pension (DWP statistics).
T: Pound-cost averaging | Investing a fixed sum at regular intervals regardless of price
T: Automatic enrolment | The UK system that places eligible employees into a workplace pension unless they opt out
T: Inertia | The tendency to stick with the current or default choice
SUM: A fixed sum buys more units when prices are low.
SUM: Lump sums usually beat drip-feeding.
SUM: Automation beats willpower.
SRC: Shtekhman A., Tasopoulos C. and Wimmer B., Dollar-cost averaging just means taking risk later, Vanguard Research | data | 2012
SRC: Thaler R. H. and Benartzi S., Save More Tomorrow: using behavioral economics to increase employee saving, Journal of Political Economy 112(S1) | primary | 2004
SRC: Department for Work and Pensions, Workplace pension participation and savings trends of eligible employees, gov.uk | data | 2024
Q: What is pound-cost averaging? | Investing a fixed sum at regular intervals regardless of price.
Q: How often has investing a lump sum at once beaten phasing it in, according to Vanguard (2012)? | About two-thirds of the time.
M1#investing-u09-13-q1@1: Under pound-cost averaging, what happens when prices fall? | The fixed sum buys more units | The fixed sum buys fewer units | The investor must pay in more money | Investing is paused until prices rise | A fixed amount divided by a lower price buys more units.
NUM2#investing-u09-13-q2@2: Ollie invests £100 a month for three months at unit prices of £10, £5 and £8. What is his average cost per unit in pounds, to two decimal places? | 7.06 | 0.01 | £ | He buys 10 + 20 + 12.5 = 42.5 units for £300, so his average cost is £300 ÷ 42.5 = 7.06 pounds, below the average price of £7.67.
M2#investing-u09-13-q3@2: Why has investing a lump sum at once usually beaten phasing it in over a year? | Markets have risen more often than fallen, so held-back cash misses growth | Lump sums are given a lower ongoing charge by all fund managers | Phased investing is taxed at a higher rate than lump sums | Regular investments are only allowed in cash funds in the UK | Money waiting in cash tends to miss market growth, since rises have been more common than falls.
M3#investing-u09-13-q4@3: A nervous investor inherits £60,000 and fears investing just before a crash. What is a reasonable approach? | Phase it in over a few months, accepting a likely small cost for peace of mind | Keep it all in cash until markets are certain to rise, then invest | Invest it all in a single share to maximise the possible gain | Avoid investing at all, since markets might fall at any time | Lump sums usually win, but phasing in can reduce regret; the key is to invest and stay invested.
SA2#investing-u09-13-q5@1,3: Evaluate pound-cost averaging as an investment approach. | Pound-cost averaging invests a fixed sum regularly, so more units are bought when prices are low and the average cost is below the average price. It suits people investing from monthly income and, by being automatic, reduces the temptation to time the market and turns falls into buying opportunities. However, it does not guarantee a profit, and for someone who already has a lump sum, investing at once has usually done better because markets tend to rise. Its main value is behavioural, helping investors stay disciplined. | How it works ; Behavioural benefits ; Not a guarantee ; Lump sum comparison

## Rules, checklists and investment journals
LV: Intermediate · Evaluation
S: Because knowing about biases is not enough to avoid them, investors benefit from systems that structure decisions. This lesson explains investment policy statements, checklists, journals and pre-commitment, and evaluates their strengths and limits.
O: Describe tools that structure investment decisions
O: Explain how rules and checklists counter specific biases
O: Evaluate the benefits and limits of a rules-based approach
H: Systems over willpower
P: Behavioural research suggests that awareness of biases does little on its own; good **systems** work better than good intentions. An **investment policy statement (IPS)** is a short written plan setting out goals, time horizon, risk tolerance, asset allocation, rebalancing rules and what you will do in a market fall. A **checklist** lists questions to answer before every investment decision, an approach used in surgery and aviation and described by Atul Gawande (2009). An **investment journal** records each decision, the reasoning and expected outcome at the time, so you can later judge decisions by their process rather than their luck. **Pre-commitment**, such as automatic contributions and rebalancing rules, makes good behaviour the default.
H: Matching tools to biases
- **Overconfidence**: a journal shows how often your forecasts were right.
- **Confirmation bias**: a checklist question asks for the strongest case against.
- **Loss aversion and panic**: an IPS sets out in advance what you will do in a fall.
- **Herding and FOMO**: a rule to wait 48 hours before buying any tip.
- **Disposition effect**: pre-set review rules based on the investment case, not the price paid.
H: Strengths and limits
- Rules are written in calm conditions, when judgement is clearest.
- They make decisions consistent and easier to review.
- Rules can be too rigid if circumstances genuinely change, such as a new job or family.
- Investors may break their own rules under stress, so keep them simple and few.
- Review the IPS yearly or after major life events, not after market moves.
X: A short pre-trade checklist (illustrative example).
> 1. Does this fit my written asset allocation and goals?
> 2. What is the strongest argument against it, and what would make me sell?
> 3. Am I buying because of recent performance or something I saw online?
> 4. Can I hold it through a 30% fall without selling? If any answer is uncertain, wait a week.
K: Written plans, checklists, journals and pre-commitment counter biases more effectively than awareness alone, though rules should be simple and reviewed when circumstances, not markets, change.
!: Judging a decision only by its outcome. A good decision can turn out badly through bad luck, and a bad one well; a journal lets you judge the process.
EV: established | Gawande (2009) and studies of surgical checklists show that simple checklists can reduce errors in complex, high-pressure tasks.
EV: contested | Direct evidence that checklists and journals improve private investors' returns is limited, though they target well-documented biases.
T: Investment policy statement | A written plan setting out goals, risk tolerance, asset allocation and rules for managing investments
T: Investment journal | A record of each decision, its reasoning and expected outcome at the time it was made
T: Pre-commitment | Deciding in advance and binding oneself to a course of action
SUM: Systems beat willpower.
SUM: Each tool targets particular biases.
SUM: Keep rules simple; review them with life changes.
SRC: Gawande A., The Checklist Manifesto: How to Get Things Right, Metropolitan Books | secondary | 2009
SRC: Haynes A. B. et al., A surgical safety checklist to reduce morbidity and mortality in a global population, New England Journal of Medicine 360(5) | primary | 2009
SRC: Thaler R. H. and Sunstein C. R., Nudge: Improving Decisions about Health, Wealth, and Happiness, Yale University Press | secondary | 2008
Q: What is an investment policy statement? | A written plan of goals, time horizon, risk tolerance, asset allocation and rules for managing investments.
Q: Why keep an investment journal? | To record reasoning at the time, so decisions can be judged on process rather than outcome or memory.
M1#investing-u09-14-q1@1: What is the main purpose of an investment checklist? | To make sure key questions are answered before every decision | To guarantee that every investment chosen will make money | To replace the need for diversification in a portfolio | To list all the shares that friends have recommended | A checklist structures decisions so important questions are not skipped under pressure.
MATCH2#investing-u09-14-q2@2: Match each tool to the bias it mainly targets. | Investment journal = Overconfidence ; Asking for the strongest case against = Confirmation bias ; Written plan for market falls = Loss aversion and panic ; 48-hour wait before buying a tip = Herding and FOMO | Each tool is designed to interrupt a particular predictable error.
M2#investing-u09-14-q3@2: Why should an investment policy statement be written in calm market conditions? | Judgement is clearest when emotions such as fear and greed are low | Markets are always calm on the day the statement is written | Regulators require statements to be written when markets are flat | Calm markets give the highest returns for new investors | Rules set without stress are more likely to reflect long-term goals than current emotions.
M3#investing-u09-14-q4@3: An investor's journal shows a share they bought for weak reasons rose 40%. How should they judge the decision? | As a poor process with a lucky outcome, and learn from the weak reasoning | As a skilled decision, because the share rose strongly in price | As proof that weak reasons work, so they should be used more often | As irrelevant, because only the final outcome of decisions matters | Separating process from outcome stops luck from reinforcing bad habits.
SA3#investing-u09-14-q5@1,3: Evaluate the use of rules, checklists and journals to improve investment behaviour. | Rules, checklists and journals help because awareness of biases is not enough; they are set in calm conditions, make decisions consistent and target specific biases such as overconfidence, confirmation bias and panic selling. Journals let investors judge process rather than luck. However, rules can be too rigid, investors may break them under stress, and direct evidence of improved returns is limited. Simple, few rules, reviewed when life circumstances change, give the best balance between discipline and flexibility. | Systems beat awareness ; Targeting specific biases ; Limits and rigidity ; Balanced conclusion
`;
