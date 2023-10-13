let apiSettings;

if (process.env.NODE_ENV === 'development') {
  apiSettings = require('./apisettings.dev.json');
} else if (process.env.NODE_ENV === 'staging') {
  apiSettings = require('./apisettings.staging.json');
} else {
  apiSettings = require('./apisettings.prod.json');
}

export default apiSettings;
