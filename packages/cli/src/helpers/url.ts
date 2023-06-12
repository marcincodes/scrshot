import fetch from 'node-fetch';

export async function validateURL(url: string) {
  if (!url) {
    return { 
      error: 'URL is not defined'
    }
  }

  try {
    const response = await fetch(url, {
      method: 'HEAD',
    });
  
    if (response.ok) {
      return {
        error: null
      }
    }
  
    return {
      error: 'URL is not returning 200 status code'
    }
  } catch (cause) {
    return {
      error: cause
    }
  }
}
