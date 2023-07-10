# @phoebecodes/easy-errors

A library for easily building Error constructors. I end up using this pattern
a lot in my own code and figured it'd be best to split it out into its own
module.

## Usage

```javascript
import { makeError } from "@phoebecodes/easy-errors";

/* Easy error with a default message */
const SomeError = makeError(
  /* The error name */
  "SomeError",

  /* The default message */
  "There was an error!"
);

assert(SomeError().message === "There was an error!");
assert(SomeError().toString() === "SomeError: There was an error!");
assert(
  SomeError("Override error message.").message ===
    "Override error message."
);

/**
 * Easy error with a message producer.
 * 
 * The message producer is a function that receives the arguments given to
 * the error constructor and returns a string that will be used as the error
 * message.
 */
const OtherError = makeError(
  /* The error name */
  "OtherError",

  /* The message producer */
  (w, d) => `Hello, ${w}! An error happened at ${d.toString()}.`
);

const currentDate = new Date();

assert(
  OtherError("world", currentDate).message ===
    "Hello, world! An error happened at Fri Jan 11 2019 11:15:00 GMT-0600 (Central Standard Time)."
);
assert(
  OtherError("world", currentDate).toString() ===
    "OtherError: Hello, world! An error happened at Fri Jan 11 2019 11:15:00 GMT-0600 (Central Standard Time)."
);
