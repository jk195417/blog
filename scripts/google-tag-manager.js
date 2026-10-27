/* global hexo */
// Icarus has no Google Tag Manager option, so inject the container on every page.
// GA4 and any other tags are configured inside GTM. Set the container ID in _config.yml:
//   google_tag_manager:
//     id: GTM-XXXXXXX
const { id } = hexo.config.google_tag_manager || {};

if (id) {
  hexo.extend.injector.register('head_begin', `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');</script>
<!-- End Google Tag Manager -->`);

  hexo.extend.injector.register('body_begin', `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${id}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`);
}
