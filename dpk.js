const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let partitionKey = TRIVIAL_PARTITION_KEY;

  if (event) {
    if (event.partitionKey) {
      partitionKey = event.partitionKey;
      if (typeof partitionKey !== "string") {
        partitionKey = JSON.stringify(partitionKey);
      }
      if (partitionKey > MAX_PARTITION_KEY_LENGTH) {
        partitionKey = crypto.createHash("sha3-512").update(partitionKey).digest("hex");
      }
    } else {
      const data = JSON.stringify(event);
      partitionKey = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }
  return partitionKey;
};