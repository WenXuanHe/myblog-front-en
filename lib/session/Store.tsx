import Redis from "ioredis"
import { Store } from"koa-session2"

export type sidsType = {
    sid:number|string,
    maxAge: number
}

class RedisStore extends Store {

    redis:Redis;

    constructor() {
        super();
        this.redis = new Redis();
    }

    async get(sid:string|number) {

        let data = await this.redis.get(`SESSION:${sid}`);
        return JSON.parse(data);
    }

    async set(session:any, { sid =  super.getID(24), maxAge = 1000000 }:sidsType) {
        try {

            await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
            return sid;

        } catch (e) {}
    }

    async destroy(sid:number|string) {

        return await this.redis.del(`SESSION:${sid}`);
    }
}

export default RedisStore;
