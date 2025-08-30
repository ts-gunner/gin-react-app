class Snowflake {
    constructor(workerId, datacenterId) {
        /**
         * 初始化雪花算法生成器
         * 
         * @param {number} workerId - 工作机器ID (0-31)
         * @param {number} datacenterId - 数据中心ID (0-31)
         */
        // 起始时间戳，可以设置为系统首次上线时间
        this.twepoch = 1288834974657;

        this.workerId = workerId;
        this.datacenterId = datacenterId;
        this.sequence = 0;

        // 位数分配
        this.workerIdBits = 5;
        this.datacenterIdBits = 5;
        this.maxWorkerId = -1 ^ (-1 << this.workerIdBits);  // 31
        this.maxDatacenterId = -1 ^ (-1 << this.datacenterIdBits);  // 31
        this.sequenceBits = 12;

        // 移位偏移量
        this.workerIdShift = this.sequenceBits;
        this.datacenterIdShift = this.sequenceBits + this.workerIdBits;
        this.timestampLeftShift = this.sequenceBits + this.workerIdBits + this.datacenterIdBits;
        this.sequenceMask = -1 ^ (-1 << this.sequenceBits);  // 4095

        this.lastTimestamp = -1;

        // 参数校验
        if (this.workerId > this.maxWorkerId || this.workerId < 0) {
            throw new Error(`worker ID can't be greater than ${this.maxWorkerId} or less than 0`);
        }
        if (this.datacenterId > this.maxDatacenterId || this.datacenterId < 0) {
            throw new Error(`datacenter ID can't be greater than ${this.maxDatacenterId} or less than 0`);
        }
    }

    _genTimestamp() {
        /** 生成当前时间戳（毫秒） */
        return Date.now();
    }

    _tilNextMillis(lastTimestamp) {
        /** 等待下一毫秒 */
        let timestamp = this._genTimestamp();
        while (timestamp <= lastTimestamp) {
            timestamp = this._genTimestamp();
        }
        return timestamp;
    }

    nextId() {
        /** 生成下一个ID */
        let timestamp = this._genTimestamp();

        // 如果当前时间小于上一次ID生成的时间戳，说明系统时钟回退过
        if (timestamp < this.lastTimestamp) {
            throw new Error(
                `Clock moved backwards. Refusing to generate id for ${this.lastTimestamp - timestamp} milliseconds`);
        }

        // 如果是同一时间戳生成的，则进行序列号自增
        if (timestamp === this.lastTimestamp) {
            this.sequence = (this.sequence + 1) & this.sequenceMask;
            // 序列号超出最大值，等待下一毫秒
            if (this.sequence === 0) {
                timestamp = this._tilNextMillis(this.lastTimestamp);
            }
        } else {
            // 时间戳改变，序列号重置
            this.sequence = 0;
        }

        this.lastTimestamp = timestamp;

         // 使用 BigInt 进行计算
        const id = (
            (BigInt(timestamp - this.twepoch) << BigInt(this.timestampLeftShift)) |
            (BigInt(this.datacenterId) << BigInt(this.datacenterIdShift)) |
            (BigInt(this.workerId) << BigInt(this.workerIdShift)) |
            BigInt(this.sequence));

        return id.toString(); // 返回字符串形式的ID
    }
}


const generator = new Snowflake(1, 1);

export default generator;