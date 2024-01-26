class RateLimiter {
  constructor(limit, interval, threshold) {
    this.limit = limit;
    this.interval = interval;
    this.threshold = threshold;
    this.tokens = new Map();
  }

  getToken(key) {
    const now = Date.now();
    let tokenBucket = this.tokens.get(key);

    if (!tokenBucket) {
      tokenBucket = {
        lastRequest: now,
        tokens: this.limit,
        consecutiveFails: 0,
        thresholdReachedAt: 0,
      };
      this.tokens.set(key, tokenBucket);
    }

    const elapsed = now - tokenBucket.lastRequest;
    const newTokens = elapsed * (this.limit / this.interval) / 1000;
    tokenBucket.tokens = Math.min(this.limit, tokenBucket.tokens + newTokens);
    tokenBucket.lastRequest = now;

    if (tokenBucket.tokens >= 1) {
      tokenBucket.tokens -= 1;
      tokenBucket.consecutiveFails = 0; 
      tokenBucket.thresholdReachedAt = 0; 
      return true;
    } else {
      tokenBucket.consecutiveFails += 1;

    
      if (tokenBucket.consecutiveFails >= this.threshold && tokenBucket.thresholdReachedAt === 0) {
        tokenBucket.thresholdReachedAt = now; 
      }

     
      if (now - tokenBucket.thresholdReachedAt >= this.interval) {
        tokenBucket.tokens = this.limit;
        tokenBucket.consecutiveFails = 0; 
        tokenBucket.thresholdReachedAt = 0; 
      }

      return false;
    }
  }
}

module.exports = RateLimiter;
