export const isSameURL = (a, b) => a.split('?')[0] === b.split('?')[0];

export const isRelativeURL = u =>
    u && u.length && /^\/[a-zA-Z0-9@\-%_~][/a-zA-Z0-9@\-%_~]*[?]?([^#]*)#?([^#]*)$/.test(u);

export default function ({ app }) {
  const redirect = function (name, noRouter = false) {
    if (!this.options.redirect) {
      return
    }

    const from = this.options.fullPathRedirect ? this.ctx.route.fullPath : this.ctx.route.path;

    let to = this.options.redirect[name];
    if (!to) {
      return
    }

    // Apply rewrites
    if (this.options.rewriteRedirects) {
      if (name === 'login' && isRelativeURL(from) && !isSameURL(to, from)) {
        this.$storage.setUniversal('redirect', from)
      }

      let isUseRedirectParam = false
      if (name === 'home') {
        const redirect = this.ctx.route.query.redirect || this.$storage.getUniversal('redirect')
        this.$storage.setUniversal('redirect', null);

        if (isRelativeURL(redirect)) {
          to = redirect
          isUseRedirectParam = true
        }
      }

      const isRewriteLocalizedUrl = typeof app.localePath == 'function'
      if (isRewriteLocalizedUrl && !isUseRedirectParam) {
        // NOTE: get localized login uri on installed nuxt-i18n
        to = app.localePath(to.replace(/^\//, ''));
      }
    }

    // Prevent infinity redirects
    if (isSameURL(to, from)) {
      return
    }

    if (process.browser) {
      if (noRouter) {
        window.location.replace(to)
      } else {
        this.ctx.redirect(to)
      }
    } else {
      this.ctx.redirect(to, { redirect: from })
    }
  };

  app.$auth.redirect = redirect.bind(app.$auth)
}