#!/usr/bin/env node

'use strict';

try {
  require('./scripts/' + process.argv[2]);
} catch (error) {
  require('./scripts/config');
}
