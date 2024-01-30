//https://upstash.com/

import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";


const rateLimit = async (req, maxRequest=10, timeLimit="30 s")=>{

  try {

    if(!req){
      throw new Error("Request is not found");
    }

  if(!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN){
    throw new Error("Redis url or token is not found");
  }
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
    
    // Create a new ratelimiter, that allows 5 requests per 5 seconds
    const ratelimit = new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(maxRequest, timeLimit),
    });
  
    const result = await ratelimit.limit(req).then((result) => {
      
      // 1.000.000 miliseconds = 1 second
      // saniye cinsinden kalan zamanı ve durumunu geri döndürürüz.
      const LifeTime = Math.floor((result.reset - Date.now())/1000);
      return {success:result.success, reset:LifeTime};
      
    });
  
    return result;
  } catch (error) {
    

    return {success:false, reset:0, error:error.message};
  }
}

export default rateLimit;