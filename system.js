const os = require("os");

const getSystemInfo = () => {
    return(
        {   osHost: os.hostname(), 
            osType: os.type(),
            freeMemory: os.freemem(),
            localMemory: os.totalmem(),
            machine: os.machine(),
            platform: os.platform(),
            version: os.version(),
            systemUptime: os.uptime(),
            numberOfCPUs: os.cpus(),
        }
    );
};

module.exports = getSystemInfo;