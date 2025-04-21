import Bottleneck from 'bottleneck';

const mangadexLimiter = new Bottleneck({
  minTime: 200,
  maxConcurrent: 1,
});

export default mangadexLimiter;