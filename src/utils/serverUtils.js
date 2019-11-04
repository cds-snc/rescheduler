import gitHash from './gitHash'
import path from 'path'

export const getReleaseHash = () => {
  return typeof process.env.RAZZLE_STAGE === typeof undefined
    ? ''
    : `${process.env.RAZZLE_STAGE}-${gitHash()}`
}

export const handleMailError = e => {
  // eslint-disable-line no-console
  return {
    messageId: null,
    errorMessage: e.message,
  }
}

export const gatherFieldErrors = errObj => {
  const errs = Object.keys(errObj).map(key => {
    return key
  })
  return errs.join(', ')
}

export const captureMessage = (title = '', validate) => {
  return
}

export const notPageMatch = (url, pageName) => {
  return url.indexOf(pageName) === -1
}

export const getPrimarySubdomain = function(req, res, next) {
  req.subdomain = 'demo'
  next()
}

const _ensureBody = (req, res, next, cb) => {
  if (req.path === '/500') return next()

  try {
    cb()
  } catch (e) {
    return res.redirect('/500')
  }

  return next()
}

export const ensureLocation = (req, res, next) => {
  next()
}

const getStacktraceData = data => {
  let stacktrace = data.exception && data.exception[0].stacktrace

  if (stacktrace && stacktrace.frames) {
    stacktrace.frames.forEach(function(frame) {
      if (frame.filename.startsWith('/')) {
        frame.filename = 'app:///' + path.basename(frame.filename)
      }
    })
  }

  return data
}
/* Content Security Policy config */
export const cspConfig = {
  defaultSrc: ["'self'"],
  fontSrc: ["'self'", 'https://fonts.gstatic.com'],
  imgSrc: ["'self'", 'data:', 'https://www.google-analytics.com'],
  scriptSrc: ["'self'", 'https://www.google-analytics.com', "'unsafe-inline'"],
  styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
}
