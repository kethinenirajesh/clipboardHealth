# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
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


If the partition key is already part of the event, we no need to generate the new key.
  But we need to make sure that the partitionkey length is less than the 256, so we are doing sha3-512 hasing with hexa digest. which will give 128 legnth digest.
  if passed partision key is not of string type, we are converting to string type.
If partition key is not passed but event data is passed. we are generating the partision key with the sha3-512 hasing and hexa digest. As mentioned above, it will give 128 legnth digest which is less than 256.

If no the above two cases, we are passing trivial partition key, which is 0.
