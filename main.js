#!/usr/bin/env node

if (process.argv0.endsWith('node')) {
  // eslint-disable-next-line global-require
  require('./src/cli');
} else {
  // eslint-disable-next-line global-require
  require('./src/gui');
}
