import fetch from 'node-fetch';

const BASEURL = 'https://api.lemonsqueezy.com/v1/licenses/validate';

export async function validateLicense(licenseKey: string) {
  const response = await fetch(BASEURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: new URLSearchParams({
      license_key: licenseKey
    }).toString()
  });

  const data: any = await response.json();

  if (data.valid) {
    return {
      error: null
    }
  }

  return {
    error: data.error
  }
}
